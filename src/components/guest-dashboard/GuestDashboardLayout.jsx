import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    ShoppingBag,
    User as UserIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const GuestDashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { user, profile, signOut, loading, profileLoading } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/profile');
    };

    // Redirect unauthenticated users — must be in a useEffect, not in the render body
    useEffect(() => {
        if (!loading && !profileLoading && !user) {
            navigate('/profile');
        }
    }, [user, loading, profileLoading, navigate]);

    if (loading || (profileLoading && !profile)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold relative">
                    <div className="absolute inset-0 rounded-full border-t-2 border-gold/20"></div>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const navItems = [
        { path: '/guest', icon: LayoutDashboard, label: 'Overview' },
        { path: '/guest/orders', icon: Package, label: 'My Orders' },
        { path: '/guest/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="min-h-screen bg-cream flex font-sans selection:bg-gold/30">
            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-primary-dark/95 backdrop-blur-xl border-r border-white/5 text-white transition-all duration-500 ease-in-out lg:relative lg:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                shadow-[20px_0_50px_rgba(0,0,0,0.2)]
            `}>
                <div className="h-full flex flex-col relative overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-gold/5 rounded-full blur-[80px] pointer-events-none" />

                    {/* Header */}
                    <div className="p-8 flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4 group cursor-default">
                            <div className="w-10 h-10 bg-linear-to-br from-gold to-gold-dark rounded-xl flex items-center justify-center font-bold text-primary-dark shadow-[0_0_20px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-transform duration-300">
                                <span className="text-xl">G</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold font-heading tracking-tight leading-none">DASHBOARD</span>
                                <span className="text-[10px] text-gold font-bold tracking-[0.2em] uppercase mt-1 opacity-80">My Account</span>
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
                        <p className="px-4 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Menu</p>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === '/guest'}
                                className={({ isActive }) => `
                                    flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-500 group relative
                                    ${isActive
                                        ? 'bg-linear-to-r from-gold/20 to-transparent text-gold'
                                        : 'text-white/50 hover:text-white hover:bg-white/5'}
                                `}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && (
                                            <motion.div
                                                layoutId="guest-sidebar-active"
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

                        <div className="pt-6 mt-4 border-t border-white/5">
                            <p className="px-4 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Quick Links</p>
                            <a
                                href="/shop"
                                className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-white/50 hover:text-white hover:bg-white/5 transition-all duration-500 group"
                            >
                                <ShoppingBag size={20} className="group-hover:text-gold group-hover:scale-105 transition-all duration-300" />
                                <span className="text-sm font-medium tracking-wide">Visit Shop</span>
                            </a>
                        </div>
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-6 mt-auto relative z-10">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md mb-4 group hover:bg-white/10 transition-all duration-300">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold border border-gold/20 font-bold uppercase group-hover:scale-105 transition-transform">
                                    {profile?.full_name?.charAt(0) || profile?.email?.charAt(0) || <UserIcon size={18} />}
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-xs font-bold truncate">{profile?.full_name || user?.user_metadata?.full_name || 'Member'}</span>
                                    <span className="text-[10px] text-white/40 truncate uppercase tracking-widest mt-0.5">{profile?.role || 'Guest'}</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 text-white/40 hover:text-red-400 hover:bg-red-400/10 border border-transparent hover:border-red-400/20 rounded-2xl transition-all duration-300 group font-bold text-xs uppercase tracking-widest"
                        >
                            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="grow flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-stone-100 px-8 flex items-center justify-between sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className={`lg:hidden p-3 text-neutral-700 hover:bg-stone-50 rounded-2xl transition-all ${isSidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                        >
                            <Menu size={20} />
                        </button>
                        <div className="hidden lg:block">
                            <h2 className="text-xl font-bold text-primary-dark font-heading tracking-tight">
                                {navItems.find(item =>
                                    window.location.pathname === item.path ||
                                    (item.path !== '/guest' && window.location.pathname.startsWith(item.path))
                                )?.label || 'My Dashboard'}
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 ml-2">
                            <button className="p-2.5 text-neutral-600 hover:text-primary-dark hover:bg-stone-50 rounded-xl relative transition-all group">
                                <Bell size={20} className="group-hover:rotate-12 transition-transform" />
                            </button>

                            <div className="h-8 w-px bg-stone-100 mx-2" />

                            <div className="flex items-center gap-3">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold text-primary-dark">{profile?.full_name?.split(' ')[0] || user?.user_metadata?.full_name?.split(' ')[0] || 'Member'}</p>
                                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Online</p>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-stone-100 to-stone-200 p-0.5 overflow-hidden">
                                    <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-primary-dark font-bold text-xs uppercase">
                                        {profile?.full_name?.charAt(0) || user?.user_metadata?.full_name?.charAt(0) || <UserIcon size={16} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="grow overflow-y-auto bg-cream p-6 lg:p-10 custom-scrollbar relative">
                    <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
                    <div className="relative max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default GuestDashboardLayout;
