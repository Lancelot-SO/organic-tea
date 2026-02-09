import React from 'react';
import { Star, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import featuredTea from '../../assets/images/featured-tea.png';
import { Link } from 'react-router-dom';

const FeaturedProduct = () => {
    const benefits = [
        "100% Organic & Naturally Sourced",
        "Rich in Antioxidants & Nutrients",
        "Ethically Harvested & Sustainable",
        "Premium Craftsmanship in Every Tin"
    ];

    return (
        <section className="py-20 bg-[#FDFCF8] overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-2 lg:order-1"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B89F70]/10 text-[#B89F70] mb-6">
                            <Star size={16} fill="#B89F70" />
                            <span className="text-sm font-bold uppercase tracking-widest">Product of the Month</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-heading font-bold text-[#3F4E3C] mb-6 leading-tight">
                            Aurum Botanics <br />
                            <span className="font-serif italic text-[#B89F70] font-normal">Morning Brew</span>
                        </h2>

                        <p className="text-lg text-stone-600 mb-8 leading-relaxed max-w-xl">
                            Experience the dawn of a new day with our signature Morning Brew.
                            A delicate yet energizing blend of high-mountain green tea, infused with
                            zesty citrus and a hint of warming cinnamon.
                        </p>

                        <div className="space-y-4 mb-10">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (index * 0.1) }}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle size={20} className="text-[#B89F70]" />
                                    <span className="text-stone-700 font-medium">{benefit}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button className="px-8 py-4 bg-[#3F4E3C] text-white rounded-xl font-bold hover:bg-[#2F3A2C] transition-all flex items-center gap-2 group shadow-lg shadow-[#3F4E3C]/20">
                                Buy Now — Ghs. 400.00
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <Link to="/shop" className="px-8 py-4 border-2 border-[#B89F70] text-[#B89F70] rounded-xl font-bold hover:bg-[#B89F70] hover:text-white transition-all">
                                Shop Now
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Column: Image with Floatings */}
                    <div className="relative order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl"
                        >
                            <img
                                src={featuredTea}
                                alt="Signature Morning Brew"
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                        </motion.div>

                        {/* Floating Testimonial */}
                        <motion.div
                            initial={{ opacity: 0, x: 20, y: 20 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="absolute -bottom-6 -left-6 md:-left-12 z-20 bg-white p-6 rounded-2xl shadow-xl max-w-xs border border-stone-100"
                        >
                            <div className="flex gap-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} fill="#B89F70" className="text-[#B89F70]" />
                                ))}
                            </div>
                            <p className="text-stone-700 italic mb-4 leading-relaxed">
                                "The quality is unmatched. It's become the best part of my morning routine."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop" alt="Jennifer" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-[#3F4E3C]">Jennifer K.</h4>
                                    <p className="text-[10px] text-[#B89F70] uppercase font-bold tracking-tighter">Verified Buyer</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Background Decor */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#B89F70]/5 rounded-full blur-3xl -z-0"></div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FeaturedProduct;
