import React from 'react';
import ShopHero from '../components/shop/ShopHero';
import ShopPromoCards from '../components/shop/ShopPromoCards';
import ShopSidebar from '../components/shop/ShopSidebar';
import ShopFilterTopBar from '../components/shop/ShopFilterTopBar';
import ShopProductCard from '../components/shop/ShopProductCard';

// Asset imports (assuming these exist from previous work)
import greenTea from '../assets/images/product-green-tea.png';
import chamomile from '../assets/images/product-chamomile.png';
import earlGrey from '../assets/images/product-earl-grey.png';
import herbal from '../assets/images/hero-2.png';

const Shop = () => {
    const products = [
        { id: 1, name: "Product One", price: 60.00, image: greenTea, badge: "Sold Out" },
        { id: 2, name: "Product One", price: 60.00, image: herbal, badge: "25% OFF" },
        { id: 3, name: "Product One", price: 60.00, image: earlGrey, badge: "Sales" },
        { id: 4, name: "Product One", price: 60.00, image: herbal, badge: "Sold Out" },
        { id: 5, name: "Product One", price: 60.00, image: greenTea, badge: "25% OFF" },
        { id: 6, name: "Product One", price: 60.00, image: chamomile, badge: "Sales" },
    ];

    return (
        <div className="bg-[#FAF9F6] min-h-screen">
            <ShopHero />
            <ShopPromoCards />

            {/* Main Shop Layout */}
            <div className="container mx-auto px-6 py-20 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Sidebar */}
                    <div className="lg:col-span-3">
                        <ShopSidebar />
                    </div>

                    {/* Right Column: Product Results */}
                    <main className="lg:col-span-9">
                        <ShopFilterTopBar />

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {products.map((product, idx) => (
                                <ShopProductCard key={product.id} product={product} delay={idx * 0.1} />
                            ))}
                        </div>

                        {/* Pagination Placeholder */}
                        <div className="mt-20 flex justify-center gap-4">
                            {[1, 2, 3].map(n => (
                                <button key={n} className={`w-10 h-10 rounded-full font-bold transition-all ${n === 1 ? 'bg-gold text-white' : 'bg-white border border-stone-200 text-stone-400 hover:border-gold hover:text-gold'}`}>
                                    {n}
                                </button>
                            ))}
                        </div>
                    </main>

                </div>
            </div>
        </div>
    );
};

export default Shop;
