import React from 'react';
import { motion } from 'framer-motion';

const ContactHero = () => {
    return (
        <section className="relative h-[45vh] min-h-[450px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Parallax-like effect */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                <img
                    src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=2000&auto=format&fit=crop"
                    alt="Organic Tea Garden"
                    className="w-full h-full object-cover brightness-[0.4]"
                />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold text-[11px] font-bold rounded-full uppercase tracking-[0.2em] mb-4 border border-gold/30">
                        Get In Touch
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white leading-tight">
                        Let's Start a <br />
                        <span className="text-gold italic font-serif">Conversation</span>
                    </h1>
                </motion.div>
            </div>

            {/* Bottom Gradient Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FAF9F6] to-transparent z-10" />
        </section>
    );
};

export default ContactHero;
