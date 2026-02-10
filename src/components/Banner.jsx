import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import hero1 from '../assets/images/hero-1.jpeg';

const Banner = () => {
    // High-quality background image representing the lush tea fields
    const bgImage = hero1;

    return (
        <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
            {/* Background Image with Fixed Effect and Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="w-full h-full bg-cover bg-center bg-fixed"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                    }}
                />
                <div className="absolute inset-0 bg-black/45 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
            </div>

            {/* Content centered in the middle */}
            <div className="container relative z-10 px-4 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="text-center text-white"
                >
                    <h2 className="text-[36px] md:text-6xl lg:text-7xl font-heading font-bold mb-4 drop-shadow-lg tracking-tight">
                        The <span className="text-gold italic">Narcissus</span> Fields
                    </h2>
                    <p className="text-lg md:text-2xl font-light tracking-[0.15em] opacity-90 uppercase italic md:not-italic md:capitalize md:tracking-wider">
                        From Fields To Your Cups
                    </p>

                    <div className="mt-10 flex justify-center w-full">
                        <Link to="/shop">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center gap-2 bg-white text-primary-dark px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gold hover:text-white transition-all shadow-xl text-sm cursor-pointer"
                            >
                                <ShoppingBag size={20} /> See Product Range
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Banner;
