import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * İş Birliklerimiz — CRM'den beslenen kayan logo şeridi.
 * CRM'de firmaya "Web sitesinde göster" işaretlenip logo yüklendiğinde
 * burada otomatik belirir; işaret kaldırılınca kaybolur.
 */
const FEED = 'https://europe-west1-bcrm-8bedd.cloudfunctions.net/partnersFeed';

const PartnerItem = ({ partner }) => {
  const inner = partner.logo ? (
    <img
      src={partner.logo}
      alt={partner.name}
      loading="lazy"
      className="h-12 md:h-14 w-auto max-w-[170px] object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
    />
  ) : (
    <span className="text-white/50 text-lg font-semibold whitespace-nowrap transition-colors duration-300 group-hover:text-white">
      {partner.name}
    </span>
  );

  const className = 'group flex-shrink-0 flex items-center justify-center px-8 md:px-10';

  return partner.website ? (
    <a href={partner.website} target="_blank" rel="noopener noreferrer" title={partner.name} className={className}>
      {inner}
    </a>
  ) : (
    <div title={partner.name} className={className}>{inner}</div>
  );
};

const Partners = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    let alive = true;
    fetch(FEED)
      .then((r) => r.json())
      .then((data) => { if (alive) setPartners(data?.partners || []); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  if (!partners.length) return null;

  return (
    <section className="py-20 md:py-28 bg-ink-900 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
            İş Birliklerimiz
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[0.95] tracking-tight">
            Birlikte <span className="text-secondary-300">büyüdüğümüz</span> markalar
          </h2>
        </motion.div>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-ink-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-ink-900 to-transparent z-10 pointer-events-none" />

        <div className="flex items-center animate-marquee hover:[animation-play-state:paused]">
          {[...partners, ...partners].map((p, i) => (
            <PartnerItem key={`${p.id}-${i}`} partner={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
