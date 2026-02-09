import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, User, ArrowUpRight } from 'lucide-react';
import { blogs } from '../data/blogs';
import BlogSidebar from '../components/blog/BlogSidebar';
import AuthorBio from '../components/blog/AuthorBio';
import CommentSection from '../components/blog/CommentSection';
import RelatedEntries from '../components/blog/RelatedEntries';

const BlogDetails = () => {
    const { id } = useParams();
    const post = blogs.find(b => b.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-primary-dark mb-4">Post Not Found</h2>
                    <Link to="/blog" className="text-gold font-bold underline">Back to Blog</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* New Hero Section with Background Image */}
            <section className="relative py-24 lg:py-36 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={post.image}
                        alt=""
                        className="w-full h-full object-cover grayscale-[20%] brightness-[0.4]"
                    />
                    <div className="absolute inset-0 bg-primary-dark/40 backdrop-blur-[2px]" />
                </div>

                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto space-y-8"
                    >
                        <span className="inline-block px-4 py-1.5 bg-gold text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm shadow-lg">
                            {post.categoryType || post.category}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white font-heading leading-tight italic drop-shadow-2xl">
                            {post.title}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* White Metadata Bar */}
            <div className="relative z-10 -mt-10 lg:-mt-12 px-6 mb-5">
                <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-sm border border-stone-100 flex flex-wrap justify-center md:justify-between items-center px-10 py-8 gap-8">
                    <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
                        <div className="text-center md:text-left">
                            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Post Date</p>
                            <p className="text-sm font-serif italic text-primary-dark">{post.date}</p>
                        </div>
                        <div className="text-center md:text-left">
                            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Author</p>
                            <p className="text-sm font-serif italic text-primary-dark">Davida Dzato</p>
                        </div>
                        <div className="text-center md:text-left">
                            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Reading Time</p>
                            <p className="text-sm font-serif italic text-primary-dark">5 Min Read</p>
                        </div>
                    </div>
                    <Link
                        to="/blog"
                        className="flex items-center gap-2 group text-primary-dark hover:text-gold transition-colors font-bold text-xs uppercase tracking-widest pb-1 border-b border-stone-100 hover:border-gold"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Blog
                    </Link>
                </div>
            </div>

            {/* Main Image Container */}
            <div className="container mx-auto px-6 mt-20 lg:mt-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="w-full aspect-[21/9] md:aspect-[30/9] rounded-sm overflow-hidden shadow-2xl"
                >
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </div>

            {/* Rest of the Content Grid */}
            <div className="container mx-auto px-6 py-20 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left Column: Content */}
                    <main className="lg:col-span-8 space-y-12 lg:border-r lg:border-stone-300 lg:pr-16 mt-10">
                        <section className="space-y-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-gold font-heading leading-tight">
                                Shop By Collection
                            </h2>
                            <div className="text-stone-600 leading-relaxed font-serif text-base space-y-5">
                                <p>
                                    In the vast world of herbal teas, one floral elixir stands out not only for its vibrant hue and refreshing taste but also for its numerous health benefits – the illustrious hibiscus tea. Journey with us as we dive deep into the wellness wonders that this ruby-red infusion brings to your teacup.
                                </p>
                                <p>
                                    Whether you are a daily tea lover or discovering tea for the first time, our collections make it easy to find the perfect brew for your lifestyle, wellness needs, and moments of rest.
                                </p>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-gold font-heading leading-tight">
                                The Hibiscus Story:
                            </h2>
                            <div className="text-stone-600 leading-relaxed font-serif text-base space-y-5">
                                <p>
                                    The hibiscus plant, known for its resplendent petals and botanical elegance, is more than just a visual delight. Originating from the tropical regions, hibiscus tea has been a cherished herbal remedy for centuries. Traditionally used in various cultures, it has found its place not only in teacups but also in the heart of holistic wellness practices.
                                </p>
                                <p>
                                    Whether you are a daily tea lover or discovering tea for the first time, our collections make it easy to find the perfect brew for your lifestyle, wellness needs, and moments of rest.
                                </p>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-xl md:text-2xl font-bold text-gold font-heading">Antioxidant Powerhouse:</h3>
                            <p className="text-stone-600 leading-relaxed font-serif text-base">
                                The hibiscus plant, known for its resplendent petals and botanical elegance, is more than just a visual delight. Originating from the tropical regions, hibiscus tea has been a cherished herbal remedy for centuries. Traditionally used in various cultures, it has found its place not only in teacups but also in the heart of holistic wellness practices.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-xl md:text-2xl font-bold text-gold font-heading">Heart Health Champion:</h3>
                            <p className="text-stone-600 leading-relaxed font-serif text-base">
                                One of the standout features of hibiscus tea is its impact on cardiovascular health. Studies suggest that regular consumption may help lower blood pressure and manage cholesterol levels. The natural compounds...
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-xl md:text-2xl font-bold text-gold font-heading">Weight Management Support:</h3>
                            <p className="text-stone-600 leading-relaxed font-serif text-base">
                                For those on a wellness journey, hibiscus tea could be a valuable companion. Its diuretic properties may aid in shedding excess water weight, and its natural tartness can be a flavorful alternative to sugary beverages, supporting a balanced approach to weight management.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-xl md:text-2xl font-bold text-gold font-heading">Digestive Harmony:</h3>
                            <p className="text-stone-600 leading-relaxed font-serif text-base">
                                In the realm of digestive health, hibiscus tea shines as a gentle yet effective tonic. It may help soothe digestive discomfort, reduce inflammation, and support a healthy gut. Enjoying a cup after a meal can be a delightful way to promote digestive harmony.
                            </p>
                        </section>

                        {/* Author & Social */}
                        <AuthorBio />

                        {/* Comments */}
                        <CommentSection />
                    </main>

                    {/* Right Column: Sidebar */}
                    <aside className="lg:col-span-4">
                        <BlogSidebar />
                    </aside>
                </div>
            </div>

            {/* Related Entries Section */}
            <RelatedEntries />
        </div>
    );
};

export default BlogDetails;
