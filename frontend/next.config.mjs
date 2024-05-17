/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp3|wav)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/sounds/[name][ext]',
      },
    })

    return config
  },
}

export default nextConfig
