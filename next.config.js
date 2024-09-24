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
        source: '/catalog/:id', // Match just the ID route
        destination: '/catalog/:id:slug', // Redirect to the ID-Slug format
        permanent: true, // Use 301 permanent redirect
      },
    ]
  },
}

module.exports = nextConfig
