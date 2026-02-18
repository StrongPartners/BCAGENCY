import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from './Hero';
import ServiceBanner from './ServiceBanner';
import Services from './Services';
import WhyChooseUs from './WhyChooseUs';

const Home = () => {
    return (
        <main>
            <Helmet>
                <title>BC Creative Agency | KKTC Dijital Pazarlama, SEO, Google Ads, Sosyal Medya Ajansı – Girne</title>
                <meta name="description" content="BC Creative Agency, Kuzey Kıbrıs Türk Cumhuriyeti'nin Girne şehrinde hizmet veren profesyonel dijital pazarlama ajansıdır. SEO, Google Ads, sosyal medya yönetimi ve web tasarım hizmetleri." />
                <meta name="keywords" content="KKTC dijital ajans, Kuzey Kıbrıs reklam ajansı, KKTC SEO, Girne dijital pazarlama, Kuzey Kıbrıs Google Ads, KKTC sosyal medya" />
                <link rel="canonical" href="https://bccreative.agency/" />
                <meta property="og:title" content="BC Creative Agency | KKTC Dijital Pazarlama Ajansı – Girne" />
                <meta property="og:description" content="KKTC Girne'de hizmet veren profesyonel dijital ajans. SEO, Google Ads, sosyal medya, web tasarım." />
                <meta property="og:url" content="https://bccreative.agency/" />
            </Helmet>
            <Hero />
            <ServiceBanner />
            <Services />
            <WhyChooseUs />
        </main>
    );
};

export default Home;
