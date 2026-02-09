import React from 'react';
import hero1 from '../../assets/images/hero-1.png';
import hero2 from '../../assets/images/hero-2.png';
import hero3 from '../../assets/images/hero-3.png';

const blogs = [
    {
        id: 1,
        title: "Brewing the Perfect Cup",
        image: hero3, // Teapot image
        excerpt: "Discover the ancient secrets to extracting the perfect flavor from your leaves."
    },
    {
        id: 2,
        title: "Health Benefits of Matcha",
        image: hero1, // Green tea image
        excerpt: "Why this powdered green tea is taking the wellness world by storm."
    },
    {
        id: 3,
        title: "The History of Tea Ceremonies",
        image: hero2, // Glass cup
        excerpt: "Tracing the roots of tea culture through Japan and China."
    },
    {
        id: 4,
        title: "Sustainable Farming Practices",
        image: hero1, // Reusing green tea
        excerpt: "How we ensure our tea is good for you and the planet."
    }
];

const BlogSection = () => {
    return (
        <section className="section-padding bg-cream-light">
            <div className="container">
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary-dark">
                        Journal <span className="text-gold italic">& Blogs</span>
                    </h2>
                    <a href="#" className="hidden md:block text-sm font-bold text-gold uppercase tracking-wider hover:text-primary-dark transition-colors">Read All Articles</a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {blogs.map((blog) => (
                        <article key={blog.id} className="group cursor-pointer">
                            <div className="overflow-hidden rounded-lg mb-4 aspect-[4/3]">
                                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            </div>
                            <span className="text-xs font-bold text-gold uppercase tracking-wider mb-2 block">Lifestyle</span>
                            <h3 className="text-xl font-heading font-bold text-primary-dark mb-2 group-hover:text-primary transition-colors">
                                {blog.title}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-2">
                                {blog.excerpt}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
