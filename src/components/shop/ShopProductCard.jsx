import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import StarRating from './StarRating';

const ShopProductCard = ({ product, delay = 0 }) => {
    const { addToCart, openPreview } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);
    const price = typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0;

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
                    <Link to={`/product/${product.slug}`} className="text-primary-dark font-bold text-sm tracking-wide line-clamp-1 hover:text-gold transition-colors">
                        ({product.name})
                    </Link>
                    <Link to={`/product/${product.slug}`} className="bg-white rounded-full p-2 shadow-sm transform group-hover:rotate-45 transition-transform duration-500">
                        <ArrowUpRight size={18} className="text-primary-dark" />
                    </Link>
                </div>

                {/* Main White Container */}
                <div className="bg-white rounded-[24px] w-full grow flex flex-col items-center p-4 relative">

                    {/* Status Badge */}
                    {product.badge && (
                        <div className={`absolute top-6 left-6 px-4 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest z-10 text-white shadow-sm ${product.badge === 'Sold Out' ? 'bg-stone-400' :
                            product.badge === 'Sales' ? 'bg-green-600' : 'bg-gold'
                            }`}>
                            {product.badge}
                        </div>
                    )}

                    {/* Wishlist Button */}
                    <button
                        onClick={() => toggleWishlist(product)}
                        className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all z-20 shadow-sm ${isWishlisted ? 'bg-gold text-white' : 'bg-white text-stone-400 hover:text-gold'
                            }`}
                    >
                        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>

                    {/* Image Area */}
                    <div className="w-full aspect-square flex items-center justify-center mb-2 overflow-hidden rounded-2xl relative group/img">
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-contain"
                            crossOrigin="anonymous"
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
                        <div className="flex flex-col items-center gap-1 mb-2">
                            <StarRating
                                rating={product.average_rating || 0}
                                size={14}
                                className="justify-center"
                            />
                            {product.review_count > 0 && (
                                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                                    ({product.review_count} {product.review_count === 1 ? 'Review' : 'Reviews'})
                                </span>
                            )}
                        </div>

                        <Link to={`/product/${product.slug}`}>
                            <h3 className="font-serif text-gold font-bold text-xl mb-2 leading-tight line-clamp-1 px-4 hover:scale-105 transition-transform">
                                ({product.name})
                            </h3>
                        </Link>

                        {/* Price */}
                        <p className="text-stone-600 font-bold text-base tracking-wide">
                            Ghs. {price.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ShopProductCard;

