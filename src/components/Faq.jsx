import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FaqItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border-b border-stone-100 last:border-none">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between py-4 text-left group transition-all"
            >
                <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-gold text-white' : 'bg-stone-50 text-stone-400 group-hover:bg-stone-100'}`}>
                        <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className={`text-base md:text-lg font-heading font-bold transition-colors ${isOpen ? 'text-primary-dark' : 'text-stone-600 group-hover:text-primary-dark'}`}>
                        {question}
                    </span>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={`text-stone-400 ${isOpen ? 'text-gold' : ''}`}
                >
                    <ChevronDown className="w-5 h-5" />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-4 pl-12 pr-6">
                            <p className="text-stone-500 leading-relaxed text-sm md:text-base">
                                {answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "What are the benefits of hibiscus tea?",
            answer: "Hibiscus tea is rich in antioxidants and vitamin C, which help support the immune system. It is known to support heart health by helping to maintain healthy blood pressure levels, aid digestion, promote hydration, and support overall wellness when consumed regularly as part of a healthy lifestyle."
        },
        {
            question: "Do you deliver outside Accra and outside the country?",
            answer: "Yes, we deliver to locations outside Accra and to other regions across Ghana. We also attend to international orders. Delivery fees and timelines may vary depending on the destination."
        },
        {
            question: "How many variants of tea do you have?",
            answer: "Nutrihealth Foods and Beverages offers a variety of herbal tea variants. Our range includes different blends formulated to support general health and wellness. Availability of variants may vary from time to time."
        },
        {
            question: "Do you white label?",
            answer: "Yes, we offer white labeling services. This allows businesses and organizations to brand our high-quality herbal teas under their own label, subject to agreed terms and minimum order quantities."
        },
        {
            question: "Can I add sweetener to hibiscus tea?",
            answer: "Yes, you may add a sweetener to hibiscus tea according to your preference. Natural sweeteners such as honey or dates are recommended to maintain the health benefits of the tea."
        },
        {
            question: "Does hibiscus tea have any side effects?",
            answer: "Hibiscus tea is generally safe for most people when consumed in moderation. However, excessive intake may cause mild effects such as stomach discomfort in some individuals. Pregnant or breastfeeding women and individuals on medication should consult a healthcare professional before use."
        },
        {
            question: "Where can I shop your teas?",
            answer: "You can shop Nutrihealth teas directly through our official sales channels, selected retail outlets, and by contacting us via our social media platforms or customer service lines (025 685 4460) for assistance."
        }
    ];

    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-[11px] font-bold rounded-full uppercase tracking-[0.2em] mb-2">
                            Questions & Answers
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-dark">
                            Curious About Our <br />
                            <span className="text-gold italic font-serif">Artisanal Blends?</span>
                        </h2>
                    </motion.div>

                    {/* FAQ List */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-[#FAF9F6]/50 rounded-3xl p-4 md:p-8"
                    >
                        {faqs.map((faq, index) => (
                            <FaqItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Faq;
