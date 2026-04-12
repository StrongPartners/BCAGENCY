import React from 'react';
import useSEO from '../hooks/useSEO';
import Hero from './Hero';
import Services from './Services';
import Approach from './WhyChooseUs';
import FAQ from './FAQ';
import { buildOrganizationSchema, buildWebSiteSchema } from '../lib/geoSchemas';

const Home = () => {
    useSEO({
        title: 'BC Creative Agency | KKTC Dijital Pazarlama, SEO, Google Ads – Girne',
        description: "BC Creative Agency — KKTC Girne merkezli yaratıcı dijital pazarlama ajansı.",
        keywords: 'KKTC dijital ajans, Kuzey Kıbrıs reklam ajansı, KKTC SEO, Girne dijital pazarlama',
        canonical: 'https://bccreative.agency/',
        schemas: [buildOrganizationSchema(), buildWebSiteSchema()],
    });

    return (
        <main>
            <Hero />
            <Services />
            {/* Full-bleed image break */}
            <section className="h-[50vh] md:h-[70vh] relative overflow-hidden">
                <img src="/marketing-hero-v2.jpg" alt="" className="w-full h-full object-cover" />
            </section>
            <Approach />
            <FAQ />
        </main>
    );
};

export default Home;
