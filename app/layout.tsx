import type { Metadata, Viewport } from 'next';
import { Space_Mono } from 'next/font/google';
import classNames from 'classnames';
import { GenerativeShapes } from '@/components/shapes';
import { AnimationProvider } from '@/context/animation';
import '@/styles/app.scss';

const space_mono = Space_Mono({
    subsets: ['latin'],
    variable: '--font-space-mono',
    display: 'swap',
    weight: ['400', '700'],
});

export const metadata: Metadata = {
    title: {
        template: 'NEXTdotgov | %s',
        default: 'NEXTdotgov',
    },
    description: 'A web consultancy for government agencies.',
    openGraph: {
        title: 'NEXTdotgov',
        description: 'A web consultancy for government agencies.',
        url: 'https://nextdotgov.com',
        siteName: 'Stephen Matheis',
        images: [
            {
                url: 'https://nextdotgov.com/og.png',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    manifest: '/manifest.json',
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: true,
    themeColor: [
        {
            media: '(prefers-color-scheme: light)',
            color: 'var(--background-color)',
        },
        { media: '(prefers-color-scheme: dark)', color: '#221d29' },
    ],
    colorScheme: 'light dark',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={classNames(space_mono.variable)}
            suppressHydrationWarning
        >
            <body suppressHydrationWarning>
                <AnimationProvider>
                    <GenerativeShapes />
                    {children}
                </AnimationProvider>
            </body>
        </html>
    );
}
