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
        source: '/:lang/catalog/:id(\\d+)', // Match only numeric IDs
        destination: '/:lang/catalog/:slug', // Redirect to slug URL
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
