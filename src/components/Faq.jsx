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
            question: "What makes NutriHealth tea unique?",
            answer: "Our tea is crafted from a proprietary blend of authentic African herbs and spices, specifically selected for their nutritional density and traditional wellness benefits. Unlike processed alternatives, we maintain the raw integrity of our ingredients to ensure maximum potency."
        },
        {
            question: "How do I brew the perfect cup?",
            answer: "For the best experience, steep one teaspoon of our loose-leaf blend in 200ml of water heated to 85°C (185°F) for 5-7 minutes. This allows the complex oils and nutrients from the spices to fully emulsify without bitterness."
        },
        {
            question: "Is the membership club free to join?",
            answer: "While we offer a free newsletter, our Exclusive Membership Club is a premium subscription service. Members receive monthly drops of rare micro-batches, early access to new blends, and invitations to private tasting events across the continent."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship our artisanal blends globally. Shipping times vary by region: typically 3-5 days within Africa and 7-12 days for Europe, North America, and Asia. All orders are packed in eco-friendly, carbon-compensated packaging."
        },
        {
            question: "Are your ingredients ethically sourced?",
            answer: "Absolutely. We work directly with small-holder farmers and cooperatives across Africa, ensuring fair-trade prices that are significantly above the market average. We also reinvest a portion of our profits into sustainable farming education for our partners."
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
