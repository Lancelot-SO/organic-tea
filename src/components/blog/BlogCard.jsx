import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post, delay = 0 }) => {
    const capText = (text, maxLength) => {
        if (!text) return "";
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay }}
            viewport={{ once: true }}
            className="group cursor-pointer h-full"
        >
            <Link to={`/blog/${post.id}`} className="flex flex-col h-full">
                {/* Image Container */}
                <div className="aspect-[4/3] overflow-hidden rounded-sm shadow-md mb-6 relative shrink-0">
                    <motion.img
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="space-y-4 flex flex-col flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-primary-dark group-hover:text-gold transition-colors leading-tight font-heading min-h-[3.5rem] md:min-h-[4rem]">
                        {capText(post.title, 50)}
                    </h3>
                    <p className="text-stone-500 text-sm md:text-base leading-relaxed font-serif italic flex-1">
                        {capText(post.excerpt, 120)}
                    </p>
                    <div className="pt-2">
                        <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary-dark group-hover:text-gold bg-stone-50 group-hover:bg-gold/10 px-4 py-2 rounded-sm border border-stone-100 group-hover:border-gold/20 transition-all">
                            Read More
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default BlogCard;
