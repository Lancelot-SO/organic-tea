import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ShopPromoCards = () => {
    const promos = [
        {
            id: 1,
            title: "Fresh & Healthy",
            subtitle: "The wonderful Taste of life",
            image: "https://images.unsplash.com/photo-1576091160550-2173bdd99625?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Fresh & Healthy",
            subtitle: "The wonderful Taste of life",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Fresh & Healthy",
            subtitle: "The wonderful Taste of life",
            image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=800&auto=format&fit=crop"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {promos.map((promo, idx) => (
                        <motion.div
                            key={promo.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="relative group h-[280px] rounded-lg overflow-hidden cursor-pointer"
                        >
                            <img
                                src={promo.image}
                                alt={promo.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-center items-start">
                                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                                    {promo.title}
                                </h3>
                                <p className="text-white/80 text-sm mb-6 font-serif italic">
                                    {promo.subtitle}
                                </p>
                                <button className="bg-white text-primary-dark px-6 py-2.5 rounded-sm font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-gold hover:text-white transition-all duration-300">
                                    Shop Now
                                    <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ShopPromoCards;
