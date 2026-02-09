import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const BlogHero = ({ post }) => {
    if (!post) return null;

    return (
        <section className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden flex items-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="container relative z-10 px-6 mx-auto">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="inline-block px-3 py-1 bg-white border border-stone-200 text-stone-900 text-[10px] font-bold uppercase tracking-widest rounded-sm mb-6">
                            Featured
                        </span>
                        <h1 className="text-[32px] md:text-[44px] lg:text-[52px] font-bold text-white leading-[1.1] mb-8 font-heading">
                            {post.title}
                        </h1>
                        <p className="text-lg md:text-xl text-stone-200 mb-10 max-w-2xl leading-relaxed">
                            {post.excerpt}
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white hover:bg-gold text-primary-dark px-8 py-4 rounded-sm font-bold text-sm tracking-widest uppercase flex items-center gap-3 transition-colors shadow-xl"
                        >
                            Read More
                            <ArrowUpRight className="w-4 h-4" />
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default BlogHero;
