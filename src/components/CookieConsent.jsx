import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ArrowRight } from 'lucide-react';

const CookieConsent = ({ onShowPolicy }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-100"
                >
                    <div className="bg-white border border-stone-100 shadow-2xl rounded-[10px] p-6 md:p-8 relative overflow-hidden group">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                        
                        <div className="relative z-10 space-y-5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                                    <Cookie size={24} />
                                </div>
                                <h3 className="text-xl font-heading font-bold text-primary-dark">Cookie Consent</h3>
                            </div>

                            <p className="text-sm text-[#5C5C5C] leading-relaxed">
                                We use cookies to enhance your experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <button onClick={() => onShowPolicy('cookies')} className="text-gold font-bold hover:underline">Cookie Policy</button> to learn more.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <button
                                    onClick={handleAccept}
                                    className="flex-1 bg-primary-dark hover:bg-gold text-white py-3 rounded-[10px] font-bold text-sm tracking-widest uppercase transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 group"
                                >
                                    Accept All
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button
                                    onClick={handleDecline}
                                    className="px-6 py-3 border border-stone-200 text-stone-500 hover:bg-stone-50 rounded-[10px] font-bold text-sm transition-all active:scale-95"
                                >
                                    Decline
                                </button>
                            </div>
                        </div>

                        {/* Close Icon (minimal) */}
                        <button 
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 text-stone-300 hover:text-stone-500 transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
