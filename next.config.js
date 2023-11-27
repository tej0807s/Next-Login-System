/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        forceSwcTransforms: true,
    },
    api: {
        bodyParser: {
            sizeLimit: '1mb', // Set the size limit if needed
        },
    },
};

module.exports = nextConfig;