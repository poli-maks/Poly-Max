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
        source: 'https://www.poli-maks.com/en/catalog/4)', // Match only numeric IDs
        destination: 'https://www.poli-maks.com/en/catalog/4-barrage-post', // Redirect to the URL with the slug
        permanent: true, // This makes the redirect permanent (301)
      },
      
      // Add more redirects here manually for each product
    ];
  },
}

module.exports = nextConfig
