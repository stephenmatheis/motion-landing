'use client';

import classNames from 'classnames';
import { Header } from '@/components/header';
import { Tools } from '@/components/tools';
import { useAnimationContext } from '@/context/animation';
import styles from './layout.module.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
    const { isModalOpen } = useAnimationContext();

    return (
        <div className={styles.page}>
            <Header />
            <main
                className={classNames({
                    [styles.open]: isModalOpen,
                })}
            >
                {children}
            </main>
            <Tools />
        </div>
    );
}
