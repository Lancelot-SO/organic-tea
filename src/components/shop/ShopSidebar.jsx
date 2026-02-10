import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ShoppingCart, ArrowRight, ChevronDown } from 'lucide-react';
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

const ShopSidebar = () => {
    const categories = [
        "Anti-Inflammatory Teas", "Aphrodisiac - Power Teas", "Beauty Teas",
        "Blood Pressure Teas", "Cholesterol Management Teas", "Cramps",
        "Detox Teas", "Digestion", "Gift Card", "Liver & Kidneys",
        "SWEETNER", "Teas for Immune System Boost", "Uncategorized", "Weight Loss Teas"
    ];

    const priceRanges = [
        "Under Ghs.10", "Under Ghs.50", "Ghs.60 To Ghs.100",
        "Ghs.110 To Ghs.240", "Ghs.250 To Ghs.300", "Ghs.310 To Ghs.350"
    ];

    return (
        <aside className="space-y-12 lg:pr-8">
            {/* Tea Categories */}
            <CollapsibleSection title="Tea Categories">
                {categories.map((cat, idx) => (
                    <label key={idx} className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative flex items-center justify-center w-5 h-5">
                            <input
                                type="radio"
                                name="category"
                                className="peer appearance-none w-5 h-5 border-2 border-stone-200 rounded-full checked:border-gold transition-all"
                                defaultChecked={cat === "Cholesterol Management Teas"}
                            />
                            <div className="absolute w-2.5 h-2.5 bg-gold rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-sm text-stone-500 group-hover:text-primary-dark transition-colors">
                            {cat}
                        </span>
                    </label>
                ))}
            </CollapsibleSection>

            {/* Price Range */}
            <CollapsibleSection title="Price Range">
                {/* Custom Slider Track Placeholder */}
                <div className="px-2 pt-2 pb-6">
                    <div className="relative h-1 bg-stone-200 rounded-full">
                        <div className="absolute left-[10%] right-[60%] h-full bg-gold rounded-full" />
                        <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-gold rounded-full shadow-md cursor-pointer" />
                        <div className="absolute right-[60%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-gold rounded-full shadow-md cursor-pointer" />
                    </div>
                    <div className="flex gap-4 mt-8">
                        <input
                            type="text"
                            placeholder="Min Price"
                            className="w-1/2 bg-stone-50 border border-stone-100 px-4 py-2 text-xs focus:outline-none focus:border-gold"
                            defaultValue="Min Price"
                        />
                        <input
                            type="text"
                            placeholder="Max Price"
                            className="w-1/2 bg-stone-50 border border-stone-100 px-4 py-2 text-xs focus:outline-none focus:border-gold"
                            defaultValue="Max Price"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    {priceRanges.map((range, idx) => (
                        <label key={idx} className="flex items-center gap-3 group cursor-pointer">
                            <div className="relative flex items-center justify-center w-5 h-5">
                                <input
                                    type="radio"
                                    name="price-range"
                                    className="peer appearance-none w-5 h-5 border-2 border-stone-200 rounded-full checked:border-gold transition-all"
                                    defaultChecked={range === "Ghs.250 To Ghs.300"}
                                />
                                <div className="absolute w-2.5 h-2.5 bg-gold rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-sm text-stone-500 group-hover:text-primary-dark transition-colors">
                                {range}
                            </span>
                        </label>
                    ))}
                </div>
            </CollapsibleSection>

            {/* Tea Type */}
            <CollapsibleSection title="Tea Type">
                {["Loose Tea", "Tea Bags"].map((type, idx) => (
                    <label key={idx} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                className="w-5 h-5 accent-gold cursor-pointer"
                                defaultChecked
                            />
                            <span className="text-sm text-stone-500 group-hover:text-primary-dark transition-colors">
                                {type}
                            </span>
                        </div>
                        <span className="text-xs text-stone-300 font-bold">(5)</span>
                    </label>
                ))}
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
                    {/* Glass Box */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl w-full">
                        <h4 className="text-2xl font-bold text-white font-heading mb-4">Collection Of <br /> Herb Tea</h4>
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-white/80 text-xs font-serif italic">Only for:</span>
                            <div className="bg-[#c4cfc4]/80 text-primary-dark px-3 py-1 rounded-sm font-bold text-sm">
                                $299 USD
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
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
