import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GoArrowUpRight } from 'react-icons/go';

import teaVideo from '../../assets/video/tea.mp4';

// Showcase images - High-quality PNGs with transparent backgrounds and select Hero JPEGs
import product1 from '../../assets/images/product1.jpeg';
import product2 from '../../assets/images/product2.jpeg';
import product3 from '../../assets/images/product3.jpeg';
import product4 from '../../assets/images/product4.jpeg';
import product5 from '../../assets/images/product5.jpeg';
import hero1 from '../../assets/images/hero-1.jpeg';
import hero2 from '../../assets/images/hero-2.jpeg';
import hero3 from '../../assets/images/hero-3.jpeg';
import featuredTea from '../../assets/images/featured-tea.png';
import chamomileTea from '../../assets/images/product-chamomile.png';
import earlGreyTea from '../../assets/images/product-earl-grey.png';

const showcaseImages = [
    product1, product2, product3, product4, product5,
    hero1, hero2, hero3,
    featuredTea, chamomileTea, earlGreyTea
];

const Hero = () => {
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % showcaseImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full min-h-screen overflow-hidden flex items-end">

            {/* Full-Width Video Background */}
            <div className="absolute inset-0 w-full h-full bg-primary-dark">
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src={teaVideo} type="video/mp4" />
                </video>
            </div>

            {/* Content Overlay */}
            <div className="relative z-20 w-full pb-16 md:pb-20 pt-32">
                <div className="container">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8">

                        {/* Left Content — Text */}
                        <div className="w-full md:max-w-[520px] text-center md:text-left flex flex-col items-center md:items-start">
                            <h1 className="text-[34px] sm:text-[40px] md:text-[38px] lg:text-[44px] text-white font-bold leading-[1.15] italic mb-5 px-4 md:px-0">
                                Organic{' '}
                                <span className="text-gold">Herbal Tea</span>
                                <br />
                                Blend, Naturally
                                Refreshing
                            </h1>

                            <p className="text-[13px] sm:text-[15px] md:text-[15px] leading-relaxed text-white/80 font-normal max-w-[440px] mb-7 px-6 md:px-0">
                                Our Organic Herbal Tea Blend is made from 100% natural herbs, offering a smooth, refreshing taste with no artificial additives. It's perfect for relaxation and everyday wellness.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-row items-center gap-3">
                                <Link
                                    to="/shop"
                                    className="group flex items-center gap-2 px-5 py-2.5 bg-[#C5CEC6] text-primary-dark font-semibold text-[13px] sm:text-[14px] rounded-md hover:bg-gold hover:text-white transition-all duration-300"
                                >
                                    Shop Now
                                    <GoArrowUpRight className="text-gold group-hover:text-white group-hover:rotate-45 transition-all duration-300" />
                                </Link>
                            </div>
                        </div>

                        {/* Right Content — Animated Showcase (Halo Style) */}
                        <div className="relative w-48 sm:w-64 md:w-72 lg:w-80 h-48 sm:h-64 md:h-72 lg:h-80 mr-4 lg:mr-10 mb-4 self-end md:self-auto flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={index}
                                    initial={{ x: 100, opacity: 0, scale: 0.8 }}
                                    animate={{ x: 0, opacity: 1, scale: 1 }}
                                    exit={{ x: -100, opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                    className="relative w-full h-full flex items-center justify-center"
                                >
                                    {/* The "Halo" / Organic Border Frame */}
                                    <motion.div
                                        className="absolute w-[90%] h-[90%] border-2 border-primary-dark/40 rounded-[3rem] rotate-12"
                                        animate={{ rotate: [12, -12, 12] }}
                                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                    <motion.div
                                        className="absolute w-[85%] h-[85%] border border-[#3F4E3C]/20 rounded-[2.5rem] -rotate-6"
                                        animate={{ rotate: [-6, 6, -6] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    />

                                    {/* Product Image with floating effect */}
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        className="relative z-10 w-full h-full p-6 sm:p-8"
                                    >
                                        <img
                                            src={showcaseImages[index]}
                                            alt="Showcase"
                                            className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
                                        />
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Decorative Glow Background */}
                            <div className="absolute inset-0 bg-primary-dark/5 rounded-full blur-3xl -z-10" />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
