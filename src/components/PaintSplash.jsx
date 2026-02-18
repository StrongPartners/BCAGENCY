import React, { useState } from 'react';

const PaintSplash = () => {
    const [particles, setParticles] = useState([]);

    const createSplash = (e) => {
        const colors = ['#4285F4', '#EA4335', '#FBBC04', '#34A853']; // Google colors
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newParticles = Array.from({ length: 12 }, (_, i) => ({
            id: Date.now() + i,
            x,
            y,
            color: colors[Math.floor(Math.random() * colors.length)],
            angle: (Math.PI * 2 * i) / 12,
            velocity: 2 + Math.random() * 2,
        }));

        setParticles((prev) => [...prev, ...newParticles]);

        // Remove particles after animation
        setTimeout(() => {
            setParticles((prev) => prev.filter((p) => !newParticles.includes(p)));
        }, 1000);
    };

    return { particles, createSplash };
};

export const PaintSplashContainer = ({ children, onClick }) => {
    const { particles, createSplash } = PaintSplash();

    const handleClick = (e) => {
        createSplash(e);
        if (onClick) onClick(e);
    };

    return (
        <div className="relative inline-block" onClick={handleClick}>
            {children}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute w-3 h-3 rounded-full animate-splash"
                        style={{
                            left: particle.x,
                            top: particle.y,
                            backgroundColor: particle.color,
                            '--angle': `${particle.angle}rad`,
                            '--velocity': particle.velocity,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default PaintSplash;
