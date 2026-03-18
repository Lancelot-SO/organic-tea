import React, { useState, useMemo } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    CreditCard,
    Truck,
    ShieldCheck,
    ArrowRight,
    MapPin,
    Phone as PhoneIcon,
    User,
    Mail,
    AlertCircle
} from 'lucide-react';
import PhoneInput from '../components/PhoneInput';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../hooks/useOrders';
import { usePaystackPayment } from 'react-paystack';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user, profile } = useAuth();
    const { createOrder, updatePaymentStatus } = useOrders();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);

    const [shippingInfo, setShippingInfo] = useState({
        name: profile?.full_name || '',
        phone: profile?.phone || '',
        email: user?.email || '',
        address: '',
        city: '',
        region: '',
        notes: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('paystack');

    if (cartItems.length === 0 && !isSuccess) {
        return <Navigate to="/shop" replace />;
    }

    // Authenticated wall removed for Guest Checkout

    const shippingFee = cartTotal >= 200 ? 0 : 15;
    const total = cartTotal + shippingFee;

    const paystackConfig = useMemo(() => ({
        reference: (new Date()).getTime().toString(),
        email: user?.email || shippingInfo.email,
        amount: Math.round(Number(total) * 100), // Ensure total is numeric and converted to pesewas
        publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        currency: 'GHS',
    }), [user?.email, shippingInfo.email, total]);


    const initializePaystack = usePaystackPayment(paystackConfig);

    const handleCheckout = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. Create the order in Supabase with 'pending' status
            const order = await createOrder({
                items: cartItems,
                shippingInfo,
                paymentMethod
            });

            if (paymentMethod === 'paystack' || paymentMethod === 'momo') {
                console.log('Initiating Paystack Payment for method:', paymentMethod);
                // 2. Trigger Paystack payment

                const onSuccess = async (reference) => {
                    try {
                        console.log('Payment Successful:', reference);
                        await updatePaymentStatus(order.id, 'success', reference.reference);
                        setIsSuccess(true);
                        clearCart();
                        navigate('/order-success', {
                            state: {
                                orderNumber: order.order_number,
                                items: cartItems,
                                subtotal: cartTotal,
                                shippingFee,
                                total,
                                shippingInfo,
                                paymentMethod,
                                orderId: order.id,
                            }
                        });
                    } catch (err) {
                        console.error('Error updating payment status:', err);
                        setError('Payment succeeded but we failed to update our records. Please contact support.');
                        setLoading(false);
                    }
                };

                const onClose = () => {
                    console.log('Payment Cancelled');
                    setLoading(false);
                    setError('Payment cancelled. You can retry from your ledger later.');
                };

                // Trigger the popup
                initializePaystack({ onSuccess, onClose });
            } else {
                // Cash on Delivery flow
                console.log('Processing Cash on Delivery');
                setIsSuccess(true);
                clearCart();
                navigate('/order-success', {
                    state: {
                        orderNumber: order.order_number,
                        items: cartItems,
                        subtotal: cartTotal,
                        shippingFee,
                        total,
                        shippingInfo,
                        paymentMethod,
                        orderId: order.id,
                    }
                });
            }
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-cream">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-stone-400 font-bold uppercase tracking-widest text-[10px] mb-8 hover:text-primary-dark transition-colors"
                    >
                        <ChevronLeft size={16} /> Return to Shop
                    </button>

                    <h1 className="text-5xl font-heading font-black text-primary-dark tracking-tight mb-12">Checkout Rite</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Form Section */}
                        <div className="lg:col-span-7 space-y-12">
                            <form onSubmit={handleCheckout} className="space-y-12">
                                {/* Shipping Logistics */}
                                <section className="bg-white p-10 rounded-[3rem] border border-stone-100 shadow-xl shadow-stone-200/20">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-12 h-12 bg-linear-to-br from-gold to-gold-dark rounded-2xl flex items-center justify-center text-white">
                                            <Truck size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-primary-dark font-heading">Dispatch Logistics</h2>
                                            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Where should your order arrive?</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest pl-1">Recipient Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-4 text-stone-300" size={18} />
                                                <input
                                                    required
                                                    type="text"
                                                    value={shippingInfo.name}
                                                    onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                                                    className="w-full bg-stone-50 border border-stone-100 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-primary-dark focus:outline-none focus:border-gold transition-all"
                                                    placeholder="Your Name"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest pl-1">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-4 text-stone-300" size={18} />
                                                <input
                                                    required
                                                    type="email"
                                                    value={shippingInfo.email}
                                                    onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                                                    className="w-full bg-stone-50 border border-stone-100 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-primary-dark focus:outline-none focus:border-gold transition-all"
                                                    placeholder="Your Email"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest pl-1">Phone Contact</label>
                                            <PhoneInput
                                                value={shippingInfo.phone}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                                                placeholder="+233 XX XXX XXXX"
                                                icon={<PhoneIcon size={18} className="text-stone-300" />}
                                                bgClass="bg-stone-50"
                                                className="border-stone-100"
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest pl-1">Arrival Coordinates (Address)</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-4 top-4 text-stone-300" size={18} />
                                                <input
                                                    required
                                                    type="text"
                                                    value={shippingInfo.address}
                                                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                                                    className="w-full bg-stone-50 border border-stone-100 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-primary-dark focus:outline-none focus:border-gold transition-all"
                                                    placeholder="Digital Address or Street Name"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest pl-1">City</label>
                                            <input
                                                required
                                                type="text"
                                                value={shippingInfo.city}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                                                className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 text-sm font-bold text-primary-dark focus:outline-none focus:border-gold transition-all"
                                                placeholder="Accra"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest pl-1">Region</label>
                                            <select
                                                required
                                                value={shippingInfo.region}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, region: e.target.value })}
                                                className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 text-sm font-bold text-primary-dark focus:outline-none focus:border-gold transition-all appearance-none"
                                            >
                                                <option value="">Select Region</option>
                                                <option value="Greater Accra">Greater Accra</option>
                                                <option value="Ashanti">Ashanti</option>
                                                <option value="Western">Western</option>
                                                <option value="Central">Central</option>
                                                <option value="Eastern">Eastern</option>
                                                <option value="Northern">Northern</option>
                                            </select>
                                        </div>
                                    </div>
                                </section>

                                {/* Payment Channels */}
                                <section className="bg-white p-10 rounded-[3rem] border border-stone-100 shadow-xl shadow-stone-200/20">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-12 h-12 bg-linear-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center text-white">
                                            <CreditCard size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-primary-dark font-heading">Payment Information</h2>
                                            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Select your preferred fiscal channel</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {[
                                            { id: 'paystack', label: 'Debit Card', info: 'Paystack Secure' },
                                            { id: 'momo', label: 'Mobile Money', info: 'MTN / Telecel / AT' },
                                            { id: 'cash_on_delivery', label: 'Cash / COD', info: 'Pay on Arrival' },
                                        ].map((method) => (
                                            <button
                                                key={method.id}
                                                type="button"
                                                onClick={() => setPaymentMethod(method.id)}
                                                className={`p-6 rounded-3xl border-2 text-left transition-all ${paymentMethod === method.id ? 'border-gold bg-gold/5 shadow-lg shadow-gold/5' : 'border-stone-50 hover:border-stone-100'}`}
                                            >
                                                <p className={`text-sm font-black mb-1 ${paymentMethod === method.id ? 'text-primary-dark' : 'text-stone-400'}`}>{method.label}</p>
                                                <p className="text-[9px] font-bold text-stone-300 uppercase tracking-widest">{method.info}</p>
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                {error && (
                                    <div className="bg-red-50 border border-red-100 p-6 rounded-3xl flex items-center gap-4 text-red-500 animate-in fade-in slide-in-from-top-2">
                                        <AlertCircle size={20} />
                                        <p className="text-sm font-bold">{error}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-primary-dark text-white p-6 rounded-3xl font-black text-md uppercase tracking-widest shadow-2xl shadow-primary-dark/20 flex items-center justify-center gap-4 hover:bg-gold transition-all disabled:opacity-50 group"
                                >
                                    {loading ? 'Manifesting Order...' : (
                                        <>
                                            Complete Order Rite <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Summary Section */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-32 space-y-6">
                                <div className="bg-white p-10 rounded-[3rem] border border-stone-100 shadow-xl shadow-stone-200/20 overflow-hidden relative">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mt-16 -mr-16" />

                                    <h3 className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] mb-8 relative z-10">Order Compendium</h3>

                                    <div className="space-y-6 mb-10 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2 relative z-10">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="flex gap-4">
                                                <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center border border-stone-100 p-2 shrink-0">
                                                    <img src={item.image_url} alt={item.name} className="w-full h-full object-contain" />
                                                </div>
                                                <div className="grow">
                                                    <p className="text-sm font-black text-primary-dark line-clamp-1">{item.name}</p>
                                                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">{item.quantity} Units</p>
                                                </div>
                                                <p className="text-sm font-black text-primary-dark">GHS {(item.price * item.quantity).toFixed(0)}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-4 pt-8 border-t border-stone-50 relative z-10">
                                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-stone-400">
                                            <span>Subtotal</span>
                                            <span>GHS {cartTotal.toFixed(0)}</span>
                                        </div>
                                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-stone-400">
                                            <span>Logistics (Shipping)</span>
                                            <span>{shippingFee === 0 ? 'COMPLIMENTARY' : `GHS ${shippingFee}`}</span>
                                        </div>
                                        <div className="flex justify-between items-baseline pt-4">
                                            <p className="text-sm font-black text-primary-dark uppercase tracking-widest">Total Valuation</p>
                                            <p className="text-4xl font-black text-primary-dark tracking-tighter">
                                                <span className="text-[10px] text-gold mr-1 uppercase">GHS</span>
                                                {total.toFixed(0)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-primary-dark p-8 rounded-[2.5rem] text-white flex items-center gap-6 shadow-xl shadow-primary-dark/10">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-gold">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-1">Secure Acquisition</p>
                                        <p className="text-xs text-white/60 font-medium">Encrypted fiscal channel for safe payment.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
