import { i18n } from '@/i18n.config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function getLocale(request: NextRequest): string | undefined {
	const negotiatorHeaders: Record<string, string> = {};
	request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
	//@ts-expect-error locales are readonly
	const locales: string[] = i18n.locales;
	const languages = new Negotiator({ headers: negotiatorHeaders }).languages;
	//@ts-expect-error locales are readonly
	const locale = matchLocale(languages, locales, i18n.defaultLocale);

	return locale;
}

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	if (
		pathname === '/sitemap.xml' ||
		pathname === '/opengraph-image.png' ||
		pathname === '/robots.txt'
	)
		return;

	const pathnameIsMissingLocale = i18n.locales.every(
		(locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
	);

	if (pathnameIsMissingLocale) {
		const locale = getLocale(request);

		return NextResponse.redirect(
			new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
		);
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|img|favicon.ico|logo.png|sw.js).*)'],
};
