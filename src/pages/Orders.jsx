import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package,
    ChevronRight,
    Calendar,
    CreditCard,
    Truck,
    CheckCircle2,
    Clock,
    X,
    ArrowLeft,
    ExternalLink,
    Search
} from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const StatusBadge = ({ status }) => {
    const statusConfig = {
        'processing': { color: 'bg-blue-50 text-blue-500 border-blue-100', icon: Clock, label: 'Processing' },
        'shipped': { color: 'bg-orange-50 text-orange-500 border-orange-100', icon: Truck, label: 'Dispatched' },
        'delivered': { color: 'bg-green-50 text-green-500 border-green-100', icon: CheckCircle2, label: 'Fulfilled' },
        'cancelled': { color: 'bg-red-50 text-red-500 border-red-100', icon: X, label: 'Voided' },
        'pending': { color: 'bg-stone-50 text-stone-400 border-stone-100', icon: Clock, label: 'Awaiting' },
    };

    const config = statusConfig[status.toLowerCase()] || statusConfig['pending'];
    const Icon = config.icon;

    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${config.color} text-[10px] font-black uppercase tracking-widest`}>
            <Icon size={12} />
            {config.label}
        </div>
    );
};

const OrderRow = ({ order, onClick, delay }) => (
    <motion.tr
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        onClick={() => onClick(order)}
        className="group cursor-pointer"
    >
        <td className="px-8 py-8 bg-white border-b border-stone-50 group-hover:bg-linear-to-r group-hover:from-gold/5 group-hover:to-transparent transition-all rounded-l-4xl">
            <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-primary-dark font-black font-mono border border-stone-100 group-hover:bg-white group-hover:shadow-lg transition-all">
                    #{order.order_number.split('-').pop()}
                </div>
                <div>
                    <p className="text-sm font-black text-primary-dark tracking-tight">{order.order_number}</p>
                    <div className="flex items-center gap-2 mt-1 text-stone-400">
                        <Calendar size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                            {new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                    </div>
                </div>
            </div>
        </td>
        <td className="px-8 py-8 bg-white border-b border-stone-50 group-hover:bg-stone-50/50 transition-colors">
            <p className="text-sm font-black text-primary-dark">GHS {parseFloat(order.total).toFixed(2)}</p>
            <p className="text-[10px] font-bold text-stone-300 uppercase tracking-widest mt-1">{order.order_items?.length} Rituals</p>
        </td>
        <td className="px-8 py-8 bg-white border-b border-stone-50 group-hover:bg-stone-50/50 transition-colors">
            <StatusBadge status={order.status} />
        </td>
        <td className="px-8 py-8 bg-white border-b border-stone-50 group-hover:bg-stone-50 transition-colors rounded-r-4xl text-right">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-stone-100 text-stone-300 group-hover:border-gold group-hover:text-gold transition-all">
                <ChevronRight size={18} />
            </div>
        </td>
    </motion.tr>
);

const Orders = () => {
    const { user, loading: authLoading } = useAuth();
    const { orders, loading: ordersLoading } = useOrders();
    const navigate = useNavigate();
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!authLoading && !user) {
            navigate('/profile');
        }
    }, [user, authLoading, navigate]);

    if (authLoading || (ordersLoading && orders.length === 0)) {
        return (
            <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
                <p className="text-stone-400 font-bold uppercase tracking-widest text-[10px]">Retrieving your ledger...</p>
            </div>
        );
    }

    return (
        <div className="bg-cream min-h-screen">
            <main className="pt-36 pb-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-12 h-[2px] bg-gold"></span>
                                    <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">Purchase History</span>
                                </div>
                                <h1 className="text-5xl font-heading font-black text-primary-dark tracking-tight">Client Ledger</h1>
                                <p className="text-stone-500 mt-4 max-w-md">A meticulous record of your acquired rituals and organic investments.</p>
                            </div>
                            <Link
                                to="/shop"
                                className="bg-white border border-stone-100 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-primary-dark hover:border-gold transition-all shadow-sm flex items-center gap-3"
                            >
                                <Package size={16} /> Acquire More
                            </Link>
                        </div>

                        {orders.length === 0 ? (
                            <div className="bg-white rounded-[3rem] p-20 text-center border border-stone-100 shadow-xl shadow-stone-200/20">
                                <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-8 text-stone-300">
                                    <Search size={32} />
                                </div>
                                <h2 className="text-2xl font-heading font-bold text-primary-dark mb-4">No Records Found</h2>
                                <p className="text-stone-400 mb-10">Your collection is currently empty. Start your first ritual today.</p>
                                <Link to="/shop" className="bg-gold text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gold-dark transition-all shadow-xl shadow-gold/20 inline-block">
                                    Explore the Garden
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full border-separate border-spacing-y-4">
                                    <thead>
                                        <tr>
                                            <th className="px-8 pb-4 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] text-left">Reference</th>
                                            <th className="px-8 pb-4 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] text-left">Valuation</th>
                                            <th className="px-8 pb-4 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] text-left">Status</th>
                                            <th className="px-8 pb-4 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order, idx) => (
                                            <OrderRow
                                                key={order.id}
                                                order={order}
                                                onClick={setSelectedOrder}
                                                delay={idx * 0.05}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Order Detail Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-primary-dark/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] flex flex-col max-h-[90vh]"
                        >
                            <div className="h-2 bg-linear-to-r from-gold via-gold-dark to-gold" />

                            <div className="p-10 md:p-12 overflow-y-auto">
                                <div className="flex justify-between items-start mb-12">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-[10px] font-black text-gold uppercase tracking-widest">Transaction Snapshot</span>
                                            <StatusBadge status={selectedOrder.status} />
                                        </div>
                                        <h2 className="text-3xl font-heading font-black text-primary-dark uppercase tracking-tighter">{selectedOrder.order_number}</h2>
                                    </div>
                                    <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-400 hover:bg-gold hover:text-white transition-all shadow-sm"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                                    {/* Items List */}
                                    <div className="space-y-6">
                                        <h3 className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] pb-4 border-b border-stone-100">Inventory Manifest</h3>
                                        <div className="space-y-4">
                                            {selectedOrder.order_items?.map(item => (
                                                <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100/50">
                                                    <div className="w-16 h-16 bg-white rounded-xl shrink-0 p-1 border border-stone-100 shadow-sm">
                                                        <img src={item.product_image} alt="" className="w-full h-full object-contain" />
                                                    </div>
                                                    <div className="grow">
                                                        <p className="text-sm font-black text-primary-dark">{item.product_name}</p>
                                                        <p className="text-[10px] font-bold text-stone-400 mt-1 uppercase tracking-widest">{item.quantity} x GHS {item.unit_price.toFixed(2)}</p>
                                                    </div>
                                                    <div className="text-right self-center">
                                                        <p className="text-sm font-black text-primary-dark">GHS {item.total_price.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Summary & Shipping */}
                                    <div className="space-y-8">
                                        <section>
                                            <h3 className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] pb-4 border-b border-stone-100 mb-6">Dispatch Coordinates</h3>
                                            <div className="p-6 rounded-3xl bg-white border border-stone-100 shadow-xl shadow-stone-100/20">
                                                <p className="text-sm font-black text-primary-dark mb-1">{selectedOrder.shipping_name}</p>
                                                <p className="text-xs text-stone-500 mb-1">{selectedOrder.shipping_address}</p>
                                                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{selectedOrder.shipping_city}, {selectedOrder.shipping_region}</p>
                                                <div className="mt-4 pt-4 border-t border-stone-50 flex items-center gap-2 text-stone-400">
                                                    <Clock size={14} className="text-gold" />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest">Ordered {new Date(selectedOrder.created_at).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </section>

                                        <section>
                                            <h3 className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] pb-4 border-b border-stone-100 mb-6">Fiscal Consolidation</h3>
                                            <div className="p-8 bg-primary-dark rounded-3xl text-white shadow-2xl shadow-primary-dark/20 relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mt-16 -mr-16" />
                                                <div className="space-y-3 relative z-10">
                                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                                                        <span>Raw Valuation</span>
                                                        <span>GHS {parseFloat(selectedOrder.subtotal).toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                                                        <span>Logistics</span>
                                                        <span>GHS {parseFloat(selectedOrder.shipping_fee).toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-2xl font-black font-heading tracking-tighter pt-4 border-t border-white/10 mt-2">
                                                        <span className="text-gold">TOTAL</span>
                                                        <span>OC {parseFloat(selectedOrder.total).toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button className="flex-1 bg-white border border-stone-200 text-stone-400 font-black py-5 rounded-2xl hover:bg-stone-50 hover:text-stone-600 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-3">
                                        Print Invoice
                                    </button>
                                    <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="grow bg-primary-dark text-white font-black py-5 rounded-2xl hover:bg-gold hover:text-primary-dark transition-all uppercase tracking-widest text-[10px] shadow-xl shadow-primary-dark/10"
                                    >
                                        Seal Transaction
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Orders;
