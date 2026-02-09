import React from 'react';
import { motion } from 'framer-motion';

const MembershipHero = () => {
    // High-quality professional image of hands passing a card
    const backgroundImage = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000";

    return (
        <section className="relative h-[300px] md:h-[399px] w-full overflow-hidden font-heading">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img
                    src={backgroundImage}
                    alt="Exclusive Membership"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Content Container */}
            <div className="container relative h-full flex items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-left"
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
                        Exclusive Membership
                    </h1>
                </motion.div>
            </div>
        </section>
    );
};

export default MembershipHero;
