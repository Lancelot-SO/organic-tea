import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Star, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const ProductPreviewModal = () => {
    const { addToCart, isPreviewOpen, setIsPreviewOpen, previewProduct: product } = useCart();

    if (!product) return null;

    return (
        <AnimatePresence>
            {isPreviewOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsPreviewOpen(false)}
                        className="absolute inset-0 bg-primary-dark/40 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl bg-cream rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsPreviewOpen(false)}
                            className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-primary-dark hover:bg-gold hover:text-white transition-all duration-300 shadow-sm"
                        >
                            <X size={20} />
                        </button>

                        {/* Left: Image Section */}
                        <div className="md:w-1/2 bg-white p-8 md:p-12 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                                <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-gold rounded-full blur-[100px]" />
                                <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-primary rounded-full blur-[100px]" />
                            </div>
                            <motion.img
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                src={product.image}
                                alt={product.name}
                                className="w-full h-auto object-contain relative z-10 drop-shadow-2xl"
                            />
                        </div>

                        {/* Right: Details Section */}
                        <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
                            <div className="mb-6">
                                <span className="text-gold font-bold text-sm tracking-widest uppercase mb-2 block">Premium Collection</span>
                                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-3 leading-tight">
                                    {product.name}
                                </h2>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} fill="#B18A45" className="text-gold" />
                                        ))}
                                    </div>
                                    <span className="text-stone-400 text-sm font-medium">(48 Reviews)</span>
                                </div>
                                <p className="text-2xl font-bold text-primary-dark">Ghs. {product.price.toFixed(2)}</p>
                            </div>

                            <p className="text-stone-600 leading-relaxed mb-8">
                                Experience the pure essence of nature with our {product.name}.
                                Carefully selected and processed to retain maximum nutrients and flavor.
                                Perfect for your daily wellness ritual.
                            </p>

                            {/* Features Mini-Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                        <ShieldCheck size={20} className="text-primary" />
                                    </div>
                                    <span className="text-sm font-semibold text-primary-dark">Organic</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                        <Truck size={20} className="text-primary" />
                                    </div>
                                    <span className="text-sm font-semibold text-primary-dark">Fast Delivery</span>
                                </div>
                            </div>

                            <div className="mt-auto flex gap-4">
                                <button
                                    onClick={() => {
                                        addToCart(product);
                                        setIsPreviewOpen(false);
                                    }}
                                    className="flex-grow bg-gold hover:bg-gold-dark text-white font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-gold/20 hover:scale-[1.02] active:scale-95"
                                >
                                    <ShoppingCart size={20} />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProductPreviewModal;
