import { Locale } from '@/i18n.config'

export interface IParams {
	params: { lang: Locale; id?: string }
}

interface Heading {
	type: 'heading'
	level: number
	children: TextElement[]
}

interface Paragraph {
	type: 'paragraph'
	children: TextElement[]
}

interface List {
	type: 'list'
	format: 'unordered'
	children: ListItem[]
}

interface ListItem {
	type: 'list-item'
	children: TextElement[]
}

interface TextElement {
	text: string
	type: 'text'
}

type ElementType = Heading | Paragraph | List

export interface ImageAttributes {
	id: 5
	attributes: {
		name: string
		alternativeText: string | null
		caption: string | null
		width: number
		height: number
		formats: {
			small: {
				ext: string
				url: string
				hash: string
				mime: string
				name: string
				path: string | null
				size: number
				width: number
				height: number
				provider_metadata: {
					public_id: string
					resource_type: string
				}
			}
			thumbnail: {
				ext: string
				url: string
				hash: string
				mime: string
				name: string
				path: string | null
				size: number
				width: number
				height: number
				provider_metadata: {
					public_id: string
					resource_type: string
				}
			}
		}
		hash: string
		ext: string
		mime: string
		size: number
		url: string
		previewUrl: string | null
		provider: string
		provider_metadata: {
			public_id: string
			resource_type: string
		}
		createdAt: string
		updatedAt: string
	}
}

export interface ITableRow {
	article: string
	diameter: string
	id: number
	length: string
	weight: string
}

export interface IProductProps {
	id: number
	attributes: {
		title: string
		descShort: string
		createdAt: string
		updatedAt: string
		publishedAt: string
		locale: string
		uid: number
		markDawn: ElementType[]
		img: {
			data: ImageAttributes[]
		}
		categories: object
		tableRow: ITableRow[]
		localizations: unknown[]
	}
}

export interface ICategory {
	id: number
	attributes: {
		uid: number
		title: string
		locale: Locale
		createdAt: Date
		updatedAt: Date
		publishedAt: Date
		sub_categories: { data: ISubCategory[] }
	}
}

export interface ISubCategory {
	id: number
	attributes: {
		uid: number
		title: string
	}
}

export interface IProduct {
	id: number
	attributes: {
		title: string
		descShort: string
		createdAt: string
		updatedAt: string
		publishedAt: string
		locale: string
		uid: number
		markDawn: Array<{
			type: string
			level: number
			children: Array<{
				text: string
				type: string
			}>
		}>
		img: {
			data: Array<{
				id: number
				attributes: {
					name: string
					alternativeText: string | null
					caption: string | null
					width: number
					height: number
					formats: {
						small: ImageFormat
						thumbnail: ImageFormat
					}
					hash: string
					ext: string
					mime: string
					size: number
					url: string
					previewUrl: string | null
					provider: string
					provider_metadata: {
						public_id: string
						resource_type: string
					}
					createdAt: string
					updatedAt: string
				}
			}>
		}
	}
}

interface ImageFormat {
	ext: string
	url: string
	hash: string
	mime: string
	name: string
	path: string | null
	size: number
	width: number
	height: number
	provider_metadata: {
		public_id: string
		resource_type: string
	}
}

export type TitleSize = ['xl', 'lg', 'md', 'sm']
export type TitleLevel = ['h1', 'h2', 'h3', 'h4']

export interface ILocation {
	img: string
	text: string
}

export interface IContacts {
	email?: string
	phone?: string
	address?: string
	officeEmail?: string
	createdAt?: string
	updatedAt?: string
	publishedAt?: string
	locale?: string
}

export enum SEARCH_PARAMS {
	CATEGORY = 'category',
	SUB_CATEGORY = 'sub',
	SEARCH = 'search',
	QUERY = 'query',
	PAGE = 'page',
	TOTAL = 'total',
}
