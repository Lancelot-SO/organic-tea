import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import hero2 from '../../assets/images/hero-2.jpeg';

const NewsletterSection = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            const response = await fetch('https://api.theafricateacompany.com/api/membership', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setStatus('success');
                setMessage('Thank you for joining our Exclusive Tea Club!');
                setEmail('');
            } else {
                throw new Error('Something went wrong. Please try again later.');
            }
        } catch (err) {
            setStatus('error');
            setMessage(err.message || 'Connection failed. Please check your internet.');
        }
    };

    return (
        <section className="section-padding bg-white">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="bg-primary-dark rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[400px]"
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
                            Join Our <br /><span className="text-gold italic">Exclusive Tea Club</span>
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

                        <div className="relative">
                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400"
                                    >
                                        <CheckCircle2 size={24} />
                                        <p className="font-semibold text-sm">{message}</p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="flex flex-col sm:flex-row gap-4"
                                    >
                                        <div className="flex-1 relative">
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your email"
                                                disabled={status === 'loading'}
                                                className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors text-sm disabled:opacity-50"
                                            />
                                            {status === 'error' && (
                                                <div className="absolute top-full left-0 mt-2 flex items-center gap-1.5 text-red-400 text-[11px] font-bold uppercase tracking-wider">
                                                    <AlertCircle size={12} />
                                                    {message}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="btn-primary flex! flex-row items-center justify-center gap-2 whitespace-nowrap !px-8 shadow-xl min-w-[140px] disabled:opacity-50"
                                        >
                                            {status === 'loading' ? (
                                                <Loader2 size={18} className="animate-spin" />
                                            ) : (
                                                <>Subscribe <Send size={18} /></>
                                            )}
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
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
