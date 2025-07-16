import Link from 'next/link';
import styles from './page.module.scss';

export default function RootPage() {
    return (
        <div className={styles.page}>
            <h1>
                <Link href="/">NEXTdotgov.com</Link>
            </h1>
            <h2>Routes:</h2>
            <nav>
                <ul>
                    <li>
                        <Link href="/fullscreen">Fullscreen</Link>
                    </li>
                    <li>
                        <Link href="/shapes">Shapes</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
