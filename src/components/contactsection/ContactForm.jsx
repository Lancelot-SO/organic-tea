import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import product1 from '../../assets/images/product1.jpeg';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('https://api.theafricateacompany.com/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    subject: 'General Inquiry',
                    message: ''
                });
                // Reset success message after 5 seconds
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setErrorMessage(data.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
            setErrorMessage('Network error. Please check your connection and try again.');
        }
    };

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

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    viewport={{ once: true }}
                                    className="space-y-2"
                                >
                                    <label className="text-xs font-bold text-primary-dark uppercase tracking-wider ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all placeholder:text-stone-300 text-sm shadow-sm"
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="space-y-2"
                                >
                                    <label className="text-xs font-bold text-primary-dark uppercase tracking-wider ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all placeholder:text-stone-300 text-sm shadow-sm"
                                    />
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="space-y-2"
                            >
                                <label className="text-xs font-bold text-primary-dark uppercase tracking-wider ml-1">Subject</label>
                                <div className="relative">
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all text-sm text-stone-600 appearance-none shadow-sm cursor-pointer"
                                    >
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Wholesale Partnerships">Wholesale Partnerships</option>
                                        <option value="Order Support">Order Support</option>
                                        <option value="Press & PR">Press & PR</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                                        <ArrowRight className="w-4 h-4 rotate-90" />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="space-y-2"
                            >
                                <label className="text-xs font-bold text-primary-dark uppercase tracking-wider ml-1">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="How can we help you?"
                                    className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all placeholder:text-stone-300 text-sm resize-none shadow-sm"
                                ></textarea>
                            </motion.div>

                            <AnimatePresence mode="wait">
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-xl text-sm font-medium"
                                    >
                                        <CheckCircle2 className="w-5 h-5" />
                                        Message sent successfully!
                                    </motion.div>
                                )}
                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl text-sm font-medium"
                                    >
                                        <AlertCircle className="w-5 h-5" />
                                        {errorMessage}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.button
                                whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                                whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                                type="submit"
                                disabled={status === 'loading'}
                                className={`w-full ${status === 'loading' ? 'bg-primary-dark/70' : 'bg-primary-dark hover:bg-gold'} text-white py-5 rounded-xl font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-colors shadow-lg shadow-primary-dark/10 mt-6 disabled:cursor-not-allowed`}
                            >
                                {status === 'loading' ? (
                                    <>
                                        Sending...
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
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

