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

	// Redirects without dynamic slug/id
	async redirects() {
		return [
			{
				source: '/:lang/catalog/:id', // Old URL with id
				destination: '/:lang/catalog', // Redirect to catalog listing (or another page)
				permanent: true, // HTTP 301 Permanent Redirect
			},
		]
	},
}

module.exports = nextConfig