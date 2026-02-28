import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ShopHero from '../components/shop/ShopHero';
import ShopPromoCards from '../components/shop/ShopPromoCards';
import ShopSidebar from '../components/shop/ShopSidebar';
import ShopFilterTopBar from '../components/shop/ShopFilterTopBar';
import ShopProductCard from '../components/shop/ShopProductCard';
import { useProducts } from '../hooks/useProducts';

const Shop = () => {
    const [searchParams] = useSearchParams();
    const initialCategory = searchParams.get('category') || null;

    const [options, setOptions] = useState({
        categorySlug: initialCategory,
        searchQuery: '',
        sortBy: 'created_at',
        sortOrder: 'desc',
        limit: 12,
        page: 1,
    });

    const {
        products,
        categories,
        loading,
        totalCount,
        totalPages,
        error
    } = useProducts(options);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSearch = (query) => {
        setOptions(prev => ({ ...prev, searchQuery: query, page: 1 }));
    };

    const handleSort = (sortValue) => {
        let sortBy = 'created_at';
        let sortOrder = 'desc';

        if (sortValue === 'Price: Low to High') {
            sortBy = 'price';
            sortOrder = 'asc';
        } else if (sortValue === 'Price: High to Low') {
            sortBy = 'price';
            sortOrder = 'desc';
        } else if (sortValue === 'Most Popular') {
            sortBy = 'rating';
            sortOrder = 'desc';
        }

        setOptions(prev => ({ ...prev, sortBy, sortOrder, page: 1 }));
    };

    const handleCategoryChange = (slug) => {
        setOptions(prev => ({ ...prev, categorySlug: slug, page: 1 }));
    };

    const clearFilters = () => {
        setOptions({
            categorySlug: null,
            searchQuery: '',
            sortBy: 'created_at',
            sortOrder: 'desc',
            limit: 12,
            page: 1,
        });
    };

    const handlePageChange = (newPage) => {
        setOptions(prev => ({ ...prev, page: newPage }));
        window.scrollTo({ top: 500, behavior: 'smooth' });
    };

    return (
        <div className="bg-[#FAF9F6] min-h-screen">
            <ShopHero />
            <ShopPromoCards />

            {/* Main Shop Layout */}
            <div className="container mx-auto px-6 py-20 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Sidebar */}
                    <div className="lg:col-span-3">
                        <ShopSidebar
                            categories={categories}
                            selectedCategory={options.categorySlug}
                            onCategoryChange={handleCategoryChange}
                        />
                    </div>

                    {/* Right Column: Product Results */}
                    <main className="lg:col-span-9">
                        <ShopFilterTopBar
                            searchQuery={options.searchQuery}
                            onSearch={handleSearch}
                            onSort={handleSort}
                            totalCount={totalCount}
                            activeCategory={categories.find(c => c.slug === options.categorySlug)?.name}
                            onClear={clearFilters}
                        />

                        {loading ? (
                            <div className="min-h-[400px] flex items-center justify-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
                            </div>
                        ) : error ? (
                            <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
                                <p className="text-red-500 font-bold mb-4">Error loading products: {error}</p>
                                <button onClick={clearFilters} className="text-gold underline font-bold uppercase tracking-widest text-xs">Reset Filters</button>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
                                <p className="text-stone-400 font-medium mb-4">No products found matching your criteria.</p>
                                <button onClick={clearFilters} className="text-gold underline font-bold uppercase tracking-widest text-xs">Clear All Filters</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {products.map((product, idx) => (
                                    <ShopProductCard key={product.id} product={product} delay={(idx % 3) * 0.1} />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {!loading && totalPages > 1 && (
                            <div className="mt-20 flex justify-center gap-4">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                                    <button
                                        key={n}
                                        onClick={() => handlePageChange(n)}
                                        className={`w-10 h-10 rounded-full font-bold transition-all ${options.page === n ? 'bg-gold text-white' : 'bg-white border border-stone-200 text-stone-400 hover:border-gold hover:text-gold'}`}
                                    >
                                        {n}
                                    </button>
                                ))}
                            </div>
                        )}
                    </main>

                </div>
            </div>
        </div>
    );
};

export default Shop;

