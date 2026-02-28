import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Package,
    Calendar,
    Star,
    ArrowRight,
    ShoppingBag,
    Crown,
    Camera,
    Leaf,
    TrendingUp
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../hooks/useProducts';
import { useOrders } from '../../hooks/useOrders';

const GuestDashboardOverview = () => {
    const { profile } = useAuth();
    const { categories } = useProducts();
    const { orders, loading } = useOrders();

    const categoryEmojis = {
        'anti-inflammatory-teas': '🔥',
        'aphrodisiac-power-teas': '💪',
        'beauty-teas': '✨',
        'blood-pressure-teas': '❤️',
        'cholesterol-management-teas': '🫀',
        'cramps': '🩹',
        'detox-teas': '🧹',
        'digestion': '🍃',
        'gift-card': '🎁',
        'liver-kidneys': '🫘',
        'sweetner': '🍯',
        'teas-for-immune-system-boost': '🛡️',
        'uncategorized': '🍵',
        'weight-loss-teas': '⚖️',
    };

    const stats = [
        {
            label: 'Total Orders',
            value: orders.length.toString(),
            icon: Package,
            color: 'from-gold/20 to-gold/5',
            iconColor: 'text-gold',
            trend: 'Accumulated over time'
        },
        {
            label: 'Member Since',
            value: profile?.created_at ? new Date(profile.created_at).getFullYear().toString() : '2024',
            icon: Calendar,
            color: 'from-primary-dark/10 to-primary-dark/5',
            iconColor: 'text-primary-dark',
            trend: 'Active member'
        },
        {
            label: 'Total Valuation',
            value: `GHS ${orders.reduce((sum, o) => sum + parseFloat(o.total), 0).toFixed(0)}`,
            icon: Star,
            color: 'from-gold/20 to-gold/5',
            iconColor: 'text-gold',
            trend: 'Organic investment'
        },
    ];

    const quickLinks = [
        {
            title: 'Browse Collection',
            description: 'Explore our curated selection of organic teas from premium farms.',
            icon: ShoppingBag,
            path: '/shop',
            gradient: 'from-primary-dark to-primary-dark/80',
            textColor: 'text-white',
            iconBg: 'bg-white/20'
        },
        {
            title: 'Exclusive Membership',
            description: 'Unlock premium perks and early access to limited editions.',
            icon: Crown,
            path: '/membership',
            gradient: 'from-gold/10 to-gold/5',
            textColor: 'text-primary-dark',
            iconBg: 'bg-gold/20'
        },
        {
            title: 'Tea Gallery',
            description: 'Visual stories from our organic tea farms around the world.',
            icon: Camera,
            path: '/gallery',
            gradient: 'from-stone-100 to-stone-50',
            textColor: 'text-primary-dark',
            iconBg: 'bg-stone-200'
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const recentOrders = orders.slice(0, 3);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
        >
            {/* Welcome Section */}
            <motion.div variants={itemVariants} className="relative overflow-hidden bg-linear-to-br from-primary-dark via-primary-dark/95 to-primary-dark/90 rounded-4xl p-8 lg:p-10 text-white shadow-2xl shadow-primary-dark/20">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full blur-[60px]" />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-gold/20 flex items-center justify-center border border-gold/20">
                                <Leaf size={24} className="text-gold" />
                            </div>
                            <div className="h-px flex-1 bg-linear-to-r from-gold/30 to-transparent max-w-32" />
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-heading font-black mb-3">
                            Welcome back, <span className="text-gold italic">{profile?.full_name?.split(' ')[0] || 'Tea Connoisseur'}</span>
                        </h1>
                        <p className="text-white/60 text-sm font-medium max-w-lg leading-relaxed">
                            Your personal tea collection awaits. Browse your orders, track points, and discover new premium blends curated just for you.
                        </p>
                    </div>
                    <Link
                        to="/shop"
                        className="flex items-center gap-3 px-8 py-4 bg-gold text-primary-dark rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:shadow-xl transition-all duration-300 group shrink-0"
                    >
                        <ShoppingBag size={18} />
                        Shop Now
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className={`bg-linear-to-br ${stat.color} p-8 rounded-4xl border border-stone-100 shadow-lg shadow-stone-200/10 relative overflow-hidden group hover:shadow-xl transition-all duration-300`}>
                        <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                        <div className="relative z-10">
                            <stat.icon size={24} className={`${stat.iconColor} mb-4`} />
                            <p className="text-[9px] font-black text-neutral-700 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-2xl font-black text-primary-dark font-heading mb-2">{stat.value}</p>
                            <div className="flex items-center gap-1">
                                <TrendingUp size={12} className="text-gold" />
                                <p className="text-[10px] font-bold text-neutral-600">{stat.trend}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Browse by Category */}
            {categories.length > 0 && (
                <motion.div variants={itemVariants}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-black text-neutral-700 uppercase tracking-widest">Browse by Category</h3>
                        <Link to="/shop" className="text-[10px] font-black text-gold uppercase tracking-widest hover:text-primary-dark transition-colors flex items-center gap-2 group">
                            View Shop <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categories.filter(c => c.slug !== 'uncategorized').map((cat, i) => (
                            <Link
                                key={cat.id}
                                to={`/shop?category=${cat.slug}`}
                                className="group bg-white rounded-2xl p-5 border border-stone-100 shadow-sm hover:shadow-lg hover:border-gold/30 transition-all duration-300 text-center relative overflow-hidden"
                            >
                                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gold/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                                <div className="relative z-10">
                                    <span className="text-2xl mb-3 block group-hover:scale-110 transition-transform duration-300">
                                        {categoryEmojis[cat.slug] || '🍵'}
                                    </span>
                                    <p className="text-xs font-bold text-primary-dark leading-tight group-hover:text-gold transition-colors">
                                        {cat.name}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Recent Orders Section */}
            <motion.div variants={itemVariants} className="bg-white rounded-4xl p-8 lg:p-10 border border-stone-100 shadow-xl shadow-stone-200/10">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h3 className="text-xl font-heading font-black text-primary-dark uppercase tracking-wide">Recent Orders</h3>
                        <p className="text-xs text-neutral-600 mt-1">Track and manage your tea orders</p>
                    </div>
                    <Link to="/guest/orders" className="text-[10px] font-black text-gold uppercase tracking-widest hover:text-primary-dark transition-colors flex items-center gap-2 group">
                        View All <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {loading ? (
                    <div className="p-12 flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
                    </div>
                ) : recentOrders.length === 0 ? (
                    <div className="p-10 rounded-2xl bg-stone-50/50 border border-dashed border-stone-200 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mb-5">
                            <Package size={28} className="text-gold" />
                        </div>
                        <p className="text-neutral-800 font-bold text-sm mb-2">Your order history</p>
                        <p className="text-neutral-600 text-xs mb-6 max-w-sm">All your past and current orders will appear here. Start shopping to build your collection.</p>
                        <Link to="/shop" className="bg-primary-dark text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gold transition-all shadow-lg shadow-primary-dark/10 flex items-center gap-2 group">
                            <ShoppingBag size={14} />
                            Start Shopping
                            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {recentOrders.map((order) => (
                            <Link
                                key={order.id}
                                to="/guest/orders"
                                className="flex items-center justify-between p-5 bg-stone-50/50 rounded-2xl border border-stone-100 hover:border-gold/30 hover:bg-white hover:shadow-lg transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-stone-100 flex items-center justify-center text-primary-dark font-black font-mono text-[10px]">
                                        #{order.order_number.split('-').pop()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-primary-dark tracking-tight">Order #{order.order_number}</p>
                                        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-0.5">
                                            {new Date(order.created_at).toLocaleDateString()} • {order.order_items?.length} Items
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right flex flex-col items-end">
                                        <p className="text-sm font-black text-primary-dark">GHS {parseFloat(order.total).toFixed(2)}</p>
                                        <span className={`text-[9px] font-black uppercase tracking-widest ${order.status === 'delivered' ? 'text-green-500' : 'text-gold'}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <ChevronRight size={14} className="text-stone-300 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <h3 className="text-sm font-black text-neutral-700 uppercase tracking-widest mb-6">Explore</h3>
                {quickLinks.map((link, i) => (
                    <Link
                        key={i}
                        to={link.path}
                        className={`group relative overflow-hidden rounded-4xl bg-linear-to-br ${link.gradient} p-8 border border-stone-100 shadow-lg shadow-stone-200/10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1`}
                    >
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                        <div className="relative z-10">
                            <div className={`w-12 h-12 ${link.iconBg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                <link.icon size={22} className={link.textColor === 'text-white' ? 'text-white' : 'text-primary-dark'} />
                            </div>
                            <h4 className={`text-base font-heading font-black ${link.textColor} mb-2`}>{link.title}</h4>
                            <p className={`text-xs ${link.textColor === 'text-white' ? 'text-white/80' : 'text-neutral-600'} leading-relaxed`}>{link.description}</p>
                            <div className={`flex items-center gap-2 mt-4 text-[10px] font-black uppercase tracking-widest ${link.textColor === 'text-white' ? 'text-gold' : 'text-gold'}`}>
                                Explore <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default GuestDashboardOverview;
