import HeroShapes from './hero-shapes';

export default function Shapes() {
    const shapes = Array.from({ length: 3 }).map(() => ({
        top: `${Math.random() * 100 - 50}%`, // Random number from -50% to 50% inclusive
        left: `${Math.random() * 100 - 50}%`, // Random number from -50% to 50% inclusive
        rotate: Math.random() * 90 - 45, // Random number from -45 to 45 inclusive
        scale: Math.random() * 0.25 + 1, // Random number from 1 to 1.5 inclusive
        duration: Math.random() * 180 + 180, // Random number from 180 to 360 inclusive
        // scale: Math.random() * 0.5 + 0.5, // Random number from 0.5 to 1 inclusive
    }));

    return <HeroShapes shapes={shapes} />;
}
