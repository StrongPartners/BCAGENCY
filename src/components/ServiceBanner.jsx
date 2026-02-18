import { motion } from 'framer-motion';

const ServiceBanner = () => {
    const services = [
        "#Web Tasarım",
        "#Sosyal Medya Yönetimi",
        "#Google Ads Yönetimi",
        "#Meta Ads Yönetimi",
        "#Grafik Tasarım",
        "#İçerik Üretimi"
    ];

    // Duplicate the services to create a seamless loop
    const tickerItems = [...services, ...services, ...services];

    return (
        <div className="bg-[#4A59CE]/95 backdrop-blur-sm border-y border-white/10 py-4 overflow-hidden relative">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{
                    x: [0, -1000],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 40, // Slower for refinement
                        ease: "linear",
                    },
                }}
            >
                {tickerItems.map((item, index) => (
                    <span
                        key={index}
                        className="text-base md:text-lg font-medium text-white/80 tracking-[0.3em] px-12 flex items-center uppercase"
                    >
                        {item}
                        <span className="ml-12 w-1 h-1 rounded-full bg-white/20" />
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default ServiceBanner;
