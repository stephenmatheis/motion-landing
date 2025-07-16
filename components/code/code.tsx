import classNames from 'classnames';
import styles from './code.module.scss';

export function Code({
    children,
    page = '',
}: {
    children?: React.ReactNode;
    page?: string;
}) {
    return (
        <div className={styles['code-container']}>
            <div className={styles['code-header']}>
                <div className={styles['code-controls']}>
                    <div className={styles['code-buttons']}>
                        <div
                            className={classNames(styles.button, styles.red)}
                        />
                        <div
                            className={classNames(styles.button, styles.orange)}
                        />
                        <div
                            className={classNames(styles.button, styles.green)}
                        />
                    </div>
                    {/* TODO: Need file type icon */}
                    <div className={styles['code-title']}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 16"
                            preserveAspectRatio="none"
                            className={classNames(
                                styles['title-icon'],
                                styles['left']
                            )}
                        >
                            <path
                                fill="currentColor"
                                d="M0 16c8.837 0 16-7.163 16-16v16z"
                                style={{
                                    transform: 'rotate(0deg)',
                                    transformOrigin: 'center center',
                                }}
                            ></path>
                        </svg>
                        <span>NEXTdotgov</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 16"
                            preserveAspectRatio="none"
                            className={classNames(
                                styles['title-icon'],
                                styles['right']
                            )}
                        >
                            <path
                                fill="currentColor"
                                d="M0 16c8.837 0 16-7.163 16-16v16z"
                                style={{
                                    transform: 'rotate(90deg)',
                                    transformOrigin: 'center center',
                                }}
                            ></path>
                        </svg>
                    </div>
                </div>
                {/* <div className={styles['code-navigation']}>
                    <div aria-hidden="true" className={styles['nav-button']}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-arrow-left"
                        >
                            <path d="m12 19-7-7 7-7"></path>
                            <path d="M19 12H5"></path>
                        </svg>
                    </div>
                    <div aria-hidden="true" className={styles['nav-button']}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-arrow-right"
                        >
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </div>
                    <div aria-hidden="true" className={styles['nav-button']}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-rotate-cw"
                        >
                            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
                            <path d="M21 3v5h-5"></path>
                        </svg>
                    </div>
                    <div className={styles['nav-url']}>
                        <span>https://nextdotgov.gov/{page}</span>
                    </div>
                </div> */}
            </div>
            <div className={styles['code-content-container']}>
                <div className={styles['code-content']}>{children}</div>
            </div>
        </div>
    );
}
