import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import product1 from '../../assets/images/drink.png';
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
        <section className="bg-[#FBFBEF] py-16 md:py-24 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">

                    {/* Left Column: Images */}
                    <div className="w-full lg:w-1/2 relative min-h-[500px] lg:min-h-full">
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                            className="relative h-full w-full"
                        >
                            {/* Main Image */}
                            <div className="h-full w-full rounded-sm overflow-hidden relative">
                                <img
                                    src={mainImage}
                                    alt="Membership Club"
                                    className="w-full h-full object-cover"
                                />

                                {/* Overlay Image - Bottom Right inside main image */}
                                <div className="absolute bottom-6 right-6 w-48 h-48 md:w-[378px] md:h-[309px] rounded-2xl overflow-hidden border-4 border-white/90 shadow-lg z-10">
                                    <img
                                        src={smallImage}
                                        alt="Tea Detail"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Content & Form */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-10">
                        {/* Top Content */}
                        <div className="space-y-6">
                            <span className="inline-block px-4 py-2 bg-[#E6E8E6] text-[#5C5C5C] text-xs font-bold font-serif italic rounded-sm">
                                HutriHealth Tea Club
                            </span>

                            <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
                                <span className="text-primary-dark">Join Our</span> <br />
                                <span className="text-gold italic">Membership Club</span>
                            </h2>

                            <p className="text-[#5C5C5C] leading-relaxed text-base md:text-lg">
                                At a time when the whole world was reeling from the effects of a global pandemic, we knew to tap into the wonders of our African herbs and spices to create a blend that is not only tasty and delicious but with a wide range of benefits as well. Particularly, helping relieve stress, boosting the immune system, aiding weight loss and promoting general wellbeing.
                            </p>
                        </div>

                        {/* Form Section */}
                        <div className="space-y-6">
                            <span className="inline-block px-4 py-2 bg-[#E6E8E6] text-[#5C5C5C] text-xs font-bold font-serif italic rounded-sm">
                                Be Part of Us
                            </span>

                            <h3 className="text-3xl md:text-4xl font-heading font-bold text-gold">
                                Join The Club By Filling <br /> This Form
                            </h3>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {[
                                        { label: "First Name", type: "text" },
                                        { label: "Last Name", type: "text" },
                                        { label: "Email Address", type: "email" },
                                        { label: "Phone", type: "tel" }
                                    ].map((input, idx) => (
                                        <div key={idx} className="relative">
                                            <input
                                                type={input.type}
                                                placeholder={`${input.label} *`}
                                                className="w-full px-5 py-4 bg-[#EAEAEA] border border-transparent rounded-lg focus:ring-1 focus:ring-primary/20 focus:bg-white outline-none transition-all placeholder:text-[#8A8A8A] text-gray-800 text-sm"
                                                required
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-end pt-2">
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 bg-[#4A5D50] hover:bg-primary-dark text-white px-8 py-3 rounded-md font-medium transition-colors shadow-md"
                                    >
                                        Send Message
                                        <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Exclusive;
