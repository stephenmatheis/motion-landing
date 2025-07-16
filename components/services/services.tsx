'use client';

import { useRef } from 'react';
import classNames from 'classnames';
import * as motion from 'motion/react-client';
import { useInView } from 'motion/react';
import { Bento } from '@/components/bento';
import { useAnimationContext } from '@/context/animation';
import styles from './services.module.scss';

const bentos = [
    {
        name: 'Software Development',
        cols: 4,
        items: [
            {
                name: 'Software Development',
                col: 2,
                row: 2,
                text: 'large',
                textColor: 'var(--primary-9)',
                background: 'var(--primary-3)',
            },
            {
                name: 'UI/UX',
                col: 1,
                row: 1,
                text: 'medium',
            },
            {
                name: 'Mobile',
                col: 1,
                row: 1,
                text: 'medium',
            },
            {
                name: 'Cloud',
                col: 1,
                row: 1,
                text: 'medium',
            },
            {
                name: 'Full Stack',
                col: 1,
                row: 1,
                text: 'medium',
            },
        ],
    },
];

export function Services() {
    const copyRef = useRef<HTMLDivElement>(null);
    const isCopyInView = useInView(copyRef, { once: true, amount: 0.3 });
    const { isModalOpen } = useAnimationContext();

    return (
        <section className={styles.services}>
            <div
                ref={copyRef}
                className={classNames(styles.copy, {
                    [styles.open]: isModalOpen,
                })}
            >
                <motion.h2
                    initial={{ opacity: 0, x: -600 }}
                    animate={isCopyInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ type: 'spring', damping: 15 }}
                >
                    What we do
                    <br />
                </motion.h2>
            </div>
            <div className={styles.bentos}>
                {bentos.map(({ name, cols, items }, i) => (
                    <div key={i} className={styles['bento-container']}>
                        <Bento name={name} cols={cols} items={items} />
                    </div>
                ))}
            </div>
        </section>
    );
}

{
    /* <section
    className={styles.services}
    style={{ '--padding-top': `${HERO_SIZE / 2}px` } as CSSProperties}
    >
    <motion.div
        ref={browserRef}
        initial={{ opacity: 0, x: -600 }}
        animate={isBrowserInView ? { opacity: 1, x: 0 } : {}}
        transition={{ type: 'spring', damping: 10 }}
    >
        <Browser>
            <div className={styles.demo}>
                <h1>Demo</h1>
            </div>
        </Browser>
    </motion.div>
    <motion.div
        ref={codeRef}
        initial={{ opacity: 0, x: 600 }}
        animate={isCodeInView ? { opacity: 1, x: 0 } : {}}
        transition={{ type: 'spring', damping: 10 }}
    >
        <Code>
            <div className={styles.editor}>{'// Demo'}</div>
        </Code>
    </motion.div>
</section> */
}
