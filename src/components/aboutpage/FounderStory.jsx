import { motion } from 'framer-motion';
import hero2 from '../../assets/images/hero-2.jpeg';

const FounderStory = () => {
    // High-quality background image representing the team/founder aesthetic
    const bgImage = hero2;

    return (
        <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden py-20">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={bgImage}
                    alt="Founders"
                    className="w-full h-full object-cover"
                />
                {/* Darker overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/60 md:bg-black/70" />
            </div>

            <div className="container relative z-10 mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Top Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="inline-block bg-white px-4 py-1 rounded-sm mb-8"
                    >
                        <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-gray-800 italic">
                            Finest & The Freshest Teas
                        </span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-4xl lg:text-[49px] font-bold font-heading leading-tight mb-8"
                    >
                        <span className="text-gold italic">Founded by a Master Tea Brewer.</span>{" "}
                        <span className="text-white">Made to Heal, Love and Refresh.</span>
                    </motion.h2>

                    {/* Description Paragraph */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="text-gray-200 text-sm md:text-[18px] leading-[24px] md:leading-[30px] max-w-3xl mx-auto font-light"
                    >
                        Driven by the vision of our Master Tea Brewer, we aspire to transcend the ordinary,
                        infusing every cup with a legacy of craftsmanship and an unwavering commitment
                        to sourcing the finest natural elements. Rooted in tradition and guided by innovation,
                        we invite you to savor not just tea but a curated experience that reflects the mastery,
                        love, and dedication woven into each sip.
                    </motion.p>
                </div>
            </div>
        </section>
    );
};

export default FounderStory;
