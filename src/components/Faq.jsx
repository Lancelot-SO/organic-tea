import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import teaPouring from '../assets/images/home/honey.png'; // Fallback to existing asset if generation fails

const FaqItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="mb-4">
            <button
                onClick={onClick}
                className={`w-full flex items-center justify-between p-5 text-left transition-all duration-300 rounded-xl border ${isOpen
                    ? 'bg-[#F1F3F1] border-[#E2E8E2]'
                    : 'bg-[#F1F3F1] border-transparent hover:border-[#E2E8E2]'
                    }`}
            >
                <span className={`text-base md:text-lg font-heading font-semibold text-[#2D3E35]`}>
                    {question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[#2D3E35]"
                >
                    <ChevronDown className="w-5 h-5 opacity-60" />
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
                        <div className="px-5 pb-5 pt-2">
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
            question: "How can i make an order for The Tea",
            answer: "You can easily make an order through our online shop or by contacting us directly. Select your favorite blends, add them to your cart, and proceed to checkout for a seamless experience."
        },
        {
            question: "Is there a return Policy",
            answer: "We strive for complete satisfaction. If you're not happy with your purchase, please contact our support team within 14 days of receipt to discuss return or exchange options."
        },
        {
            question: "How can i make an order for The Tea",
            answer: "Orders can also be placed via our social media platforms or by calling our customer service line. We ensure quick processing and reliable delivery."
        },
        {
            question: "How can i make an order for The Tea",
            answer: "Bulk orders and white-labeling requests can be initiated through our contact form or by reaching out to our sales team directly."
        },
        {
            question: "How can i make an order for The Tea",
            answer: "Join our membership program for exclusive access to new blends and easy re-ordering of your favorite products."
        }
    ];

    return (
        <section className="py-16 md:py-24 bg-[#FDFAF3]">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: FAQ Content */}
                    <div className="max-w-[711px]">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="mb-10"
                        >
                            <span className="inline-block px-3 py-1 bg-[#E8EAE8] text-[#2D3E35] text-[10px] font-bold rounded mb-4 tracking-wider">
                                FAQS
                            </span>
                            <h2 className="text-[20px] md:text-5xl lg:text-4xl font-heading font-bold text-[#2D3E35] leading-tight flex flex-wrap gap-x-4">
                                Your<span className="text-[#B68C5A] italic font-serif">Questions Answered</span>
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            {faqs.map((faq, index) => (
                                <FaqItem
                                    key={index}
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openIndex === index}
                                    onClick={() => setOpenIndex(index)}
                                />
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Column: Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative h-[400px] md:h-[600px] w-full"
                    >
                        <img
                            src={teaPouring}
                            alt="Pouring artisanal tea"
                            className="w-full h-full object-cover rounded-2xl shadow-xl"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Faq;
