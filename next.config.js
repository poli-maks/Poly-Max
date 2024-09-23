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

	// Add the redirects function
	async redirects() {
		return [
			{
				// Redirect from old URL using product ID to new URL using slug
				source: '/:lang/catalog/:id', // Old URL format (with id)
				destination: '/:lang/catalog/:slug', // New URL format (with slug)
				permanent: true, // HTTP 301 Permanent Redirect
			},
		]
	},
}

module.exports = nextConfig