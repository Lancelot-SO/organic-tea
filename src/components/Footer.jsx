import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import logo from '../assets/images/footerlogo.png';
import { policies } from '../data/legalContent';

const Footer = ({ onShowPolicy }) => {
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
                                className="h-14 md:h-20 w-auto object-cover"
                            />
                        </div>

                        <p className="text-gray-200 text-sm leading-relaxed font-medium max-w-[300px]">
                            The Africa Tea Company <br />Accra – Ghana.
                        </p>

                        <div className="space-y-3">

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
                            <a href="https://www.facebook.com/share/1KYruXuJYR/?mibextid=wwXIfr" target='_blank' rel='noopener noreferrer' className="p-2 bg-white/10 rounded-lg hover:bg-gold transition-all duration-300">
                                <Facebook size={18} fill="currentColor" stroke="none" />
                            </a>
                            <a href="https://x.com/theafricatea?s=21&t=PVR_4aiJCbgx8NhkDRRB6g" target='_blank' rel='noopener noreferrer' className="p-2 bg-white/10 rounded-lg hover:bg-gold transition-all duration-300">
                                <Twitter size={18} fill="currentColor" stroke="none" />
                            </a>
                            <a href="https://www.instagram.com/theafricateacompany?igsh=MWZ6ZHFoaGo5bDI5OQ%3D%3D&utm_source=qr" target='_blank' rel='noopener noreferrer' className="p-2 bg-white/10 rounded-lg hover:bg-gold transition-all duration-300">
                                <Instagram size={18} fill="currentColor" stroke="none" />
                            </a>
                            <a href="https://www.linkedin.com/in/the-africa-tea-company-7599982b3" target='_blank' rel='noopener noreferrer' className="p-2 bg-white/10 rounded-lg hover:bg-gold transition-all duration-300">
                                <Linkedin size={18} fill="currentColor" stroke="none" />
                            </a>
                        </div>
                    </div>

                    {/* About Column */}
                    <div className="md:col-span-2 md:ml-auto">
                        <h4 className="font-heading font-bold text-lg mb-6 text-gold">About</h4>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
                            <li><a href="/contact" className="hover:text-gold transition-colors">FAQS</a></li>
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
                            <li><Link to="/shop" className="hover:text-gold transition-colors">Tea Gifts</Link></li>
                        </ul>
                    </div>

                    {/* Help Center Column */}
                    <div className="md:col-span-3 md:ml-auto">
                        <h4 className="font-heading font-bold text-lg mb-6 text-gold">Help Center</h4>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><a href="/contact" className="hover:text-gold transition-colors">Delivery Information</a></li>
                            <li><a href="/shop" className="hover:text-gold transition-colors">Shopping</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Bar — Darker */}
            <div className="bg-[#E7DBC5] py-5 text-[#182219]">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center text-[12px] gap-4">
                    <div className="flex flex-wrap justify-center lg:justify-start items-center gap-1.5">
                        <span>Copyright @ {new Date().getFullYear()} Nutrihealth Foods & Beverages.</span>
                        <span className="text-gray-500">•</span>
                        <span>Designed by Artfrica Studios</span>
                        <span className="text-gray-500">•</span>
                        <span>All Rights Reserved</span>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-3 text-[#182219]">
                        <button
                            onClick={() => onShowPolicy('privacy')}
                            className="hover:text-gold transition-colors cursor-pointer"
                        >
                            Privacy Policy
                        </button>
                        <span className="text-gray-500">•</span>
                        <button
                            onClick={() => onShowPolicy('terms')}
                            className="hover:text-gold transition-colors cursor-pointer"
                        >
                            Terms & Conditions
                        </button>
                        <span className="text-gray-500">•</span>
                        <button
                            onClick={() => onShowPolicy('disclaimer')}
                            className="hover:text-gold transition-colors cursor-pointer"
                        >
                            Disclaimer
                        </button>
                        <span className="text-gray-500">•</span>
                        <button
                            onClick={() => onShowPolicy('cookies')}
                            className="hover:text-gold transition-colors cursor-pointer"
                        >
                            Cookie Policy
                        </button>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
