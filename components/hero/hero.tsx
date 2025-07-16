import * as motion from 'motion/react-client';
import classNames from 'classnames';
import styles from './hero.module.scss';

export function Hero() {
    return (
        <div className={styles.hero}>
            <motion.div
                initial={{ opacity: 0, x: '-50vw', y: 0 }}
                animate={{
                    y: [0, 256],
                    x: ['50vw', 0],
                    opacity: [0, 1],
                    rotate: [0, 45],
                }}
                transition={{ type: 'spring', damping: 12, delay: 0.4 }}
                className={classNames(styles.squircle, styles.background)}
            />
            <motion.div
                initial={{ opacity: 0, x: '-50vw', y: 0 }}
                animate={{
                    y: [0, 192],
                    x: ['50vw', 0],
                    opacity: [0, 1],
                    rotate: [0, 45],
                }}
                transition={{ type: 'spring', damping: 12, delay: 0.2 }}
                className={classNames(styles.squircle, styles.midground)}
            />
            <motion.div
                initial={{ opacity: 0, x: '-50vw', y: 0 }}
                animate={{
                    y: [0, 128],
                    x: ['50vw', 0],
                    opacity: [0, 1],
                    rotate: [0, 45],
                }}
                transition={{ type: 'spring', damping: 12 }}
                className={classNames(styles.squircle, styles.foreground)}
            />
        </div>
    );
}
