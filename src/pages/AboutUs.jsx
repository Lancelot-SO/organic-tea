import AboutHero from '../components/aboutpage/AboutHero';
import MainAbout from '../components/aboutpage/MainAbout';
import FounderStory from '../components/aboutpage/FounderStory';
import VisionMission from '../components/aboutpage/VisionMission';
import CoreValues from '../components/aboutpage/CoreValues';
import Banner from '../components/Banner';
import NewsletterSection from '../components/landingpage/NewsletterSection';

const AboutUs = () => {
    return (
        <>
            <AboutHero />
            <MainAbout />
            <VisionMission />
            <FounderStory />
            <CoreValues />
            <Banner />
            <NewsletterSection />
        </>
    );
};

export default AboutUs;
