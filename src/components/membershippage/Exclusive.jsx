import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import product1 from '../../assets/images/product1.jpeg';
import product2 from '../../assets/images/product2.jpeg';

const Exclusive = () => {
    // Premium images from Unsplash
    const mainImage = product1;
    const smallImage = product2;

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    const floatingAnimation = {
        y: [0, -15, 0],
        transition: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    return (
        <section className="bg-[#FAF9F6] py-16 md:py-24 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">

                    {/* Left Column: Images */}
                    <div className="w-full lg:w-5/12 relative">
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            {/* Main Image with Scale Effect */}
                            <div className="rounded-2xl overflow-hidden shadow-2xl relative">
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    src={mainImage}
                                    alt="Membership Club"
                                    className="w-full h-[400px] md:h-[550px] object-cover"
                                />
                                <div className="absolute inset-0 bg-primary-dark/5 group-hover:bg-transparent transition-colors duration-500" />
                            </div>

                            {/* Small Overlapping Image with Floating Animation */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, x: 30, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                                animate={floatingAnimation}
                                transition={{
                                    opacity: { duration: 0.8, delay: 0.4 },
                                    scale: { duration: 0.8, delay: 0.4 },
                                    y: floatingAnimation.transition
                                }}
                                viewport={{ once: true }}
                                className="absolute -bottom-8 -right-4 md:-right-8 w-40 md:w-56 aspect-[4/5] rounded-2xl overflow-hidden border-8 border-[#FAF9F6] shadow-2xl z-20"
                            >
                                <img
                                    src={smallImage}
                                    alt="Tea Leaves"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>

                            {/* Decorative Element */}
                            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gold/5 rounded-full blur-3xl -z-10" />
                        </motion.div>
                    </div>

                    {/* Right Column: Content & Form */}
                    <div className="w-full lg:w-7/12">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="space-y-8"
                        >
                            <div className="space-y-4">
                                <motion.span
                                    variants={itemVariants}
                                    className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 text-gold text-[11px] font-bold rounded-full uppercase tracking-[0.2em]"
                                >
                                    <span className="w-1 h-1 bg-gold rounded-full animate-pulse" />
                                    Exclusive Membership
                                </motion.span>

                                <motion.h2
                                    variants={itemVariants}
                                    className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-dark leading-tight"
                                >
                                    Experience The <br />
                                    <span className="text-gold italic font-serif">Art of Tea</span>
                                </motion.h2>

                                <motion.p
                                    variants={itemVariants}
                                    className="text-stone-600 leading-relaxed text-base max-w-xl"
                                >
                                    Born from a vision to bring the ancient wisdom of African botanicals to the modern world. Our club offers an immersive journey through artisanal spices and rare herbal blends designed for your wellness.
                                </motion.p>
                            </div>

                            <motion.div
                                variants={itemVariants}
                                className="space-y-6 pt-4 border-t border-stone-100"
                            >
                                <h3 className="text-xl md:text-2xl font-heading font-bold text-primary-dark flex items-center gap-3">
                                    Apply for Membership
                                    <ArrowUpRight className="w-5 h-5 text-gold" />
                                </h3>

                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { placeholder: "First Name *", type: "text" },
                                            { placeholder: "Last Name *", type: "text" },
                                            { placeholder: "Email Address *", type: "email" },
                                            { placeholder: "Phone Number *", type: "tel" }
                                        ].map((input, idx) => (
                                            <motion.div
                                                key={idx}
                                                whileFocus={{ y: -2 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <input
                                                    type={input.type}
                                                    placeholder={input.placeholder}
                                                    className="w-full px-5 py-4 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all placeholder:text-stone-400 text-sm shadow-sm hover:border-stone-300"
                                                    required
                                                />
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="flex justify-start">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            className="flex items-center gap-3 bg-primary-dark hover:bg-gold text-white px-8 py-4 rounded-xl font-semibold text-sm transition-all group shadow-xl shadow-primary-dark/10"
                                        >
                                            Submit Application
                                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </motion.button>
                                    </div>
                                </form>
                            </motion.div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Exclusive;
