import React from 'react';
import { motion } from 'framer-motion';

const ShopHero = () => {
    return (
        <section className="relative h-[60vh] md:h-[80vh] flex items-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1594631252845-29fc458631b6?q=80&w=2000&auto=format&fit=crop"
                    alt="Herbal Teas Shop"
                    className="w-full h-full object-cover brightness-[0.6]"
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white font-heading max-w-3xl leading-[1.1]">
                        Our Herbal Teas <br />
                        <span className="italic">Shop</span>
                    </h1>
                </motion.div>
            </div>
        </section>
    );
};

export default ShopHero;
