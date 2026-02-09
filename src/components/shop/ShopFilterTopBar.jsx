import React from 'react';
import { Search, X, ChevronDown } from 'lucide-react';

const ShopFilterTopBar = () => {
    return (
        <div className="space-y-6 mb-12">
            {/* Search and Sort */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                <div className="relative w-full md:max-w-md">
                    <input
                        type="text"
                        placeholder="Search...."
                        className="w-full bg-[#f1f3f2] border-none px-6 py-3 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-gold rounded-sm italic font-serif"
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                </div>

                <div className="flex items-center gap-4 self-end md:self-auto">
                    <span className="text-sm font-bold text-primary-dark whitespace-nowrap">Sort by:</span>
                    <div className="relative">
                        <select className="appearance-none bg-white border border-stone-200 px-6 py-2 pr-12 text-sm text-stone-600 focus:outline-none rounded-md cursor-pointer font-serif italic">
                            <option>Most Popular</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Newest First</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Active Filters and Results */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-stone-100">
                <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-primary-dark">Active Filter</span>
                    <div className="flex items-center gap-2 bg-[#425043] text-white px-4 py-1.5 rounded-sm text-xs font-medium">
                        Cholesterol Management Teas
                    </div>
                    <span className="text-sm text-stone-400 font-serif italic">
                        <span className="font-bold text-primary-dark not-italic">65,867</span> Results found.
                    </span>
                </div>

                <button className="flex items-center gap-2 text-gold hover:text-gold-dark transition-colors text-sm font-bold">
                    Clear All
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default ShopFilterTopBar;
