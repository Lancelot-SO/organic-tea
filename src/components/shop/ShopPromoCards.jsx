import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import product1 from '../../assets/images/product1.jpeg';
import product2 from '../../assets/images/product2.jpeg';
import product3 from '../../assets/images/product3.jpeg';

const ShopPromoCards = () => {
    const promos = [
        {
            id: 1,
            title: "Artisan Blends",
            subtitle: "Crafted for the perfect steep",
            image: product1,
            color: "from-emerald-900/80"
        },
        {
            id: 2,
            title: "Pure Wellness",
            subtitle: "Nurture your body & soul",
            image: product2,
            color: "from-stone-900/80"
        },
        {
            id: 3,
            title: "Morning Ritual",
            subtitle: "Start your day with clarity",
            image: product3,
            color: "from-amber-900/80"
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
                            transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.21, 0.45, 0.32, 0.9] }}
                            className="relative group h-[320px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl shadow-stone-200/50"
                        >
                            <img
                                src={promo.image}
                                alt={promo.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                            />

                            {/* Sophisticated Gradient Overlay */}
                            <div className={`absolute inset-0 bg-linear-to-t ${promo.color} to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500`} />

                            {/* Glassmorphism Shine Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-linear-to-tr from-white/10 to-transparent" />

                            {/* Content */}
                            <div className="absolute inset-0 p-10 flex flex-col justify-end items-start translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                <div className="space-y-1 mb-6">
                                    <h3 className="text-3xl font-heading font-black text-white leading-tight drop-shadow-md">
                                        {promo.title}
                                    </h3>
                                    <p className="text-white/70 text-sm font-medium tracking-wide">
                                        {promo.subtitle}
                                    </p>
                                </div>
                                <Link
                                    to="/shop"
                                    className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-7 py-3 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-gold hover:text-primary-dark hover:border-gold transition-all duration-300 group/btn"
                                >
                                    Explore Collection
                                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ShopPromoCards;
