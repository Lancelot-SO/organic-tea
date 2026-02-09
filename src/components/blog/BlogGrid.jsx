import React from 'react';
import BlogCard from './BlogCard';

const BlogGrid = ({ posts }) => {
    return (
        <section className="py-20 bg-[#FAF9F6]">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {posts.map((post, index) => (
                        <BlogCard
                            key={post.id}
                            post={post}
                            delay={0.1 * (index % 4)}
                        />
                    ))}
                </div>
                {posts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-stone-400 font-serif italic">No blog posts found matching your criteria.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogGrid;
