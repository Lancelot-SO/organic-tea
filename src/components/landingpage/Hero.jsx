import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GoArrowUpRight } from 'react-icons/go';

import teaVideo from '../../assets/video/tea.mp4';

// Product images
import hero1 from '../../assets/images/hero-1.jpeg';
import hero2 from '../../assets/images/hero-2.jpeg';
import hero3 from '../../assets/images/hero-3.jpeg';
import product1 from '../../assets/images/product1.jpeg';
import product2 from '../../assets/images/product2.jpeg';
import product3 from '../../assets/images/product3.jpeg';
import product4 from '../../assets/images/product4.jpeg';
import product5 from '../../assets/images/product5.jpeg';

const productImages = [hero1, hero2, hero3, product1, product2, product3, product4, product5];

function getRandomPair() {
    const shuffled = [...productImages].sort(() => Math.random() - 0.5);
    return [shuffled[0], shuffled[1]];
}

const FlameTrail = () => (
    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
        {/* Core flame */}
        <div className="flame-flicker w-6 h-10 sm:w-8 sm:h-14 md:w-10 md:h-16 bg-linear-to-b from-white via-yellow-300 to-orange-500 rounded-b-full blur-[2px]"></div>
        {/* Mid flame */}
        <div className="flame-flicker w-5 h-8 sm:w-7 sm:h-10 md:w-8 md:h-12 bg-linear-to-b from-orange-400 via-red-500 to-transparent rounded-b-full blur-[3px] -mt-4" style={{ animationDelay: '0.05s' }}></div>
        {/* Outer glow */}
        <div className="flame-flicker w-4 h-10 sm:w-5 sm:h-12 md:w-6 md:h-14 bg-linear-to-b from-red-500/80 to-transparent rounded-b-full blur-[5px] -mt-5 opacity-60" style={{ animationDelay: '0.1s' }}></div>
        {/* Sparks */}
        <div className="flame-spark absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-300 rounded-full blur-[2px]" style={{ animationDelay: '0.1s' }}></div>
        <div className="flame-spark absolute -bottom-4 left-1/3 w-1.5 h-1.5 bg-orange-400 rounded-full blur-[1px]" style={{ animationDelay: '0.25s' }}></div>
        <div className="flame-spark absolute -bottom-3 right-1/3 w-1 h-1 bg-red-400 rounded-full blur-[1px]" style={{ animationDelay: '0.35s' }}></div>
    </div>
);

const Hero = () => {
    const [rockets, setRockets] = useState({ left: null, right: null });
    const [animState, setAnimState] = useState('hidden'); // hidden | entering | visible | exiting
    const timersRef = useRef([]);

    const clearTimers = () => {
        timersRef.current.forEach(t => clearTimeout(t));
        timersRef.current = [];
    };

    const addTimer = (fn, delay) => {
        const id = setTimeout(fn, delay);
        timersRef.current.push(id);
        return id;
    };

    const launchRockets = useCallback(() => {
        const [leftImg, rightImg] = getRandomPair();
        setRockets({ left: leftImg, right: rightImg });
        setAnimState('entering');

        // After entering animation (1.2s), float in place
        addTimer(() => setAnimState('visible'), 1200);

        // After 3s visible, zoom off to the top
        addTimer(() => setAnimState('exiting'), 4200);

        // After exit animation (1s), fully hide
        addTimer(() => setAnimState('hidden'), 5200);
    }, []);

    useEffect(() => {
        // First launch after 5 seconds
        const initialTimer = setTimeout(launchRockets, 5000);

        // Repeat cycle: 5s wait + 1.2s enter + 3s visible + 1s exit + 2.8s pause = ~13s
        const interval = setInterval(launchRockets, 13000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
            clearTimers();
        };
    }, [launchRockets]);

    const getAnimClass = (side) => {
        switch (animState) {
            case 'entering':
                return side === 'left' ? 'rocket-enter-left' : 'rocket-enter-right';
            case 'visible':
                return 'rocket-hover';
            case 'exiting':
                return side === 'left' ? 'rocket-exit-left' : 'rocket-exit-right';
            default:
                return 'opacity-0';
        }
    };

    return (
        <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">

            {/* Full-Width Video Background */}
            <div className="absolute inset-0 w-full h-full bg-primary-dark">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
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

            {/* Centered Content Overlay */}
            <div className="relative z-20 flex flex-col items-center text-center gap-6 px-6 max-w-[800px]">
                <h1 className="lg:text-[61px] md:text-[50px] text-[36px] text-white font-bold lg:leading-[71px] md:leading-[60px] leading-[44px] italic">
                    Organic <span className="text-gold">Herbal Tea</span> Blend, Naturally Refreshing
                </h1>

                <p className="w-full text-[14px] sm:text-[16px] leading-relaxed text-[#ECEFED] font-normal max-w-[600px]">
                    Our Organic Herbal Tea Blend is made from 100% natural herbs, offering a smooth, refreshing taste with no artificial additives. It's perfect for relaxation and everyday wellness.
                </p>

                <Link
                    to="/shop"
                    className="group flex flex-row items-center justify-center gap-2 
                    w-[160px] sm:w-[176px] h-[44px] sm:h-[48px] bg-[#C5CEC6] text-black 
                    font-semibold text-[14px] sm:text-[16px] leading-[24px] rounded-[6px]
                    border border-transparent
                    hover:bg-gold hover:text-white hover:border-white
                    transition-all duration-300"
                >
                    Shop Now
                    <GoArrowUpRight
                        className="inline-block text-gold
                        transition-all duration-300
                        group-hover:text-white
                        group-hover:rotate-45"
                    />
                </Link>
            </div>

            {/* Rocket Product — Left (enters from bottom-left, exits to top) */}
            {animState !== 'hidden' && rockets.left && (
                <div
                    className={`absolute z-30 pointer-events-none bottom-[12%] sm:bottom-[15%] left-[3%] sm:left-[6%] md:left-[10%] ${getAnimClass('left')}`}
                >
                    <div className="relative">
                        <FlameTrail />
                        <img
                            src={rockets.left}
                            alt="Product"
                            className="w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain drop-shadow-[0_0_25px_rgba(255,165,0,0.5)] rounded-xl"
                        />
                        {/* Orange glow halo */}
                        <div className="absolute inset-0 rounded-xl bg-linear-to-t from-orange-500/25 via-yellow-400/10 to-transparent pointer-events-none"></div>
                    </div>
                </div>
            )}

            {/* Rocket Product — Right (enters from bottom-right, exits to top) */}
            {animState !== 'hidden' && rockets.right && (
                <div
                    className={`absolute z-30 pointer-events-none bottom-[12%] sm:bottom-[15%] right-[3%] sm:right-[6%] md:right-[10%] ${getAnimClass('right')}`}
                >
                    <div className="relative">
                        <FlameTrail />
                        <img
                            src={rockets.right}
                            alt="Product"
                            className="w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain drop-shadow-[0_0_25px_rgba(255,165,0,0.5)] rounded-xl"
                        />
                        {/* Orange glow halo */}
                        <div className="absolute inset-0 rounded-xl bg-linear-to-t from-orange-500/25 via-yellow-400/10 to-transparent pointer-events-none"></div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Hero;
