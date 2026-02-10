import React from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowRight } from 'lucide-react';
import product1 from '../../assets/images/product1.jpeg';

const ContactForm = () => {
    return (
        <section className="py-12 bg-[#FAF9F6]">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden shadow-2xl">

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="lg:w-7/12 p-8 md:p-12"
                    >
                        <div className="mb-6">
                            <h2 className="text-3xl font-heading font-bold text-primary-dark mb-4">Send us a Message</h2>
                            <p className="text-stone-500 text-sm">Fill out the form below and we'll get back to you within 24 hours.</p>
                        </div>

                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: "First Name", placeholder: "John", type: "text" },
                                    { label: "Email Address", placeholder: "john@example.com", type: "email" }
                                ].map((field, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 * idx }}
                                        viewport={{ once: true }}
                                        className="space-y-2"
                                    >
                                        <label className="text-xs font-bold text-primary-dark uppercase tracking-wider ml-1">{field.label}</label>
                                        <input
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all placeholder:text-stone-300 text-sm shadow-sm"
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="space-y-2"
                            >
                                <label className="text-xs font-bold text-primary-dark uppercase tracking-wider ml-1">Subject</label>
                                <div className="relative">
                                    <select className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all text-sm text-stone-600 appearance-none shadow-sm cursor-pointer">
                                        <option>General Inquiry</option>
                                        <option>Wholesale Partnerships</option>
                                        <option>Order Support</option>
                                        <option>Press & PR</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                                        <ArrowRight className="w-4 h-4 rotate-90" />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="space-y-2"
                            >
                                <label className="text-xs font-bold text-primary-dark uppercase tracking-wider ml-1">Message</label>
                                <textarea
                                    rows="4"
                                    placeholder="How can we help you?"
                                    className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all placeholder:text-stone-300 text-sm resize-none shadow-sm"
                                ></textarea>
                            </motion.div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="w-full bg-primary-dark hover:bg-gold text-white py-5 rounded-xl font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-colors shadow-lg shadow-primary-dark/10 mt-6"
                            >
                                Send Message
                                <Send className="w-4 h-4" />
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="lg:w-5/12 relative hidden lg:block"
                    >
                        <img
                            src={product1}
                            alt="Tea Preparation"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-primary-dark/40 backdrop-blur-[2px] flex flex-col justify-end p-12 text-white">
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="text-2xl font-heading font-bold mb-4 italic"
                            >
                                "Tea is a silent language between the soul and nature."
                            </motion.h3>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-3 text-gold"
                            >
                                <span className="w-12 h-[1px] bg-gold" />
                                <p className="text-xs font-bold uppercase tracking-widest">NutriHealth Philosophy</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
