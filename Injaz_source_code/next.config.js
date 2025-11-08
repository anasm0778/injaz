/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true, // ✅ Ignore ESLint errors during build
    },
    trailingSlash: true,
    images: { 
        unoptimized: true,
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },
        ],
    },
    reactStrictMode: false,  
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    compress: true,
    poweredByHeader: false,
    generateEtags: true,
    
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-XSS-Protection', value: '1; mode=block' },
                    { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
                ],
            },
        ];
    },

    async redirects() {
        return [
            { source: '/home', destination: '/', permanent: true },
            { source: '/car-rental', destination: '/', permanent: true },
            { source: '/rent-a-car', destination: '/', permanent: true },
            { source: '/dubai-car-rental', destination: '/', permanent: true },
        ];
    },
};

// ✅ Backend API rewrite
nextConfig.rewrites = async () => {
    return [
        {
            source: '/api/:path*',
            destination: 'http://localhost:5000/:path*', // proxy to backend
        },
    ];
};

module.exports = nextConfig;
