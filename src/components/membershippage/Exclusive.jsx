import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import product1 from '../../assets/images/drink.png';
import product2 from '../../assets/images/product2.jpeg';

const Exclusive = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('https://api.theafricateacompany.com/api/membership', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: ''
                });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setErrorMessage(data.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Membership submission error:', error);
            setStatus('error');
            setErrorMessage('Network error. Please check your connection and try again.');
        }
    };

    // Premium images from Unsplash
    const mainImage = product1;
    const smallImage = product2;

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

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            placeholder="First Name *"
                                            className="w-full px-5 py-4 bg-[#EAEAEA] border border-transparent rounded-lg focus:ring-1 focus:ring-primary/20 focus:bg-white outline-none transition-all placeholder:text-[#8A8A8A] text-gray-800 text-sm"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            placeholder="Last Name *"
                                            className="w-full px-5 py-4 bg-[#EAEAEA] border border-transparent rounded-lg focus:ring-1 focus:ring-primary/20 focus:bg-white outline-none transition-all placeholder:text-[#8A8A8A] text-gray-800 text-sm"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Email Address *"
                                            className="w-full px-5 py-4 bg-[#EAEAEA] border border-transparent rounded-lg focus:ring-1 focus:ring-primary/20 focus:bg-white outline-none transition-all placeholder:text-[#8A8A8A] text-gray-800 text-sm"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Phone *"
                                            className="w-full px-5 py-4 bg-[#EAEAEA] border border-transparent rounded-lg focus:ring-1 focus:ring-primary/20 focus:bg-white outline-none transition-all placeholder:text-[#8A8A8A] text-gray-800 text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <AnimatePresence mode="wait">
                                    {status === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-xl text-sm font-medium"
                                        >
                                            <CheckCircle2 className="w-5 h-5" />
                                            Joined successfully! Welcome to the club.
                                        </motion.div>
                                    )}
                                    {status === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl text-sm font-medium"
                                        >
                                            <AlertCircle className="w-5 h-5" />
                                            {errorMessage}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="flex justify-end pt-2">
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className={`flex items-center gap-2 ${status === 'loading' ? 'bg-[#4A5D50]/70' : 'bg-[#4A5D50] hover:bg-primary-dark'} text-white px-8 py-3 rounded-md font-medium transition-colors shadow-md disabled:cursor-not-allowed`}
                                    >
                                        {status === 'loading' ? (
                                            <>
                                                Joining...
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            </>
                                        ) : (
                                            <>
                                                Join Now
                                                <ArrowUpRight className="w-4 h-4" />
                                            </>
                                        )}
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

