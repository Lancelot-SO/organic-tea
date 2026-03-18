import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const countries = [
    { name: 'Ghana', code: '+233', flag: '🇬🇭', iso: 'GH' },
    { name: 'Nigeria', code: '+234', flag: '🇳🇬', iso: 'NG' },
    { name: 'Kenya', code: '+254', flag: '🇰🇪', iso: 'KE' },
    { name: 'South Africa', code: '+27', flag: '🇿🇦', iso: 'ZA' },
    { name: 'United Kingdom', code: '+44', flag: '🇬🇧', iso: 'GB' },
    { name: 'United States', code: '+1', flag: '🇺🇸', iso: 'US' },
    { name: 'Canada', code: '+1', flag: '🇨🇦', iso: 'CA' },
    { name: 'Germany', code: '+49', flag: '🇩🇪', iso: 'DE' },
    { name: 'France', code: '+33', flag: '🇫🇷', iso: 'FR' },
    { name: 'UAE', code: '+971', flag: '🇦🇪', iso: 'AE' },
];

const PhoneInput = ({ value, onChange, placeholder = "Phone *", className = "", bgClass = "bg-[#EAEAEA]", focusClass = "focus-within:ring-1 focus-within:ring-primary/20 focus-within:bg-white", icon = null }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const dropdownRef = useRef(null);

    // Initial value processing
    useEffect(() => {
        if (value) {
            // Find the country code that matches the start of the value
            // Sort by length descending to match longest code first (+1 vs +123)
            const sortedCountries = [...countries].sort((a, b) => b.code.length - a.code.length);
            const country = sortedCountries.find(c => value.startsWith(c.code));
            
            if (country) {
                setSelectedCountry(country);
                setPhoneNumber(value.slice(country.code.length));
            } else if (value && !phoneNumber) {
                setPhoneNumber(value);
            }
        }
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setIsOpen(false);
        // Clean phone number from leading zeros if any when changing country
        const cleanedPhone = phoneNumber.replace(/^0+/, '');
        onChange({ target: { name: 'phone', value: country.code + cleanedPhone } });
    };

    const handlePhoneChange = (e) => {
        const val = e.target.value.replace(/[^\d]/g, ''); // Only numbers
        setPhoneNumber(val);
        onChange({ target: { name: 'phone', value: selectedCountry.code + val } });
    };

    return (
        <div className={`relative flex items-center ${bgClass} border border-transparent rounded-[10px] ${focusClass} transition-all overflow-visible ${className}`}>
            {/* Country Selector */}
            <div className="relative z-20" ref={dropdownRef}>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 pl-4 pr-2 py-4 hover:bg-black/5 transition-colors border-r border-[#6B728022] min-w-[90px] justify-center"
                >
                    <span className="text-xl leading-none">{selectedCountry.flag}</span>
                    <span className="text-sm font-bold text-primary-dark">{selectedCountry.code}</span>
                    <ChevronDown size={14} className={`text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-[10px] shadow-2xl border border-stone-100 z-100 max-h-64 overflow-y-auto overflow-x-hidden custom-scrollbar"
                        >
                            {countries.map((country) => (
                                <button
                                    key={country.iso + country.code}
                                    type="button"
                                    onClick={() => handleCountrySelect(country)}
                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-stone-50 transition-colors text-left border-b border-stone-50 last:border-b-0"
                                >
                                    <span className="text-xl">{country.flag}</span>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-primary-dark">{country.name}</span>
                                        <span className="text-[10px] text-stone-400 uppercase tracking-widest leading-none">{country.code}</span>
                                    </div>
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Phone Input */}
            <div className="relative flex-1 flex items-center">
                {icon && <div className="pl-4 text-stone-300 flex items-center justify-center">{icon}</div>}
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    required
                    placeholder={placeholder}
                    className={`w-full bg-transparent ${icon ? 'pl-2' : 'pl-4'} pr-4 py-4 text-sm font-bold text-gray-800 focus:outline-none placeholder:text-[#8A8A8A]`}
                />
            </div>
        </div>
    );
};

export default PhoneInput;
