import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GoArrowUpRight } from 'react-icons/go';

import teaVideo from '../../assets/video/teavideo.mp4';

const VegetationVideo = () => {
    return (
        <section className="relative w-full h-[500px] overflow-hidden flex items-center justify-center">
            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
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
            <div className="relative z-20 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-8 italic drop-shadow-lg">
                        Nature’s Purest Essence <br className="hidden sm:block" />
                        In Every Sip
                    </h2>

                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-white font-bold rounded-md hover:bg-primary-dark transition-all duration-300 shadow-xl group"
                    >
                        Shop Now
                        <GoArrowUpRight className="group-hover:rotate-45 transition-transform duration-300" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default VegetationVideo;
