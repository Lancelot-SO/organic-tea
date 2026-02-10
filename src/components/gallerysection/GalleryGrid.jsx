import React from 'react';
import { motion } from 'framer-motion';
import herbFarmImg from '../../assets/images/hero-1.jpeg';
import packingImg from '../../assets/images/featured-tea.png';
import branding1Img from '../../assets/images/hero-2.jpeg';
import branding2Img from '../../assets/images/hero-3.jpeg';
import teamImg from '../../assets/images/home/team1.png';

const CategoryCard = ({ image, label, count = "20+ Image", large = false, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay }}
            viewport={{ once: true }}
            className="flex flex-col group cursor-pointer"
        >
            <div className={`overflow-hidden rounded-md shadow-lg ${large ? 'h-[500px] md:h-[700px]' : 'h-[300px] md:h-[400px]'}`}>
                <motion.img
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    src={image}
                    alt={label}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="mt-6 flex flex-col items-start px-2">
                <span className="inline-block px-3 py-1.5 bg-stone-50 border border-stone-100 text-stone-500 text-[10px] font-bold uppercase tracking-widest rounded-sm mb-3 group-hover:bg-gold/10 group-hover:text-gold group-hover:border-gold/20 transition-colors">
                    {label}
                </span>
                <p className="text-stone-400 text-sm italic font-serif group-hover:text-primary-dark transition-colors">
                    {count}
                </p>
            </div>
        </motion.div>
    );
};

const GalleryGrid = () => {
    const images = {
        herbFarm: herbFarmImg,
        team: teamImg,
        packing: packingImg,
        branding1: branding1Img,
        branding2: branding2Img
    };

    return (
        <section className="py-20 md:py-32 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 items-start">

                    {/* Left Column */}
                    <div className="flex flex-col gap-10 md:gap-20">
                        <CategoryCard
                            image={images.herbFarm}
                            label="Herb Farm Images"
                            delay={0.1}
                        />
                        <CategoryCard
                            image={images.team}
                            label="Team Images"
                            delay={0.2}
                        />
                    </div>

                    {/* Middle Column (Large) */}
                    <div className="flex flex-col">
                        <CategoryCard
                            image={images.packing}
                            label="Tea Packing Images"
                            large
                            delay={0.3}
                        />
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-10 md:gap-20">
                        <CategoryCard
                            image={images.branding1}
                            label="Branding Images"
                            delay={0.4}
                        />
                        <CategoryCard
                            image={images.branding2}
                            label="Branding Images"
                            delay={0.5}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default GalleryGrid;
