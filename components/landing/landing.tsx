import { Hero } from '@/components/hero';
import { Copy } from '@/components/copy';
import styles from './landing.module.scss';

export function Landing() {
    return (
        <section className={styles.landing}>
            <Hero />
            <Copy />
        </section>
    );
}
