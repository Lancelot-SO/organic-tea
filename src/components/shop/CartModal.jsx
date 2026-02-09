import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CartModal = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart, isCartOpen, setIsCartOpen } = useCart();

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.98,
            transition: { duration: 0.2 }
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                damping: 25,
                stiffness: 400
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: i => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.1 + (i * 0.05),
                duration: 0.3
            }
        })
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    {/* Minimal Backdrop */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={overlayVariants}
                        onClick={() => setIsCartOpen(false)}
                        className="absolute inset-0 bg-primary-dark/40 backdrop-blur-[4px]"
                    />

                    {/* Modal Content - Clear & Minimalist */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={modalVariants}
                        className="relative w-full max-w-xl bg-white rounded-[32px] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.2)] flex flex-col max-h-[85vh] border border-stone-100"
                    >
                        {/* Header */}
                        <div className="px-8 py-6 flex items-center justify-between border-b border-stone-50">
                            <div>
                                <h2 className="text-2xl font-black text-primary-dark tracking-tight">
                                    Shopping Bag
                                </h2>
                                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-0.5">
                                    {cartCount} Items Selected
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                {cartItems.length > 0 && (
                                    <button
                                        onClick={clearCart}
                                        className="text-[10px] font-bold text-red-400 hover:text-red-600 uppercase tracking-widest transition-colors"
                                    >
                                        Clear All
                                    </button>
                                )}
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="p-2 hover:bg-stone-50 text-stone-400 hover:text-primary-dark rounded-full transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Cart Items List */}
                        <div className="flex-grow overflow-y-auto px-8 py-2 space-y-3 custom-scrollbar">
                            {cartItems.length === 0 ? (
                                <div className="py-20 flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mb-4 text-stone-200">
                                        <ShoppingBag size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-primary-dark mb-1">Your bag is empty</h3>
                                    <p className="text-stone-400 text-sm mb-6">Explore our curated tea selections</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="text-gold font-bold text-xs tracking-widest uppercase hover:underline"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                cartItems.map((item, i) => (
                                    <motion.div
                                        key={item.id}
                                        custom={i}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="flex items-center gap-4 py-4 border-b border-stone-50 last:border-0"
                                    >
                                        <div className="w-16 h-16 bg-cream/30 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                                        </div>

                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-primary-dark text-md">
                                                    {item.name}
                                                </h3>
                                                <p className="font-black text-primary-dark text-sm">
                                                    GHS {(item.price * item.quantity).toFixed(0)}
                                                </p>
                                            </div>

                                            <div className="flex justify-between items-center mt-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center border border-stone-100 rounded-lg overflow-hidden">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="p-1 px-2 hover:bg-stone-50 transition-colors"
                                                        >
                                                            <Minus size={12} strokeWidth={3} />
                                                        </button>
                                                        <span className="px-2 text-xs font-bold text-primary-dark">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-1 px-2 hover:bg-stone-50 transition-colors"
                                                        >
                                                            <Plus size={12} strokeWidth={3} />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-[10px] font-bold text-stone-300 hover:text-red-500 uppercase tracking-widest transition-colors"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Summary Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-8 pb-10 border-t border-stone-50">
                                <div className="flex justify-between items-baseline mb-6">
                                    <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Grand Total</p>
                                    <p className="text-3xl font-black text-primary-dark">
                                        <span className="text-sm font-bold text-gold mr-1">GHS</span>
                                        {cartTotal.toFixed(0)}
                                    </p>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="w-full bg-primary-dark hover:bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-primary-dark/10"
                                    onClick={() => console.log('Checkout')}
                                >
                                    <span className="text-xs font-black tracking-widest uppercase">Proceed to Checkout</span>
                                    <ArrowRight size={16} />
                                </motion.button>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CartModal;
