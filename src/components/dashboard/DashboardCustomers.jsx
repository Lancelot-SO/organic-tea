import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    User,
    Mail,
    Phone,
    Calendar,
    MoreVertical,
    Filter,
    ChevronLeft,
    ChevronRight,
    Loader2
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const DashboardCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [updatingId, setUpdatingId] = useState(null);
    const limit = 10;

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('profiles')
                .select('*', { count: 'exact' })
                .neq('role', 'admin');

            if (searchQuery) {
                query = query.or(`full_name.ilike.%${searchQuery}%,phone.ilike.%${searchQuery}%`);
            }

            const { data, error, count } = await query
                .order('created_at', { ascending: false })
                .range((page - 1) * limit, page * limit - 1);

            if (error) throw error;
            setCustomers(data || []);
            setTotalCount(count || 0);
        } catch (error) {
            console.error('Error fetching customers:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchCustomers();
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery, page]);

    const updateCustomerRole = async (customerId, newRole) => {
        setUpdatingId(customerId);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ role: newRole })
                .eq('id', customerId);

            if (error) throw error;

            // Optimistically update the local state without a full refetch
            setCustomers(customers.map(c =>
                c.id === customerId ? { ...c, role: newRole } : c
            ));
        } catch (error) {
            console.error('Error updating customer role:', error.message);
            alert(`Failed to update role: ${error.message}`);
        } finally {
            setUpdatingId(null);
        }
    };

    const totalPages = Math.ceil(totalCount / limit);

    return (
        <div className="space-y-12 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="w-12 h-[2px] bg-gold"></span>
                        <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">Demographic Intelligence</span>
                    </div>
                    <h1 className="text-4xl font-heading font-bold text-primary-dark tracking-tighter">Guest Registry</h1>
                    <p className="text-stone-500 mt-2 max-w-md">Oversee the collective consciousness of your tea community. Manage identities and engagement with precision.</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-1">Total Population</span>
                        <span className="text-2xl font-black text-primary-dark tracking-tighter italic">{totalCount} Residents</span>
                    </div>
                </div>
            </div>

            {/* Intelligent Filters */}
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2.5rem] border border-stone-100 shadow-xl shadow-stone-200/20 flex flex-wrap gap-6 items-center">
                <div className="relative grow max-w-lg group">
                    <input
                        type="text"
                        placeholder="Scan Name or Digital Identity..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setPage(1);
                        }}
                        className="w-full bg-stone-50/50 border border-stone-100 rounded-2xl px-6 py-4 pl-14 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-gold/5 focus:border-gold/50 transition-all duration-500 placeholder:text-stone-300"
                    />
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-gold transition-colors duration-500" size={18} />
                </div>

                <div className="flex gap-4 items-center ml-auto">
                    <div className="hidden lg:flex items-center gap-3 pl-8 border-l border-stone-100">
                        <div className={`w-10 h-10 rounded-xl bg-gold/5 border border-gold/10 flex items-center justify-center text-gold`}>
                            <User size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest">Active Search</span>
                            <span className="text-xs font-bold text-primary-dark tracking-tight">{searchQuery ? `Scanning: ${searchQuery}` : 'Full Spectrum'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Refined Customers Table */}
            <div className="bg-white rounded-[2.5rem] border border-stone-100 shadow-2xl shadow-stone-200/10 overflow-hidden">
                <div className="overflow-x-auto p-2">
                    <table className="w-full text-left border-separate border-spacing-y-2">
                        <thead>
                            <tr>
                                <th className="px-8 py-4 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em]">Customer Profile</th>
                                <th className="px-6 py-4 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em]">Digital Contact</th>
                                <th className="px-6 py-4 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em]">Geographic Node</th>
                                <th className="px-6 py-4 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] text-center">Access Level</th>
                                <th className="px-8 py-4 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] text-right">Registry Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center gap-6">
                                            <div className="relative w-12 h-12">
                                                <div className="absolute inset-0 rounded-full border-4 border-gold/10"></div>
                                                <div className="absolute inset-0 rounded-full border-4 border-gold border-t-transparent animate-spin"></div>
                                            </div>
                                            <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Synchronizing Registry...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : customers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <p className="text-xl font-heading font-bold text-stone-200 uppercase tracking-tighter italic">Registry Empty</p>
                                            <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">No matching identities discovered.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : customers.map((customer, idx) => (
                                <motion.tr
                                    key={customer.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group cursor-default"
                                >
                                    <td className="px-8 py-6 bg-stone-50/50 group-hover:bg-gold/5 rounded-l-3xl transition-all duration-500">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white border border-stone-100 flex items-center justify-center font-black text-[10px] text-primary-dark/40 shadow-sm group-hover:-translate-y-1 transition-all duration-500 overflow-hidden relative">
                                                <div className="absolute inset-x-0 bottom-0 h-1 bg-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                                                {customer.full_name?.charAt(0) || 'G'}
                                            </div>
                                            <div className="grow">
                                                <p className="text-sm font-black text-primary-dark leading-none tracking-tight group-hover:text-gold transition-colors">{customer.full_name || 'Generic Identity'}</p>
                                                <p className="text-[10px] text-stone-400 font-bold tracking-widest mt-1.5 uppercase opacity-60 italic">UID: {customer.id.slice(0, 12)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 bg-stone-50/50 group-hover:bg-gold/5 transition-colors duration-500 border-x border-white/50">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2 text-stone-600">
                                                <Mail size={12} className="text-stone-300 group-hover:text-gold transition-colors" />
                                                <span className="text-[11px] font-bold tracking-tight">{customer.email || 'Encrypted'}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-stone-600 opacity-60">
                                                <Phone size={12} className="text-stone-300" />
                                                <span className="text-[10px] font-bold tracking-widest">{customer.phone || 'No direct dial'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 bg-stone-50/50 group-hover:bg-gold/5 transition-colors duration-500 border-r border-white/50">
                                        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-white border border-stone-100 rounded-xl">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gold/40 animate-pulse" />
                                            <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest">
                                                {customer.region || 'Global Node'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 bg-stone-50/50 group-hover:bg-gold/5 transition-colors duration-500 border-x border-white/50 text-center">
                                        <div className="inline-flex justify-center transition-opacity">
                                            {updatingId === customer.id ? (
                                                <Loader2 size={16} className="animate-spin text-gold mx-auto" />
                                            ) : (
                                                <select
                                                    value={customer.role || 'guest'}
                                                    onChange={(e) => updateCustomerRole(customer.id, e.target.value)}
                                                    className={`appearance-none bg-white border outline-none text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl cursor-pointer transition-colors shadow-sm
                                                        ${customer.role === 'admin'
                                                            ? 'border-gold text-gold hover:bg-gold hover:text-white'
                                                            : 'border-stone-200 text-stone-500 hover:border-gold hover:text-gold'
                                                        }`}
                                                >
                                                    <option value="guest" className="text-stone-700 font-bold bg-white">Guest</option>
                                                    <option value="admin" className="text-stone-700 font-bold bg-white">Admin</option>
                                                </select>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 bg-stone-50/50 group-hover:bg-gold/5 rounded-r-3xl text-right transition-all duration-500">
                                        <div className="flex flex-col items-end">
                                            <span className="text-[9px] font-black text-stone-300 uppercase tracking-widest mb-0.5">Established On</span>
                                            <div className="flex items-center gap-2 text-stone-500 font-bold text-xs uppercase tracking-tighter">
                                                <Calendar size={12} className="text-stone-200" />
                                                {new Date(customer.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
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
                            Scanning Page <span className="text-gold">{page}</span> / {totalPages || 1}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(prev => prev - 1)}
                            className="w-12 h-12 flex items-center justify-center bg-white border border-stone-200 rounded-2xl hover:border-gold hover:text-gold disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-sm"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            disabled={page >= totalPages}
                            onClick={() => setPage(prev => prev + 1)}
                            className="w-12 h-12 flex items-center justify-center bg-white border border-stone-200 rounded-2xl hover:border-gold hover:text-gold disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-sm"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardCustomers;
