import Link from 'next/link';
import * as motion from 'motion/react-client';
import styles from './copy.module.scss';

export function Copy() {
    return (
        <div className={styles.copy}>
            <motion.div
                className={styles.title}
                initial={{ opacity: 0, x: '-1rem' }}
                animate={{
                    opacity: [0, 1],
                    x: ['1rem', 0],
                }}
                transition={{ ease: 'easeInOut', duration: 0.6 }}
            >
                <div className={styles.color}>NEXTdotgov</div>
                <div  className={styles.small}>We are a U.S. Government Web Consultancy</div>
            </motion.div>
            <motion.div
                className={styles.blurb}
                animate={{ x: [-400, 0] }}
                transition={{
                    type: 'spring',
                    damping: 10,
                    duration: 4,
                }}
            >
                <div>{'<building>'}</div>
                <div>{'<theFutureOfGovernmentWebsites />'}</div>
                <div>{'</building>'}</div>
            </motion.div>
            <div className={styles.cta}>
                <motion.div
                    className={styles.description}
                    initial={{ opacity: 0, x: '1rem' }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                >
                    Push past your limits.
                    <br />
                    <strong>Plus Ultra!</strong>
                </motion.div>
                <Link href="/shapes/services" className={styles.btn}>
                    <motion.div
                        className={styles.motion}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: 'spring', damping: 10, delay: 0.6 }}
                    >
                        <motion.div
                            className={styles.arrow}
                            initial={{ scale: 2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                type: 'spring',
                                damping: 10,
                                delay: 0.9,
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                                />
                            </svg>
                        </motion.div>
                        <motion.span
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{
                                type: 'spring',
                                damping: 10,
                                delay: 0.9,
                            }}
                        >
                            {'// join our team'}
                        </motion.span>
                    </motion.div>
                </Link>
            </div>
        </div>
    );
}
