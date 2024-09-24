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
        source: '/:lang/catalog/:id', // Old pattern with UID
        destination: '/:lang/catalog/:slug', // Redirect to slug-based URL
        permanent: true, // Permanent redirect
      },
    ]
  },
}

module.exports = nextConfig
