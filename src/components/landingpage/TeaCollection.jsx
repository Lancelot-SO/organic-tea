import React from 'react';
import { ArrowRight } from 'lucide-react';
import hero1 from '../../assets/images/hero-1.png';
import hero2 from '../../assets/images/hero-2.png';
import hero3 from '../../assets/images/hero-3.png';

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
    return (
        <section className="section-padding bg-cream-light">
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
                            <button className="flex items-center gap-2 text-gold hover:text-white transition-colors uppercase text-sm font-bold tracking-wider">
                                Explore <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Box 2: Accessories - Tall */}
                    <div className="row-span-2 relative group overflow-hidden rounded-lg cursor-pointer">
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10" />
                        <img src={hero3} alt="Tea Accessories" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                        <div className="absolute bottom-8 left-8 z-20 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                            <h3 className="text-3xl font-heading font-bold mb-2">Accessories</h3>
                            <p className="opacity-90 mb-4 font-light">Beautiful pots, cups, and strainers.</p>
                            <button className="flex items-center gap-2 text-gold hover:text-white transition-colors uppercase text-sm font-bold tracking-wider">
                                Explore <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Box 3: Tea Bags - Standard */}
                    <div className="md:col-span-2 relative group overflow-hidden rounded-lg cursor-pointer">
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10" />
                        <img src={hero2} alt="Tea Bags" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                        <div className="absolute bottom-8 left-8 z-20 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                            <h3 className="text-3xl font-heading font-bold mb-2">Herbal Blends</h3>
                            <p className="opacity-90 mb-4 font-light">Caffeine-free infusions for any time of day.</p>
                            <button className="flex items-center gap-2 text-gold hover:text-white transition-colors uppercase text-sm font-bold tracking-wider">
                                Explore <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TeaCollection;
