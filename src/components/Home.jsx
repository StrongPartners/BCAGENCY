import React from 'react';
import useSEO from '../hooks/useSEO';
import Hero from './Hero';
import ServiceBanner from './ServiceBanner';
import Services from './Services';
import Approach from './WhyChooseUs';
import FAQ from './FAQ';
import { buildOrganizationSchema, buildWebSiteSchema } from '../lib/geoSchemas';

const Home = () => {
    useSEO({
        title: 'BC Creative Agency | KKTC Dijital Pazarlama, SEO, Google Ads, Sosyal Medya Ajansı – Girne',
        description: "BC Creative Agency — KKTC Girne merkezli yaratıcı dijital pazarlama ajansı. SEO, Google Ads, sosyal medya, prodüksiyon ve web tasarım. 2017'den beri.",
        keywords: 'KKTC dijital ajans, Kuzey Kıbrıs reklam ajansı, KKTC SEO, Girne dijital pazarlama, KKTC Google Ads, KKTC sosyal medya',
        canonical: 'https://bccreative.agency/',
        ogTitle: 'BC Creative Agency | KKTC Girne Dijital Pazarlama Ajansı',
        ogDescription: "Yaratıcı dijital ajans. SEO, Google Ads, sosyal medya, web tasarım, prodüksiyon — hepsi tek çatı altında.",
        ogUrl: 'https://bccreative.agency/',
        schemas: [buildOrganizationSchema(), buildWebSiteSchema()],
    });

    return (
        <main>
            <Hero />
            <ServiceBanner />
            <Services />

            {/* Full-bleed image break */}
            <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
                <img
                    src="/marketing-hero-v3.jpg"
                    alt="BC Creative Agency"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-ink-900/30" />
            </section>

            <Approach />
            <FAQ />
        </main>
    );
};

export default Home;
