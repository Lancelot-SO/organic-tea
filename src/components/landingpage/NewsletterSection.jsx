import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, X, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import hero2 from '../../assets/images/hero-2.jpeg';

const NewsletterSection = () => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submittedName, setSubmittedName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            const response = await fetch('https://api.theafricateacompany.com/api/membership', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: '',
                    email: email,
                    phone: '',
                    membership_type: 'Newsletter',
                    interests: [],
                    referral_source: 'Newsletter',
                    additional_notes: 'Subscribed via Newsletter Section'
                }),
            });

            if (response.ok) {
                setStatus('success');
                setSubmittedName(firstName);
                setIsModalOpen(true);
                setMessage('Thank you for joining our Exclusive Tea Club!');
                setEmail('');
                setFirstName('');
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                throw new Error('Something went wrong. Please try again later.');
            }
        } catch (err) {
            console.error('Newsletter submission error:', err);
            setStatus('error');
            setMessage('Failed to connect to the server. Please check your internet or try again later.');
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
                                        className="flex flex-col gap-4"
                                    >
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    required
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    placeholder="Your first name"
                                                    disabled={status === 'loading'}
                                                    className="w-full bg-white/10 border border-white/20 rounded-[10px] px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors text-sm disabled:opacity-50"
                                                />
                                            </div>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Enter your email"
                                                    disabled={status === 'loading'}
                                                    className="w-full bg-white/10 border border-white/20 rounded-[10px] px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors text-sm disabled:opacity-50"
                                                />
                                            </div>
                                        </div>
                                        {status === 'error' && (
                                            <div className="mt-2 flex items-center gap-1.5 text-red-400 text-[11px] font-bold uppercase tracking-wider">
                                                <AlertCircle size={12} />
                                                {message}
                                            </div>
                                        )}
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="btn-primary flex! flex-row items-center justify-center gap-2 whitespace-nowrap px-8! shadow-xl w-full sm:w-fit min-w-[140px] disabled:opacity-50 mt-2"
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
                        <div className="absolute inset-0 bg-linear-to-r from-primary-dark to-transparent md:bg-linear-to-r" />
                    </motion.div>

                </motion.div>
            </div>

            {/* Success Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-white rounded-[10px] p-8 md:p-12 max-w-lg w-full shadow-2xl relative overflow-hidden text-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>

                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-dark/5 rounded-bl-full -mr-10 -mt-10" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold/5 rounded-tr-full -ml-8 -mb-8" />

                            <div className="space-y-8 relative">
                                {/* Success Icon */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 12 }}
                                    className="w-20 h-20 bg-primary-dark/10 rounded-full flex items-center justify-center mx-auto"
                                >
                                    <CheckCircle2 className="w-10 h-10 text-primary-dark" />
                                </motion.div>

                                {/* Content */}
                                <div className="space-y-4">
                                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark">
                                        Hi {submittedName}!
                                    </h3>
                                    <div className="w-12 h-1 bg-gold mx-auto rounded-full" />
                                    <p className="text-lg md:text-xl text-[#5C5C5C] leading-relaxed">
                                        Thank you for joining our <span className="text-primary-dark font-bold">Exclusive Tea Club</span>.
                                    </p>
                                    <div className="flex items-center justify-center gap-2 text-sm font-medium text-gold bg-gold/5 py-3 px-6 rounded-full w-fit mx-auto mt-6">
                                        <Mail size={16} />
                                        <span>Welcome to the family!</span>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-full bg-primary-dark hover:bg-primary text-white py-4 rounded-[10px] font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                                >
                                    Continue
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default NewsletterSection;
