import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import promo2 from "../../assets/images/home/promo.jpeg"
import product4 from "../../assets/images/product4.jpeg";

const PromoSection = () => {
    return (
        <section className="py-12 bg-[#FBFBEF]">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 gap-8">

                    {/* Banner 1: Fresh & Healthy (Dark) */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="relative h-56 md:h-64 w-full overflow-hidden group"
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img
                                src={product4}
                                alt="Tea Ceremony"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500"></div>
                        </div>

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-center items-start p-10 md:p-12">
                            <h3 className="text-3xl md:text-4xl font-heading font-medium text-white mb-3">
                                Fresh & Healthy
                            </h3>
                            <p className="text-white/80 font-light mb-8 tracking-wide">
                                The wonderful Taste of life
                            </p>
                            <Link
                                to="/shop"
                                className="bg-white/90 backdrop-blur-sm text-primary-dark px-6 py-2.5 text-sm font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-white transition-all transform hover:-translate-y-1 inline-flex"
                            >
                                Shop Now
                                <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Banner 2: 20% Off (Light) */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-56 md:h-64 w-full overflow-hidden group"
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img
                                src={promo2}
                                alt="Herbs and Spices"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay - subtle light overlay to ensure text contrast */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500"></div>
                        </div>

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-center items-start p-10 md:p-12">
                            <h3 className="text-3xl md:text-4xl font-heading font-medium text-white mb-3">
                                Up To 20% Off
                            </h3>
                            <p className="text-white font-light mb-8 tracking-wide">
                                On Select Teas. Brew a new Experience
                            </p>
                            <Link
                                to="/shop"
                                className="bg-white/90 backdrop-blur-sm text-primary-dark px-6 py-2.5 text-sm font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-white transition-all transform hover:-translate-y-1 inline-flex"
                            >
                                Shop Now
                                <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default PromoSection;
