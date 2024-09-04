import { Locale } from '@/i18n.config'

export interface IParams {
  params: {
    lang: Locale
    id?: string // Keep this if you need it elsewhere
    productName?: string // Add this to support SEO-friendly URLs
  }
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
	id: number
	article: string
	diameter: string
	length: string
	weight: string
	coating_thickness: string
	cross_section: string
	volume: string
	wall_thickness: string
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

export type IAllowedKeys =
	| 'article'
	| 'diameter'
	| 'length'
	| 'weight'
	| 'coating_thickness'
	| 'cross_section'
	| 'volume'
	| 'wall_thickness'

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

export interface IProductDictionary {
	btnOrder: string
	announcement: string
	tableHeaders: {
		article: string
		diameter: string
		length: string
		weight: string
		coating_thickness: string
		cross_section: string
		volume: string
		wall_thickness: string
	}
	delivery: {
		title: string
		body: string
	}
	company: {
		title: string
		body: string
	}
	contactUs: {
		title: string
		body: string
	}
}

export interface IDictionaryModal {
	title: string
	text: string
	nameField: string
	emailField: string
	message: string
	button: string
	policy: string
}

export interface IAboutUsDictionary {
	title: string
	subTitle: string
	sections: {
		first: {
			title: string
			text: string
		}
		second: {
			title: string
			text: string
		}
		third: {
			title: string
			text: string
		}
	}
}

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
	officePhone?: string
	metartEmail?: string
}

export enum SEARCH_PARAMS {
	CATEGORY = 'category',
	SUB_CATEGORY = 'sub',
	SEARCH = 'search',
	QUERY = 'query',
	PAGE = 'page',
	TOTAL = 'total',
}
