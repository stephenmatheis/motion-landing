import path from 'path';
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    sassOptions: {
        logger: {
            warn(message) {
                console.warn(message);
            },
            debug(message) {
                console.log(message);
            },
        },
    },
    transpilePackages: ['three'],
};

const withMDX = createMDX({
    // Add markdown plugins here, as desired
})

export default withMDX(nextConfig)
