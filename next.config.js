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
        source: '/:lang/catalog/:id', // Source pattern
        destination: '/:lang/catalog/:slug', // Destination pattern
        has: [
          {
            type: 'query',
            key: 'slug', // Ensure the presence of `slug` in query
          },
        ],
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
