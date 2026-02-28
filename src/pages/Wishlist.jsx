import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Wishlist = () => {
    const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
    const { addToCart } = useCart();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleMoveToCart = (product) => {
        addToCart(product);
        removeFromWishlist(product.id);
        toast.success(`${product.name} added to cart!`);
    };

    if (wishlistItems.length === 0) {
        return (
            <div className="bg-[#FAF9F6] min-h-screen py-32">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-md mx-auto"
                    >
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                            <Heart className="w-10 h-10 text-stone-200" />
                        </div>
                        <h1 className="text-4xl font-serif text-charcoal mb-4">Your wishlist is empty</h1>
                        <p className="text-stone-500 mb-12">Save items you love to your wishlist and they'll appear here.</p>
                        <Link
                            to="/shop"
                            className="inline-flex items-center gap-2 bg-gold text-white px-10 py-4 font-bold uppercase tracking-widest text-xs hover:bg-black transition-all duration-500 group"
                        >
                            Return to Shop
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#FAF9F6] min-h-screen py-32">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-stone-200">
                    <div>
                        <h1 className="text-5xl font-serif text-charcoal mb-4">My Wishlist</h1>
                        <p className="text-stone-500 uppercase tracking-widest text-xs font-bold leading-relaxed">
                            {wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'} Saved
                        </p>
                    </div>
                    <button
                        onClick={clearWishlist}
                        className="text-stone-400 hover:text-red-500 transition-colors uppercase tracking-widest text-[10px] font-bold pb-1"
                    >
                        Clear All
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {wishlistItems.map((product) => (
                        <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-white group"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <button
                                    onClick={() => removeFromWishlist(product.id)}
                                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-stone-400 hover:text-red-500 hover:shadow-lg transition-all z-10"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>

                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        onClick={() => handleMoveToCart(product)}
                                        className="bg-white text-charcoal px-6 py-3 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-gold hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 shadow-xl"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                <Link to={`/product/${product.slug}`} className="block mb-2">
                                    <h3 className="text-lg font-bold text-charcoal group-hover:text-gold transition-colors line-clamp-1">{product.name}</h3>
                                </Link>
                                <div className="flex items-center justify-between">
                                    <p className="text-gold font-bold font-serif">${product.price}</p>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                                        {product.category?.name || 'Category'}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
