import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { GoArrowUpRight } from 'react-icons/go';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import hero1 from '../../assets/images/hero-1.jpeg';
import hero2 from '../../assets/images/hero-2.jpeg';
import hero3 from '../../assets/images/hero-3.jpeg';
import teaVideo from '../../assets/video/tea.mp4';

const Hero = () => {
    return (
        <section className="relative w-full min-h-screen bg-cream-light overflow-hidden flex flex-col md:flex-row">

            {/* Left Side: Video & Text Content */}
            <div className="w-full md:w-1/2 relative h-[60vh] md:h-screen flex items-center justify-center overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 w-full h-full bg-primary-dark">
                    <div className="absolute inset-0 bg-black/30 z-10"></div>
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-60"
                    >
                        <source src={teaVideo} type="video/mp4" />
                    </video>
                </div>

                {/* Content Overlay */}
                <div
                    className="absolute md:left-[20%] left-6 top-1/2 -translate-y-1/2 w-[90%] md:w-[600px] flex flex-col gap-6 z-20"
                >
                    <div className="w-full">
                        <h1 className="lg:text-[61px] md:text-[50px] text-[36px] text-white font-bold lg:leading-[71px] md:leading-[60px] leading-[44px] italic font-Merriweather-Regular-400-italic">
                            Organic <span className="text-[#B18A45]">Herbal Tea</span> Blend, Naturally Refreshing
                        </h1>
                    </div>

                    <p className="w-full text-[14px] sm:text-[16px] leading-relaxed md:pr-12 text-[#ECEFED] font-normal font-Merriweather-Regular-400">
                        Our Organic Herbal Tea Blend is made from 100% natural herbs, offering a smooth, refreshing taste with no artificial additives. It’s perfect for relaxation and everyday wellness.
                    </p>

                    <Link
                        to="/shop"
                        className="group flex flex-row items-center justify-center gap-2 
                        w-[160px] sm:w-[176px] h-[44px] sm:h-[48px] bg-[#C5CEC6] text-black 
                        font-semibold text-[14px] sm:text-[16px] leading-[24px] rounded-[6px]
                        border border-transparent
                        hover:bg-[#B18A45] hover:text-white hover:border-white
                        transition-all duration-300"
                    >
                        Shop Now
                        <GoArrowUpRight
                            className="inline-block text-[#B18A45]
                            transition-all duration-300
                            group-hover:text-white
                            group-hover:rotate-45"
                        />
                    </Link>
                </div>
            </div>

            {/* Right Side: Image Slider */}
            <div className="w-full md:w-1/2 h-[40vh] md:h-screen relative overflow-hidden">
                {/* Dark Overlay for visual depth */}
                {/* <div className="absolute inset-0 bg-black/25 z-10 pointer-events-none"></div> */}
                <Swiper
                    modules={[Autoplay, EffectFade, Pagination]}
                    effect="fade"
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    className="w-full h-full"
                >
                    <SwiperSlide>
                        <div className="w-full h-full relative group">
                            <img src={hero1} alt="Organic Green Tea" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                            <div className="absolute bottom-12 left-12 z-20">
                                <h3 className="text-3xl font-heading text-primary-dark bg-white/80 backdrop-blur-sm p-4 rounded-sm inline-block shadow-sm">
                                    Hibiscus Senna
                                </h3>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="w-full h-full relative group">
                            <img src={hero2} alt="Golden Herbal Tea" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                            <div className="absolute bottom-12 left-12 z-20">
                                <h3 className="text-3xl font-heading text-primary-dark bg-white/80 backdrop-blur-sm p-4 rounded-sm inline-block shadow-sm">
                                    Hibiscus Mint
                                </h3>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="w-full h-full relative group">
                            <img src={hero3} alt="Chamomile Mint" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                            <div className="absolute bottom-12 left-12 z-20">
                                <h3 className="text-3xl font-heading text-primary-dark bg-white/80 backdrop-blur-sm p-4 rounded-sm inline-block shadow-sm">
                                    Hibiscus Cinnamon
                                </h3>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>

                {/* Navigation Accents */}
                <div className="absolute bottom-8 right-8 z-20 hidden md:block">
                    <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-primary mb-2"></div>
                        <div className="w-2 h-2 rounded-full bg-primary/30 mb-2"></div>
                        <div className="w-2 h-2 rounded-full bg-primary/30 mb-2"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
