import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    Image as ImageIcon,
    Check,
    X,
    ChevronRight,
    Loader2,
    Package,
    Upload,
    TrendingUp,
    ChevronLeft,
    AlertCircle
} from 'lucide-react';
import { useAdminProducts, useProducts } from '../../hooks/useProducts';
import StarRating from '../shop/StarRating';

const DashboardProducts = () => {
    const { categories } = useProducts();
    const [options, setOptions] = useState({
        categorySlug: null,
        searchQuery: '',
        sortBy: 'created_at',
        sortOrder: 'desc',
        limit: 10,
        page: 1,
    });

    const { products = [], loading, totalPages, totalCount, fetchProducts, createProduct, updateProduct, deleteProduct } = useAdminProducts(options);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [uploadLoading, setUploadLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        price: '',
        category_id: '',
        image_url: '',
        stock_quantity: 0,
        is_published: true,
        sales_count: 0,
        badge: ''
    });

    useEffect(() => {
        fetchProducts(options);
    }, [options]);

    const handleSearch = (e) => {
        setOptions(prev => ({ ...prev, searchQuery: e.target.value, page: 1 }));
    };

    const handleSort = (field) => {
        setOptions(prev => ({
            ...prev,
            sortBy: field,
            sortOrder: prev.sortBy === field && prev.sortOrder === 'desc' ? 'asc' : 'desc'
        }));
    };

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                slug: product.slug,
                description: product.description || '',
                price: product.price,
                category_id: product.category_id,
                image_url: product.image_url,
                stock_quantity: product.stock_quantity,
                is_published: product.is_published,
                sales_count: product.sales_count || 0,
                badge: product.badge || ''
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                slug: '',
                description: '',
                price: '',
                category_id: categories[0]?.id || '',
                image_url: '',
                stock_quantity: 100,
                is_published: true,
                sales_count: 0,
                badge: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
            alert('Cloudinary configuration missing! Please add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to your .env file.');
            return;
        }

        setUploadLoading(true);
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);
        formDataUpload.append('upload_preset', uploadPreset);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formDataUpload,
                }
            );

            const data = await response.json();
            if (data.secure_url) {
                setFormData(prev => ({ ...prev, image_url: data.secure_url }));
            } else {
                console.error('Cloudinary upload failed:', data);
                const errorMsg = data.error?.message || 'Unknown upload error';
                alert(`Upload failed: ${errorMsg}. Please ensure your upload preset is set to "Unsigned" in Cloudinary.`);
            }
        } catch (error) {
            console.error('Error uploading to Cloudinary:', error);
            alert('Error connecting to Cloudinary.');
        } finally {
            setUploadLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setActionLoading(true);
        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id, formData);
            } else {
                await createProduct(formData);
            }
            setIsModalOpen(false);
            fetchProducts(options);
        } catch (error) {
            console.error(error);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setActionLoading(true);
            try {
                await deleteProduct(id);
                fetchProducts(options);
            } catch (error) {
                console.error(error);
            } finally {
                setActionLoading(false);
            }
        }
    };

    const togglePublish = async (product) => {
        try {
            await updateProduct(product.id, { is_published: !product.is_published });
            fetchProducts(options);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-12 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="w-12 h-[2px] bg-gold"></span>
                        <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">Supply Chain</span>
                    </div>
                    <h1 className="text-4xl font-heading font-bold text-primary-dark tracking-tighter">Inventory Vault</h1>
                    <p className="text-stone-500 mt-2 max-w-md">Orchestrate your product catalog with precision. Monitor stock levels and market visibility across all categories.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="group bg-primary-dark text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-gold hover:text-primary-dark transition-all duration-500 shadow-2xl shadow-primary-dark/20 hover:shadow-gold/40"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                    <span className="text-sm tracking-tight">Expand Collection</span>
                </button>
            </div>

            {/* Intelligent Filters */}
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2.5rem] border border-stone-100 shadow-xl shadow-stone-200/20 flex flex-wrap gap-6 items-center">
                <div className="relative grow max-w-lg group">
                    <input
                        type="text"
                        placeholder="Scan name or digital SKU..."
                        value={options.searchQuery}
                        onChange={handleSearch}
                        className="w-full bg-stone-50/50 border border-stone-100 rounded-2xl px-6 py-4 pl-14 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-gold/5 focus:border-gold/50 transition-all duration-500 placeholder:text-stone-300"
                    />
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-gold transition-colors duration-500" size={18} />
                </div>

                <div className="flex gap-4 items-center">
                    <div className="relative group">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 pointer-events-none group-hover:text-gold transition-colors" size={16} />
                        <select
                            value={options.categorySlug || ''}
                            onChange={(e) => setOptions(prev => ({ ...prev, categorySlug: e.target.value || null, page: 1 }))}
                            className="bg-stone-50/50 border border-stone-100 rounded-2xl pl-12 pr-10 py-4 text-xs font-black text-stone-500 uppercase tracking-widest focus:outline-none focus:border-gold/50 cursor-pointer transition-all appearance-none"
                        >
                            <option value="">All Architectures</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.slug}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="hidden lg:flex items-center gap-3 ml-4 pl-8 border-l border-stone-100">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest">Total Assets</span>
                            <span className="text-sm font-black text-primary-dark tracking-tighter">{totalCount}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Refined Products Table */}
            <div className="bg-white rounded-[2.5rem] border border-stone-100 shadow-2xl shadow-stone-200/10 overflow-hidden">
                <div className="overflow-x-auto p-2">
                    <table className="w-full text-left border-separate border-spacing-y-2">
                        <thead>
                            <tr>
                                <th className="px-8 py-4 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em]">Product Narrative</th>
                                <th className="px-6 py-4 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] cursor-pointer group" onClick={() => handleSort('category_id')}>
                                    <div className="flex items-center gap-2 group-hover:text-gold transition-colors">Category <Filter size={10} /></div>
                                </th>
                                <th className="px-6 py-4 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] cursor-pointer group" onClick={() => handleSort('price')}>
                                    <div className="flex items-center gap-2 group-hover:text-gold transition-colors">Valuation <Filter size={10} /></div>
                                </th>
                                <th className="px-6 py-4 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] cursor-pointer group" onClick={() => handleSort('stock_quantity')}>
                                    <div className="flex items-center gap-2 group-hover:text-gold transition-colors">Reserve <Filter size={10} /></div>
                                </th>
                                <th className="px-6 py-4 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] text-center">Feedback</th>
                                <th className="px-6 py-4 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] text-center">Status</th>
                                <th className="px-8 py-4 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] text-right">Registry</th>
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
                                            <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Synthesizing Catalog...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <p className="text-xl font-heading font-bold text-stone-200 uppercase tracking-tighter italic">Void Encountered</p>
                                            <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">No products currently registered in this view.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : products.map((product, idx) => (
                                <motion.tr
                                    key={product.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group cursor-default"
                                >
                                    <td className="px-8 py-6 bg-stone-50/50 group-hover:bg-gold/5 rounded-l-3xl transition-all duration-500">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-white rounded-2xl overflow-hidden flex items-center justify-center relative border border-stone-100 shadow-sm group-hover:shadow-md transition-all duration-500 group-hover:-translate-y-1">
                                                {product.image_url ? (
                                                    <img src={product.image_url} alt={product.name} className="w-full h-full object-contain p-2" crossOrigin="anonymous" />
                                                ) : (
                                                    <ImageIcon className="text-stone-200" size={24} />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-primary-dark uppercase tracking-widest opacity-80 mb-1">
                                                    {categories.find(c => c.id === product.category_id)?.name || 'Generic'}
                                                    {product.sales_count > 0 && (
                                                        <span className="inline-flex items-center gap-1 bg-gold/10 text-gold px-2 py-0.5 rounded-full text-[8px] ml-2">
                                                            <TrendingUp size={8} fill="currentColor" /> {product.sales_count} SOLD
                                                        </span>
                                                    )}
                                                    {product.stock_quantity <= 10 && (
                                                        <span className="inline-flex items-center gap-1 bg-red-50 text-red-500 px-2 py-0.5 rounded-full text-[8px] ml-2 animate-pulse border border-red-100">
                                                            <AlertCircle size={8} fill="currentColor" /> LOW STOCK
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="text-sm font-black text-primary-dark tracking-tight leading-none group-hover:text-gold transition-colors">{product.name}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="text-[9px] font-black text-stone-300 uppercase tracking-widest pl-1">Origin:</span>
                                                    <span className="text-[10px] font-bold text-stone-400 font-mono italic">{product.slug}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 bg-stone-50/50 group-hover:bg-gold/5 transition-colors duration-500 border-x border-white/50">
                                        <span className="inline-block text-[10px] font-black text-primary-dark/60 bg-white border border-stone-100 px-4 py-1.5 rounded-xl shadow-sm uppercase tracking-widest">
                                            {categories.find(c => c.id === product.category_id)?.name || 'Generic'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6 bg-stone-50/50 group-hover:bg-gold/5 transition-colors duration-500 border-r border-white/50">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black text-stone-300 uppercase tracking-widest mb-0.5">Price</span>
                                            <span className="text-sm font-black text-primary-dark tracking-tighter">GHS {product.price.toFixed(2)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 bg-stone-50/50 group-hover:bg-gold/5 transition-colors duration-500 border-r border-white/50">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                                <span className={product.stock_quantity > 10 ? 'text-stone-400' : 'text-red-500'}>
                                                    {product.stock_quantity} Left
                                                </span>
                                            </div>
                                            <div className="w-24 h-1.5 bg-white rounded-full overflow-hidden border border-stone-100 shadow-inner">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${Math.min((product.stock_quantity / 100) * 100, 100)}%` }}
                                                    transition={{ duration: 1, delay: 0.5 + (idx * 0.05) }}
                                                    className={`h-full ${product.stock_quantity > 10 ? 'bg-primary-dark' : 'bg-red-400'}`}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 bg-stone-50/50 group-hover:bg-gold/5 transition-colors duration-500 border-r border-white/50">
                                        <div className="flex flex-col items-center gap-1">
                                            <StarRating rating={product.average_rating || 0} size={12} />
                                            {product.review_count > 0 ? (
                                                <span className="text-[9px] font-black text-primary-dark/40 uppercase tracking-widest">{product.review_count} Reviews</span>
                                            ) : (
                                                <span className="text-[9px] font-black text-stone-300 uppercase tracking-widest italic">No Reviews</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 bg-stone-50/50 group-hover:bg-gold/5 text-center transition-colors duration-500 border-r border-white/50">
                                        <button
                                            onClick={() => togglePublish(product)}
                                            className={`
                                                inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-500 border
                                                ${product.is_published
                                                    ? 'bg-primary-dark/5 border-primary-dark/10 text-primary-dark hover:bg-primary-dark hover:text-white'
                                                    : 'bg-stone-100 border-stone-200 text-stone-400 hover:bg-gold hover:text-white hover:border-gold'}
                                            `}
                                        >
                                            <div className={`w-1.5 h-1.5 rounded-full ${product.is_published ? 'bg-gold animate-pulse' : 'bg-stone-300'}`}></div>
                                            {product.is_published ? 'Active Portfolio' : 'Draft Stage'}
                                        </button>
                                    </td>
                                    <td className="px-8 py-6 bg-stone-50/50 group-hover:bg-gold/5 rounded-r-3xl text-right transition-all duration-500">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                            <button
                                                onClick={() => handleOpenModal(product)}
                                                className="w-10 h-10 border border-gold/20 bg-white text-gold hover:bg-gold hover:text-white rounded-xl shadow-lg shadow-gold/10 transition-all flex items-center justify-center"
                                                title="Edit Blueprint"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="w-10 h-10 border border-red-100 bg-white text-red-300 hover:bg-red-500 hover:text-white rounded-xl shadow-lg shadow-red-100/50 transition-all flex items-center justify-center"
                                                title="Erase Record"
                                            >
                                                <Trash2 size={16} />
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

            {/* Asset Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 lg:p-12 overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-primary-dark/80 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className="bg-white w-full max-w-5xl rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative z-10 flex flex-col max-h-full"
                        >
                            <div className="h-2 bg-linear-to-r from-gold via-gold-dark to-gold animate-shimmer" />

                            {/* Modal Header */}
                            <div className="px-12 py-10 border-b border-stone-100 flex justify-between items-center bg-stone-50/50 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="w-8 h-px bg-gold"></span>
                                        <span className="text-[10px] font-black text-gold uppercase tracking-[0.3em]">{editingProduct ? 'Product Editor' : 'New Product Entry'}</span>
                                    </div>
                                    <h2 className="text-3xl font-bold font-heading text-primary-dark tracking-tight">
                                        {editingProduct ? 'Update Product Catalog' : 'Add to Collection'}
                                    </h2>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="w-14 h-14 bg-white hover:bg-red-50 text-stone-300 hover:text-red-400 rounded-2xl transition-all shadow-xl shadow-stone-200/20 flex items-center justify-center relative z-10 border border-stone-100">
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Modal Form */}
                            <form onSubmit={handleSubmit} className="p-12 overflow-y-auto custom-scrollbar grow bg-white">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                                    <div className="lg:col-span-7 space-y-10">
                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest pl-1">Basic Details</p>
                                            <div className="grid grid-cols-1 gap-6 p-8 bg-stone-50/50 border border-stone-100 rounded-4xl">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-neutral-700 uppercase tracking-widest ml-1">Product Name</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full bg-white border border-stone-100 rounded-2xl px-6 py-4 text-sm font-bold text-primary-dark focus:outline-none focus:ring-4 focus:ring-gold/5 focus:border-gold/50 transition-all placeholder:text-neutral-400"
                                                        placeholder="Enter the product name..."
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-neutral-700 uppercase tracking-widest ml-1">Search Engine Slug</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        value={formData.slug}
                                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                                                        className="w-full bg-white border border-stone-100 rounded-2xl px-6 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-gold/5 focus:border-gold/50 transition-all font-mono"
                                                        placeholder="lavender-sleep-tea"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest pl-1">Detailed Description</p>
                                            <div className="p-8 bg-stone-50/50 border border-stone-100 rounded-4xl">
                                                <textarea
                                                    rows="5"
                                                    value={formData.description}
                                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                    className="w-full bg-white border border-stone-100 rounded-2xl px-6 py-4 text-sm font-medium text-primary-dark focus:outline-none focus:ring-4 focus:ring-gold/5 focus:border-gold/50 transition-all resize-none placeholder:text-neutral-400 leading-relaxed"
                                                    placeholder="Enter product description and therapeutic benefits..."
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest pl-1">Market Price</p>
                                                <div className="relative group">
                                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gold font-black text-sm">GHS</span>
                                                    <input
                                                        required
                                                        type="number"
                                                        step="0.01"
                                                        value={formData.price}
                                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                        className="w-full bg-stone-50 border border-stone-100 rounded-2xl pl-16 pr-6 py-4 text-lg font-black text-primary-dark focus:outline-none focus:ring-4 focus:ring-gold/5 focus:border-gold/50 transition-all"
                                                        placeholder="0.00"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest pl-1">Inventory Count</p>
                                                <div className="relative group">
                                                    <Package className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-gold transition-colors" size={18} />
                                                    <input
                                                        required
                                                        type="number"
                                                        value={formData.stock_quantity}
                                                        onChange={(e) => setFormData({ ...formData, stock_quantity: parseInt(e.target.value) })}
                                                        className="w-full bg-stone-50 border border-stone-100 rounded-2xl pl-16 pr-6 py-4 text-sm font-bold text-primary-dark focus:outline-none focus:ring-4 focus:ring-gold/5 focus:border-gold/50 transition-all"
                                                        placeholder="Units"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-5 space-y-10">
                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest pl-1">Category Assignment</p>
                                            <div className="relative group">
                                                <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-gold transition-colors" size={18} />
                                                <select
                                                    required
                                                    value={formData.category_id}
                                                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                                    className="w-full bg-stone-50 border border-stone-100 rounded-2xl pl-16 pr-8 py-4 text-sm font-black text-primary-dark/60 uppercase tracking-widest focus:outline-none focus:border-gold/50 transition-all appearance-none cursor-pointer"
                                                >
                                                    {categories.map(cat => (
                                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest pl-1">Product Photography</p>
                                            <div className="space-y-4 p-8 bg-stone-50 rounded-[2.5rem] border border-stone-100">
                                                <div className="flex gap-4">
                                                    <div className="relative flex-1">
                                                        <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                                                        <input
                                                            type="url"
                                                            value={formData.image_url}
                                                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                                            className="w-full bg-white border border-stone-100 rounded-2xl pl-16 pr-6 py-4 text-xs font-medium text-primary-dark focus:outline-none focus:border-gold/50 transition-all placeholder:text-neutral-400"
                                                            placeholder="Digital asset URL (https://...)"
                                                        />
                                                    </div>
                                                    <div className="relative">
                                                        <input
                                                            id="file-upload"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleFileUpload}
                                                            className="hidden"
                                                        />
                                                        <label
                                                            htmlFor="file-upload"
                                                            className={`flex items-center gap-2 px-6 h-full bg-white border border-stone-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary-dark hover:border-gold/50 hover:text-gold transition-all cursor-pointer whitespace-nowrap ${uploadLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                        >
                                                            {uploadLoading ? (
                                                                <Loader2 size={16} className="animate-spin" />
                                                            ) : (
                                                                <Upload size={16} />
                                                            )}
                                                            {uploadLoading ? 'Uploading...' : 'Upload'}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="aspect-4/3 bg-white rounded-3xl border-2 border-dashed border-stone-100 flex flex-col items-center justify-center overflow-hidden relative group">
                                                    {formData.image_url ? (
                                                        <img src={formData.image_url} alt="Preview" className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700" />
                                                    ) : (
                                                        <div className="text-center p-8">
                                                            <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-stone-100 shadow-sm group-hover:rotate-12 transition-all">
                                                                <ImageIcon size={32} className="text-stone-200" />
                                                            </div>
                                                            <span className="text-[10px] font-black text-stone-200 uppercase tracking-[0.2em]">Asset Preview Null</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest pl-1">Visibility & Promotion</p>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="flex items-center gap-4 bg-stone-50 p-6 rounded-3xl border border-stone-100 hover:border-gold/30 transition-all cursor-pointer group">
                                                    <div className="relative w-6 h-6">
                                                        <input
                                                            type="checkbox"
                                                            id="published"
                                                            checked={formData.is_published}
                                                            onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                        />
                                                        <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${formData.is_published ? 'bg-gold border-gold' : 'border-stone-200'}`}>
                                                            {formData.is_published && <Check size={14} className="text-white" />}
                                                        </div>
                                                    </div>
                                                    <label htmlFor="published" className="text-xs font-black text-neutral-700 uppercase tracking-widest cursor-pointer group-hover:text-primary-dark transition-colors">Published</label>
                                                </div>

                                                <div className="flex items-center gap-4 bg-stone-50 p-6 rounded-3xl border border-stone-100">
                                                    <TrendingUp size={18} className="text-gold" />
                                                    <div className="grow">
                                                        <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1">Sales Count</p>
                                                        <input
                                                            type="number"
                                                            value={formData.sales_count}
                                                            onChange={(e) => setFormData({ ...formData, sales_count: parseInt(e.target.value) || 0 })}
                                                            className="w-full bg-white border border-stone-100 rounded-xl px-3 py-1 text-xs font-bold text-primary-dark focus:outline-none focus:border-gold/50"
                                                            placeholder="0"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="relative">
                                                    <select
                                                        value={formData.badge}
                                                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                                                        className="w-full h-full bg-stone-50 border border-stone-100 rounded-3xl px-6 py-4 text-[10px] font-black text-neutral-700 uppercase tracking-widest focus:outline-none focus:border-gold/50 cursor-pointer appearance-none transition-all"
                                                    >
                                                        <option value="">No Badge</option>
                                                        <option value="Sales">Sales</option>
                                                        <option value="Sold Out">Sold Out</option>
                                                        <option value="New">New</option>
                                                        <option value="Trending">Trending</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-16 flex gap-6 pt-12 border-t border-stone-100">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="w-1/3 bg-white border border-stone-200 text-stone-400 font-black py-6 rounded-4xl hover:bg-stone-50 hover:text-stone-600 transition-all uppercase tracking-[0.3em] text-[10px]"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={actionLoading}
                                        className="grow bg-primary-dark text-white font-black py-6 rounded-4xl hover:bg-gold hover:text-primary-dark transition-all uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 shadow-2xl shadow-primary-dark/20 hover:shadow-gold/40"
                                    >
                                        {actionLoading ? <Loader2 className="animate-spin" size={20} /> : <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_rgba(212,175,55,1)]" />}
                                        {editingProduct ? 'Update Product' : 'Create Product'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DashboardProducts;
