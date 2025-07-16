import Link from 'next/link';
import { Main } from '@/components/main';

export default function NotFound() {
    return (
        <Main>
            <section>
                <h2>
                    404 <br />
                    <span>Page not found</span>
                </h2>
                <p
                    style={{
                        width: '100%',
                        maxWidth: '100%',
                        textAlign: 'center',
                    }}
                >
                    <Link
                        href="/"
                        style={{
                            color: 'var(--primary)',
                            fontSize: '2em',
                        }}
                    >
                        Return home
                    </Link>
                </p>
            </section>
        </Main>
    );
}
