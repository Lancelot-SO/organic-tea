import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const AboutHero = () => {
    const heroLeft = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200";

    const sliderImages = [
        "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=1200",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200",
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200"
    ];

    return (
        <section className="relative min-h-[110vh] md:h-screen w-full overflow-hidden font-heading flex flex-col">

            {/* Background Layer: Split 50/50 */}
            <div className="absolute inset-0 flex flex-col md:flex-row z-0">
                {/* Left Background (Static Image) */}
                <div className="relative w-full h-[70vh] md:h-full md:w-1/2">
                    <img
                        src={heroLeft}
                        alt="Background Left"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 bg-gradient-to-r from-black/80 to-transparent md:bg-gradient-to-r md:from-black/70 md:to-transparent" />
                </div>

                {/* Right Background (Slider) */}
                <div className="relative w-full h-[40vh] md:h-full md:w-1/2 overflow-hidden">
                    <Swiper
                        modules={[Autoplay, EffectFade, Pagination]}
                        effect="fade"
                        speed={1500}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        pagination={{
                            clickable: true,
                            el: '.custom-pagination',
                        }}
                        className="h-full w-full"
                    >
                        {sliderImages.map((src, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative h-full w-full">
                                    <img
                                        src={src}
                                        alt={`Slide ${index + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/30" />
                                </div>
                            </SwiperSlide>
                        ))}

                        {/* Slider Pagination Controls - Kept relative to the slider half */}
                        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20 flex items-center gap-4 md:gap-6">
                            <div className="custom-pagination flex gap-2.5 !w-auto" />
                            <button className="text-white/80 hover:text-white transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                </svg>
                            </button>
                        </div>
                    </Swiper>
                </div>
            </div>

            {/* Content Layer: Centered in Global Container */}
            <div className="container relative z-10 flex-1 flex flex-col pointer-events-none">
                <div className="w-full min-h-[70vh] md:min-h-0 md:h-full md:w-1/2 flex items-center py-20 md:py-0 pointer-events-auto">
                    <div className="w-full max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            <h1 className="text-[32px] md:text-[40px] lg:text-[52px] font-bold text-white leading-[1.1] mb-6 md:mb-8">
                                Rooted in <span className="text-gold italic">Africa.</span><br />
                                <span className="text-gold">Crafted</span> for Wellness.
                            </h1>

                            <p className="text-gray-200 text-sm md:text-base lg:text-lg leading-relaxed max-w-lg font-light opacity-90">
                                At a time when the world was reeling from a global pandemic, we turned to what Africa has always known best—its powerful herbs and spices. From this wisdom, we created a rich, flavorful blend that nourishes the body, delights the taste buds, and supports everyday wellbeing.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default AboutHero;