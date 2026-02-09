import React from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogSidebar = () => {
    const tags = ['African tea', 'Antioxidant', 'Harvesting Tea', 'Hibiscus', 'Healthy Habits'];
    const categories = [
        { name: 'Health & Lifestyle', count: 12 },
        { name: 'Nutrition', count: 8 },
        { name: 'Recipes', count: 15 }
    ];

    return (
        <aside className="space-y-12 mt-10">
            {/* Search */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search...."
                    className="w-full bg-stone-50 border border-stone-100 px-5 py-3 pr-12 text-sm focus:outline-none focus:border-gold transition-colors italic font-serif"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary-dark text-white rounded-md hover:bg-gold transition-colors">
                    <Search className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Popular Tags */}
            <div className="space-y-6">
                <h4 className="text-xl font-bold text-gold font-heading border-b border-stone-100 pb-4">Popular Tags</h4>
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <button key={tag} className="px-4 py-2 bg-stone-50 border border-stone-100 text-stone-500 text-xs font-bold hover:bg-gold hover:text-white hover:border-gold transition-all">
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Categories */}
            <div className="space-y-6">
                <h4 className="text-xl font-bold text-gold font-heading border-b border-stone-100 pb-4">Blog Categories</h4>
                <ul className="space-y-4">
                    {categories.map(category => (
                        <li key={category.name}>
                            <Link
                                to="/blog"
                                className="flex justify-between items-center text-stone-600 hover:text-gold transition-colors group"
                            >
                                <span className="text-sm font-bold font-serif italic">{category.name}</span>
                                <span className="text-[10px] text-stone-300 group-hover:text-gold">({category.count})</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default BlogSidebar;
