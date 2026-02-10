import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import main from "../../assets/images/about/main.png"

const MainAbout = () => {
    // High-quality online image representing a community/team (African individuals)

    return (
        <section className="py-10 bg-white overflow-hidden">
            <div className="container mx-auto">

                {/* Header Section: About Us Badge + Main title */}
                <div className="mb-12 lg:mb-16">
                    <div className="inline-block px-4 py-1.5 bg-gray-100 rounded-md mb-8">
                        <span className="text-xs font-heading font-medium text-gray-600 uppercase tracking-widest">
                            About Us
                        </span>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-3 h-3 rounded-full bg-gold mt-4 shrink-0" />
                        <h2 className="text-4xl md:text-5xl lg:text-[49px] font-bold font-heading leading-[56px]">
                            <span className="text-primary-dark">The </span>
                            <span className="text-gold italic">Ultimate Health</span><br />
                            <span className="text-primary-dark">Experience</span>
                        </h2>
                    </div>
                </div>

                {/* Main Content Section: Split Layout with bottom alignment */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-end">

                    {/* Left Content Column */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start">
                        {/* Who We Are Tag */}
                        <div className="inline-block px-4 py-1.5 bg-gray-100 rounded-md mb-6">
                            <span className="text-xs font-heading font-medium text-gray-600 uppercase tracking-widest">
                                Who we are
                            </span>
                        </div>

                        {/* Paragraphs - Using specific styles from user edits */}
                        <div className="space-y-6 text-gray-600 leading-[30px] text-[16px] max-w-xl font-light">
                            <p>
                                At a time when the whole world was reeling from the effects of a global pandemic,
                                we knew to tap into the wonders of our African herbs and spices to create a blend
                                that is not only tasty and delicious but with a wide range of benefits as well.
                                Particularly, helping relieve stress, boosting the immune system, aiding weight loss
                                and promoting general wellbeing.
                            </p>

                            <p>
                                At <span className="text-gold font-medium">NutriHealth</span>, we pride ourselves in sourcing
                                the best natural raw materials, some unique to the West African region only, to create
                                healthy and tasty teas filled with the goodness of authentic African spices and herbs.
                                The Hibiscus plant remains a popular herbal remedy in countries throughout the world
                                and is the main ingredient for all our blends.
                            </p>

                            <p>
                                With our hygienically produced healthy tea blends, accessories and excellent packaging
                                to keep your tea fresh always, we produce a holistic experience worth enjoying every day.
                            </p>
                        </div>

                        {/* CTA Button */}
                        <div className="mt-10">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link
                                    to="/shop"
                                    className="flex items-center gap-3 px-8 py-3.5 border border-gray-200 bg-gray-50 rounded-lg hover:border-gold hover:text-gold transition-all group lg:mb-2 inline-flex"
                                >
                                    <span className="font-heading font-semibold text-sm">Shop Our Teas</span>
                                    <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gold transition-colors" />
                                </Link>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Image Column */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <img
                                src={main}
                                alt="Our Community and Team"
                                className="w-full aspect-[4/5] object-cover grayscale-[0.3] sepia-[0.3]"
                            />
                            {/* Decorative overlay to match the vintage feel */}
                            <div className="absolute inset-0 bg-gold/5 pointer-events-none" />
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MainAbout;
