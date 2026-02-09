import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import CartModal from './shop/CartModal';

const Navbar = () => {
    const { cartCount, setIsCartOpen } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Shop', path: '/shop' },
        { name: 'Blog', path: '/blog' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' },
        { name: 'Exclusive Membership', path: '/membership' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="z-50">
                    <h1 className="text-2xl md:text-3xl font-heading font-bold tracking-wider text-primary-dark">
                        AURUM<span className="text-gold">TEA</span>
                    </h1>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            end={link.path === '/'}
                            className={({ isActive }) =>
                                `text-sm font-medium tracking-wide transition-colors ${isActive ? 'text-gold' : 'text-primary-dark hover:text-gold'}`
                            }
                        >
                            {link.name.toUpperCase()}
                        </NavLink>
                    ))}
                </div>

                {/* Icons - Visible on all screens */}
                <div className="flex items-center space-x-4 md:space-x-6 text-primary-dark">
                    <button className="hover:text-gold transition-colors">
                        <Search size={20} />
                    </button>
                    <Link to="/profile" className="hover:text-gold transition-colors">
                        <User size={20} />
                    </Link>
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="hover:text-gold transition-colors relative"
                    >
                        <ShoppingBag size={20} />
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
                        className="absolute top-0 left-0 w-full h-[100vh] bg-cream flex flex-col items-center justify-center space-y-8 md:hidden shadow-xl"
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
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
