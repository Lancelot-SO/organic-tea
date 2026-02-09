import React from 'react';
import Hero from '../components/landingpage/Hero';
import BrandMission from '../components/landingpage/BrandMission';
import PromoSection from '../components/landingpage/PromoSection';
import HomeAbout from '../components/landingpage/HomeAbout';
import ProductShowcase from '../components/landingpage/ProductShowcase';
import TeaCollection from '../components/landingpage/TeaCollection';
import FeaturedProduct from '../components/landingpage/FeaturedProduct';
import BlogSection from '../components/landingpage/BlogSection';
import NewsletterSection from '../components/landingpage/NewsletterSection';
import Banner from '../components/Banner';

const Home = () => {
    return (
        <>
            <Hero />
            <BrandMission />
            <PromoSection />
            <HomeAbout />
            <ProductShowcase />
            <TeaCollection />
            <Banner />
            <FeaturedProduct />
            <BlogSection />
            <NewsletterSection />
        </>
    );
};

export default Home;
