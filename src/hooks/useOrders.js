import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

/**
 * useOrders — customer-facing order operations
 */
export const useOrders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = useCallback(async () => {
        if (!user) return;

        setLoading(true);
        try {
            // Fetch profile to get the user's phone number for linkage
            const { data: profile } = await supabase
                .from('profiles')
                .select('phone')
                .eq('id', user.id)
                .single();

            // Fetch orders:
            // 1. Where user_id matches the logged-in user
            // 2. OR where user_id is null but shipping_phone matches the user's profile phone (linkage)
            let query = supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (profile?.phone) {
                query = query.or(`user_id.eq.${user.id},and(user_id.is.null,shipping_phone.eq.${profile.phone})`);
            } else {
                query = query.eq('user_id', user.id);
            }

            const { data: ordersData, error: ordersError } = await query;

            if (ordersError) throw ordersError;

            // Map items manually
            const orderIds = (ordersData || []).map(o => o.id);
            let itemsData = [];
            if (orderIds.length > 0) {
                const { data, error: itemsErr } = await supabase
                    .from('order_items')
                    .select('*')
                    .in('order_id', orderIds);
                if (!itemsErr) itemsData = data || [];
            }

            const ordersWithItems = (ordersData || []).map(order => ({
                ...order,
                order_items: itemsData.filter(item => item.order_id === order.id)
            }));

            setOrders(ordersWithItems);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [user]);

    const fetchOrderById = useCallback(async (orderId) => {
        setLoading(true);
        try {
            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .select('*')
                .eq('id', orderId)
                .single();

            if (orderError) throw orderError;

            let itemsData = [];
            const { data: items, error: itemsErr } = await supabase
                .from('order_items')
                .select('*')
                .eq('order_id', orderId);
            if (!itemsErr) itemsData = items || [];

            return {
                ...orderData,
                order_items: itemsData
            };
        } catch (error) {
            console.error('Error fetching order:', error.message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Create a new order from cart
    const createOrder = async ({ items, shippingInfo, paymentMethod }) => {
        // No longer requiring user - Guest Checkout enabled

        const subtotal = items.reduce(
            (sum, item) => sum + item.price * item.quantity, 0
        );
        const shippingFee = subtotal >= 200 ? 0 : 15; // Free shipping over GHS 200
        const tax = 0; // No tax for now
        const total = subtotal + shippingFee + tax;

        // Generate order number
        const date = new Date();
        const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        const orderNumber = `OT-${dateStr}-${random}`;

        // Insert order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                order_number: orderNumber,
                user_id: user?.id || null,
                status: 'pending',
                subtotal,
                shipping_fee: shippingFee,
                tax,
                total,
                payment_method: paymentMethod,
                payment_status: 'pending',
                shipping_name: shippingInfo.name,
                shipping_phone: shippingInfo.phone,
                shipping_address: shippingInfo.address,
                shipping_city: shippingInfo.city,
                shipping_region: shippingInfo.region,
                notes: shippingInfo.notes || '',
            })
            .select()
            .single();

        if (orderError) throw orderError;

        // Insert order items
        const orderItems = items.map((item) => ({
            order_id: order.id,
            product_id: item.id,
            product_name: item.name,
            product_image: item.image_url || item.image || '',
            quantity: item.quantity,
            unit_price: item.price,
            total_price: item.price * item.quantity,
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) throw itemsError;
        return order;
    };

    const updatePaymentStatus = async (orderId, paymentStatus, reference) => {
        const updates = {
            payment_status: paymentStatus,
            payment_reference: reference
        };
        if (paymentStatus === 'success') {
            updates.status = 'paid';
        }

        const { data, error } = await supabase
            .from('orders')
            .update(updates)
            .eq('id', orderId)
            .select()
            .single();

        if (error) throw error;
        return data;
    };

    useEffect(() => {
        let channel;
        
        const setupRealtime = async () => {
            await fetchOrders();
            
            if (!user) return;

            // Fetch profile to get phone for broader realtime filtering if possible
            // Note: Supabase Realtime filters are limited to simple eq/neq. 
            // Broad listening for the user_id is the most reliable way.
            channel = supabase
                .channel(`user-orders-${user.id}`)
                .on(
                    'postgres_changes',
                    {
                        event: '*',
                        schema: 'public',
                        table: 'orders',
                    },
                    (payload) => {
                        // Check if the change affects an order owned by or linked to this user
                        const data = payload.new || payload.old;
                        if (data && (data.user_id === user.id || (data.user_id === null && data.shipping_phone === profile?.phone))) {
                            console.log('Relevant order update caught by realtime:', payload);
                            fetchOrders();
                        }
                    }
                )
                .subscribe();
        };

        setupRealtime();

        return () => {
            if (channel) supabase.removeChannel(channel);
        };
    }, [fetchOrders, user?.id, profile?.phone]);

    return {
        orders,
        loading,
        error,
        fetchOrders,
        fetchOrderById,
        createOrder,
        updatePaymentStatus,
    };
};

/**
 * useAdminOrders — full CRUD for admin order management
 */
export const useAdminOrders = (options = {}) => {
    const {
        status = null,
        page = 1,
        limit = 10,
        searchQuery = ''
    } = options;

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [error, setError] = useState(null);

    const fetchOrders = useCallback(async (currentOptions = options) => {
        setLoading(true);
        setError(null);
        try {
            let query = supabase
                .from('orders')
                .select('*', { count: 'exact' });

            if (currentOptions.status) {
                query = query.eq('status', currentOptions.status);
            }

            if (currentOptions.searchQuery) {
                query = query.or(`order_number.ilike.%${currentOptions.searchQuery}%,shipping_name.ilike.%${currentOptions.searchQuery}%,shipping_phone.ilike.%${currentOptions.searchQuery}%`);
            }

            query = query.order('created_at', { ascending: false });

            const from = ((currentOptions.page || 1) - 1) * (currentOptions.limit || 10);
            const to = from + (currentOptions.limit || 10) - 1;
            query = query.range(from, to);

            const { data: ordersData, error: fetchError, count } = await query;
            if (fetchError) throw fetchError;

            // Manual joins to avoid PGRST200 schema cache error
            const userIds = [...new Set((ordersData || []).map(o => o.user_id).filter(Boolean))];
            const orderIds = (ordersData || []).map(o => o.id);

            let profilesData = [];
            if (userIds.length > 0) {
                const { data: pData } = await supabase
                    .from('profiles')
                    .select('id, full_name, email, phone')
                    .in('id', userIds);
                profilesData = pData || [];
            }

            let itemsData = [];
            if (orderIds.length > 0) {
                const { data: iData } = await supabase
                    .from('order_items')
                    .select('*')
                    .in('order_id', orderIds);
                itemsData = iData || [];
            }

            const enrichedOrders = (ordersData || []).map(order => ({
                ...order,
                profiles: order.user_id ? profilesData.find(p => p.id === order.user_id) || null : null,
                order_items: itemsData.filter(item => item.order_id === order.id)
            }));

            setOrders(enrichedOrders);
            setTotalCount(count || 0);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching admin orders:', err.message);
        } finally {
            setLoading(false);
        }
    }, [options.status, options.page, options.limit, options.searchQuery]);

    const updateOrderStatus = async (orderId, status) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('orders')
                .update({ status })
                .eq('id', orderId)
                .select()
                .single();

            if (error) throw error;
            await fetchOrders(); // Refresh list
            return data;
        } finally {
            setLoading(false);
        }
    };

    const updatePaymentStatus = async (orderId, paymentStatus) => {
        setLoading(true);
        try {
            const updates = { payment_status: paymentStatus };
            if (paymentStatus === 'success') {
                updates.status = 'paid';
            }

            const { data, error } = await supabase
                .from('orders')
                .update(updates)
                .eq('id', orderId)
                .select()
                .single();

            if (error) throw error;
            await fetchOrders(); // Refresh list
            return data;
        } finally {
            setLoading(false);
        }
    };

    const fetchDashboardStats = async (period = 'All') => {
        try {
            // 1. Fetch orders (no relations to avoid PGRST schema error)
            const { data: allOrders, error: ordersError } = await supabase
                .from('orders')
                .select('id, total, status, payment_status, created_at, order_number');

            if (ordersError) throw ordersError;

            // Determine time cutoff based on period
            const now = new Date();
            let cutoffDate = null;
            if (period === '24H') cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            else if (period === '7D') cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            else if (period === '30D') cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

            // Filter orders based on the selected period
            const filteredOrders = cutoffDate
                ? allOrders.filter(o => new Date(o.created_at) >= cutoffDate)
                : allOrders;

            // 2. Calculations based on filteredOrders
            const totalRevenue = filteredOrders
                .reduce((sum, o) => sum + parseFloat(o.total || 0), 0);

            const totalOrders = filteredOrders.length;
            const pendingOrders = filteredOrders.filter((o) => o.status === 'pending').length;
            const completedOrders = filteredOrders.filter((o) => o.status === 'delivered').length;

            const revenueByDay = allOrders
                .filter((o) => o.payment_status === 'success')
                .reduce((acc, o) => {
                    const day = o.created_at.slice(0, 10);
                    acc[day] = (acc[day] || 0) + parseFloat(o.total);
                    acc[day] = parseFloat(acc[day].toFixed(2));
                    return acc;
                }, {});

            // 3. Status counts
            const statusCounts = filteredOrders.reduce((acc, o) => {
                acc[o.status] = (acc[o.status] || 0) + 1;
                return acc;
            }, {});

            // 4. Recent Orders (Top 5)
            const recentOrders = [...filteredOrders]
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .slice(0, 5);

            // 5. Top Products (Aggregate from all order items)
            // Need to fetch order_items for filtered orders to get accurate top products
            const orderIds = filteredOrders.map(o => o.id);
            let productAgg = {};

            if (orderIds.length > 0) {
                const { data: itemsData } = await supabase
                    .from('order_items')
                    .select('product_name, quantity')
                    .in('order_id', orderIds);

                (itemsData || []).forEach(item => {
                    if (!productAgg[item.product_name]) {
                        productAgg[item.product_name] = { name: item.product_name, count: 0 };
                    }
                    productAgg[item.product_name].count += item.quantity;
                });
            }

            const totalItemsSold = Object.values(productAgg).reduce((sum, p) => sum + p.count, 0) || 1;
            const topProducts = Object.values(productAgg)
                .sort((a, b) => b.count - a.count)
                .slice(0, 4)
                .map(p => ({
                    name: p.name,
                    vol: `${p.count} sold`,
                    percent: Math.round((p.count / totalItemsSold) * 100)
                }));

            // 6. Total Customers
            let customersQuery = supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })
                .eq('role', 'guest');

            if (cutoffDate) {
                customersQuery = customersQuery.gte('created_at', cutoffDate.toISOString());
            }

            const { count: totalCustomers } = await customersQuery;

            return {
                totalRevenue,
                totalOrders,
                pendingOrders,
                completedOrders,
                revenueByDay,
                statusCounts,
                recentOrders,
                topProducts,
                totalCustomers: totalCustomers || 0
            };
        } catch (err) {
            console.error('Error fetching dashboard stats:', err.message);
            return null;
        }
    };

    return {
        orders,
        loading,
        error,
        totalCount,
        totalPages: Math.ceil(totalCount / (options.limit || 10)),
        fetchOrders,
        updateOrderStatus,
        updatePaymentStatus,
        fetchDashboardStats,
    };
};
