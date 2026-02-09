import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Star, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import ProductPreviewModal from './ProductPreviewModal';

const ShopProductCard = ({ product, delay = 0 }) => {
    const { addToCart, openPreview } = useCart();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="group"
        >
            <div className="bg-[#EBE5D5] rounded-3xl p-1.5 flex flex-col relative group hover:shadow-2xl transition-all duration-500 h-full">

                {/* Header: Name & Arrow */}
                <div className="flex justify-between items-center mb-0.5 px-5 pt-4 pb-2">
                    <span className="text-primary-dark font-bold text-sm tracking-wide">
                        ({product.name})
                    </span>
                    <button className="bg-white rounded-full p-2 shadow-sm transform group-hover:rotate-45 transition-transform duration-500">
                        <ArrowUpRight size={18} className="text-primary-dark" />
                    </button>
                </div>

                {/* Main White Container */}
                <div className="bg-white rounded-[24px] w-full flex-grow flex flex-col items-center p-4 relative">

                    {/* Status Badge */}
                    {product.badge && (
                        <div className={`absolute top-6 left-6 px-4 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest z-10 text-white shadow-sm ${product.badge === 'Sold Out' ? 'bg-stone-400' :
                            product.badge === 'Sales' ? 'bg-green-600' : 'bg-gold'
                            }`}>
                            {product.badge}
                        </div>
                    )}

                    {/* Image Area */}
                    <div className="w-full aspect-square flex items-center justify-center mb-2 overflow-hidden rounded-2xl relative group/img">
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                        />

                        {/* Hover Overlay with Icons */}
                        <div className="absolute inset-0 bg-primary-dark/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => addToCart(product)}
                                className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary-dark hover:bg-gold hover:text-white transition-all duration-300 shadow-xl"
                                title="Add to Cart"
                            >
                                <ShoppingCart size={20} />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => openPreview(product)}
                                className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary-dark hover:bg-gold hover:text-white transition-all duration-300 shadow-xl"
                                title="Quick Preview"
                            >
                                <Eye size={20} />
                            </motion.button>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="text-center mt-auto w-full pb-1">
                        {/* Rating */}
                        <div className="flex justify-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill="#425043" className="text-primary-dark" />
                            ))}
                        </div>

                        {/* Name (Gold) */}
                        <h3 className="font-serif text-gold font-bold text-xl mb-2 leading-tight">
                            ({product.name})
                        </h3>

                        {/* Price */}
                        <p className="text-stone-600 font-bold text-base tracking-wide">
                            Ghs. {product.price.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ShopProductCard;
