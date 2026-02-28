import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Github, Chrome, Facebook, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import hero1 from '../assets/images/hero-1.jpeg';
import hero2 from '../assets/images/hero-2.jpeg';
import hero3 from '../assets/images/hero-3.jpeg';

const Profile = () => {
    const { user, profile, isAdmin, signIn, signUp, signOut, loading: authLoading, profileLoading } = useAuth();
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const sliderImages = [hero1, hero2, hero3];

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Automatic redirection based on role
    useEffect(() => {
        if (!authLoading && !profileLoading && user && profile) {
            if (isAdmin) {
                console.log('Profile: Admin detected, redirecting to admin dashboard');
                navigate('/admin', { replace: true });
            } else {
                console.log('Profile: Guest detected, redirecting to guest dashboard');
                navigate('/guest', { replace: true });
            }
        }
    }, [user, profile, isAdmin, navigate, authLoading, profileLoading]);

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                await signIn({ email: formData.email, password: formData.password });
            } else {
                await signUp({
                    email: formData.email,
                    password: formData.password,
                    fullName: formData.fullName
                });
                alert('Account created! Please check your email for verification.');
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/');
        } catch (err) {
            console.error('Logout error:', err.message);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-cream gap-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
                <div className="text-center">
                    <p className="text-stone-400 font-bold uppercase tracking-widest text-[10px]">Verifying your ritual...</p>
                    <p className="text-[9px] text-stone-300 mt-2 max-w-[200px]">If this takes too long, your connection to the garden might be slow.</p>
                    {user && (
                        <div className="mt-4 p-3 bg-stone-100 rounded-xl">
                            <p className="text-[9px] text-stone-400 font-bold uppercase tracking-widest mb-1">Current User ID:</p>
                            <p className="text-[10px] text-primary-dark font-mono break-all px-2">{user.id}</p>
                        </div>
                    )}
                </div>
                <button
                    onClick={handleSignOut}
                    className="mt-4 text-xs font-bold text-gold hover:underline uppercase tracking-widest"
                >
                    Cancel & Sign Out
                </button>
            </div>
        );
    }

    // If logged in, redirect based on role (handled by useEffect above)
    if (user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
            </div>
        );
    }

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
        <div className="min-h-screen flex bg-cream overflow-hidden relative">
            <Link
                to="/shop"
                className="fixed top-8 left-8 z-50 flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-primary-dark border border-stone-100 shadow-sm hover:border-gold hover:text-gold transition-all group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Shop
            </Link>

            {/* Left Section: Auth Forms */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative z-10 bg-cream pt-24">
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

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-500 text-sm font-bold rounded-2xl border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleAuth} className="relative">
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
                                            required
                                            placeholder="Full Name"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                                        required
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-white border border-stone-100 rounded-2xl py-4 pl-12 pr-4 text-primary-dark placeholder:text-stone-300 focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all shadow-sm"
                                    />
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-300">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full bg-white border border-stone-100 rounded-2xl py-4 pl-12 pr-4 text-primary-dark placeholder:text-stone-300 focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all shadow-sm"
                                    />
                                </div>

                                {isLogin && (
                                    <div className="flex justify-end">
                                        <button type="button" className="text-xs font-bold text-gold uppercase tracking-widest hover:text-gold-dark transition-colors">
                                            Forgot Password?
                                        </button>
                                    </div>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full bg-primary-dark text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-primary-dark/10 hover:bg-gold transition-all duration-300 group ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    <span className="text-sm font-black tracking-widest uppercase">
                                        {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                                    </span>
                                    {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                                </motion.button>
                            </motion.div>
                        </AnimatePresence>
                    </form>

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
                                    type="button"
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

