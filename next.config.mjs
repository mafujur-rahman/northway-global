/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-5955669eccb64965b91474a798f31ae3.r2.dev',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig
