'use client';

import { CSSProperties } from 'react';
import * as motion from 'motion/react-client';
import styles from './hero.module.scss';

export default function HeroShapes({
    shapes,
}: {
    shapes: {
        top: string;
        left: string;
        rotate: number;
        scale: number;
        duration: number;
    }[];
}) {
    return (
        <div className={styles.shapes}>
            {shapes.map((shape, index) => (
                <motion.svg
                    key={index}
                    style={
                        {
                            '--shape-top': shape.top,
                            '--shape-left': shape.left,
                            '--shape-rotate': `${shape.rotate}deg`,
                            '--shape-scale': shape.scale,
                        } as CSSProperties
                    }
                    // width="950"
                    // height="950"
                    width="1200"
                    height="1200"
                    viewBox="0 0 1200 1200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.shape}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: 1,
                        scale: shape.scale,
                        rotate: index % 2 === 0 ? 360 : -360,
                        transition: {
                            rotate: {
                                duration: shape.duration || 180,
                                repeat: Infinity,
                                repeatType: 'loop',
                            },
                            default: {
                                ease: 'easeInOut',
                                duration: 5,
                            },
                        },
                    }}
                >
                    <rect
                        x="1"
                        y="1"
                        width="1198"
                        height="1198"
                        rx="298"
                        stroke="black"
                    />
                    {/* <circle cx="600" cy="600" r="600" stroke="black" /> */}
                </motion.svg>
            ))}
        </div>
    );
}
