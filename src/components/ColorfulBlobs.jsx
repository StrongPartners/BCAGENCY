import React from 'react';

const ColorfulBlobs = ({ variant = 'hero' }) => {
    // Google-inspired colors: Blue, Red, Yellow, Green
    // Enhanced blob configurations with more elements and vibrant colors
    const blobConfigs = {
        hero: [
            { color: 'bg-blue-500', size: 'w-[500px] h-[500px]', position: 'top-10 -left-64', delay: '0s', duration: '15s' },
            { color: 'bg-purple-400', size: 'w-[450px] h-[450px]', position: 'top-20 right-0', delay: '1s', duration: '13s' },
            { color: 'bg-purple-500', size: 'w-[400px] h-[400px]', position: 'bottom-10 left-10', delay: '2s', duration: '16s' },
            { color: 'bg-yellow-300', size: 'w-[380px] h-[380px]', position: 'bottom-20 -right-40', delay: '0.5s', duration: '14s' },
            { color: 'bg-yellow-400', size: 'w-[350px] h-[350px]', position: 'top-1/2 left-1/4', delay: '3s', duration: '17s' },
            { color: 'bg-pink-400', size: 'w-[320px] h-[320px]', position: 'top-1/3 right-1/3', delay: '1.5s', duration: '15s' },
        ],
        services: [
            { color: 'bg-red-400', size: 'w-[350px] h-[350px]', position: 'top-0 right-10', delay: '0s', duration: '18s' },
            { color: 'bg-blue-400', size: 'w-[320px] h-[320px]', position: 'bottom-0 left-0', delay: '2s', duration: '16s' },
            { color: 'bg-purple-400', size: 'w-[280px] h-[280px]', position: 'top-1/2 -left-32', delay: '1s', duration: '15s' },
            { color: 'bg-green-400', size: 'w-[300px] h-[300px]', position: 'bottom-1/3 right-1/4', delay: '3s', duration: '19s' },
        ],
        whyChooseUs: [
            { color: 'bg-green-400', size: 'w-[400px] h-[400px]', position: 'top-0 left-0', delay: '0s', duration: '17s' },
            { color: 'bg-blue-400', size: 'w-[350px] h-[350px]', position: 'bottom-0 right-0', delay: '1.5s', duration: '14s' },
            { color: 'bg-red-300', size: 'w-[320px] h-[320px]', position: 'top-1/3 right-1/4', delay: '2.5s', duration: '18s' },
            { color: 'bg-yellow-300', size: 'w-[280px] h-[280px]', position: 'bottom-1/4 left-1/3', delay: '0.8s', duration: '16s' },
        ]
    };

    const blobs = blobConfigs[variant] || blobConfigs.hero;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {blobs.map((blob, index) => (
                <div
                    key={index}
                    className={`absolute ${blob.size} ${blob.color} ${blob.position} rounded-full opacity-35 blur-2xl animate-float animate-pulse-slow`}
                    style={{
                        animationDelay: blob.delay,
                        animationDuration: blob.duration,
                    }}
                />
            ))}
        </div>
    );
};

export default ColorfulBlobs;
