import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Github, Chrome, Facebook } from 'lucide-react';

const Profile = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    const sliderImages = [
        "https://images.unsplash.com/photo-1594631252845-29fc45865157?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1576092729250-590ee0378b95?q=80&w=1974&auto=format&fit=crop"
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const formVariants = {
        hidden: { opacity: 0, x: isLogin ? -20 : 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: 'spring', damping: 25, stiffness: 200 }
        },
        exit: {
            opacity: 0,
            x: isLogin ? 20 : -20,
            transition: { duration: 0.3 }
        }
    };

    return (
        <div className="min-h-screen flex bg-cream overflow-hidden">
            {/* Left Section: Auth Forms */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative z-10 bg-cream mt-16">
                <div className="w-full max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 text-center lg:text-left"
                    >
                        <h1 className="text-4xl font-heading font-black text-primary-dark mb-4">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h1>
                        <p className="text-stone-400 font-medium">
                            {isLogin
                                ? 'Enter your credentials to access your luxury tea selection.'
                                : 'Join our exclusive community of tea connoisseurs today.'}
                        </p>
                    </motion.div>

                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isLogin ? 'login' : 'register'}
                                variants={formVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="space-y-6"
                            >
                                {!isLogin && (
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-300">
                                            <User size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            className="w-full bg-white border border-stone-100 rounded-2xl py-4 pl-12 pr-4 text-primary-dark placeholder:text-stone-300 focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all shadow-sm"
                                        />
                                    </div>
                                )}

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-300">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full bg-white border border-stone-100 rounded-2xl py-4 pl-12 pr-4 text-primary-dark placeholder:text-stone-300 focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all shadow-sm"
                                    />
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-300">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="w-full bg-white border border-stone-100 rounded-2xl py-4 pl-12 pr-4 text-primary-dark placeholder:text-stone-300 focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all shadow-sm"
                                    />
                                </div>

                                {isLogin && (
                                    <div className="flex justify-end">
                                        <button className="text-xs font-bold text-gold uppercase tracking-widest hover:text-gold-dark transition-colors">
                                            Forgot Password?
                                        </button>
                                    </div>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-primary-dark text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-primary-dark/10 hover:bg-gold transition-all duration-300 group"
                                >
                                    <span className="text-sm font-black tracking-widest uppercase">
                                        {isLogin ? 'Sign In' : 'Sign Up'}
                                    </span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="mt-12">
                        <div className="relative flex items-center justify-center mb-8">
                            <div className="border-t border-stone-200 w-full" />
                            <span className="bg-cream px-4 text-[10px] font-bold text-stone-300 uppercase tracking-[0.2em] whitespace-nowrap">
                                Or continue with
                            </span>
                            <div className="border-t border-stone-200 w-full" />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {[Chrome, Facebook, Github].map((Icon, idx) => (
                                <button
                                    key={idx}
                                    className="flex items-center justify-center py-3 bg-white border border-stone-100 rounded-xl hover:bg-stone-50 transition-colors shadow-sm"
                                >
                                    <Icon size={20} className="text-primary-dark" />
                                </button>
                            ))}
                        </div>

                        <p className="mt-12 text-center text-sm font-medium text-stone-400">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="ml-2 text-gold font-bold hover:underline"
                            >
                                {isLogin ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Section: Image Slider */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0"
                    >
                        <div className="absolute inset-0 bg-primary-dark/40 z-10" />
                        <img
                            src={sliderImages[currentSlide]}
                            alt="Tea Lifestyle"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-12 text-white">
                    <motion.div
                        key={`text-${currentSlide}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <h2 className="text-5xl font-heading font-black mb-6 leading-tight max-w-lg">
                            Elevate Your Daily <span className="text-gold italic">Ritual</span>
                        </h2>
                        <p className="text-white/80 font-medium max-w-md mx-auto leading-relaxed">
                            Discover the world's most exquisite organic teas, sourced from high-altitude boutique gardens.
                        </p>
                    </motion.div>

                    <div className="absolute bottom-12 flex gap-3">
                        {sliderImages.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === idx ? 'w-8 bg-gold' : 'w-2 bg-white/30'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
