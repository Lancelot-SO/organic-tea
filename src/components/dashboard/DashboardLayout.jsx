import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingBag,
    ClipboardList,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    User as UserIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { profile, signOut, isAdmin, loading, profileLoading } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/profile');
    };

    if (loading || (profileLoading && !profile)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border-t-2 border-gold/20"></div>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h2>
                    <p className="text-stone-600 mb-6">You do not have administrative privileges to access this area.</p>
                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-primary-dark text-white px-6 py-2 rounded-lg font-bold hover:bg-gold transition-colors"
                        >
                            Go Back Home
                        </button>
                        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                            Logged in as: {profile?.email || 'Unknown User'}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const navItems = [
        { path: '/admin', icon: LayoutDashboard, label: 'Overview' },
        { path: '/admin/products', icon: ShoppingBag, label: 'Products' },
        { path: '/admin/orders', icon: ClipboardList, label: 'Orders' },
        { path: '/admin/users', icon: Users, label: 'Customers' },
        { path: '/admin/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="min-h-screen bg-main flex font-sans selection:bg-gold/30 transition-colors duration-500">
            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-primary-dark/95 dark:bg-stone-900/95 backdrop-blur-xl border-r border-white/5 text-white transition-all duration-500 ease-in-out lg:relative lg:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                shadow-[20px_0_50px_rgba(0,0,0,0.2)]
            `}>
                <div className="h-full flex flex-col relative overflow-hidden">
                    {/* Decorative Background Element */}
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />

                    {/* Sidebar Header */}
                    <div className="p-8 flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4 group cursor-default">
                            <div className="w-10 h-10 bg-linear-to-br from-gold to-gold-dark rounded-xl flex items-center justify-center font-bold text-primary-dark shadow-[0_0_20px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-transform duration-300">
                                <span className="text-xl">G</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold font-heading tracking-tight leading-none">DASHBOARD</span>
                                <span className="text-[10px] text-gold font-bold tracking-[0.2em] uppercase mt-1 opacity-80">Admin Core</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="grow px-6 py-8 space-y-1 relative z-10 overflow-y-auto custom-scrollbar">
                        <p className="px-4 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Main Menu</p>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === '/admin'}
                                className={({ isActive }) => `
                                    flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-500 group relative
                                    ${isActive
                                        ? 'bg-linear-to-r from-gold/20 to-transparent text-gold'
                                        : 'text-white/50 hover:text-white hover:bg-white/5'}
                                `}
                            >
                                {({ isActive }) => (
                                    <>
                                        {/* Active Indicator Pin */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="sidebar-active"
                                                className="absolute left-0 w-1 h-6 bg-gold rounded-full"
                                            />
                                        )}
                                        <item.icon size={20} className={`transition-all duration-300 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]' : 'group-hover:text-gold group-hover:scale-105'}`} />
                                        <span className={`text-sm font-medium tracking-wide ${isActive ? 'font-bold' : ''}`}>{item.label}</span>

                                        {isActive && (
                                            <div className="ml-auto w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-6 mt-auto relative z-10">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md mb-4 group hover:bg-white/10 transition-all duration-300">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold border border-gold/20 group-hover:scale-105 transition-transform">
                                    <UserIcon size={18} />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-xs font-bold truncate">{profile?.full_name || 'Admin User'}</span>
                                    <span className="text-[10px] text-white/40 truncate uppercase tracking-widest mt-0.5">Primary Administrator</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 text-white/40 hover:text-red-400 hover:bg-red-400/10 border border-transparent hover:border-red-400/20 rounded-2xl transition-all duration-300 group font-bold text-xs uppercase tracking-widest"
                        >
                            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <span>System Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="grow flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-card/80 backdrop-blur-md border-b border-border-main px-8 flex items-center justify-between sticky top-0 z-40 transition-colors duration-500">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className={`lg:hidden p-3 text-stone-500 hover:bg-stone-50 rounded-2xl transition-all ${isSidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                        >
                            <Menu size={20} />
                        </button>
                        <div className="hidden lg:block">
                            <h2 className="text-xl font-bold text-main font-heading tracking-tight">
                                {navItems.find(item =>
                                    window.location.pathname === item.path ||
                                    (item.path !== '/admin' && window.location.pathname.startsWith(item.path))
                                )?.label || 'Dashboard Overview'}
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Quick Search Shadow Trigger */}
                        <div className="hidden md:flex items-center gap-3 bg-offset border border-border-main rounded-2xl px-4 py-2 text-text-muted w-64 group hover:border-gold/30 transition-all cursor-text">
                            <span className="text-xs font-medium">Search anything...</span>
                            <span className="ml-auto text-[10px] font-bold bg-card px-1.5 py-0.5 rounded border border-border-main">⌘K</span>
                        </div>

                        <div className="flex items-center gap-2 ml-2">
                            <button className="p-2.5 text-stone-400 hover:text-primary-dark hover:bg-stone-50 rounded-xl relative transition-all group">
                                <Bell size={20} className="group-hover:rotate-12 transition-transform" />
                                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-gold rounded-full border-2 border-white animate-pulse"></span>
                            </button>

                            <div className="h-8 w-px bg-stone-100 mx-2" />

                            <button className="flex items-center gap-3 group">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold text-main group-hover:text-gold transition-colors">{profile?.full_name?.split(' ')[0] || 'Admin'}</p>
                                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Online</p>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-border-main to-offset p-0.5 group-hover:shadow-lg transition-all overflow-hidden">
                                    <div className="w-full h-full bg-card rounded-[10px] flex items-center justify-center text-main font-bold text-xs uppercase">
                                        {profile?.full_name?.charAt(0) || <UserIcon size={16} />}
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="grow overflow-y-auto bg-offset p-6 lg:p-10 custom-scrollbar relative transition-colors duration-500">
                    {/* Background Texture Overlay */}
                    <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

                    <div className="relative max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
