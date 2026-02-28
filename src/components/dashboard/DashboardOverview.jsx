import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { useAdminOrders } from '../../hooks/useOrders';
import {
    CreditCard,
    ShoppingBag,
    Users,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    CheckCircle2,
    Package,
    X
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="bg-white p-8 rounded-4xl border border-stone-100 shadow-xl shadow-stone-200/20 group hover:scale-[1.02] transition-all duration-500"
    >
        <div className="flex justify-between items-start mb-6">
            <div className={`p-4 rounded-2xl ${color} shadow-lg shadow-inherit/20 group-hover:rotate-6 transition-transform duration-500`}>
                <Icon size={28} className="text-white" />
            </div>
            {trend && (
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${trend === 'up' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                    {trendValue}
                    {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                </div>
            )}
        </div>
        <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-2">{title}</p>
            <h3 className="text-4xl font-bold text-primary-dark font-heading tracking-tight group-hover:text-gold transition-colors">{value}</h3>
        </div>
    </motion.div>
);

const DashboardOverview = () => {
    const { fetchDashboardStats, loading } = useAdminOrders();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await fetchDashboardStats();
                setStats(data);
            } catch (error) {
                console.error("Dashboard stats load error:", error);
            }
        };
        loadStats();
    }, []);

    // Process revenue data for chart
    const chartData = stats?.revenueByDay ? Object.entries(stats.revenueByDay)
        .sort(([a], [b]) => new Date(a) - new Date(b))
        .map(([date, amount]) => ({
            name: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            revenue: amount,
            orders: Math.floor(amount / 50) + 1 // Mock order count for dual visualization
        })) : [];

    // Fallback data if empty
    const displayData = chartData.length > 0 ? chartData : [
        { name: 'Feb 16', revenue: 400, orders: 12 },
        { name: 'Feb 17', revenue: 300, orders: 8 },
        { name: 'Feb 18', revenue: 900, orders: 20 },
        { name: 'Feb 19', revenue: 600, orders: 15 },
        { name: 'Feb 20', revenue: 800, orders: 18 },
        { name: 'Feb 21', revenue: 1200, orders: 25 },
        { name: 'Feb 22', revenue: stats?.totalRevenue || 1100, orders: 22 },
    ];

    if (loading && !stats) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-gold/10"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-gold border-t-transparent animate-spin"></div>
                </div>
                <p className="text-stone-400 font-bold uppercase tracking-[0.2em] text-[10px]">Assembling Analytics...</p>
            </div>
        );
    }

    return (
        <div className="space-y-12 pb-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="w-12 h-[2px] bg-gold"></span>
                        <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">Business Intel</span>
                    </div>
                    <h1 className="text-4xl font-heading font-bold text-primary-dark tracking-tighter">Command Center</h1>
                    <p className="text-stone-500 mt-2 max-w-md">Your garden is flourishing. Here is a live overview of your business performance and growth metrics.</p>
                </div>
                <div className="flex gap-3 bg-white p-1.5 rounded-2xl border border-stone-100 shadow-sm">
                    {['24H', '7D', '30D', 'All'].map((period, i) => (
                        <button
                            key={period}
                            className={`px-5 py-2.5 text-[10px] font-bold rounded-xl transition-all ${i === 2 ? 'bg-primary-dark text-white shadow-lg shadow-primary-dark/20' : 'text-stone-400 hover:text-primary-dark'}`}
                        >
                            {period}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard
                    title="Net Revenue"
                    value={`GHS ${stats?.totalRevenue?.toFixed(2) || '0.00'}`}
                    icon={CreditCard}
                    trend="up"
                    trendValue="+12.5%"
                    color="bg-primary-dark"
                    delay={0.1}
                />
                <StatCard
                    title="Volume"
                    value={stats?.totalOrders || '0'}
                    icon={ShoppingBag}
                    trend="up"
                    trendValue="+8.2%"
                    color="bg-gold"
                    delay={0.2}
                />
                <StatCard
                    title="Growth"
                    value={stats?.totalCustomers || '0'}
                    icon={Users}
                    trend="up"
                    trendValue="+5.4%"
                    color="bg-[#425043]"
                    delay={0.3}
                />
                <StatCard
                    title="Retention"
                    value="94%"
                    icon={TrendingUp}
                    trend="up"
                    trendValue="+1.2%"
                    color="bg-stone-800"
                    delay={0.4}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Revenue Evolution Chart */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-8 bg-white rounded-[2.5rem] border border-stone-100 shadow-xl shadow-stone-200/10 overflow-hidden"
                >
                    {/* Card Header */}
                    <div className="px-10 pt-10 pb-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="w-8 h-[2px] bg-gold" />
                                    <span className="text-[9px] font-black text-gold uppercase tracking-[0.3em]">30-Day Performance</span>
                                </div>
                                <h2 className="text-2xl font-bold text-primary-dark font-heading tracking-tight">Revenue Evolution</h2>
                                <p className="text-xs text-stone-400 mt-1 font-medium">Daily settlement flow across all channels</p>
                            </div>
                            {/* Period pill selector */}
                            <div className="flex gap-1 bg-stone-50 p-1 rounded-2xl border border-stone-100 self-start">
                                {['7D', '14D', '30D', 'All'].map((p, i) => (
                                    <button
                                        key={p}
                                        className={`px-4 py-2 text-[9px] font-black rounded-xl uppercase tracking-widest transition-all ${i === 2 ? 'bg-primary-dark text-white shadow-lg shadow-primary-dark/20' : 'text-stone-400 hover:text-primary-dark'}`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* KPI summary row */}
                        <div className="grid grid-cols-4 gap-0 mb-8 -mx-1">
                            {[
                                {
                                    label: 'Total',
                                    value: `GHS ${displayData.reduce((s, d) => s + d.revenue, 0).toFixed(0)}`,
                                    highlight: false
                                },
                                {
                                    label: 'Peak Day',
                                    value: `GHS ${Math.max(...displayData.map(d => d.revenue)).toFixed(0)}`,
                                    highlight: true
                                },
                                {
                                    label: 'Daily Avg',
                                    value: `GHS ${(displayData.reduce((s, d) => s + d.revenue, 0) / displayData.length).toFixed(0)}`,
                                    highlight: false
                                },
                                {
                                    label: 'Data Points',
                                    value: `${displayData.length} Days`,
                                    highlight: false
                                },
                            ].map((kpi) => (
                                <div key={kpi.label} className={`px-4 py-4 mx-1 rounded-2xl ${kpi.highlight ? 'bg-gold/5 border border-gold/20' : 'bg-stone-50 border border-stone-100'}`}>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-stone-400 mb-1">{kpi.label}</p>
                                    <p className={`text-sm font-black tracking-tight ${kpi.highlight ? 'text-gold' : 'text-primary-dark'}`}>{kpi.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chart area */}
                    <div className="h-[280px] w-full px-2 pb-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={displayData} margin={{ top: 16, right: 16, left: -16, bottom: 0 }}>
                                <defs>
                                    {/* Primary gradient */}
                                    <linearGradient id="revGradTop" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.18} />
                                        <stop offset="60%" stopColor="#D4AF37" stopOpacity={0.06} />
                                        <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
                                    </linearGradient>
                                    {/* Glow filter */}
                                    <filter id="lineGlow">
                                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="0"
                                    vertical={false}
                                    stroke="#F5F5F4"
                                    strokeWidth={1}
                                />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#C4B5A0', fontSize: 9, fontWeight: 700, letterSpacing: 1 }}
                                    dy={12}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#C4B5A0', fontSize: 9, fontWeight: 700 }}
                                    tickFormatter={(v) => `${v}`}
                                    width={48}
                                />
                                <Tooltip
                                    cursor={{ stroke: '#D4AF37', strokeWidth: 1, strokeDasharray: '4 4', opacity: 0.4 }}
                                    content={({ active, payload, label }) => {
                                        if (!active || !payload?.length) return null;
                                        const val = payload[0]?.value ?? 0;
                                        const maxVal = Math.max(...displayData.map(d => d.revenue));
                                        const isPeak = val === maxVal;
                                        return (
                                            <div className="bg-primary-dark rounded-2xl px-5 py-4 shadow-2xl shadow-black/30 border border-white/5 min-w-[140px]">
                                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">{label}</p>
                                                <p className="text-2xl font-black text-white tracking-tighter leading-none">
                                                    <span className="text-[10px] text-gold mr-1">GHS</span>
                                                    {val.toFixed(2)}
                                                </p>
                                                {isPeak && (
                                                    <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/10">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                                                        <span className="text-[9px] font-black text-gold uppercase tracking-widest">Peak Day</span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#D4AF37"
                                    strokeWidth={2.5}
                                    fillOpacity={1}
                                    fill="url(#revGradTop)"
                                    filter="url(#lineGlow)"
                                    dot={false}
                                    activeDot={{
                                        r: 6,
                                        fill: '#1C291F',
                                        stroke: '#D4AF37',
                                        strokeWidth: 2.5,
                                        filter: 'url(#lineGlow)'
                                    }}
                                    animationDuration={1800}
                                    animationEasing="ease-out"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Performance Mix */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-4 bg-primary-dark p-10 rounded-[2.5rem] shadow-2xl shadow-primary-dark/20 flex flex-col text-white overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />

                    <h2 className="text-2xl font-bold font-heading tracking-tight mb-2 relative z-10">Sales Intensity</h2>
                    <p className="text-white/40 text-sm mb-10 relative z-10">Real-time status distribution</p>

                    <div className="space-y-6 relative z-10 grow">
                        {[
                            { label: 'Fulfilling', value: stats?.statusCounts?.processing || stats?.pendingOrders || 0, color: 'bg-blue-400', icon: Clock },
                            { label: 'Successful', value: stats?.statusCounts?.delivered || stats?.completedOrders || 0, color: 'bg-gold', icon: CheckCircle2 },
                            { label: 'Dispatch', value: stats?.statusCounts?.shipped || 0, color: 'bg-green-400', icon: Package },
                            { label: 'Void', value: stats?.statusCounts?.cancelled || 0, color: 'bg-red-400', icon: X },
                        ].map((item, idx) => (
                            <div key={item.label} className="group">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-xl ${item.color}/10 border border-white/10 flex items-center justify-center text-white/80 group-hover:scale-110 transition-transform`}>
                                            <item.icon size={14} />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">{item.label}</span>
                                    </div>
                                    <span className="text-sm font-black text-gold">{item.value}</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(item.value / (stats?.totalOrders || 1)) * 100}%` }}
                                        transition={{ delay: 0.5 + (idx * 0.1), duration: 1 }}
                                        className={`h-full ${item.color} shadow-[0_0_10px_inherit]`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/5 relative z-10">
                        <button className="w-full bg-white/5 hover:bg-gold hover:text-primary-dark text-white/50 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500">
                            Download Strategy Report
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Row: Recent & Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Recent Transactions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2.5rem] border border-stone-100 shadow-xl shadow-stone-200/10 overflow-hidden"
                >
                    <div className="p-10 border-b border-stone-50 flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-primary-dark font-heading tracking-tight">Live Transactions</h2>
                        <Link to="/admin/orders" className="bg-stone-50 hover:bg-gold hover:text-white p-3 rounded-xl text-stone-400 transition-all">
                            <ArrowUpRight size={20} />
                        </Link>
                    </div>
                    <div className="p-4 overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-y-3">
                            <thead>
                                <tr>
                                    <th className="px-6 pb-2 text-[10px] font-bold text-stone-300 uppercase tracking-widest">Order</th>
                                    <th className="px-6 pb-2 text-[10px] font-bold text-stone-300 uppercase tracking-widest text-right">Settlement</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(stats?.recentOrders || []).length > 0 ? stats.recentOrders.map((order) => (
                                    <tr key={order.id} className="group cursor-pointer" onClick={() => navigate?.(`/admin/orders`)}>
                                        <td className="px-6 py-4 bg-stone-50/50 group-hover:bg-gold/5 rounded-l-2xl transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-2xl bg-white border border-stone-100 flex items-center justify-center font-bold text-primary-dark shadow-sm">
                                                    #{order.order_number.split('-').pop()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-primary-dark tracking-tight">{order.order_number}</p>
                                                    <p className="text-[10px] text-stone-400 font-bold uppercase mt-1">Status: {order.status}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 bg-stone-50/50 group-hover:bg-gold/5 rounded-r-2xl text-right transition-colors">
                                            <p className="text-sm font-black text-primary-dark tracking-tighter">GHS {parseFloat(order.total).toFixed(2)}</p>
                                            <p className={`text-[10px] font-bold uppercase mt-1 ${order.payment_status === 'success' ? 'text-green-500' : 'text-gold'}`}>
                                                {order.payment_status}
                                            </p>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="2" className="px-6 py-10 text-center text-stone-400 text-xs font-bold uppercase tracking-widest">No recent transactions</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Top Sellers Panel */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2.5rem] border border-stone-100 shadow-xl shadow-stone-200/10 p-10"
                >
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-2xl font-bold text-primary-dark font-heading tracking-tight">Top Performance</h2>
                        <div className="w-10 h-10 rounded-xl bg-primary-dark/5 flex items-center justify-center text-primary-dark">
                            <TrendingUp size={20} />
                        </div>
                    </div>
                    <div className="space-y-8">
                        {(stats?.topProducts || []).length > 0 ? stats.topProducts.map((item) => (
                            <div key={item.name} className="group">
                                <div className="flex justify-between items-end mb-3">
                                    <div>
                                        <p className="text-sm font-bold text-primary-dark group-hover:text-gold transition-colors">{item.name}</p>
                                        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">{item.vol}</p>
                                    </div>
                                    <span className="text-xs font-black text-primary-dark">{item.percent}%</span>
                                </div>
                                <div className="w-full h-2 bg-stone-50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.percent}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className={`h-full ${item.name.toLowerCase().includes('matcha') || item.name.toLowerCase().includes('green') ? 'bg-[#425043]' : 'bg-gold'} rounded-full`}
                                    />
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-10 text-stone-400 text-xs font-bold uppercase tracking-widest">No product data available</div>
                        )}
                    </div>
                    <Link to="/admin/products" className="w-full mt-10 p-4 border-2 border-dashed border-stone-100 rounded-3xl text-xs font-bold text-stone-400 hover:border-gold hover:text-gold transition-all duration-500 uppercase tracking-widest block text-center">
                        Customize Inventory Reports
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default DashboardOverview;
