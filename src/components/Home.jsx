import React from 'react';
import Hero from './Hero';
import ServiceBanner from './ServiceBanner';
import Services from './Services';
import WhyChooseUs from './WhyChooseUs';

const Home = () => {
    return (
        <main>
            <Hero />
            <ServiceBanner />
            <Services />
            <WhyChooseUs />
        </main>
    );
};

export default Home;
