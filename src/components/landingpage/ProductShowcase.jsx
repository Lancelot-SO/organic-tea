import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { ArrowUpRight, Star, Loader2, ShoppingBag, ShoppingCart, Eye, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import FloatingLeaf from './FloatingLeaf';

const ProductCard = ({ product }) => {
    const { addToCart, openPreview } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);
    const price = typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0;

    return (
        <div className="bg-[#EBE5D5] rounded-3xl p-1.5 flex flex-col relative group hover:shadow-2xl transition-all duration-500 h-full">
            {/* Card Header: Name & Arrow */}
            <div className="flex justify-between items-center mb-0.5 px-5 pt-4 pb-2">
                <Link to={`/product/${product.slug}`} className="text-primary-dark font-bold text-sm tracking-wide line-clamp-1 hover:text-gold transition-colors">
                    {product.name}
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

                    {/* Hover Overlay with Cart & Preview Icons */}
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
                            <Star
                                key={i}
                                size={14}
                                fill={i < (product.rating || 5) ? "#425043" : "none"}
                                className={i < (product.rating || 5) ? "text-primary-dark" : "text-stone-200"}
                            />
                        ))}
                    </div>

                    <Link to={`/product/${product.slug}`}>
                        <h3 className="font-serif text-gold font-bold text-xl mb-2 leading-tight line-clamp-1 px-4 hover:scale-105 transition-transform">
                            {product.name}
                        </h3>
                    </Link>

                    {/* Price */}
                    <p className="text-stone-600 font-bold text-base tracking-wide">
                        Ghs. {price.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
};

const ProductShowcase = () => {
    const { products, loading } = useProducts({
        sortBy: 'sales_count',
        sortOrder: 'desc',
        limit: 6
    });
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (products.length > 0) {
            setProgress((1 / products.length) * 100);
        }
    }, [products]);

    return (
        <section className="section-padding bg-white overflow-hidden relative">
            {/* Botanical decorations */}
            <FloatingLeaf image="leaf1" side="right" className="top-6" rotate={-15} opacity={0.7} />
            <FloatingLeaf image="flower2" side="left" className="bottom-8" rotate={10} delay={300} opacity={0.75} size="w-24 h-24 md:w-32 md:h-32" />

            <div className="container mx-auto px-6">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row justify-between items-end mb-12"
                >
                    <div className="flex items-baseline gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#B89F70] shrink-0"></div>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#3F4E3C]">
                            Best <span className="font-serif italic text-[#B89F70] font-normal">Selling Teas</span>
                        </h2>
                    </div>

                    <a href="/shop" className="hidden md:flex items-center gap-2 text-stone-700 text-sm font-medium hover:text-[#B89F70] transition-colors">
                        View All Products
                        <ArrowUpRight size={16} />
                    </a>
                </motion.div>

                {/* Swiper Slider */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-8"
                >
                    {loading ? (
                        <div className="h-[400px] flex flex-col items-center justify-center gap-4 text-stone-300">
                            <Loader2 size={40} className="animate-spin text-gold" />
                            <p className="text-xs font-black uppercase tracking-widest text-stone-400">Loading Catalog</p>
                        </div>
                    ) : products.length > 0 ? (
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={24}
                            slidesPerView={1}
                            loop={products.length > 3}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            onSlideChange={(swiper) => {
                                const slideCount = products.length;
                                const calc = ((swiper.realIndex + 1) / slideCount) * 100;
                                setProgress(calc);
                            }}
                            breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                                1280: { slidesPerView: 4 }
                            }}
                            className="pb-4"
                        >
                            {products.map((product) => (
                                <SwiperSlide key={product.id} className="h-auto">
                                    <ProductCard product={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="h-[400px] flex flex-col items-center justify-center gap-4 bg-stone-50 rounded-[40px] border border-dashed border-stone-200">
                            <ShoppingBag size={48} className="text-stone-200" />
                            <p className="text-sm font-bold text-stone-400 uppercase tracking-widest">No best sellers curated yet</p>
                        </div>
                    )}
                </motion.div>

                {/* Custom Progress Bar */}
                {products.length > 0 && (
                    <div className="w-full h-1 bg-stone-200 rounded-full mt-8 overflow-hidden max-w-xs mx-auto">
                        <div
                            className="h-full bg-[#3F4E3C] transition-all duration-500 ease-out"
                            style={{ width: `${Math.max(20, progress)}%` }} // Min width for visibility
                        ></div>
                    </div>
                )}

                <div className="text-center mt-8 md:hidden">
                    <a href="/shop" className="inline-flex items-center gap-2 text-stone-700 font-medium hover:text-[#B89F70]">
                        View All Products <ArrowUpRight size={16} />
                    </a>
                </div>

            </div>
        </section>
    );
};

export default ProductShowcase;

