import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import promo2 from "../../assets/images/home/promo.jpeg"
import product4 from "../../assets/images/product4.jpeg";
import FloatingLeaf from './FloatingLeaf';

const PromoSection = () => {
    return (
        <section className="py-16 md:py-20 bg-[#FBFBEF] relative overflow-hidden">
            {/* Botanical decorations */}
            <FloatingLeaf image="teaLeaves" side="right" className="top-4" rotate={20} opacity={0.3} size="w-20 h-20 md:w-28 md:h-28" />
            <FloatingLeaf image="leaf2" side="left" className="bottom-4" rotate={-12} delay={200} opacity={0.35} size="w-24 h-24 md:w-32 md:h-32" />

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

                    {/* Banner 1: Fresh & Healthy */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <Link
                            to="/shop"
                            className="relative h-64 md:h-72 lg:h-80 w-full overflow-hidden group block rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={product4}
                                    alt="Fresh & Healthy Tea"
                                    className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent group-hover:from-black/50 group-hover:via-black/30 transition-all duration-500"></div>
                            </div>

                            {/* Decorative corner accent */}
                            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-white/30 rounded-tl-2xl m-4 group-hover:w-24 group-hover:h-24 transition-all duration-500"></div>

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                                {/* Tag */}
                                <motion.span
                                    className="text-gold text-xs font-semibold uppercase tracking-[3px] mb-3 inline-block"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    Premium Collection
                                </motion.span>

                                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 group-hover:translate-x-2 transition-transform duration-500">
                                    Fresh & Healthy
                                </h3>
                                <p className="text-white/70 font-light mb-6 tracking-wide text-sm group-hover:text-white/90 transition-colors duration-500">
                                    The wonderful Taste of life
                                </p>

                                <div className="flex items-center gap-3">
                                    <span className="bg-white text-primary-dark px-6 py-2.5 text-sm font-semibold uppercase tracking-wider inline-flex items-center gap-2 rounded-lg group-hover:bg-gold group-hover:text-white transition-all duration-400">
                                        Shop Now
                                        <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
                                    </span>
                                </div>
                            </div>

                            {/* Shine sweep effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-in-out pointer-events-none"></div>
                        </Link>
                    </motion.div>

                    {/* Banner 2: 20% Off */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                    >
                        <Link
                            to="/shop"
                            className="relative h-64 md:h-72 lg:h-80 w-full overflow-hidden group block rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={promo2}
                                    alt="20% Off Select Teas"
                                    className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/70 via-primary-dark/50 to-transparent group-hover:from-primary-dark/60 group-hover:via-primary-dark/40 transition-all duration-500"></div>
                            </div>

                            {/* Decorative corner accent */}
                            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-gold/40 rounded-tl-2xl m-4 group-hover:w-24 group-hover:h-24 transition-all duration-500"></div>

                            {/* Discount badge */}
                            <div className="absolute top-6 right-6">
                                <motion.div
                                    className="bg-gold text-white w-16 h-16 rounded-full flex items-center justify-center text-center shadow-lg"
                                    whileHover={{ scale: 1.1, rotate: 10 }}
                                    animate={{ rotate: [0, -5, 5, 0] }}
                                    transition={{ rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
                                >
                                    <span className="text-xs font-bold leading-tight">20%<br />OFF</span>
                                </motion.div>
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                                {/* Tag */}
                                <motion.span
                                    className="text-gold-light text-xs font-semibold uppercase tracking-[3px] mb-3 inline-block"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                >
                                    Limited Offer
                                </motion.span>

                                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 group-hover:translate-x-2 transition-transform duration-500">
                                    Up To 20% Off
                                </h3>
                                <p className="text-white/70 font-light mb-6 tracking-wide text-sm group-hover:text-white/90 transition-colors duration-500">
                                    On Select Teas. Brew a new Experience
                                </p>

                                <div className="flex items-center gap-3">
                                    <span className="bg-white text-primary-dark px-6 py-2.5 text-sm font-semibold uppercase tracking-wider inline-flex items-center gap-2 rounded-lg group-hover:bg-gold group-hover:text-white transition-all duration-400">
                                        Shop Now
                                        <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
                                    </span>
                                </div>
                            </div>

                            {/* Shine sweep effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-in-out pointer-events-none"></div>
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default PromoSection;
