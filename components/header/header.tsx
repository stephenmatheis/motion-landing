'use client';

import { useEffect, useRef, useState } from 'react';
import * as motion from 'motion/react-client';
import Link from 'next/link';
import styles from './header.module.scss';
import { Menu } from '@/components/menu';
import { Logo } from '@/components/logo/';
import { useAnimationContext } from '@/context/animation';

export function Header() {
    const { isModalOpen } = useAnimationContext();
    const [showBorder, setShowBorder] = useState<boolean>(false);
    const headerRef = useRef<HTMLHeadElement>(null);

    useEffect(() => {
        function animateBorder() {
            if (window.scrollY > 60) {
                setShowBorder(true);
            } else {
                setShowBorder(false);
            }
        }

        animateBorder();

        window.addEventListener('scroll', animateBorder);

        return () => {
            window.removeEventListener('scroll', animateBorder);
        };
    }, []);

    return (
        <>
            <motion.header
                ref={headerRef}
                className={styles.header}
                animate={isModalOpen ? 'hidden' : 'visible'}
                variants={{
                    hidden: { y: -100 },
                    visible: { y: 0 },
                }}
                transition={{
                    type: 'spring',
                    damping: 10,
                }}
            >
                <motion.div
                    className={styles.title}
                    initial={{ y: -60, opacity: 0 }}
                    animate={{
                        y: [-60, 0],
                        opacity: [0, 1],
                    }}
                    transition={{
                        type: 'spring',
                        damping: 10,
                        delay: 0.4,
                    }}
                >
                    <Link href="/">
                        <Logo />
                    </Link>
                </motion.div>
                <nav className={styles.nav}>
                    <ul>
                        <motion.li
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: [0, 1],
                                opacity: [0, 1],
                            }}
                            transition={{
                                type: 'spring',
                                delay: 0.4,
                            }}
                        >
                            <Link href="/projects">Projects</Link>
                        </motion.li>
                        <motion.li
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: [0, 1],
                                opacity: [0, 1],
                            }}
                            transition={{
                                type: 'spring',
                                delay: 0.6,
                            }}
                        >
                            <Link href="/docs">Docs</Link>
                        </motion.li>
                    </ul>
                </nav>
                <motion.div
                    initial={{ scale: 0, rotate: 30 }}
                    animate={{ scale: [0, 1], rotate: [30, 0] }}
                    transition={{
                        type: 'spring',
                        damping: 10,
                        duration: 4,
                        delay: 0.7,
                    }}
                >
                    <Link href="/portal" className={styles.portal}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z" />
                        </svg>
                    </Link>
                </motion.div>
                <Menu />
                <motion.div
                    className={styles.divider}
                    initial={{ opacity: 0 }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                    }}
                    animate={showBorder ? 'visible' : 'hidden'}
                    transition={{
                        ease: 'easeInOut',
                        duration: 0.6,
                    }}
                />
            </motion.header>
        </>
    );
}
