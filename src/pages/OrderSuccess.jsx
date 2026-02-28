import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link, Navigate } from 'react-router-dom';
import {
    CheckCircle2,
    Package,
    ArrowRight,
    ArrowLeft,
    MapPin,
    CreditCard,
    Truck,
    Calendar,
    Hash,
    User,
    Phone,
} from 'lucide-react';

const PAYMENT_LABELS = {
    paystack: { label: 'Debit Card', sub: 'Paystack Secure' },
    momo: { label: 'Mobile Money', sub: 'MTN / Telecel / AT' },
    cash_on_delivery: { label: 'Cash on Delivery', sub: 'Pay on Arrival' },
};

const OrderSuccess = () => {
    const location = useLocation();
    const state = location.state || {};
    const { orderNumber, items = [], subtotal, shippingFee, total, shippingInfo, paymentMethod } = state;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!orderNumber) {
        return <Navigate to="/shop" replace />;
    }

    const payment = PAYMENT_LABELS[paymentMethod] || { label: paymentMethod, sub: '' };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-cream">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">

                    {/* Header Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-[4rem] p-12 md:p-16 text-center border border-stone-100 shadow-2xl shadow-stone-200/40 relative overflow-hidden mb-8"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -mt-32 -mr-32 blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full -mb-32 -ml-32 blur-3xl" />

                        <div className="relative z-10">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                                className="w-24 h-24 bg-linear-to-br from-gold to-gold-dark rounded-[2.5rem] flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-gold/20"
                            >
                                <CheckCircle2 size={48} />
                            </motion.div>

                            <div className="inline-flex items-center gap-2 mb-4 bg-stone-50 px-4 py-2 rounded-full border border-stone-100">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Order Ritual Manifested</span>
                            </div>
                            <h1 className="text-5xl font-heading font-black text-primary-dark tracking-tight mb-4">Ceremony Confirmed</h1>
                            <p className="text-stone-500 max-w-lg mx-auto text-base">Your ritual selection has been documented in our ledger. Our tea artisans are now preparing your organic investment for dispatch.</p>
                        </div>
                    </motion.div>

                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">

                        {/* Order Meta */}
                        <motion.div variants={itemVariants} className="bg-white rounded-[3rem] p-8 md:p-10 border border-stone-100 shadow-xl shadow-stone-200/20">
                            <h2 className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] mb-8">Order Details</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center text-gold border border-stone-100 shadow-sm shrink-0">
                                        <Hash size={17} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-1">Reference</p>
                                        <p className="text-sm font-black text-primary-dark font-mono">{orderNumber}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center text-gold border border-stone-100 shadow-sm shrink-0">
                                        <Calendar size={17} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-1">Date</p>
                                        <p className="text-sm font-black text-primary-dark">
                                            {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center text-gold border border-stone-100 shadow-sm shrink-0">
                                        <CreditCard size={17} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-1">Payment</p>
                                        <p className="text-sm font-black text-primary-dark">{payment.label}</p>
                                        <p className="text-[9px] font-bold text-stone-300 uppercase tracking-widest mt-0.5">{payment.sub}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Items Ordered */}
                        {items.length > 0 && (
                            <motion.div variants={itemVariants} className="bg-white rounded-[3rem] p-8 md:p-10 border border-stone-100 shadow-xl shadow-stone-200/20">
                                <h2 className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] mb-8">Items Ordered</h2>
                                <div className="space-y-5">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-5">
                                            <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center border border-stone-100 p-2 shrink-0">
                                                <img
                                                    src={item.image_url || item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="grow">
                                                <p className="text-sm font-black text-primary-dark">{item.name}</p>
                                                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-0.5">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="text-sm font-black text-primary-dark shrink-0">GHS {(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Totals */}
                                <div className="border-t border-stone-50 mt-8 pt-6 space-y-3">
                                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-stone-400">
                                        <span>Subtotal</span>
                                        <span>GHS {subtotal?.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-stone-400">
                                        <span>Shipping</span>
                                        <span>{shippingFee === 0 ? 'Complimentary' : `GHS ${shippingFee?.toFixed(2)}`}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline pt-3 border-t border-stone-100">
                                        <p className="text-sm font-black text-primary-dark uppercase tracking-widest">Total</p>
                                        <p className="text-3xl font-black text-primary-dark tracking-tighter">
                                            <span className="text-[10px] text-gold mr-1 uppercase">GHS</span>
                                            {total?.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Shipping Info */}
                        {shippingInfo && (
                            <motion.div variants={itemVariants} className="bg-white rounded-[3rem] p-8 md:p-10 border border-stone-100 shadow-xl shadow-stone-200/20">
                                <h2 className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] mb-8">Dispatch Logistics</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center text-gold border border-stone-100 shadow-sm shrink-0">
                                            <User size={16} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-1">Recipient</p>
                                            <p className="text-sm font-black text-primary-dark">{shippingInfo.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center text-gold border border-stone-100 shadow-sm shrink-0">
                                            <Phone size={16} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-1">Contact</p>
                                            <p className="text-sm font-black text-primary-dark">{shippingInfo.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 sm:col-span-2">
                                        <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center text-gold border border-stone-100 shadow-sm shrink-0">
                                            <MapPin size={16} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-1">Delivery Address</p>
                                            <p className="text-sm font-black text-primary-dark">
                                                {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.region}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* ETA Banner */}
                                <div className="mt-8 bg-stone-50 rounded-2xl p-5 flex items-center gap-4 border border-stone-100">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gold border border-stone-100 shadow-sm shrink-0">
                                        <Truck size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Estimated Arrival</p>
                                        <p className="text-sm font-black text-primary-dark mt-0.5">2 – 3 Business Days</p>
                                    </div>
                                    <div className="ml-auto text-[9px] font-black text-gold uppercase tracking-widest flex items-center gap-1.5">
                                        <Package size={12} /> Track Enabled
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* CTA Buttons */}
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                            <Link
                                to="/orders"
                                className="bg-primary-dark text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gold transition-all shadow-xl shadow-primary-dark/10 flex items-center justify-center gap-3"
                            >
                                View My Orders <ArrowRight size={16} />
                            </Link>
                            <Link
                                to="/shop"
                                className="bg-white border border-stone-100 text-stone-400 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:text-primary-dark hover:border-gold transition-all flex items-center justify-center gap-3"
                            >
                                <ArrowLeft size={16} /> Return to Garden
                            </Link>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
