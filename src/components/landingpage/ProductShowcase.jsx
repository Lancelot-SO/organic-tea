import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { ArrowUpRight, Star, Loader2, ShoppingBag } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';

const ProductCard = ({ product }) => (
    <div className="bg-[#EBE5D5] rounded-3xl p-1 flex flex-col relative group hover:shadow-lg transition-all duration-300 h-full">
        {/* Card Header: Name & Arrow */}
        <div className="flex justify-between items-start mb-2 px-4 pt-4">
            <span className="text-primary-dark font-bold text-sm md:text-base tracking-wide truncate max-w-[80%]">
                {product.name}
            </span>
            <a
                href={`/product/${product.slug}`}
                className="bg-white rounded-full p-1.5 shadow-sm transform group-hover:rotate-45 transition-transform duration-300"
            >
                <ArrowUpRight size={16} className="text-stone-600" />
            </a>
        </div>

        {/* Unified White Container for Image & Info */}
        <div className="bg-white rounded-[20px] w-full grow flex flex-col items-center p-4">
            {/* Image */}
            <div className="w-full aspect-square flex items-center justify-center mb-2 overflow-hidden rounded-2xl">
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-contain rounded-2xl"
                    crossOrigin="anonymous"
                />
            </div>

            {/* Info */}
            <div className="text-center mt-auto w-full">
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill={i < Math.floor(product.rating || 5) ? "#3F4E3C" : "transparent"} className="text-primary-dark" />
                    ))}
                </div>

                {/* Product Name (Serif Gold) */}
                <h3 className="font-serif text-[#B89F70] font-bold text-lg mb-1 leading-tight line-clamp-1">
                    {product.name}
                </h3>

                {/* Price */}
                <p className="text-stone-600 font-medium text-sm">
                    Ghs. {product.price?.toFixed(2)}
                </p>
            </div>
        </div>
    </div>
);

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
        <section className="section-padding bg-white overflow-hidden">
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

