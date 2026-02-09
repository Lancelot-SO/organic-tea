import React from 'react';
import ContactHero from './ContactHero';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import Faq from '../Faq';
import Banner from '../Banner';
import NewsletterSection from '../landingpage/NewsletterSection';

const MainContact = () => {
    return (
        <main className="bg-[#FAF9F6]">
            <ContactHero />
            <ContactInfo />
            <ContactForm />
            <Faq />
            <Banner />
            <NewsletterSection />
        </main>
    );
};

export default MainContact;
