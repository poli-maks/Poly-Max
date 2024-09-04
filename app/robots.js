export default function robots() {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/en/success', '/de/success'],
			},
		],
		sitemap: `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
	}
}
