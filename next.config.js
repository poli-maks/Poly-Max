/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
		],
	},
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
	async redirects() {
    return [
      {
        source: '/:lang/catalog/:id', // Old URL pattern with UID
        destination: '/:lang/catalog/:slug', // New URL pattern with slug
        permanent: true, // Redirect permanently
      },
    ]
  },
}

module.exports = nextConfig
