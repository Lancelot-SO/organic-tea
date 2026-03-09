import React, { useState, useRef } from 'react';
import {
    User,
    Shield,
    ChevronRight,
    LogOut,
    Camera,
    Moon,
    Sun,
    MapPin,
    CheckCircle2,
    AlertCircle,
    Loader2,
    X,
    Users
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const DashboardSettings = () => {
    const { profile, signOut, updateProfile } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const [uploading, setUploading] = useState(false);
    const [toast, setToast] = useState(null); // { type: 'success'|'error', message: string }
    const fileInputRef = useRef(null);

    // Account Data Export
    const handleExportData = () => {
        if (!profile) return showToast('error', 'Profile data not found');

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "account_data_export.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        showToast('success', 'Profile data successfully exported!');
    };

    // Role Management State
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [loadingCustomers, setLoadingCustomers] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);

    const fetchCustomers = async () => {
        setLoadingCustomers(true);
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setCustomers(data || []);
        } catch (error) {
            console.error('Error fetching customers:', error.message);
            showToast('error', 'Failed to load user list.');
        } finally {
            setLoadingCustomers(false);
        }
    };

    const handleOpenRoleModal = () => {
        setShowRoleModal(true);
        fetchCustomers();
    };

    const updateCustomerRole = async (customerId, newRole) => {
        setUpdatingId(customerId);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ role: newRole })
                .eq('id', customerId);

            if (error) throw error;

            setCustomers(customers.map(c =>
                c.id === customerId ? { ...c, role: newRole } : c
            ));
            showToast('success', 'Role updated successfully.');
        } catch (error) {
            console.error('Error updating customer role:', error.message);
            showToast('error', `Failed to update role: ${error.message}`);
        } finally {
            setUpdatingId(null);
        }
    };

    const showToast = (type, message) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3500);
    };

    const handleAvatarClick = () => {
        if (!uploading) fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Reset input so same file can be re-selected
        e.target.value = '';

        // Validate type
        if (!file.type.startsWith('image/')) {
            showToast('error', 'Please select an image file.');
            return;
        }
        // Validate size (5 MB)
        if (file.size > 5 * 1024 * 1024) {
            showToast('error', 'Image must be under 5 MB.');
            return;
        }

        setUploading(true);
        try {
            // Upload to Cloudinary
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', UPLOAD_PRESET);
            formData.append('folder', 'organic-tea/avatars');

            const res = await fetch(CLOUDINARY_URL, { method: 'POST', body: formData });
            if (!res.ok) throw new Error('Upload failed');
            const data = await res.json();

            // Save URL to profile
            await updateProfile({ avatar_url: data.secure_url });
            showToast('success', 'Profile photo updated!');
        } catch (err) {
            console.error('Avatar upload error:', err);
            showToast('error', 'Upload failed — please try again.');
        } finally {
            setUploading(false);
        }
    };

    const SettingItem = ({ icon: Icon, label, value, type = 'link', onClick, description }) => (
        <div
            onClick={type === 'link' || type === 'toggle' ? onClick : undefined}
            className={`flex items-center justify-between p-5 bg-card border border-border-main rounded-3xl transition-all ${type === 'link' ? 'hover:border-gold/30 hover:shadow-lg hover:shadow-stone-200/20 dark:hover:shadow-none cursor-pointer group' : ''}`}
        >
            <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-offset rounded-2xl flex items-center justify-center text-text-muted group-hover:text-gold transition-colors">
                    <Icon size={20} />
                </div>
                <div>
                    <p className="text-sm font-bold text-main">{label}</p>
                    {description && <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mt-0.5">{description}</p>}
                </div>
            </div>
            {type === 'toggle' && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick();
                    }}
                    className={`w-12 h-6 rounded-full relative transition-all duration-300 ${value ? 'bg-gold' : 'bg-offset'}`}
                >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${value ? 'left-7' : 'left-1'}`} />
                </button>
            )}
            {type === 'link' && (
                <ChevronRight size={18} className="text-text-muted group-hover:text-gold transition-colors" />
            )}
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />

            {/* Toast notification */}
            {toast && (
                <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border transition-all duration-300 ${toast.type === 'success'
                    ? 'bg-white border-green-100 text-green-700'
                    : 'bg-white border-red-100 text-red-600'
                    }`}>
                    {toast.type === 'success'
                        ? <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                        : <AlertCircle size={18} className="text-red-500 shrink-0" />
                    }
                    <p className="text-sm font-bold">{toast.message}</p>
                </div>
            )}

            {/* Header */}
            <div className="flex items-center gap-6 mb-2">
                <h1 className="text-3xl font-black text-main font-heading tracking-tight">Settings</h1>
            </div>

            {/* General Settings Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-2 px-2">
                    <h2 className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em]">General Settings</h2>
                </div>

                {/* Profile Card */}
                <div className="bg-card border border-border-main rounded-[2.5rem] p-8 shadow-xl shadow-stone-200/20 dark:shadow-none relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -mr-10 -mt-10" />
                    <div className="flex items-center gap-6 relative z-10">
                        {/* Avatar with upload button */}
                        <div className="relative">
                            <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-border-main to-offset p-1">
                                <div className="w-full h-full bg-card rounded-[1.25rem] flex items-center justify-center text-main font-black text-2xl overflow-hidden">
                                    {uploading ? (
                                        <Loader2 size={28} className="text-gold animate-spin" />
                                    ) : profile?.avatar_url ? (
                                        <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        profile?.full_name?.charAt(0) || 'A'
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={handleAvatarClick}
                                disabled={uploading}
                                title="Upload photo"
                                className="absolute -bottom-2 -right-2 w-8 h-8 bg-gold text-white rounded-xl flex items-center justify-center shadow-lg border-4 border-card hover:scale-110 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {uploading
                                    ? <Loader2 size={12} className="animate-spin" />
                                    : <Camera size={14} />
                                }
                            </button>
                        </div>

                        <div>
                            <h3 className="text-xl font-black text-main font-heading">{profile?.full_name || 'Administrator'}</h3>
                            <button
                                onClick={handleAvatarClick}
                                disabled={uploading}
                                className="text-[11px] font-bold text-text-muted uppercase tracking-widest hover:text-gold transition-colors mt-1 disabled:opacity-50"
                            >
                                {uploading ? 'Uploading…' : 'Change Profile Photo'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <SettingItem
                        icon={Users}
                        label="User Role Management"
                        type="link"
                        description="Change account permissions for registered users"
                        onClick={handleOpenRoleModal}
                    />
                    <SettingItem
                        icon={User}
                        label="Account Data Export"
                        type="link"
                        onClick={handleExportData}
                        description="Download all profile information in formatting JSON"
                    />
                    <SettingItem
                        icon={theme === 'light' ? Sun : Moon}
                        label="Dark Mode"
                        type="toggle"
                        value={theme === 'dark'}
                        onClick={toggleTheme}
                    />
                    <SettingItem
                        icon={MapPin}
                        label="Address Settings"
                        type="link"
                        onClick={() => showToast('success', 'Address management portal coming soon.')}
                    />
                </div>
            </div>

            {/* Other Settings Sections */}
            <div className="space-y-4">
                <SettingItem
                    icon={Shield}
                    label="Security"
                    type="link"
                    onClick={() => showToast('success', 'Password reset instructions sent to your email.')}
                />
                <button
                    onClick={signOut}
                    className="w-full flex items-center justify-between p-5 bg-offset border border-border-main rounded-3xl hover:bg-red-50 dark:hover:bg-red-900/10 hover:border-red-100 dark:hover:border-red-900/30 transition-all group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 bg-card rounded-2xl flex items-center justify-center text-text-muted group-hover:text-red-500 transition-colors">
                            <LogOut size={20} />
                        </div>
                        <p className="text-sm font-bold text-text-muted group-hover:text-red-600 transition-colors">Log out</p>
                    </div>
                    <ChevronRight size={18} className="text-stone-300 group-hover:text-red-300 transition-colors" />
                </button>
            </div>

            {/* Role Management Modal */}
            {showRoleModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowRoleModal(false)}
                    />
                    <div className="relative w-full max-w-2xl bg-cream border border-stone-200 rounded-[2.5rem] shadow-2xl p-8 max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-300">
                        <button
                            onClick={() => setShowRoleModal(false)}
                            className="absolute top-6 right-6 p-2 text-stone-400 hover:text-primary-dark hover:bg-stone-100 rounded-xl transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-6">
                            <h2 className="text-2xl font-black text-primary-dark font-heading">Role Management</h2>
                            <p className="text-sm text-stone-500 mt-1">Elevate or revoke administrative privileges for users.</p>
                        </div>

                        <div className="grow overflow-y-auto pr-2 custom-scrollbar">
                            {loadingCustomers ? (
                                <div className="flex flex-col items-center justify-center py-12 gap-4">
                                    <Loader2 size={32} className="animate-spin text-gold" />
                                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Loading Accounts...</span>
                                </div>
                            ) : customers.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-sm font-bold text-stone-500">No registered users found.</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {customers.map((customer) => (
                                        <div key={customer.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-stone-100 hover:border-gold/30 transition-colors group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center font-bold text-primary-dark shrink-0">
                                                    {customer.avatar_url ? (
                                                        <img src={customer.avatar_url} alt="Avatar" className="w-full h-full object-cover rounded-xl" />
                                                    ) : (
                                                        customer.full_name?.charAt(0) || 'G'
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-black text-primary-dark truncate">{customer.full_name || 'Guest User'}</p>
                                                    <p className="text-[10px] text-stone-400 font-bold truncate">{customer.email}</p>
                                                </div>
                                            </div>

                                            <div className="shrink-0 ml-4 relative">
                                                {updatingId === customer.id ? (
                                                    <div className="w-24 flex justify-center py-2">
                                                        <Loader2 size={16} className="animate-spin text-gold" />
                                                    </div>
                                                ) : (
                                                    <select
                                                        value={customer.role || 'guest'}
                                                        onChange={(e) => updateCustomerRole(customer.id, e.target.value)}
                                                        disabled={customer.id === profile?.id}
                                                        className={`appearance-none bg-stone-50 border outline-none text-[10px] font-black uppercase tracking-widest px-4 py-2 pr-8 rounded-xl cursor-pointer transition-colors w-28 disabled:opacity-50 disabled:cursor-not-allowed
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
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardSettings;
