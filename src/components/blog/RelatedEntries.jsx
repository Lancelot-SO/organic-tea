import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import BlogCard from './BlogCard';
import { blogs } from '../../data/blogs';

const RelatedEntries = () => {
    // Get 4 distinct blogs to show as related entries
    const relatedPosts = blogs.slice(1, 5);

    return (
        <section className="py-20 bg-[#FAF9F6] border-t border-stone-100">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <h3 className="text-2xl md:text-5xl font-bold text-primary-dark font-heading">
                        More <span className="text-gold italic">Entries</span>
                    </h3>
                    <Link to="/blog" className="flex items-center gap-2 text-stone-600 hover:text-gold font-bold text-xs uppercase tracking-widest pb-2 border-b border-transparent hover:border-gold transition-all">
                        View All Blog
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {relatedPosts.map((post, idx) => (
                        <BlogCard key={post.id} post={post} delay={idx * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RelatedEntries;
