import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import hibiscustea from "../../assets/images/home/hibiscustea.jpeg"
import product1 from "../../assets/images/product1.jpeg";
import product2 from "../../assets/images/product2.jpeg";
import product3 from "../../assets/images/product3.jpeg";
import product4 from "../../assets/images/product4.jpeg";
import product5 from "../../assets/images/product5.jpeg";
import hero3 from "../../assets/images/hero-3.jpeg";

const HomeAbout = () => {
    return (
        <section className="py-10 bg-white px-2">
            <div className="container mx-auto px-6">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl font-heading font-bold text-[#3F4E3C] leading-none"
                    >
                        Exquisite Taste <br />
                        <span className="font-serif italic text-[#B89F70] font-normal">Refreshing Blends.</span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-6 md:mt-0 flex flex-col md:flex-row items-center gap-4"
                    >
                        <div className="flex flex-col items-end md:items-start text-right md:text-left">
                            {/* Stars */}
                            <div className="flex text-[#3F4E3C] gap-1 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill="#3F4E3C" />
                                ))}
                            </div>
                            <p className="text-sm text-stone-500">4.7( 1.90 Reviews)</p>
                        </div>

                        {/* Avatars */}
                        <div className="flex -space-x-2">
                            {[
                                product1,
                                product2,
                                product3,
                                product4
                            ].map((src, i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                                    <img src={src} alt="Reviewer" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Main Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-[480px]">

                    {/* Left Panel: Large Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-[32px] overflow-hidden h-96 lg:h-full group"
                    >
                        <img
                            src={hero3}
                            alt="Woman with flowers"
                            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-black/10"></div>

                        {/* Overlay Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg"
                        >
                            <h3 className="text-[#3F4E3C] font-bold text-lg mb-1">
                                Rooted In <span className="text-[#B89F70]">African Tradition</span>
                            </h3>
                            <p className="text-stone-600 text-xs leading-relaxed">
                                Inspired by rich African heritage and tradition, each sip of our tea reflects cultural richness and the timeless art of brewing healthy African tea.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Right Panel: Stacked Cards */}
                    <div className="flex flex-col gap-6 h-full">

                        {/* Top Card: Beige */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex-1 bg-[#F5F2EA] rounded-[32px] p-8 flex flex-col md:flex-row items-center relative overflow-hidden group"
                        >
                            {/* Content */}
                            <div className="flex-1 z-10 text-right md:text-right order-2 md:order-2">
                                <h3 className="font-serif text-[#B89F70] text-3xl mb-2 italic">
                                    Pure, Natural <br />
                                    <span className="font-heading not-italic text-[#B89F70]">Freshness</span>
                                </h3>
                                <p className="text-stone-600 text-sm leading-relaxed max-w-xs ml-auto">
                                    Carefully crafted from source to cup, our teas capture the freshness and vitality of nature in every brew.
                                </p>
                            </div>
                            {/* Image */}
                            <div className="relative z-10 w-48 h-48 order-1 md:order-1 mb-6 md:mb-0 mr-0 md:mr-6">
                                <img
                                    src={hibiscustea}
                                    alt="hibiscus tea"
                                    className="w-full h-full object-contain drop-shadow-xl transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </motion.div>

                        {/* Bottom Card: Green */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex-1 bg-[#3F4E3C] rounded-[32px] p-8 relative overflow-hidden flex flex-col justify-center"
                        >
                            <div className="relative z-10 max-w-md">
                                <h3 className="font-serif text-white text-2xl italic mb-6">
                                    Pure, Natural Freshness
                                </h3>
                                <ul className="space-y-4 text-white/80 text-sm font-light">
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 w-1 h-1 bg-white rounded-full"></span>
                                        Made with carefully selected organic ingredients
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 w-1 h-1 bg-white rounded-full"></span>
                                        Pure and natural, with no artificial additives
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 w-1 h-1 bg-white rounded-full"></span>
                                        A healthy, high-quality tea you can enjoy with confidence
                                    </li>
                                </ul>
                            </div>

                            {/* Decorative Leaf Image */}
                            <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-80">
                                <img
                                    src={product5}
                                    alt="Tea Leaves"
                                    className="w-full h-full object-cover object-left opacity-60 mix-blend-overlay"
                                />
                            </div>
                        </motion.div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default HomeAbout;
