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
