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
            const { data, error } = await supabase
                .from('orders')
                .select('*, order_items(*)')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [user]);

    const fetchOrderById = useCallback(async (orderId) => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*, order_items(*)')
                .eq('id', orderId)
                .single();

            if (error) throw error;
            return data;
        } catch (err) {
            console.error('Error fetching order:', err.message);
            return null;
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
        fetchOrders();
    }, [fetchOrders]);

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
        limit = 10
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
                .select(`
                    *,
                    profiles (full_name, email, phone),
                    order_items (*)
                `, { count: 'exact' });

            if (currentOptions.status) {
                query = query.eq('status', currentOptions.status);
            }

            query = query.order('created_at', { ascending: false });

            const from = ((currentOptions.page || 1) - 1) * (currentOptions.limit || 10);
            const to = from + (currentOptions.limit || 10) - 1;
            query = query.range(from, to);

            const { data, error: fetchError, count } = await query;
            if (fetchError) throw fetchError;

            setOrders(data || []);
            setTotalCount(count || 0);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching admin orders:', err.message);
        } finally {
            setLoading(false);
        }
    }, [options.status, options.page, options.limit]);

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

    const fetchDashboardStats = async () => {
        try {
            // 1. Fetch orders and order_items for stats
            const { data: allOrders, error: ordersError } = await supabase
                .from('orders')
                .select('id, total, status, payment_status, created_at, order_number, order_items(*)');

            if (ordersError) throw ordersError;

            // 2. Calculations
            const totalRevenue = allOrders
                .filter((o) => o.payment_status === 'success')
                .reduce((sum, o) => sum + parseFloat(o.total), 0);

            const totalOrders = allOrders.length;
            const pendingOrders = allOrders.filter((o) => o.status === 'pending').length;
            const completedOrders = allOrders.filter((o) => o.status === 'delivered').length;

            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            const revenueByDay = allOrders
                .filter((o) => o.payment_status === 'success' && new Date(o.created_at) >= thirtyDaysAgo)
                .reduce((acc, o) => {
                    const day = o.created_at.slice(0, 10);
                    acc[day] = (acc[day] || 0) + parseFloat(o.total);
                    acc[day] = parseFloat(acc[day].toFixed(2));
                    return acc;
                }, {});

            // 3. Status counts
            const statusCounts = allOrders.reduce((acc, o) => {
                acc[o.status] = (acc[o.status] || 0) + 1;
                return acc;
            }, {});

            // 4. Recent Orders (Top 5)
            const recentOrders = [...allOrders]
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .slice(0, 5);

            // 5. Top Products (Aggregate from all order items)
            const productAgg = {};
            allOrders.forEach(order => {
                order.order_items?.forEach(item => {
                    if (!productAgg[item.product_name]) {
                        productAgg[item.product_name] = { name: item.product_name, count: 0 };
                    }
                    productAgg[item.product_name].count += item.quantity;
                });
            });

            const topProducts = Object.values(productAgg)
                .sort((a, b) => b.count - a.count)
                .slice(0, 3)
                .map(p => ({
                    name: p.name,
                    vol: `${p.count} sold`,
                    percent: Math.min(100, Math.round((p.count / (allOrders.reduce((acc, o) => acc + (o.order_items?.length || 0), 0) || 1)) * 300)) // Scaled logic for display
                }));

            // 6. Total Customers
            const { count: totalCustomers } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })
                .eq('role', 'guest');

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
