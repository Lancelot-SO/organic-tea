import React from 'react';
import { motion } from 'framer-motion';
import team1 from '../../assets/images/home/team1.png';
import team2 from '../../assets/images/home/team2.png';
import team3 from '../../assets/images/home/team3.png';

const SubCategoryCard = ({ image, label, count = "20+ Image", delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay }}
            viewport={{ once: true }}
            className="flex flex-col group cursor-pointer"
        >
            <div className="overflow-hidden rounded-md shadow-lg h-[250px] md:h-[350px]">
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

const GallerySubGrid = () => {
    const images = {
        bonding1: team1,
        conference: team2,
        bonding2: team3
    };

    return (
        <section className="pb-20 md:pb-32 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
                    <SubCategoryCard
                        image={images.bonding1}
                        label="Team Bonding"
                        delay={0.1}
                    />
                    <SubCategoryCard
                        image={images.conference}
                        label="Health Conference"
                        delay={0.2}
                    />
                    <SubCategoryCard
                        image={images.bonding2}
                        label="Team Bonding"
                        delay={0.3}
                    />
                </div>
            </div>
        </section>
    );
};

export default GallerySubGrid;
