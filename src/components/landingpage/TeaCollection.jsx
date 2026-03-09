import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import hero1 from '../../assets/images/hero-1.jpeg';
import hero2 from '../../assets/images/hero-2.jpeg';
import hero3 from '../../assets/images/hero-3.jpeg';
import FloatingLeaf from './FloatingLeaf';
import { useProducts } from '../../hooks/useProducts';
import ShopProductCard from '../shop/ShopProductCard';
import { ChevronLeft, ChevronRight, Loader2, PackageOpen } from 'lucide-react';

const collections = [
    {
        id: 1,
        title: 'Loose Leaf',
        description: 'Premium whole leaf teas',
        image: hero1,
        size: 'large' // spans 2 cols
    },
    {
        id: 2,
        title: 'Tea Bags',
        description: 'Convenience without compromise',
        image: hero2,
        size: 'small'
    },
    {
        id: 3,
        title: 'Accessories',
        description: 'Everything you need to brew',
        image: hero3,
        size: 'tall' // spans 2 rows
    }
];

const TeaCollection = () => {
    const [page, setPage] = React.useState(1);
    const sectionRef = React.useRef(null);

    const {
        products,
        loading,
        totalCount,
        totalPages,
        error
    } = useProducts({
        limit: 12,
        page: page,
        sortBy: 'created_at',
        sortOrder: 'desc'
    });

    const handlePageChange = (newPage) => {
        setPage(newPage);
        if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section ref={sectionRef} className="section-padding bg-cream-light relative overflow-hidden">
            {/* Botanical decorations */}
            <FloatingLeaf image="leaf1" side="left" className="top-10" rotate={15} flip={true} opacity={0.3} />
            <FloatingLeaf image="flower1" side="right" className="bottom-10" rotate={-8} delay={400} opacity={0.3} size="w-24 h-24 md:w-36 md:h-36" />

            <div className="container">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary-dark mb-12 text-center">
                    Shop <span className="text-gold italic">By Collection</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                    {/* Box 1: Loose Leaf - Wide */}
                    <div className="md:col-span-2 relative group overflow-hidden rounded-lg cursor-pointer">
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10" />
                        <img src={hero1} alt="Loose Leaf" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                        <div className="absolute bottom-8 left-8 z-20 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                            <h3 className="text-3xl font-heading font-bold mb-2">Loose Leaf</h3>
                            <p className="opacity-90 mb-4 font-light">Experience the full flavor profile of whole leaves.</p>
                            <Link
                                to="/shop"
                                className="flex items-center gap-2 text-gold hover:text-white transition-colors uppercase text-sm font-bold tracking-wider"
                            >
                                Explore <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    {/* Box 2: Accessories - Tall */}
                    <div className="row-span-2 relative group overflow-hidden rounded-lg cursor-pointer">
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10" />
                        <img src={hero3} alt="Tea Accessories" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                        <div className="absolute bottom-8 left-8 z-20 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                            <h3 className="text-3xl font-heading font-bold mb-2">Accessories</h3>
                            <p className="opacity-90 mb-4 font-light">Beautiful pots, cups, and strainers.</p>
                            <Link
                                to="/shop"
                                className="flex items-center gap-2 text-gold hover:text-white transition-colors uppercase text-sm font-bold tracking-wider"
                            >
                                Explore <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    {/* Box 3: Tea Bags - Standard */}
                    <div className="md:col-span-2 relative group overflow-hidden rounded-lg cursor-pointer">
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10" />
                        <img src={hero2} alt="Tea Bags" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                        <div className="absolute bottom-8 left-8 z-20 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                            <h3 className="text-3xl font-heading font-bold mb-2">Herbal Blends</h3>
                            <p className="opacity-90 mb-4 font-light">Caffeine-free infusions for any time of day.</p>
                            <Link
                                to="/shop"
                                className="flex items-center gap-2 text-gold hover:text-white transition-colors uppercase text-sm font-bold tracking-wider"
                            >
                                Explore <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Divider */}
                <div className="my-20 flex items-center gap-4">
                    <div className="h-px flex-1 bg-stone-200"></div>
                    <span className="text-[10px] font-black text-stone-300 uppercase tracking-[0.4em]">Our Full Collection</span>
                    <div className="h-px flex-1 bg-stone-200"></div>
                </div>

                {/* Product Grid Area */}
                <div className="min-h-[600px] relative">
                    {loading ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                            <Loader2 className="w-10 h-10 text-gold animate-spin" />
                            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Refreshing Collection</p>
                        </div>
                    ) : error ? (
                        <div className="py-20 text-center">
                            <p className="text-red-500 font-bold mb-2">Failed to load collection</p>
                            <p className="text-stone-400 text-sm">{error}</p>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="py-20 flex flex-col items-center justify-center text-center">
                            <PackageOpen className="w-16 h-16 text-stone-200 mb-4" />
                            <p className="text-stone-400 font-bold uppercase tracking-widest text-sm">No products available in this session</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {products.map((product, idx) => (
                                    <ShopProductCard
                                        key={product.id}
                                        product={product}
                                        delay={(idx % 4) * 0.1}
                                    />
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="mt-20 flex flex-col items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <button
                                            disabled={page === 1}
                                            onClick={() => handlePageChange(page - 1)}
                                            className="w-12 h-12 rounded-2xl flex items-center justify-center border border-stone-200 text-stone-400 hover:border-gold hover:text-gold disabled:opacity-30 disabled:hover:border-stone-200 disabled:hover:text-stone-400 transition-all bg-white"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>

                                        <div className="flex items-center gap-2 mx-4">
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                                                <button
                                                    key={n}
                                                    onClick={() => handlePageChange(n)}
                                                    className={`w-12 h-12 rounded-2xl font-black text-xs transition-all ${page === n
                                                        ? 'bg-primary-dark text-white shadow-xl shadow-primary-dark/20'
                                                        : 'bg-white border border-stone-200 text-stone-400 hover:border-gold hover:text-gold'
                                                        }`}
                                                >
                                                    {n.toString().padStart(2, '0')}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            disabled={page === totalPages}
                                            onClick={() => handlePageChange(page + 1)}
                                            className="w-12 h-12 rounded-2xl flex items-center justify-center border border-stone-200 text-stone-400 hover:border-gold hover:text-gold disabled:opacity-30 disabled:hover:border-stone-200 disabled:hover:text-stone-400 transition-all bg-white"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                    <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest">
                                        Showing Page {page} <span className="text-stone-200 mx-2">|</span> Total Items: {totalCount}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TeaCollection;
