import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowRight, ChevronDown } from 'lucide-react';
import product1 from '../../assets/images/product1.jpeg';

const CollapsibleSection = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="space-y-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center group"
            >
                <h4 className="text-xl font-bold text-primary-dark font-heading group-hover:text-gold transition-colors">
                    {title}
                </h4>
                <ChevronDown className={`w-5 h-5 text-stone-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="space-y-3 pt-2 pb-4">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ShopSidebar = ({ categories = [], selectedCategory, onCategoryChange, priceMin, priceMax, onPriceChange }) => {
    const priceRanges = [
        { label: "Under GHS 10", min: null, max: 10 },
        { label: "Under GHS 50", min: null, max: 50 },
        { label: "GHS 60 To GHS 100", min: 60, max: 100 },
        { label: "GHS 110 To GHS 240", min: 110, max: 240 },
        { label: "GHS 250 To GHS 300", min: 250, max: 300 },
        { label: "GHS 310 To GHS 350", min: 310, max: 350 },
    ];

    const isPriceRangeSelected = (range) => {
        return (priceMin === range.min || (priceMin === null && range.min === null))
            && (priceMax === range.max || (priceMax === null && range.max === null));
    };

    const isNoPriceFilter = priceMin === null && priceMax === null;

    // Calculate slider visual positions based on min/max inputs
    const sliderMin = priceMin !== null && priceMin !== '' ? Number(priceMin) : 0;
    const sliderMax = priceMax !== null && priceMax !== '' ? Number(priceMax) : 500;
    const leftPercent = Math.max(0, Math.min(100, (sliderMin / 500) * 100));
    const rightPercent = Math.max(0, Math.min(100, 100 - (sliderMax / 500) * 100));

    return (
        <aside className="space-y-12 lg:pr-8">
            {/* Tea Categories */}
            <CollapsibleSection title="Tea Categories">
                <label className="flex items-center gap-3 group cursor-pointer">
                    <div className="relative flex items-center justify-center w-5 h-5">
                        <input
                            type="radio"
                            name="category"
                            className="peer appearance-none w-5 h-5 border-2 border-stone-200 rounded-full checked:border-gold transition-all"
                            checked={selectedCategory === null}
                            onChange={() => onCategoryChange(null)}
                        />
                        <div className="absolute w-2.5 h-2.5 bg-gold rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-sm text-stone-500 group-hover:text-primary-dark transition-colors">
                        All Products
                    </span>
                </label>
                {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative flex items-center justify-center w-5 h-5">
                            <input
                                type="radio"
                                name="category"
                                className="peer appearance-none w-5 h-5 border-2 border-stone-200 rounded-full checked:border-gold transition-all"
                                checked={selectedCategory === cat.slug}
                                onChange={() => onCategoryChange(cat.slug)}
                            />
                            <div className="absolute w-2.5 h-2.5 bg-gold rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-sm text-stone-500 group-hover:text-primary-dark transition-colors line-clamp-1">
                            {cat.name}
                        </span>
                    </label>
                ))}
            </CollapsibleSection>

            {/* Price Range */}
            <CollapsibleSection title="Price Range">
                <div className="px-2 pt-2 pb-6">
                    <div className="relative h-1 bg-stone-200 rounded-full">
                        <div
                            className="absolute h-full bg-gold rounded-full transition-all duration-200"
                            style={{ left: `${leftPercent}%`, right: `${rightPercent}%` }}
                        />
                    </div>
                    <div className="flex gap-4 mt-8">
                        <div className="w-1/2">
                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1 ml-1">Min</p>
                            <input
                                type="number"
                                placeholder="0"
                                value={priceMin ?? ''}
                                onChange={(e) => onPriceChange(e.target.value === '' ? null : Number(e.target.value), priceMax)}
                                className="w-full bg-stone-50 border border-stone-100 px-4 py-2 text-xs focus:outline-none focus:border-gold rounded-sm"
                            />
                        </div>
                        <div className="w-1/2">
                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1 ml-1">Max</p>
                            <input
                                type="number"
                                placeholder="500"
                                value={priceMax ?? ''}
                                onChange={(e) => onPriceChange(priceMin, e.target.value === '' ? null : Number(e.target.value))}
                                className="w-full bg-stone-50 border border-stone-100 px-4 py-2 text-xs focus:outline-none focus:border-gold rounded-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    {/* All prices option */}
                    <label className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative flex items-center justify-center w-5 h-5">
                            <input
                                type="radio"
                                name="price-range"
                                className="peer appearance-none w-5 h-5 border-2 border-stone-200 rounded-full checked:border-gold transition-all"
                                checked={isNoPriceFilter}
                                onChange={() => onPriceChange(null, null)}
                            />
                            <div className="absolute w-2.5 h-2.5 bg-gold rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-sm text-stone-500 group-hover:text-primary-dark transition-colors">
                            All Prices
                        </span>
                    </label>
                    {priceRanges.map((range, idx) => (
                        <label key={idx} className="flex items-center gap-3 group cursor-pointer">
                            <div className="relative flex items-center justify-center w-5 h-5">
                                <input
                                    type="radio"
                                    name="price-range"
                                    className="peer appearance-none w-5 h-5 border-2 border-stone-200 rounded-full checked:border-gold transition-all"
                                    checked={isPriceRangeSelected(range)}
                                    onChange={() => onPriceChange(range.min, range.max)}
                                />
                                <div className="absolute w-2.5 h-2.5 bg-gold rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-sm text-stone-500 group-hover:text-primary-dark transition-colors">
                                {range.label}
                            </span>
                        </label>
                    ))}
                </div>
            </CollapsibleSection>

            {/* Sidebar Promo Card */}
            <div className="relative rounded-2xl overflow-hidden group h-[450px] shadow-lg">
                <img
                    src={product1}
                    alt="Promo"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl w-full">
                        <h4 className="text-2xl font-bold text-white font-heading mb-4">Collection Of <br /> Herb Tea</h4>
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-white/80 text-xs font-serif italic">Only for:</span>
                            <div className="bg-[#c4cfc4]/80 text-primary-dark px-3 py-1 rounded-sm font-bold text-sm">
                                GHS 299
                            </div>
                        </div>
                    </div>

                    <div className="w-full space-y-3">
                        <button className="w-full bg-[#425043] hover:bg-gold text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-lg">
                            <ShoppingCart className="w-4 h-4" />
                            Add To Cart
                        </button>
                        <button className="w-full border-2 border-white text-white hover:bg-white hover:text-primary-dark py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300">
                            View Details
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default ShopSidebar;

