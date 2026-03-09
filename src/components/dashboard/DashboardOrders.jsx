import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    Eye,
    CheckCircle2,
    Clock,
    Package,
    X,
    Truck,
    BadgeAlert,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    Loader2,
    Download,
    Printer,
    FileText
} from 'lucide-react';
import { useAdminOrders } from '../../hooks/useOrders';
import { useAuth } from '../../context/AuthContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const StatusBadge = ({ status }) => {
    const statusConfig = {
        'processing': { color: 'bg-blue-50 text-blue-500 border-blue-100', icon: Clock, label: 'Processing' },
        'shipped': { color: 'bg-orange-50 text-orange-500 border-orange-100', icon: Truck, label: 'Dispatched' },
        'delivered': { color: 'bg-green-50 text-green-500 border-green-100', icon: CheckCircle2, label: 'Fulfilled' },
        'cancelled': { color: 'bg-red-50 text-red-500 border-red-100', icon: X, label: 'Voided' },
        'pending': { color: 'bg-stone-50 text-stone-400 border-stone-100', icon: Clock, label: 'Awaiting' },
    };

    const config = statusConfig[status.toLowerCase()] || statusConfig['pending'];
    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all duration-500 ${config.color}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${status.toLowerCase() === 'processing' ? 'bg-blue-400 animate-pulse' : 'bg-current opacity-40'}`}></div>
            {config.label}
        </span>
    );
};

const DashboardOrders = () => {
    const [options, setOptions] = useState({
        status: null,
        page: 1,
        limit: 10,
        searchQuery: ''
    });

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setOptions(prev => {
                if (prev.searchQuery === searchTerm) return prev;
                return { ...prev, searchQuery: searchTerm, page: 1 };
            });
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const { profile } = useAuth();
    const {
        orders = [],
        loading,
        error,
        totalPages,
        totalCount,
        fetchOrders,
        updateOrderStatus,
        updatePaymentStatus
    } = useAdminOrders(options);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchOrders(options);
    }, [options]);

    const handleStatusUpdate = async (orderId, newStatus) => {
        setActionLoading(true);
        try {
            await updateOrderStatus(orderId, newStatus);
            fetchOrders(options);
            if (selectedOrder?.id === orderId) {
                setSelectedOrder(prev => ({ ...prev, status: newStatus }));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setActionLoading(false);
        }
    };

    const openOrderDetails = (order) => {
        setSelectedOrder(order);
        setIsDetailOpen(true);
    };

    const handleDownloadCSV = () => {
        if (!orders || orders.length === 0) return;

        const headers = ['Order Number', 'Date', 'Customer Name', 'Status', 'Total (GHS)'];
        const csvContent = [
            headers.join(','),
            ...orders.map(order => [
                order.order_number,
                new Date(order.created_at).toLocaleDateString(),
                order.profiles?.full_name || order.shipping_name || 'Guest',
                order.status,
                parseFloat(order.total).toFixed(2)
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Admin_Tea_Ledger_Orders_${new Date().toISOString().split('T')[0]}.csv`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleDownloadPDF = () => {
        if (!orders || orders.length === 0) return;

        const doc = new jsPDF();

        // Add title and basic styling
        doc.setFontSize(20);
        doc.setTextColor(212, 175, 55); // Gold color
        doc.text('Admin Tea Ledger - Transaction History', 14, 22);

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

        const tableColumn = ['Order ID', 'Date', 'Customer', 'Status', 'Total (GHS)'];
        const tableRows = [];

        orders.forEach(order => {
            const customerName = order.profiles?.full_name || order.shipping_name || 'Guest';
            const orderData = [
                order.order_number,
                new Date(order.created_at).toLocaleDateString(),
                customerName.length > 20 ? customerName.substring(0, 17) + '...' : customerName,
                order.status.toUpperCase(),
                parseFloat(order.total).toFixed(2)
            ];
            tableRows.push(orderData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 40,
            theme: 'grid',
            headStyles: {
                fillColor: [212, 175, 55], // Gold background for header
                textColor: 255,             // White text
                fontStyle: 'bold'
            },
            alternateRowStyles: {
                fillColor: [250, 250, 250]
            },
            styles: {
                fontSize: 9,
                cellPadding: 4
            }
        });

        doc.save(`Admin_Tea_Ledger_Orders_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    const handlePrintReceipt = () => {
        window.print();
    };

    return (
        <div className="space-y-12 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="w-12 h-[2px] bg-gold"></span>
                        <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">Commercial Intelligence</span>
                    </div>
                    <h1 className="text-4xl font-heading font-bold text-primary-dark tracking-tighter">Transaction Ledger</h1>
                    <p className="text-stone-500 mt-2 max-w-md">Oversee the lifecycle of every order. Monitor fulfillment flows and transactional health with precision.</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <button onClick={handleDownloadCSV} className="bg-white border border-stone-100 text-primary-dark px-6 py-3 rounded-2xl font-bold flex items-center gap-3 hover:bg-stone-50 hover:border-gold transition-all duration-500 shadow-xl shadow-stone-200/20 group">
                        <Download size={16} className="text-stone-300 group-hover:text-gold transition-colors" />
                        <span className="text-sm tracking-tight text-stone-600 group-hover:text-primary-dark">CSV Ledger</span>
                    </button>
                    <button onClick={handleDownloadPDF} className="bg-primary-dark border border-primary-dark text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-3 hover:bg-gold hover:border-gold transition-all duration-500 shadow-xl shadow-primary-dark/20 group">
                        <FileText size={16} className="text-gold group-hover:text-white transition-colors" />
                        <span className="text-sm tracking-tight text-white/90 group-hover:text-white">PDF Report</span>
                    </button>
                </div>
            </div>

            {/* Intelligent Filters */}
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2.5rem] border border-stone-100 shadow-xl shadow-stone-200/20 flex flex-wrap gap-6 items-center">
                <div className="relative grow max-w-lg group">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Scan Order ID or Customer Identity..."
                        className="w-full bg-stone-50/50 border border-stone-100 rounded-2xl px-6 py-4 pl-14 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-gold/5 focus:border-gold/50 transition-all duration-500 placeholder:text-stone-300"
                    />
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-gold transition-colors duration-500" size={18} />
                </div>

                <div className="flex gap-4 items-center">
                    <div className="relative group">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 pointer-events-none group-hover:text-gold transition-colors" size={16} />
                        <select
                            value={options.status || ''}
                            onChange={(e) => setOptions(prev => ({ ...prev, status: e.target.value || null, page: 1 }))}
                            className="bg-stone-50/50 border border-stone-100 rounded-2xl pl-12 pr-10 py-4 text-xs font-black text-stone-500 uppercase tracking-widest focus:outline-none focus:border-gold/50 cursor-pointer transition-all appearance-none"
                        >
                            <option value="">Full History</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Dispatched</option>
                            <option value="delivered">Fulfilled</option>
                            <option value="cancelled">Voided</option>
                        </select>
                    </div>

                    <div className="hidden lg:flex items-center gap-3 ml-4 pl-8 border-l border-stone-100">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest">Global Volume</span>
                            <span className="text-sm font-black text-primary-dark tracking-tighter">{totalCount} Trx</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Refined Orders Table */}
            <div className="bg-white rounded-[2.5rem] border border-stone-100 shadow-2xl shadow-stone-200/10 overflow-hidden">
                <div className="overflow-x-auto p-2">
                    <table className="w-full text-left border-separate border-spacing-y-2">
                        <thead>
                            <tr>
                                <th className="px-8 py-4 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em]">Transaction ID</th>
                                <th className="px-6 py-4 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em]">Customer Profile</th>
                                <th className="px-6 py-4 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em]">Temporal Data</th>
                                <th className="px-6 py-4 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] text-right">Investment</th>
                                <th className="px-6 py-4 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] text-center">Fulfillment State</th>
                                <th className="px-8 py-4 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] text-right">Audit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center gap-6">
                                            <div className="relative w-12 h-12">
                                                <div className="absolute inset-0 rounded-full border-4 border-gold/10"></div>
                                                <div className="absolute inset-0 rounded-full border-4 border-gold border-t-transparent animate-spin"></div>
                                            </div>
                                            <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Synchronizing Ledger...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-2">
                                                <BadgeAlert size={32} className="text-red-400" />
                                            </div>
                                            <p className="text-xl font-heading font-bold text-red-500 uppercase tracking-tighter">Connection Error</p>
                                            <p className="text-xs text-stone-400 font-bold uppercase tracking-widest max-w-sm">{error}</p>
                                            <button
                                                onClick={() => fetchOrders(options)}
                                                className="mt-4 px-6 py-2 bg-stone-100 hover:bg-gold hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                            >
                                                Retry Synchronization
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <p className="text-xl font-heading font-bold text-stone-200 uppercase tracking-tighter italic">Ledger Empty</p>
                                            <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">No active transactions discovered. RLS active: {profile?.role}</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : orders.map((order, idx) => (
                                <motion.tr
                                    key={order.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group cursor-default"
                                >
                                    <td className="px-8 py-6 bg-stone-50/50 group-hover:bg-gold/5 rounded-l-3xl transition-all duration-500">
                                        <button
                                            onClick={() => openOrderDetails(order)}
                                            className="flex flex-col text-left group/id"
                                        >
                                            <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-1 group-hover/id:text-gold transition-colors">Manifesto</span>
                                            <span className="text-sm font-black text-primary-dark tracking-tighter group-hover/id:text-gold transition-colors italic">#{order.order_number}</span>
                                        </button>
                                    </td>
                                    <td className="px-6 py-6 bg-stone-50/50 group-hover:bg-gold/5 transition-colors duration-500 border-x border-white/50">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-2xl bg-white border border-stone-100 flex items-center justify-center font-black text-[10px] text-primary-dark/40 shadow-sm group-hover:-translate-y-1 transition-all duration-500">
                                                {order.profiles?.full_name?.charAt(0) || order.shipping_name?.charAt(0) || 'G'}
                                            </div>
                                            <div className="grow">
                                                <p className="text-sm font-black text-primary-dark leading-none tracking-tight">{order.profiles?.full_name || order.shipping_name || 'Guest'}</p>
                                                <p className="text-[10px] text-stone-400 font-bold tracking-widest mt-1.5 uppercase opacity-60">ID: {order.profiles?.phone || order.shipping_phone || 'Guest Order'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 bg-stone-50/50 group-hover:bg-gold/5 transition-colors duration-500 border-r border-white/50">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black text-stone-300 uppercase tracking-widest mb-0.5 whitespace-nowrap">Recorded On</span>
                                            <span className="text-xs font-bold text-stone-600">
                                                {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 bg-stone-50/50 group-hover:bg-gold/5 text-right transition-colors duration-500 border-r border-white/50">
                                        <div className="flex flex-col items-end">
                                            <span className="text-[9px] font-black text-stone-300 uppercase tracking-widest mb-0.5">Total Value</span>
                                            <span className="text-sm font-black text-primary-dark tracking-tighter">GHS {order.total.toFixed(2)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 bg-stone-50/50 group-hover:bg-gold/5 text-center transition-colors duration-500 border-r border-white/50">
                                        <StatusBadge status={order.status} />
                                    </td>
                                    <td className="px-8 py-6 bg-stone-50/50 group-hover:bg-gold/5 rounded-r-3xl text-right transition-all duration-500">
                                        <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                            <button
                                                onClick={() => openOrderDetails(order)}
                                                className="w-12 h-12 bg-white border border-stone-100 text-stone-400 hover:text-gold hover:border-gold rounded-2xl shadow-xl shadow-stone-200/50 transition-all flex items-center justify-center group/btn"
                                            >
                                                <Eye size={20} className="group-hover/btn:scale-110 transition-transform" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Performance Pagination */}
                <div className="p-8 bg-stone-50/30 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest">Navigation</span>
                        <p className="text-xs font-black text-primary-dark tracking-tight">
                            Viewing Phase <span className="text-gold">{options.page}</span> / {totalPages}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            disabled={options.page === 1}
                            onClick={() => setOptions(prev => ({ ...prev, page: prev.page - 1 }))}
                            className="w-12 h-12 flex items-center justify-center bg-white border border-stone-200 rounded-2xl hover:border-gold hover:text-gold disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-sm"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            disabled={options.page === totalPages}
                            onClick={() => setOptions(prev => ({ ...prev, page: prev.page + 1 }))}
                            className="w-12 h-12 flex items-center justify-center bg-white border border-stone-200 rounded-2xl hover:border-gold hover:text-gold disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-sm"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Immersive Order Detail Modal */}
            <AnimatePresence>
                {isDetailOpen && selectedOrder && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 lg:p-12 overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDetailOpen(false)}
                            className="absolute inset-0 bg-primary-dark/80 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className="bg-white w-full max-w-6xl rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative z-10 flex flex-col max-h-full"
                        >
                            <div className="h-2 bg-linear-to-r from-gold via-gold-dark to-gold animate-shimmer" />

                            {/* Modal Header */}
                            <div className="px-12 py-10 border-b border-stone-100 flex justify-between items-center bg-stone-50/50 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
                                <div className="relative z-10 flex items-center gap-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="w-8 h-px bg-gold"></span>
                                            <span className="text-[10px] font-black text-gold uppercase tracking-[0.3em]">Transaction Snapshot</span>
                                        </div>
                                        <h2 className="text-3xl font-bold font-heading text-primary-dark tracking-tight">Order #{selectedOrder.order_number}</h2>
                                    </div>
                                    <StatusBadge status={selectedOrder.status} />
                                </div>
                                <div className="flex items-center gap-3 relative z-10 print:hidden">
                                    <button onClick={handlePrintReceipt} className="w-14 h-14 bg-white hover:bg-stone-50 text-stone-300 hover:text-stone-500 rounded-2xl transition-all shadow-xl shadow-stone-200/20 flex items-center justify-center border border-stone-100">
                                        <Printer size={24} />
                                    </button>
                                    <button onClick={() => setIsDetailOpen(false)} className="w-14 h-14 bg-white hover:bg-red-50 text-stone-300 hover:text-red-400 rounded-2xl transition-all shadow-xl shadow-stone-200/20 flex items-center justify-center border border-stone-100">
                                        <X size={24} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-12 overflow-y-auto custom-scrollbar grow bg-white">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                                    {/* Left Column: Line Items & Status Control */}
                                    <div className="lg:col-span-7 space-y-12">
                                        {/* Status Orchestration */}
                                        <section className="space-y-4">
                                            <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest pl-1">Lifecycle Management</p>
                                            <div className="p-8 bg-stone-50/50 border border-stone-100 rounded-[2.5rem] flex flex-wrap gap-3">
                                                {['processing', 'shipped', 'delivered', 'cancelled'].map(status => {
                                                    const isActive = selectedOrder.status.toLowerCase() === status;
                                                    return (
                                                        <button
                                                            key={status}
                                                            disabled={actionLoading || isActive}
                                                            onClick={() => handleStatusUpdate(selectedOrder.id, status)}
                                                            className={`
                                                                px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-500 flex items-center gap-2
                                                                ${isActive
                                                                    ? 'bg-primary-dark text-white shadow-2xl shadow-primary-dark/30 scale-105'
                                                                    : 'bg-white text-stone-400 border border-stone-100 hover:border-gold hover:text-gold hover:shadow-lg hover:shadow-gold/10'}
                                                                disabled:opacity-50 disabled:cursor-not-allowed
                                                            `}
                                                        >
                                                            {isActive && <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />}
                                                            {status}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </section>

                                        {/* Manifest Items */}
                                        <section className="space-y-6">
                                            <div className="flex items-center justify-between pl-1">
                                                <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest">Inventory Manifest</p>
                                                <span className="text-[10px] font-black text-primary-dark/40 uppercase tracking-widest">{selectedOrder.order_items?.length} Items</span>
                                            </div>
                                            <div className="space-y-4">
                                                {selectedOrder.order_items?.map((item, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: idx * 0.1 }}
                                                        className="group flex gap-6 p-5 bg-white border border-stone-100 rounded-3xl hover:border-gold/30 hover:shadow-xl hover:shadow-stone-200/20 transition-all duration-500"
                                                    >
                                                        <div className="w-24 h-24 bg-stone-50 rounded-2xl overflow-hidden flex items-center justify-center p-3 border border-stone-50 group-hover:scale-105 transition-transform duration-500 shadow-inner">
                                                            <img src={item.product_image} alt={item.product_name} className="w-full h-full object-contain" />
                                                        </div>
                                                        <div className="grow flex flex-col justify-center">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <p className="text-base font-black text-primary-dark tracking-tight leading-none group-hover:text-gold transition-colors">{item.product_name}</p>
                                                                <p className="text-sm font-black text-primary-dark">GHS {item.total_price.toFixed(2)}</p>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest">Quantity: <span className="text-primary-dark/60">{item.quantity}</span></span>
                                                                <span className="w-1 h-1 bg-stone-200 rounded-full" />
                                                                <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest">Unit: <span className="text-primary-dark/60">GHS {(item.total_price / item.quantity).toFixed(2)}</span></span>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </section>
                                    </div>

                                    {/* Right Column: Profile & Logistics */}
                                    <div className="lg:col-span-5 space-y-10">
                                        <section className="space-y-4">
                                            <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest pl-1">Client Identity</p>
                                            <div className="p-8 bg-stone-50 rounded-[2.5rem] border border-stone-100 relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 p-8">
                                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-stone-100 shadow-sm text-stone-200 group-hover:text-gold group-hover:rotate-12 transition-all duration-500">
                                                        <Eye size={20} />
                                                    </div>
                                                </div>
                                                <div className="relative z-10 space-y-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-14 h-14 rounded-2xl bg-primary-dark border border-white/10 flex items-center justify-center font-black text-xl text-gold shadow-2xl">
                                                            {selectedOrder.profiles?.full_name?.charAt(0) || selectedOrder.shipping_name?.charAt(0) || 'G'}
                                                        </div>
                                                        <div>
                                                            <p className="text-lg font-black text-primary-dark tracking-tighter leading-none">{selectedOrder.profiles?.full_name || selectedOrder.shipping_name || 'Guest'}</p>
                                                            <p className="text-[10px] font-bold text-stone-400 mt-2 tracking-widest uppercase">{selectedOrder.profiles ? 'Registered' : 'Guest Checkout'}</p>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-3 pt-6 border-t border-stone-200/50">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-2 h-2 rounded-full bg-gold" />
                                                            <span className="text-xs font-bold text-stone-500">{selectedOrder.profiles?.email || '—'}</span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-2 h-2 rounded-full bg-stone-300" />
                                                            <span className="text-xs font-bold text-stone-500">{selectedOrder.profiles?.phone || selectedOrder.shipping_phone || '—'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        <section className="space-y-4">
                                            <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest pl-1">Logistics Destination</p>
                                            <div className="p-8 bg-white border border-stone-100 rounded-[2.5rem] shadow-xl shadow-stone-200/10 group hover:border-gold/30 transition-all duration-500">
                                                <div className="flex items-start gap-4 mb-4">
                                                    <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center text-stone-300 group-hover:text-gold transition-colors duration-500">
                                                        <Truck size={20} />
                                                    </div>
                                                    <div className="py-1">
                                                        <p className="text-sm text-stone-700 font-black">{selectedOrder.shipping_name}</p>
                                                        <p className="text-sm text-stone-600 font-bold mt-1">{selectedOrder.shipping_phone}</p>
                                                        <p className="text-sm text-stone-600 font-bold leading-relaxed mt-1">
                                                            {selectedOrder.shipping_address}<br />
                                                            {selectedOrder.shipping_city}, {selectedOrder.shipping_region}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        <section className="space-y-4">
                                            <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest pl-1">Fiscal Consolidation</p>
                                            <div className="p-10 bg-primary-dark rounded-[3rem] text-white shadow-2xl shadow-primary-dark/20 relative overflow-hidden group">
                                                <div className="absolute bottom-0 right-0 opacity-5 -mb-20 -mr-20 w-64 h-64 border-40 border-white rounded-full group-hover:scale-110 transition-transform duration-1000" />
                                                <div className="space-y-4 relative z-10">
                                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                                                        <span>Raw Valuation</span>
                                                        <span className="text-white/80">GHS {selectedOrder.subtotal.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                                                        <span>Logistic Levy</span>
                                                        <span className="text-white/80">GHS {selectedOrder.shipping_fee.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40 pb-4 border-b border-white/5">
                                                        <span>Statutory Tax</span>
                                                        <span className="text-white/80">GHS {selectedOrder.tax.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between items-end pt-4">
                                                        <span className="text-sm font-black uppercase tracking-[0.2em] text-gold">Grand Total</span>
                                                        <span className="text-3xl font-black tracking-tighter text-white">GHS {selectedOrder.total.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DashboardOrders;
