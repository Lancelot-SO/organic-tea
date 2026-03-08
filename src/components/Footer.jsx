import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Youtube, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-primary-dark text-white pt-16 md:pt-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-14">
                    {/* Brand & Address */}
                    <div className="md:col-span-4 space-y-6">
                        <div className="flex items-center gap-2">
                            <img
                                src={logo}
                                alt="The Africa Tea Company"
                                className="h-14 md:h-20 w-auto object-cover brightness-0 invert"
                            />
                        </div>

                        <p className="text-gray-200 text-sm leading-relaxed font-medium max-w-[300px]">
                            NutriHealth Food and Beverages. 3rd Apesh Street, Adenta, Accra – Ghana.
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3 text-[13.5px] text-gray-300">
                                <MapPin size={16} className="text-white/70 shrink-0 mt-0.5" />
                                <span>GNAT Heights, #30 Independence Avenue.</span>
                            </div>
                            <div className="flex items-center gap-3 text-[13.5px] text-gray-300">
                                <Phone size={16} className="text-white/70 shrink-0" />
                                <span>0532389064</span>
                            </div>
                            <div className="flex items-center gap-3 text-[13.5px] text-gray-300">
                                <Mail size={16} className="text-white/70 shrink-0" />
                                <span>info@nutrihealthgh.com</span>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-1">
                            <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-gold transition-all duration-300">
                                <Facebook size={18} fill="currentColor" stroke="none" />
                            </a>
                            <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-gold transition-all duration-300">
                                <Twitter size={18} fill="currentColor" stroke="none" />
                            </a>
                            <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-gold transition-all duration-300">
                                <Linkedin size={18} fill="currentColor" stroke="none" />
                            </a>
                            <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-gold transition-all duration-300">
                                <Youtube size={18} fill="currentColor" stroke="none" />
                            </a>
                        </div>
                    </div>

                    {/* About Column */}
                    <div className="md:col-span-2 md:ml-auto">
                        <h4 className="font-heading font-bold text-lg mb-6 text-gold">About</h4>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
                            <li><a href="/contact" className="hover:text-gold transition-colors">FAQS</a></li>
                            <li><a href="#" className="hover:text-gold transition-colors">Quality Assurance</a></li>
                            <li><a href="#" className="hover:text-gold transition-colors">Gift Cards</a></li>
                            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
                            <li><a href="/gallery" className="hover:text-gold transition-colors">Gallery</a></li>
                            <li><a href="/membership" className="hover:text-gold transition-colors">Exclusive Membership</a></li>
                        </ul>
                    </div>

                    {/* Shop Column */}
                    <div className="md:col-span-3 md:ml-auto">
                        <h4 className="font-heading font-bold text-lg mb-6 text-gold">Shop</h4>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><Link to="/shop" className="hover:text-gold transition-colors">Loose Tea Leaves</Link></li>
                            <li><Link to="/shop" className="hover:text-gold transition-colors">Tea Bags</Link></li>
                            <li><Link to="/shop" className="hover:text-gold transition-colors">Gift Packs</Link></li>
                            <li><Link to="/shop" className="hover:text-gold transition-colors">Teaware</Link></li>
                            <li><Link to="/shop" className="hover:text-gold transition-colors">Tea Gifts</Link></li>
                            <li><Link to="/shop" className="hover:text-gold transition-colors">Other Products</Link></li>
                        </ul>
                    </div>

                    {/* Help Center Column */}
                    <div className="md:col-span-3 md:ml-auto">
                        <h4 className="font-heading font-bold text-lg mb-6 text-gold">Help Center</h4>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><a href="#" className="hover:text-gold transition-colors">Delivery Information</a></li>
                            <li><a href="#" className="hover:text-gold transition-colors">Terms & Conditions</a></li>
                            <li><a href="#" className="hover:text-gold transition-colors">Return & Refunds</a></li>
                            <li><a href="#" className="hover:text-gold transition-colors">Privacy Notice</a></li>
                            <li><a href="#" className="hover:text-gold transition-colors">Shopping</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Bar — Darker */}
            <div className="bg-[#E7DBC5] py-5 text-[#182219]">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center text-[12px] gap-4">
                    <div className="flex flex-wrap justify-center lg:justify-start items-center gap-1.5">
                        <span>Copyright @ 2025 Nutrihealth Foods & Beverages.</span>
                        <span className="text-gray-500">•</span>
                        <span>Designed by Artfrica Studios</span>
                        <span className="text-gray-500">•</span>
                        <span>All Rights Reserved</span>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-3 text-gray-400">
                        <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
                        <span className="text-gray-500">•</span>
                        <a href="#" className="hover:text-gold transition-colors">Terms of Use / Terms & Conditions</a>
                        <span className="text-gray-500">•</span>
                        <a href="#" className="hover:text-gold transition-colors">Disclaimer</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
