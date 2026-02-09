import React from 'react';
import { Search } from 'lucide-react';

const BlogFilter = ({ activeCategory, setActiveCategory, searchQuery, setSearchQuery }) => {
    const categories = ['All', 'Health & Lifestyle', 'Nutrition', 'Recipes'];

    return (
        <div className="bg-white border-b border-stone-100 py-6 sticky top-[80px] z-50 shadow-sm">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`text-sm font-bold uppercase tracking-widest transition-all relative py-2 ${activeCategory === cat
                                        ? 'text-primary-dark after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gold'
                                        : 'text-stone-400 hover:text-gold'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-[350px]">
                        <input
                            type="text"
                            placeholder="Search...."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-100 rounded-sm px-6 py-3.5 pr-14 text-sm focus:outline-none focus:ring-1 focus:ring-gold/20 focus:border-gold transition-all placeholder:text-stone-300"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-dark text-white rounded-sm hover:bg-gold transition-colors">
                            <Search className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogFilter;
