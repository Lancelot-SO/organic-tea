import React, { useEffect, useRef, useState } from 'react';

import leaf1 from '../../assets/images/decor/leaf-1.png';
import leaf2 from '../../assets/images/decor/leaf-2.png';
import flower1 from '../../assets/images/decor/flower-1.png';
import flower2 from '../../assets/images/slidein-flower.png';
import flower3 from '../../assets/images/slidein-flower1.png';
import teaLeaves from '../../assets/images/decor/tea-leaves.png';

const decorImages = { leaf1, leaf2, flower1, flower2, flower3, teaLeaves };

/**
 * FloatingLeaf — a scroll-triggered botanical decoration.
 *
 * Props:
 *  - image: key from decorImages ('leaf1' | 'leaf2' | 'flower1' | 'flower2' | 'flower3' | 'teaLeaves')
 *  - side: 'left' | 'right' — which corner to animate from
 *  - size: Tailwind size class (default: 'w-28 h-28 md:w-40 md:h-40')
 *  - className: extra classes for position tweaks (e.g. 'top-10', 'bottom-20')
 *  - rotate: initial rotation deg (default: 0)
 *  - delay: extra stagger delay in ms on top of the 3s base (default: 0)
 *  - flip: mirror the image horizontally
 *  - opacity: max opacity (default: 0.55)
 */
const FloatingLeaf = ({
    image = 'leaf1',
    side = 'right',
    size = 'w-28 h-28 md:w-40 md:h-40',
    className = 'top-8',
    rotate = 0,
    delay = 0,
    flip = false,
    opacity = 0.8,
}) => {
    const ref = useRef(null);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Wait 3 seconds after entering viewport before animating in
                    timerRef.current = setTimeout(() => {
                        setShouldAnimate(true);
                    }, 3000 + delay);
                } else {
                    // Clear timer if user scrolls away before the 3s
                    if (timerRef.current) {
                        clearTimeout(timerRef.current);
                        timerRef.current = null;
                    }
                    setShouldAnimate(false);
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
        );

        observer.observe(el);
        return () => {
            observer.disconnect();
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [delay]);

    const src = decorImages[image] || decorImages.leaf1;
    const sideClass = side === 'left' ? 'left-0' : 'right-0';
    const enterClass = side === 'left' ? 'leaf-enter-left' : 'leaf-enter-right';
    const exitClass = side === 'left' ? 'leaf-exit-left' : 'leaf-exit-right';

    return (
        <div
            ref={ref}
            className={`absolute ${sideClass} ${className} z-10 pointer-events-none`}
        >
            <img
                src={src}
                alt=""
                className={`
                    ${size}
                    object-contain
                    ${shouldAnimate ? `${enterClass} leaf-float` : exitClass}
                    ${flip ? 'scale-x-[-1]' : ''}
                `}
                style={{
                    opacity: shouldAnimate ? opacity : 0,
                    transform: `rotate(${rotate}deg)`,
                    filter: 'drop-shadow(0 4px 12px rgba(45, 90, 61, 0.35))',
                    transition: 'opacity 0.8s ease',
                }}
            />
        </div>
    );
};

export default FloatingLeaf;
