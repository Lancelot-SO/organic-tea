import React from 'react';
import GalleryHero from '../components/gallerysection/GalleryHero';
import GalleryGrid from '../components/gallerysection/GalleryGrid';
import GallerySubGrid from '../components/gallerysection/GallerySubGrid';
import Banner from '../components/Banner';
import NewsletterSection from '../components/landingpage/NewsletterSection';

const Gallery = () => {
    return (
        <div>
            <GalleryHero />
            <GalleryGrid />
            <GallerySubGrid />
            <Banner />
            <NewsletterSection />
        </div>
    );
};

export default Gallery;
