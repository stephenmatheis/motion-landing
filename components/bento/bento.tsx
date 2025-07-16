'use client';

import { CSSProperties, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import * as motion from 'motion/react-client';
import { TargetAndTransition, useInView } from 'motion/react';
import { useAnimationContext } from '@/context/animation';
import styles from './bento.module.scss';

type BentoProps = {
    name: string;
    cols: number;
    items: {
        name: string;
        col: number;
        row: number;
        rowStart?: number;
        text: string;
        textColor?: string;
        textAlign?: string;
        background?: string;
    }[];
};

const MODAL_WIDTH = 720;
const MODAL_GUTTER = 68;

export function Bento({ name, cols, items }: BentoProps) {
    const [selected, setSelected] = useState<number | null>(null);
    const bentoRef = useRef<HTMLDivElement>(null);
    const isBentoInView = useInView(bentoRef, { once: true, amount: 0.25 });
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const { isModalOpen, setIsModalOpen } = useAnimationContext();

    useEffect(() => {
        if (selected !== null) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [selected]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                selected !== null &&
                cardRefs.current[selected] &&
                !cardRefs.current[selected]?.contains(event.target as Node)
            ) {
                setSelected(null);
                setIsModalOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selected, setIsModalOpen]);

    function handleSelect(index: number) {
        cardRefs.current.forEach((card) => {
            if (!card) return;

            card.classList.remove(styles.selected);
        });

        setIsModalOpen(true);
        setSelected(index);

        if (!cardRefs.current[index]) return;

        cardRefs.current[index].classList.add(styles.selected);
    }

    function getX() {
        if (selected === null) return;

        const card = cardRefs.current[selected];

        if (!card || !parent) return;

        const { x } = card.getBoundingClientRect();

        return window.innerWidth / 2 - x - 360;
    }

    function getY() {
        if (selected === null) return;

        const card = cardRefs.current[selected];

        if (!card || !parent) return;

        const { y } = card.getBoundingClientRect();

        return y * -1 + MODAL_GUTTER;
    }

    function getHeight() {
        if (selected === null) return;

        return window.innerHeight - MODAL_GUTTER * 2;
    }

    return (
        <motion.div
            ref={bentoRef}
            className={classNames(styles.bento, {
                [styles.selected]: selected !== null,
                [styles.open]: isModalOpen,
            })}
            style={{ '--cols': cols } as CSSProperties}
        >
            {items.map(
                (
                    {
                        name,
                        col,
                        row,
                        rowStart,
                        text,
                        textColor,
                        textAlign,
                        background,
                    },
                    index
                ) => {
                    return (
                        <motion.div
                            key={index}
                            className={classNames(
                                styles.service,
                                styles[text],
                                {
                                    [styles.square]: col === 1 && row === 1,
                                    [styles.start]: rowStart,
                                }
                            )}
                            style={
                                {
                                    '--col': col,
                                    '--row': row,
                                    '--row-start': rowStart,
                                    '--background': background,
                                    '--text-color': textColor,
                                    '--text-align': textAlign,
                                } as CSSProperties
                            }
                            initial={{
                                opacity: 0,
                                scale: 1.5,
                                z: 20 * (index + 1),
                            }}
                            animate={
                                isBentoInView
                                    ? { opacity: 1, scale: 1, z: 0 }
                                    : {}
                            }
                            transition={{
                                type: 'spring',
                                damping: 20,
                                stiffness: 100,
                                delay: index * 0.1,
                            }}
                        >
                            <motion.div
                                ref={(el) => {
                                    cardRefs.current[index] = el;
                                }}
                                className={styles.card}
                                onClick={() => handleSelect(index)}
                                variants={{
                                    selected: {
                                        x: getX(),
                                        y: getY(),
                                        width: MODAL_WIDTH,
                                        height: getHeight(),
                                    },
                                }}
                                animate={selected === index ? 'selected' : ''}
                                transition={{
                                    type: 'spring',
                                    damping: 13,
                                }}
                                onAnimationComplete={(definition) => {
                                    if (
                                        typeof definition === 'object' &&
                                        (definition as TargetAndTransition)
                                    ) {
                                        if (!cardRefs.current[index]) return;

                                        cardRefs.current[
                                            index
                                        ].classList.remove(styles.selected);
                                    }
                                }}
                            >
                                <h3>{name}</h3>
                            </motion.div>
                        </motion.div>
                    );
                }
            )}
        </motion.div>
    );
}
