import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

const ContactInfo = () => {
    const contactCards = [
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Visit Our Studio",
            details: ["123 Botanist Lane, Green Valley", "Nature State, 56789"],
            link: "#"
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email Us",
            details: ["hello@nutrihealthtea.com", "support@nutrihealthtea.com"],
            link: "mailto:hello@nutrihealthtea.com"
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Call Us",
            details: ["025 685 4460", "Mon - Sun, 24/7"],
            link: "tel:+233256854460"
        }
    ];

    const socialIcons = [
        { icon: <Instagram className="w-5 h-5" />, link: "#" },
        { icon: <Facebook className="w-5 h-5" />, link: "#" },
        { icon: <Twitter className="w-5 h-5" />, link: "#" }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section className="py-12 -mt-12 relative z-20">
            <div className="container mx-auto px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {contactCards.map((card, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="bg-white p-8 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 flex flex-col items-center text-center group"
                        >
                            <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-colors duration-300 mb-4">
                                {card.icon}
                            </div>
                            <h3 className="text-xl font-heading font-bold text-primary-dark mb-4">{card.title}</h3>
                            <div className="space-y-1">
                                {card.details.map((detail, dIdx) => (
                                    <p key={dIdx} className="text-stone-500 text-sm leading-relaxed">{detail}</p>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Social Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    viewport={{ once: true }}
                    className="mt-10 flex flex-col items-center gap-6"
                >
                    <p className="text-stone-400 text-xs font-bold uppercase tracking-[0.3em]">Follow Our Journey</p>
                    <div className="flex gap-4">
                        {socialIcons.map((social, idx) => (
                            <a
                                key={idx}
                                href={social.link}
                                className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-gold hover:border-gold transition-all duration-300"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactInfo;
