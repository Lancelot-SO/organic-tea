import React from 'react';
import { motion } from 'framer-motion';
import portraitImage from "../../assets/images/product4.jpeg"

const VisionMission = () => {
    // High-quality online image matching the reference's aesthetic

    return (
        <section className="relative lg:h-[490px] w-full overflow-hidden flex items-center py-3 lg:py-10">
            <div className="container mx-auto h-full flex items-center">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

                    {/* Left Column: Image */}
                    <div className="w-full lg:w-[45%]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative rounded-xl overflow-hidden shadow-xl lg:h-[360px]"
                        >
                            <img
                                src={portraitImage}
                                alt="Our Visionary"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="w-full lg:w-[55%] flex gap-8">
                        {/* Vertical Accent Line */}
                        <div className="hidden md:flex flex-col w-1.5 shrink-0 rounded-full overflow-hidden h-48 mt-8">
                            <div className="h-1/2 bg-primary" />
                            <div className="h-1/2 bg-[#DED7C8]" />
                        </div>

                        {/* Text Content */}
                        <div className="flex-1">
                            {/* Header Badge */}
                            <div className="inline-block px-4 py-1.5 bg-gray-100 rounded-md mb-6">
                                <span className="text-xs font-heading font-medium text-gray-600 uppercase tracking-widest italic">
                                    our vision and mission
                                </span>
                            </div>

                            {/* Section Heading */}
                            <h2 className="text-3xl lg:text-[42px] font-bold font-heading leading-tight mb-8">
                                <span className="text-primary-dark">The </span>
                                <span className="text-gold italic">Ultimate Health</span><br />
                                <span className="text-primary-dark">Experience</span>
                            </h2>

                            {/* Sub-columns for Vision and Mission */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                                {/* Vision Section */}
                                <div className="space-y-6">
                                    <div className="inline-block px-4 py-1.5 bg-gray-100 rounded-md">
                                        <span className="text-xs font-heading font-medium text-gray-600 uppercase tracking-widest italic">
                                            Vision
                                        </span>
                                    </div>
                                    <p className="text-primary-dark text-[17px] leading-[1.6] font-medium font-body italic lg:not-italic lg:font-normal">
                                        To be a strong global player in health and wellness teas,
                                        sharing the finest African herbs and spices with the world
                                        while championing sustainability and innovation.
                                    </p>
                                </div>

                                {/* Mission Section */}
                                <div className="space-y-6">
                                    <div className="inline-block px-4 py-1.5 bg-gray-100 rounded-md">
                                        <span className="text-xs font-heading font-medium text-gray-600 uppercase tracking-widest italic">
                                            Mission
                                        </span>
                                    </div>
                                    <p className="text-gold text-[17px] leading-[1.6] font-medium font-body italic lg:not-italic lg:font-normal">
                                        Our goal is to captivate our customers with premium, naturally sourced
                                        teas and infusions that promote a healthier lifestyle while caring for
                                        our planet, fostering a positive work environment, and embracing
                                        innovative growth.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default VisionMission;
