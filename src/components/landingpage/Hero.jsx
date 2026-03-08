import React from 'react';
import { Link } from 'react-router-dom';
import { GoArrowUpRight } from 'react-icons/go';

import teaVideo from '../../assets/video/tea.mp4';

// Product images for the bottom-right showcase
import product4 from '../../assets/images/product4.jpeg';
import product1 from '../../assets/images/product1.jpeg';
import product3 from '../../assets/images/product3.jpeg';

const Hero = () => {
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
                        <div className="max-w-[520px]">
                            <h1 className="text-[36px] md:text-[38px] lg:text-[44px] text-white font-bold leading-[1.15] italic mb-5">
                                Organic{' '}
                                <span className="text-gold">Herbal Tea</span>
                                <br />
                                Blend, Naturally
                                Refreshing
                            </h1>

                            <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed text-white/80 font-normal max-w-[440px] mb-7">
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

                                {/* <Link
                                    to="/shop?sort=best-sellers"
                                    className="group flex items-center gap-2 px-5 py-2.5 bg-gold text-white font-semibold text-[13px] sm:text-[14px] rounded-md hover:bg-gold-dark transition-all duration-300"
                                >
                                    Our Best Sellers
                                    <GoArrowUpRight className="text-white group-hover:rotate-45 transition-all duration-300" />
                                </Link> */}
                            </div>
                        </div>

                        {/* Right Content — Product Images */}
                        <div className="hidden md:flex items-end gap-3 mr-4 lg:mr-10">
                            <div className="hero-product-float w-28 lg:w-36 h-28 lg:h-36 rounded-lg overflow-hidden shadow-2xl border border-white/10" style={{ animationDelay: '0.5s' }}>
                                <img
                                    src={product4}
                                    alt="Tea product"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="hero-product-float w-36 lg:w-44 h-36 lg:h-44 rounded-lg overflow-hidden shadow-2xl border border-white/10" style={{ animationDelay: '0s' }}>
                                <img
                                    src={product1}
                                    alt="Tea product"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="hero-product-float w-24 lg:w-32 h-24 lg:h-32 rounded-lg overflow-hidden shadow-2xl border border-white/10" style={{ animationDelay: '1s' }}>
                                <img
                                    src={product3}
                                    alt="Tea product"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
