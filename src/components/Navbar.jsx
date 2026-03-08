import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import CartModal from './shop/CartModal';
import logo from '../assets/logo.png';

const Navbar = () => {
    const { cartCount, setIsCartOpen } = useCart();
    const { wishlistCount } = useWishlist();
    const { user, profile, isAdmin, loading } = useAuth();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || !isHomePage
                ? 'py-2 px-4 md:px-10'
                : 'py-3 px-4 md:px-10'
                }`}
        >
            <div
                className="mx-auto max-w-[1200px] flex items-center justify-between rounded-xl px-6 md:px-10 py-3 transition-all duration-300 bg-black/40 backdrop-blur-lg border border-green-900 shadow-lg"
            >
                {/* Logo */}
                <Link to="/" className="z-50 flex items-center shrink-0">
                    <img
                        src={logo}
                        alt="The Africa Tea Company"
                        className="h-8 md:h-12 w-auto object-contain"
                    />
                </Link>

                {/* Desktop Navigation - Center */}
                <div className="hidden md:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            end={link.path === '/'}
                            className={({ isActive }) =>
                                `text-sm font-semibold tracking-wide transition-colors ${isActive
                                    ? 'text-white border-b-2 border-white pb-0.5'
                                    : 'text-white/80 hover:text-white'
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                {/* Right Section - Login + Icons */}
                <div className="flex items-center space-x-3 md:space-x-5 text-white">
                    {/* Login/Register or Dashboard - Desktop only */}
                    {!loading && (
                        user ? (
                            <Link
                                to={isAdmin ? '/admin' : '/guest'}
                                className="hidden md:flex items-center gap-2 hover:text-gold transition-all duration-300 group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 group-hover:border-gold/50 transition-colors">
                                    <User size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest leading-none mb-1">
                                        {isAdmin ? 'Admin' : (profile?.role || 'Member')}
                                    </span>
                                    <span className="text-xs font-bold text-white group-hover:text-gold transition-colors">
                                        {profile?.full_name?.split(' ')[0] || 'Dashboard'}
                                    </span>
                                </div>
                            </Link>
                        ) : (
                            <Link
                                to="/profile"
                                className="hidden md:flex items-center gap-2 hover:text-gold transition-colors"
                            >
                                <User size={18} />
                                <span className="text-sm font-medium text-white/90">
                                    Login / Register
                                </span>
                            </Link>
                        )
                    )}

                    {/* Mobile - User icon only */}
                    <Link to="/profile" className="md:hidden hover:text-gold transition-colors">
                        <User size={20} />
                    </Link>

                    <Link to="/wishlist" className="hover:text-gold transition-colors relative">
                        <Heart size={18} />
                        {wishlistCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>

                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="hover:text-gold transition-colors relative"
                    >
                        <ShoppingBag size={18} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden z-50 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-0 left-0 w-full h-screen bg-cream flex flex-col items-center justify-center space-y-8 md:hidden shadow-xl"
                    >
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                end={link.path === '/'}
                                className={({ isActive }) =>
                                    `text-2xl font-heading font-medium transition-colors ${isActive ? 'text-gold' : 'text-primary-dark hover:text-gold'}`
                                }
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </NavLink>
                        ))}

                        <hr className="w-20 border-gold/20" />

                        {!loading && (
                            user ? (
                                <Link
                                    to={isAdmin ? '/admin' : '/guest'}
                                    className="flex flex-col items-center gap-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em]">Signed in as</span>
                                    <span className="text-2xl font-heading font-bold text-primary-dark">{profile?.full_name || 'My Account'}</span>
                                    <div className="mt-2 px-6 py-2 bg-gold text-primary-dark rounded-xl text-[10px] font-black uppercase tracking-widest">
                                        Open Dashboard
                                    </div>
                                </Link>
                            ) : (
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-3 text-2xl font-heading font-medium text-primary-dark hover:text-gold"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <User size={24} />
                                    Login / Register
                                </Link>
                            )
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
