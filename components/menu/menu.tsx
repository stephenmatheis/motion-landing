'use client';

import { useEffect, useRef, useState } from 'react';
import * as motion from 'motion/react-client';
import styles from './menu.module.scss';
import classNames from 'classnames';
import Link from 'next/link';

const SIZE = 30;
const PATH = `calc(100vw - ${SIZE}px) ${SIZE}px`;

export function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const [height, setHeight] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            setHeight(containerRef.current.offsetHeight);
        }
    }, []);

    return (
        <motion.div
            className={classNames(styles.menu, { [styles.open]: isOpen })}
        >
            <motion.nav
                initial={false}
                animate={isOpen ? 'open' : 'closed'}
                custom={height}
                ref={containerRef}
            >
                <motion.div
                    className={styles.background}
                    variants={{
                        open: (height = 1000) => ({
                            clipPath: `circle(${
                                height * 2 + 200
                            }px at ${PATH})`,
                            transition: {
                                type: 'spring',
                                stiffness: 20,
                                restDelta: 2,
                            },
                        }),
                        closed: {
                            clipPath: `circle(${SIZE - 5}px at ${PATH})`,
                            transition: {
                                delay: 0.2,
                                type: 'spring',
                                stiffness: 400,
                                damping: 40,
                            },
                        },
                    }}
                />
                <motion.ul
                    className={styles.list}
                    variants={{
                        open: {
                            transition: {
                                staggerChildren: 0.07,
                                delayChildren: 0.2,
                            },
                        },
                        closed: {
                            transition: {
                                staggerChildren: 0.05,
                                staggerDirection: -1,
                            },
                        },
                    }}
                >
                    {[
                        'Services',
                        'Vehicles',
                        'Careers',
                        'About',
                        'Contact',
                    ].map((link, index) => (
                        <motion.li
                            key={index}
                            className={styles.item}
                            variants={{
                                open: {
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                        y: { stiffness: 1000, velocity: -100 },
                                    },
                                },
                                closed: {
                                    y: 50,
                                    opacity: 0,
                                    transition: {
                                        y: { stiffness: 1000 },
                                    },
                                },
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href={`/shapes/${link.toLowerCase()}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link}
                            </Link>
                        </motion.li>
                    ))}
                </motion.ul>
                <motion.button
                    className={styles.toggle}
                    onClick={() => setIsOpen(!isOpen)}
                    initial={{ opacity: 0, scale: 0, rotate: -45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                        delay: 0.8,
                        type: 'spring',
                        stiffness: 400,
                        damping: 40,
                    }}
                >
                    <svg width="32" height="32" viewBox="0 0 23 23">
                        <motion.path
                            variants={{
                                closed: { d: 'M 5 6 L 18 6' },
                                open: { d: 'M 5 5 L 18 18' },
                            }}
                        />
                        <motion.path
                            d="M 5 11.5 L 18 11.5"
                            variants={{
                                closed: { opacity: 1 },
                                open: { opacity: 0 },
                            }}
                            transition={{ duration: 0.1 }}
                        />
                        <motion.path
                            variants={{
                                closed: { d: 'M 5 17 L 18 17' },
                                open: { d: 'M 5 18 L 18 5' },
                            }}
                        />
                    </svg>
                </motion.button>
            </motion.nav>
        </motion.div>
    );
}
