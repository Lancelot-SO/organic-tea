import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { ArrowUpRight, Star } from 'lucide-react';
import product1 from '../../assets/images/product1.jpeg';
import product2 from '../../assets/images/product2.jpeg';
import product3 from '../../assets/images/product3.jpeg';
import product4 from '../../assets/images/product4.jpeg';
import product5 from '../../assets/images/product5.jpeg';


const products = [
    {
        id: 1,
        name: "Emerald Peak",
        category: "Green Tea",
        price: 60.00,
        image: product1,
        rating: 5,
    },
    {
        id: 2,
        name: "Black Tea of India",
        category: "Black Tea",
        price: 60.00,
        image: product2,
        rating: 5,
    },
    {
        id: 3,
        name: "Golden Blend",
        category: "Herbal Tea",
        price: 60.00,
        image: product3,
        rating: 5,
    },
    {
        id: 4,
        name: "Sunshine Blend",
        category: "Herbal Tea",
        price: 60.00,
        image: product4,
        rating: 5,
    },
    {
        id: 5,
        name: "Royal Earl Grey",
        category: "Black Tea",
        price: 60.00,
        image: product5,
        rating: 5,
    }
];

const ProductCard = ({ product }) => (
    <div className="bg-[#EBE5D5] rounded-3xl p-1 flex flex-col relative group hover:shadow-lg transition-all duration-300 h-full">
        {/* Card Header: Name & Arrow */}
        <div className="flex justify-between items-start mb-2 px-4 pt-4">
            <span className="text-primary-dark font-bold text-sm md:text-base tracking-wide">
                ({product.name})
            </span>
            <button className="bg-white rounded-full p-1.5 shadow-sm transform group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight size={16} className="text-stone-600" />
            </button>
        </div>

        {/* Unified White Container for Image & Info */}
        <div className="bg-white rounded-[20px] w-full grow flex flex-col items-center p-4">
            {/* Image */}
            <div className="w-full aspect-square flex items-center justify-center mb-2 overflow-hidden rounded-2xl">
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain rounded-2xl"
                />
            </div>

            {/* Info */}
            <div className="text-center mt-auto w-full">
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill="#3F4E3C" className="text-primary-dark" />
                    ))}
                </div>

                {/* Product Name (Serif Gold) */}
                <h3 className="font-serif text-[#B89F70] font-bold text-lg mb-1 leading-tight">
                    ({product.name})
                </h3>

                {/* Price */}
                <p className="text-stone-600 font-medium text-sm">
                    Ghs. {product.price.toFixed(2)}
                </p>
            </div>
        </div>
    </div>
);

const ProductShowcase = () => {
    const [progress, setProgress] = useState((1 / products.length) * 100);

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
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1}
                        loop={true}
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
                            640: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                            1280: {
                                slidesPerView: 4,
                            }
                        }}
                        className="pb-4"
                    >
                        {products.map((product) => (
                            <SwiperSlide key={product.id} className="h-auto">
                                <ProductCard product={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>

                {/* Custom Progress Bar */}
                <div className="w-full h-1 bg-stone-200 rounded-full mt-8 overflow-hidden max-w-xs mx-auto">
                    <div
                        className="h-full bg-[#3F4E3C] transition-all duration-500 ease-out"
                        style={{ width: `${Math.max(20, progress)}%` }} // Min width for visibility
                    ></div>
                </div>

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
