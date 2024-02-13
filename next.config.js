/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: false,
    experimental: {
        serverComponentsExternalPackages: [
            '@react-email/components',
            '@react-email/render',
            '@react-email/tailwind'
        ]
    }
}

module.exports = nextConfig
