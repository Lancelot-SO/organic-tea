import React from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, Globe, Lightbulb, Smile, Coffee, Users } from 'lucide-react';

const CoreValues = () => {
    const values = [
        {
            icon: <ThumbsUp className="w-10 h-10 text-primary-dark" />,
            title: "Uncompromising Quality",
            description: "Delivering teas and infusions of the highest standards, crafted with natural ingredients for exceptional flavor and health benefits."
        },
        {
            icon: <Globe className="w-10 h-10 text-primary-dark" />,
            title: "Sustainable Practices",
            description: "Committing to environmentally friendly sourcing and manufacturing to protect our planet and empower African communities"
        },
        {
            icon: <Lightbulb className="w-10 h-10 text-primary-dark" />,
            title: "Innovative Spirit",
            description: "Leveraging cutting-edge technology and creative approaches to enhance our products and drive sustainable growth."
        },
        {
            icon: <Smile className="w-10 h-10 text-primary-dark" />,
            title: "Customer Delight",
            description: "Exceeding expectations with products and experiences that inspire health, wellness, and joy."
        },
        {
            icon: <Coffee className="w-10 h-10 text-primary-dark" />,
            title: "Positive Work Environment",
            description: "We are creating a supportive, inclusive workplace where our employees feel valued, motivated, and happy to contribute to our shared success."
        },
        {
            icon: <Users className="w-10 h-10 text-primary-dark" />,
            title: "Diversity and Inclusion",
            description: "Promoting diversity and inclusion in our recruitment and company culture, ensuring a broad range of perspectives and experiences enrich our team."
        }
    ];

    return (
        <section className="py-20 bg-[#FDFBF7]">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="mb-20">
                    <div className="inline-block px-4 py-1.5 bg-[#EEF1F0] rounded-md mb-8">
                        <span className="text-xs font-heading font-medium text-gray-600 uppercase tracking-widest">
                            Core Values
                        </span>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-3.5 h-3.5 rounded-full bg-gold mt-4 shrink-0" />
                        <h2 className="text-4xl md:text-5xl lg:text-[49px] font-bold font-heading leading-tight">
                            <span className="text-primary-dark">The </span>
                            <span className="text-gold italic">Ultimate Health</span><br />
                            <span className="text-primary-dark">Experience</span>
                        </h2>
                    </div>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="mb-6">
                                {value.icon}
                            </div>
                            <h3 className="text-gold italic font-heading font-semibold text-xl mb-4">
                                {value.title}
                            </h3>
                            <p className="text-primary-dark/80 text-[16px] leading-[26px] font-light max-w-[340px]">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoreValues;
