import React from 'react';
import useSEO from '../hooks/useSEO';
import Hero from './Hero';
import ServiceBanner from './ServiceBanner';
import Services from './Services';
import WhyChooseUs from './WhyChooseUs';

const Home = () => {
    useSEO({
        title: 'BC Creative Agency | KKTC Dijital Pazarlama, SEO, Google Ads, Sosyal Medya Ajansı – Girne',
        description: "BC Creative Agency, Kuzey Kıbrıs Türk Cumhuriyeti'nin Girne şehrinde hizmet veren profesyonel dijital pazarlama ajansıdır. SEO, Google Ads, sosyal medya yönetimi ve web tasarım hizmetleri.",
        keywords: 'KKTC dijital ajans, Kuzey Kıbrıs reklam ajansı, KKTC SEO, Girne dijital pazarlama, Kuzey Kıbrıs Google Ads, KKTC sosyal medya',
        canonical: 'https://bccreative.agency/',
        ogTitle: 'BC Creative Agency | KKTC Dijital Pazarlama Ajansı – Girne',
        ogDescription: "KKTC Girne'de hizmet veren profesyonel dijital ajans. SEO, Google Ads, sosyal medya, web tasarım.",
        ogUrl: 'https://bccreative.agency/',
    });

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
