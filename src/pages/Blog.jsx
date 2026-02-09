import React, { useState, useMemo, useEffect } from 'react';
import BlogHero from '../components/blog/BlogHero';
import BlogFilter from '../components/blog/BlogFilter';
import BlogGrid from '../components/blog/BlogGrid';
import Banner from '../components/Banner';
import { blogs } from '../data/blogs';

const Blog = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const featuredPost = useMemo(() => blogs.find(b => b.category === 'Featured'), []);

    const filteredPosts = useMemo(() => {
        return blogs.filter(post => {
            const matchesCategory = activeCategory === 'All' || post.category === activeCategory || post.categoryType === activeCategory;
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    return (
        <div className="bg-white">
            <BlogHero post={featuredPost} />
            <BlogFilter
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <BlogGrid posts={filteredPosts} />
            <Banner />
        </div>
    );
};

export default Blog;
