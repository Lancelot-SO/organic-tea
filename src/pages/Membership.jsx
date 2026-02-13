import React from 'react';
import MembershipHero from '../components/membershippage/MembershipHero';
import Exclusive from '../components/membershippage/Exclusive';
import Banner from '../components/Banner';

const Membership = () => {
    return (
        <div>
            <MembershipHero />
            <Exclusive />
            <Banner />
        </div>
    );
};

export default Membership;
