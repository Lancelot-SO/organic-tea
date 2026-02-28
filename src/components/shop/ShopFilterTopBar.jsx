import React from 'react';
import { Search, X, ChevronDown } from 'lucide-react';

const ShopFilterTopBar = ({
    searchQuery,
    onSearch,
    onSort,
    totalCount,
    activeCategory,
    onClear
}) => {
    return (
        <div className="space-y-6 mb-12">
            {/* Search and Sort */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                <div className="relative w-full md:max-w-md">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearch(e.target.value)}
                        placeholder="Search products...."
                        className="w-full bg-[#f1f3f2] border-none px-6 py-3 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-gold rounded-sm italic font-serif"
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                </div>

                <div className="flex items-center gap-4 self-end md:self-auto">
                    <span className="text-sm font-bold text-primary-dark whitespace-nowrap uppercase tracking-widest text-[10px]">Sort by:</span>
                    <div className="relative">
                        <select
                            onChange={(e) => onSort(e.target.value)}
                            className="appearance-none bg-white border border-stone-200 px-6 py-2 pr-12 text-sm text-stone-600 focus:outline-none rounded-md cursor-pointer font-serif italic"
                        >
                            <option>Newest First</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Most Popular</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Active Filters and Results */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-stone-100">
                <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-primary-dark uppercase tracking-widest text-[10px]">Active Filters:</span>
                    {activeCategory && (
                        <div className="flex items-center gap-2 bg-[#425043] text-white px-4 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest">
                            {activeCategory}
                        </div>
                    )}
                    {searchQuery && (
                        <div className="flex items-center gap-2 bg-gold text-white px-4 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest">
                            Search: {searchQuery}
                        </div>
                    )}
                    {!activeCategory && !searchQuery && (
                        <span className="text-[10px] font-bold text-stone-300 uppercase tracking-widest">None</span>
                    )}

                    <span className="text-sm text-stone-400 font-serif italic ml-4">
                        <span className="font-bold text-primary-dark not-italic">{totalCount}</span> Results found.
                    </span>
                </div>

                {(activeCategory || searchQuery) && (
                    <button
                        onClick={onClear}
                        className="flex items-center gap-2 text-gold hover:text-gold-dark transition-colors text-[10px] font-black uppercase tracking-[0.2em]"
                    >
                        Clear All
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ShopFilterTopBar;

