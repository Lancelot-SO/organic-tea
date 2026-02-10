import React from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import hero2 from '../../assets/images/hero-2.jpeg';

const NewsletterSection = () => {
    return (
        <section className="section-padding bg-white">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="bg-primary-dark rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                >

                    {/* Content */}
                    <div className="md:w-1/2 p-10 md:p-14 lg:p-16 flex flex-col justify-center">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-heading font-bold text-white mb-4"
                        >
                            Join Our <br />
                            <span className="text-gold italic">Antique Tea Club</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="text-gray-300 mb-8 max-w-md text-sm md:text-base"
                        >
                            Get access to limited edition blends, early access to new collections, and exclusive tea tasting events.
                        </motion.p>

                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            viewport={{ once: true }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-white/10 border border-white/20 rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors text-sm"
                            />
                            <button className="btn-primary !flex flex-row items-center justify-center gap-2 whitespace-nowrap !px-8 shadow-xl">
                                Subscribe <Send size={18} />
                            </button>
                        </motion.form>
                    </div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2 }}
                        viewport={{ once: true }}
                        className="md:w-1/2 relative h-[300px] md:h-auto overflow-hidden"
                    >
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.8 }}
                            src={hero2}
                            alt="Tea Club"
                            className="w-full h-full object-cover absolute inset-0 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-transparent md:bg-gradient-to-r" />
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
};

export default NewsletterSection;
