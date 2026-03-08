import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    ShoppingCart,
    Star,
    ShieldCheck,
    Truck,
    Leaf,
    Minus,
    Plus,
    ChevronRight,
    Heart,
    Share2
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useReviews } from '../hooks/useReviews';
import { useAuth } from '../context/AuthContext';
import ShopProductCard from '../components/shop/ShopProductCard';
import StarRating from '../components/shop/StarRating';

const ProductDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { fetchProductBySlug, products: allProducts, loading: productsLoading } = useProducts();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    const { user } = useAuth();
    const { reviews, loading: reviewsLoading, fetchReviews, addReview } = useReviews(product?.id);
    const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            const data = await fetchProductBySlug(slug);
            if (data) {
                setProduct(data);
                window.scrollTo(0, 0);
            } else {
                navigate('/shop');
            }
            setLoading(false);
        };
        loadProduct();
    }, [slug, fetchProductBySlug, navigate]);

    useEffect(() => {
        if (product?.id && activeTab === 'reviews') {
            fetchReviews();
        }
    }, [product?.id, activeTab, fetchReviews]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) return alert('Please sign in to leave a review');

        setIsSubmitting(true);
        try {
            await addReview({
                userId: user.id,
                rating: reviewForm.rating,
                comment: reviewForm.comment
            });
            setReviewForm({ rating: 5, comment: '' });
            alert('Thank you for your review!');
        } catch (err) {
            alert('Failed to submit review. If you haven\'t run the SQL setup, please do so first.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-6">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-gold/10"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-gold border-t-transparent animate-spin"></div>
                </div>
                <p className="text-stone-400 font-bold uppercase tracking-[0.2em] text-[10px]">Steeping your selection...</p>
            </div>
        );
    }

    if (!product) return null;

    const relatedProducts = allProducts
        .filter(p => p.category_id === product.category_id && p.id !== product.id)
        .slice(0, 3);

    return (
        <div className="bg-cream min-h-screen">
            <main className="pt-32 pb-20">
                <div className="container mx-auto px-6">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-3 mb-12 text-[10px] font-bold uppercase tracking-widest text-stone-400">
                        <Link to="/" className="hover:text-gold transition-colors">Home</Link>
                        <ChevronRight size={12} />
                        <Link to="/shop" className="hover:text-gold transition-colors">Shop</Link>
                        <ChevronRight size={12} />
                        <span className="text-stone-300">{product.categories?.name}</span>
                        <ChevronRight size={12} />
                        <span className="text-primary-dark">{product.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
                        {/* Image Gallery Column */}
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="bg-white rounded-[3rem] p-12 aspect-square flex items-center justify-center relative overflow-hidden shadow-2xl shadow-stone-200/50 group"
                            >
                                <div className="absolute inset-0 bg-linear-to-tr from-stone-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                {product.badge && (
                                    <span className="absolute top-12 left-12 bg-primary-dark text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] z-10 shadow-xl">
                                        {product.badge}
                                    </span>
                                )}
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="w-full h-full object-contain relative z-10 transform group-hover:scale-105 transition-transform duration-1000"
                                    crossOrigin="anonymous"
                                />
                            </motion.div>
                        </div>

                        {/* Info Column */}
                        <div className="lg:col-span-5 flex flex-col">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="w-10 h-[2px] bg-gold"></span>
                                    <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">{product.categories?.name}</span>
                                </div>

                                <h1 className="text-5xl lg:text-6xl font-heading font-black text-primary-dark tracking-tight leading-none mb-6">
                                    {product.name}
                                </h1>

                                <div className="flex items-center gap-6 mb-10">
                                    <div className="flex items-center gap-3">
                                        <StarRating rating={product.average_rating || 0} size={18} />
                                        <span className="text-sm font-bold text-primary-dark">{(product.average_rating || 0).toFixed(1)}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest border-l border-stone-200 pl-6">
                                        {product.review_count || 0} Authentic {product.review_count === 1 ? 'Review' : 'Reviews'}
                                    </span>
                                </div>

                                <p className="text-stone-500 text-lg leading-relaxed mb-10 italic">
                                    {product.description}
                                </p>

                                <div className="bg-white rounded-3xl p-10 border border-stone-100 shadow-xl shadow-stone-200/20 mb-10">
                                    <div className="flex items-end gap-3 mb-10">
                                        <span className="text-4xl font-black text-primary-dark font-heading">GHS {product.price?.toFixed(2)}</span>
                                        <span className="text-stone-300 text-sm font-bold uppercase tracking-widest mb-1">Tax Included</span>
                                    </div>

                                    {/* Purchase Controls */}
                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center bg-stone-50 rounded-2xl p-1 border border-stone-100">
                                                <button
                                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                    className="w-12 h-12 flex items-center justify-center text-stone-400 hover:text-primary-dark transition-colors"
                                                >
                                                    <Minus size={18} />
                                                </button>
                                                <span className="w-12 text-center font-black text-primary-dark">{quantity}</span>
                                                <button
                                                    onClick={() => setQuantity(quantity + 1)}
                                                    className="w-12 h-12 flex items-center justify-center text-stone-400 hover:text-primary-dark transition-colors"
                                                >
                                                    <Plus size={18} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={handleAddToCart}
                                                className="flex-1 bg-primary-dark text-white font-black py-5 rounded-2xl flex items-center justify-center gap-4 hover:bg-gold transition-all duration-500 shadow-xl shadow-primary-dark/10 group"
                                            >
                                                <ShoppingCart size={20} className="group-hover:translate-x-1 transition-transform" />
                                                <span className="text-xs uppercase tracking-[0.2em]">Add to Collection</span>
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-center gap-8 py-4 border-t border-stone-50 mt-2">
                                            <button
                                                onClick={() => toggleWishlist(product)}
                                                className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${isInWishlist(product.id) ? 'text-gold' : 'text-stone-400 hover:text-primary-dark'}`}
                                            >
                                                <Heart size={14} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                                                {isInWishlist(product.id) ? 'In Wishlist' : 'Wishlist'}
                                            </button>
                                            <button className="flex items-center gap-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest hover:text-primary-dark transition-colors">
                                                <Share2 size={14} /> Share
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Trust Badges */}
                                <div className="grid grid-cols-3 gap-6">
                                    {[
                                        { icon: ShieldCheck, label: 'Pure Origin' },
                                        { icon: Truck, label: 'Express Flow' },
                                        { icon: Leaf, label: 'Eco Manifest' }
                                    ].map((badge, i) => (
                                        <div key={i} className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/50 border border-stone-100/50">
                                            <badge.icon size={20} className="text-gold" />
                                            <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">{badge.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Content Tabs */}
                    <div className="mt-32 border-t border-stone-100 pt-20">
                        <div className="flex items-center justify-center gap-12 mb-16">
                            {['description', 'specifications', 'reviews'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`text-[10px] font-black uppercase tracking-[0.3em] pb-4 border-b-2 transition-all ${activeTab === tab ? 'border-gold text-primary-dark' : 'border-transparent text-stone-300 hover:text-stone-400'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="max-w-3xl mx-auto text-center"
                            >
                                {activeTab === 'description' && (
                                    <div className="space-y-6">
                                        <p className="text-stone-500 text-lg leading-relaxed">
                                            Our {product.name} represents the pinnacle of organic tea cultivation. Sourced directly from sustainably managed farms, each leaf is processed with ancestral techniques to preserve the full spectrum of its aromatic profile.
                                        </p>
                                        <p className="text-stone-500 text-lg leading-relaxed">
                                            This selection is characterized by its deep, resonant notes and an incredibly smooth finish that lingers gracefully on the palate.
                                        </p>
                                    </div>
                                )}
                                {activeTab === 'specifications' && (
                                    <div className="grid grid-cols-2 gap-8 text-left max-w-xl mx-auto">
                                        {[
                                            { label: 'Harvest', value: 'Spring 2024' },
                                            { label: 'Altitude', value: '1,800m' },
                                            { label: 'Oxidation', value: 'Minimal' },
                                            { label: 'Temp', value: '85°C' }
                                        ].map((spec, i) => (
                                            <div key={i} className="pb-4 border-b border-stone-100">
                                                <p className="text-[9px] font-bold text-stone-300 uppercase tracking-widest mb-1">{spec.label}</p>
                                                <p className="font-bold text-primary-dark">{spec.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {activeTab === 'reviews' && (
                                    <div className="space-y-16">
                                        {/* Review Submission Form */}
                                        {user ? (
                                            <div className="bg-white p-10 rounded-[2.5rem] border border-stone-100 shadow-xl shadow-stone-200/20 text-left">
                                                <h3 className="text-2xl font-heading font-black text-primary-dark tracking-tight mb-8">Share Your Experience</h3>
                                                <form onSubmit={handleReviewSubmit} className="space-y-8">
                                                    <div className="space-y-3">
                                                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Your Rating</p>
                                                        <div className="flex gap-2">
                                                            {[1, 2, 3, 4, 5].map((num) => (
                                                                <button
                                                                    key={num}
                                                                    type="button"
                                                                    onClick={() => setReviewForm(prev => ({ ...prev, rating: num }))}
                                                                    className="transition-transform active:scale-95"
                                                                >
                                                                    <Star
                                                                        size={24}
                                                                        className={num <= reviewForm.rating ? "text-gold fill-gold" : "text-stone-200"}
                                                                    />
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Your Thoughts</p>
                                                        <textarea
                                                            required
                                                            rows="4"
                                                            value={reviewForm.comment}
                                                            onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                                                            placeholder="How was the aroma? The taste? The feeling..."
                                                            className="w-full bg-stone-50 border border-stone-100 rounded-3xl p-6 text-sm font-medium focus:outline-none focus:border-gold transition-all resize-none"
                                                        />
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="bg-primary-dark text-white font-black px-12 py-4 rounded-2xl hover:bg-gold transition-all duration-500 shadow-lg shadow-primary-dark/10 uppercase tracking-[0.2em] text-[10px] disabled:opacity-50"
                                                    >
                                                        {isSubmitting ? 'Publishing...' : 'Publish Review'}
                                                    </button>
                                                </form>
                                            </div>
                                        ) : (
                                            <div className="bg-white p-12 rounded-[2.5rem] border-2 border-dashed border-stone-100 flex flex-col items-center gap-6">
                                                <div className="p-4 bg-stone-50 rounded-2xl">
                                                    <Star size={32} className="text-stone-200" />
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-primary-dark font-black tracking-tight">Join the conversation</p>
                                                    <p className="text-stone-400 text-sm font-medium">Please sign in to share your experience with this tea selection.</p>
                                                </div>
                                                <Link to="/profile" className="text-gold font-bold uppercase tracking-widest text-xs border-b border-gold pb-1 hover:text-gold-dark hover:border-gold-dark transition-all">Sign In Now</Link>
                                            </div>
                                        )}

                                        {/* Reviews List */}
                                        <div className="space-y-10 text-left">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-2xl font-heading font-black text-primary-dark tracking-tight">Community Voices</h3>
                                                {reviews.length > 0 && <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest">{reviews.length} Feedbacks</span>}
                                            </div>

                                            {reviewsLoading ? (
                                                <div className="flex justify-center py-20">
                                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
                                                </div>
                                            ) : reviews.length === 0 ? (
                                                <div className="py-20 text-center bg-stone-50/50 rounded-[2.5rem] border border-stone-100">
                                                    <p className="text-stone-300 font-bold uppercase tracking-widest text-xs italic">Be the first to share your journey with this blend.</p>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 gap-8">
                                                    {reviews.map((review) => (
                                                        <motion.div
                                                            key={review.id}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            whileInView={{ opacity: 1, x: 0 }}
                                                            className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm relative overflow-hidden group"
                                                        >
                                                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-gold/10 transition-colors duration-1000" />
                                                            <div className="flex items-start gap-6 relative z-10">
                                                                <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center font-black text-primary-dark text-xl border border-stone-100 relative overflow-hidden">
                                                                    {review.profile?.avatar_url ? (
                                                                        <img src={review.profile.avatar_url} alt={review.profile.full_name} className="w-full h-full object-cover" />
                                                                    ) : (
                                                                        <span className="opacity-40">{review.profile?.full_name?.charAt(0) || 'U'}</span>
                                                                    )}
                                                                </div>
                                                                <div className="grow">
                                                                    <div className="flex items-center justify-between mb-2">
                                                                        <div>
                                                                            <h4 className="text-sm font-black text-primary-dark uppercase tracking-tight mb-1">{review.profile?.full_name || 'Humble Guest'}</h4>
                                                                            <StarRating rating={review.rating} size={12} />
                                                                        </div>
                                                                        <span className="text-[10px] font-bold text-stone-300 uppercase tracking-widest">{new Date(review.created_at).toLocaleDateString()}</span>
                                                                    </div>
                                                                    <p className="text-stone-500 text-sm leading-relaxed italic">{review.comment}</p>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Related Teas */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-40">
                            <div className="flex flex-col items-center mb-16">
                                <span className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] mb-4">You Might Also Find Peace In</span>
                                <h2 className="text-4xl font-heading font-bold text-primary-dark tracking-tight">Related Teas</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                {relatedProducts.map((p, idx) => (
                                    <ShopProductCard key={p.id} product={p} delay={idx * 0.1} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ProductDetails;
