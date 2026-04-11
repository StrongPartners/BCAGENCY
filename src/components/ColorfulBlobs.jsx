import React from 'react';

/**
 * ColorfulBlobs — decorative animated blurred color shapes used across the
 * Creative Playground design language. Uses the new brand palette:
 * indigo (brand) + coral + mint + sun.
 */
const ColorfulBlobs = ({ variant = 'hero' }) => {
    const blobConfigs = {
        hero: [
            { color: 'bg-brand-400', size: 'w-[520px] h-[520px]', position: 'top-10 -left-64', delay: '0s',   duration: '18s' },
            { color: 'bg-coral-400', size: 'w-[460px] h-[460px]', position: 'top-20 right-0',  delay: '1.2s', duration: '14s' },
            { color: 'bg-mint-400',  size: 'w-[420px] h-[420px]', position: 'bottom-10 left-10', delay: '2s', duration: '16s' },
            { color: 'bg-sun-400',   size: 'w-[400px] h-[400px]', position: 'bottom-20 -right-40', delay: '0.5s', duration: '15s' },
            { color: 'bg-brand-500', size: 'w-[360px] h-[360px]', position: 'top-1/2 left-1/4', delay: '3s',   duration: '17s' },
            { color: 'bg-coral-300', size: 'w-[320px] h-[320px]', position: 'top-1/3 right-1/3', delay: '1.5s', duration: '15s' },
        ],
        services: [
            { color: 'bg-coral-400', size: 'w-[360px] h-[360px]', position: 'top-0 right-10', delay: '0s',   duration: '18s' },
            { color: 'bg-brand-400', size: 'w-[320px] h-[320px]', position: 'bottom-0 left-0', delay: '2s',  duration: '16s' },
            { color: 'bg-mint-400',  size: 'w-[280px] h-[280px]', position: 'top-1/2 -left-32', delay: '1s', duration: '15s' },
            { color: 'bg-sun-400',   size: 'w-[300px] h-[300px]', position: 'bottom-1/3 right-1/4', delay: '3s', duration: '19s' },
        ],
        approach: [
            { color: 'bg-mint-400',  size: 'w-[420px] h-[420px]', position: 'top-0 left-0', delay: '0s',   duration: '17s' },
            { color: 'bg-brand-400', size: 'w-[360px] h-[360px]', position: 'bottom-0 right-0', delay: '1.5s', duration: '14s' },
            { color: 'bg-coral-300', size: 'w-[320px] h-[320px]', position: 'top-1/3 right-1/4', delay: '2.5s', duration: '18s' },
            { color: 'bg-sun-300',   size: 'w-[280px] h-[280px]', position: 'bottom-1/4 left-1/3', delay: '0.8s', duration: '16s' },
        ],
        soft: [
            { color: 'bg-brand-200', size: 'w-[360px] h-[360px]', position: 'top-10 left-10', delay: '0s',   duration: '20s' },
            { color: 'bg-coral-200', size: 'w-[320px] h-[320px]', position: 'bottom-10 right-10', delay: '1.5s', duration: '18s' },
            { color: 'bg-mint-200',  size: 'w-[300px] h-[300px]', position: 'top-1/2 right-1/3', delay: '2s', duration: '16s' },
        ],
    };

    const blobs = blobConfigs[variant] || blobConfigs.hero;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {blobs.map((blob, index) => (
                <div
                    key={index}
                    className={`absolute ${blob.size} ${blob.color} ${blob.position} rounded-full opacity-40 blur-3xl animate-float animate-pulse-slow`}
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
