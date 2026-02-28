import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package,
    ChevronRight,
    Calendar,
    Truck,
    CheckCircle2,
    Clock,
    X,
    Search,
    ArrowLeft
} from 'lucide-react';
import { useOrders } from '../../hooks/useOrders';
import { useAuth } from '../../context/AuthContext';

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
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${config.color} text-[9px] font-black uppercase tracking-widest`}>
            <Icon size={10} />
            {config.label}
        </div>
    );
};

const GuestDashboardOrders = () => {
    const { orders, loading } = useOrders();
    const [selectedOrder, setSelectedOrder] = useState(null);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="w-12 h-[2px] bg-gold"></span>
                        <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">Purchase History</span>
                    </div>
                    <h1 className="text-3xl font-heading font-black text-primary-dark tracking-tight">My Tea Ledger</h1>
                    <p className="text-stone-500 mt-2 text-sm max-w-md">A record of your premium organic tea investments.</p>
                </div>
            </div>

            {loading && orders.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center gap-4 bg-white rounded-4xl border border-stone-100 shadow-sm">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
                    <p className="text-stone-400 font-bold uppercase tracking-widest text-[9px]">Analyzing ledger...</p>
                </div>
            ) : orders.length === 0 ? (
                <div className="bg-white rounded-4xl p-16 text-center border border-stone-100 shadow-xl shadow-stone-200/10">
                    <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-300">
                        <Package size={28} />
                    </div>
                    <h2 className="text-xl font-heading font-bold text-primary-dark mb-3">No Records Yet</h2>
                    <p className="text-sm text-stone-400 mb-8">You haven't made any acquisitions yet. Start your journey in the garden.</p>
                    <a href="/shop" className="bg-gold text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gold-dark transition-all shadow-lg shadow-gold/20 inline-block font-sans">
                        Visit Shop
                    </a>
                </div>
            ) : (
                <div className="bg-white rounded-4xl border border-stone-100 shadow-xl shadow-stone-200/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-stone-50">
                                    <th className="px-8 py-6 text-[9px] font-black text-stone-300 uppercase tracking-[0.2em]">Order Ref</th>
                                    <th className="px-8 py-6 text-[9px] font-black text-stone-300 uppercase tracking-[0.2em]">Date</th>
                                    <th className="px-8 py-6 text-[9px] font-black text-stone-300 uppercase tracking-[0.2em]">Total</th>
                                    <th className="px-8 py-6 text-[9px] font-black text-stone-300 uppercase tracking-[0.2em]">Status</th>
                                    <th className="px-8 py-6 text-[9px] font-black text-stone-300 uppercase tracking-[0.2em] text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, idx) => (
                                    <motion.tr
                                        key={order.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="border-b border-stone-50 last:border-0 hover:bg-stone-50/50 transition-colors group cursor-pointer"
                                        onClick={() => setSelectedOrder(order)}
                                    >
                                        <td className="px-8 py-6">
                                            <span className="text-sm font-black text-primary-dark font-mono">#{order.order_number.split('-').pop()}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-stone-500">
                                                <Calendar size={12} className="text-stone-300" />
                                                <span className="text-xs font-semibold">
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-black text-primary-dark">GHS {parseFloat(order.total).toFixed(2)}</td>
                                        <td className="px-8 py-6">
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-stone-100 text-stone-300 group-hover:border-gold group-hover:text-gold transition-all">
                                                <ChevronRight size={14} />
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Order Detail Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 lg:p-8 overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedOrder(null)}
                            className="absolute inset-0 bg-primary-dark/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-4xl rounded-4xl overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[90vh]"
                        >
                            <div className="h-1.5 bg-linear-to-r from-gold via-gold-dark to-gold" />

                            <div className="p-8 lg:p-12 overflow-y-auto custom-scrollbar">
                                <div className="flex justify-between items-start mb-10">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[9px] font-black text-gold uppercase tracking-widest">Transaction Snapshot</span>
                                            <StatusBadge status={selectedOrder.status} />
                                        </div>
                                        <h2 className="text-2xl font-heading font-black text-primary-dark uppercase tracking-tighter">Order #{selectedOrder.order_number}</h2>
                                    </div>
                                    <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center text-stone-400 hover:bg-gold hover:text-white transition-all shadow-sm"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                    {/* Items Manifest */}
                                    <div className="space-y-6">
                                        <h3 className="text-[9px] font-black text-stone-300 uppercase tracking-[0.2em] pb-3 border-b border-stone-100">Inventory Manifest</h3>
                                        <div className="space-y-3">
                                            {selectedOrder.order_items?.map(item => (
                                                <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-stone-50/50 border border-stone-100/30">
                                                    <div className="w-14 h-14 bg-white rounded-xl shrink-0 p-1.5 border border-stone-100 shadow-sm">
                                                        <img src={item.product_image} alt="" className="w-full h-full object-contain" />
                                                    </div>
                                                    <div className="grow flex flex-col justify-center">
                                                        <p className="text-xs font-black text-primary-dark">{item.product_name}</p>
                                                        <p className="text-[9px] font-bold text-stone-400 mt-1 uppercase tracking-widest">{item.quantity} x GHS {item.unit_price.toFixed(2)}</p>
                                                    </div>
                                                    <div className="text-right self-center">
                                                        <p className="text-xs font-black text-primary-dark">GHS {item.total_price.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Summary & Logistics */}
                                    <div className="space-y-8">
                                        <section>
                                            <h3 className="text-[9px] font-black text-stone-300 uppercase tracking-[0.2em] pb-3 border-b border-stone-100 mb-5">Dispatch Coordinates</h3>
                                            <div className="p-6 rounded-2xl bg-white border border-stone-100 shadow-sm">
                                                <p className="text-xs font-black text-primary-dark mb-1">{selectedOrder.shipping_name}</p>
                                                <p className="text-xs text-stone-500 mb-1 leading-relaxed">{selectedOrder.shipping_address}</p>
                                                <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">{selectedOrder.shipping_city}, {selectedOrder.shipping_region}</p>
                                            </div>
                                        </section>

                                        <section>
                                            <h3 className="text-[9px] font-black text-stone-300 uppercase tracking-[0.2em] pb-3 border-b border-stone-100 mb-5">Fiscal Consolidation</h3>
                                            <div className="p-6 rounded-2xl bg-primary-dark text-white relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mt-12 -mr-12" />
                                                <div className="space-y-3 relative z-10">
                                                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-white/40">
                                                        <span>Subtotal</span>
                                                        <span>GHS {parseFloat(selectedOrder.subtotal).toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-white/40">
                                                        <span>Shipping</span>
                                                        <span>GHS {parseFloat(selectedOrder.shipping_fee).toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-xl font-black tracking-tighter pt-3 border-t border-white/10 mt-2">
                                                        <span className="text-gold uppercase text-[10px] tracking-widest">Total</span>
                                                        <span>GHS {parseFloat(selectedOrder.total).toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>

                                <div className="mt-10 flex gap-4">
                                    <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="grow bg-primary-dark text-white font-black py-4 rounded-xl hover:bg-gold hover:text-primary-dark transition-all uppercase tracking-widest text-[9px] shadow-lg shadow-primary-dark/10"
                                    >
                                        Close Ledger
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

export default GuestDashboardOrders;
