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
            title: "Fresh & Healthy",
            subtitle: "The wonderful Taste of life",
            image: product1
        },
        {
            id: 2,
            title: "Fresh & Healthy",
            subtitle: "The wonderful Taste of life",
            image: product2
        },
        {
            id: 3,
            title: "Fresh & Healthy",
            subtitle: "The wonderful Taste of life",
            image: product3
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
                                <Link
                                    to="/shop"
                                    className="bg-white text-primary-dark px-6 py-2.5 rounded-sm font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-gold hover:text-white transition-all duration-300 inline-flex"
                                >
                                    Shop Now
                                    <ArrowUpRight className="w-4 h-4" />
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
