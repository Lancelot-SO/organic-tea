import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GoArrowUpRight } from 'react-icons/go';

import teaVideo from '../../assets/video/tea.mp4';

// Showcase images
import ginger from '../../assets/images/home/products/Ginger-removebg-preview.png';
import lemonGrass from '../../assets/images/home/products/Lemon_Grass-removebg-preview.png';
import lemonGrassPepper from '../../assets/images/home/products/Lemon_grass_papper-removebg-preview.png';
import mint from '../../assets/images/home/products/Mint-removebg-preview.png';
import mintPepper from '../../assets/images/home/products/Mint_papper-removebg-preview.png';
import orangePepper from '../../assets/images/home/products/Orange_papper-removebg-preview.png';
import pineapple from '../../assets/images/home/products/Pineapple-removebg-preview.png';
import prekese from '../../assets/images/home/products/Prekese-removebg-preview.png';
import prekesePepper from '../../assets/images/home/products/Prekese_papper-removebg-preview.png';
import roots from '../../assets/images/home/products/Roots_loose-removebg-preview.png';
import orange from '../../assets/images/home/products/orange-removebg-preview.png';
import senna from '../../assets/images/home/products/senna-removebg-preview.png';

const showcaseImages = [
    ginger, lemonGrass, lemonGrassPepper, mint, mintPepper, orangePepper,
    pineapple, prekese, prekesePepper, roots, orange, senna
];

const Hero = () => {
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % showcaseImages.length);
        }, 6000);
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

                        {/* Right Content — Animated Showcase */}
                        <div className="relative w-[360px] sm:w-[450px] md:w-[600px] lg:w-[850px] xl:w-[950px] mr-4 lg:mr-0 self-end flex items-end justify-center translate-y-16 md:translate-y-20 lg:translate-y-28 translate-x-20 md:translate-x-36 lg:translate-x-48 xl:translate-x-64">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={index}
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -100, opacity: 0 }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                    className="relative w-full flex items-end justify-center"
                                >
                                    {/* Product Image resting on baseline */}
                                    <img
                                        src={showcaseImages[index]}
                                        alt="Showcase"
                                        className="w-full h-auto object-contain object-bottom filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
