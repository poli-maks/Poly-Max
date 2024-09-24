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
        source: '/catalog/4',
        destination: '/catalog/4-barrage-post',
        permanent: true,
      },
      
      // Add more redirects here manually for each product
    ];
  },
}

module.exports = nextConfig
