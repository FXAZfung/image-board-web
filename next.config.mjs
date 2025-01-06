/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:4536/api/:path*',
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '4536',
                pathname: '/api/public/images/**',
                search: '',
            },
        ],
    },
};

export default nextConfig;
