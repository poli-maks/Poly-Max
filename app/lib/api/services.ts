import axios from 'axios'
import { notFound } from 'next/navigation'
import { cache } from 'react'

import { instance } from '../instance'
import { ICategory } from '../interfaces'

const getCategories = async (lang: string): Promise<ICategory[]> => {
	try {
		const {
			data: { data },
		} = await instance.get(`/api/categories?locale=${lang}&populate=sub_categories`)
		if (data.length === 0) {
			return notFound()
		}

		return data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(error.status)
			console.error(error.response)

			return notFound()
		} else {
			console.error(error)

			return notFound()
		}
	}
}

export const fetchCategories = cache(getCategories)

const getAllProducts = async (lang: string, page: number) => {
	try {
		const {
			data: { data },
		} = await instance.get(
			`/api/products?locale=${lang}&populate=img&sort[0]=title:asc&pagination[page]=${page}&pagination[pageSize]=8`
		)
		if (data.length === 0) {
			return notFound()
		}

		return data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(error.status)
			console.error(error.response)

			return notFound()
		} else {
			console.error(error)

			return notFound()
		}
	}
}

export const fetchAllProducts = cache(getAllProducts)

const getProductByUid = async (lang: string, uid: number) => {
	try {
		const {
			data: { data },
		} = await instance.get(`/api/products?locale=${lang}&filters[uid][$in][0]=${uid}&populate=deep`)
		if (data.length === 0) {
			return notFound()
		}

		return data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(error.status)
			console.error(error.response)

			return notFound()
		} else {
			console.error(error)

			return notFound()
		}
	}
}

export const fetchProductByUid = cache(getProductByUid)

const getProductByTitle = async (lang: string, query: string, page: number) => {
	try {
		const {
			data: { data },
		} = await instance.get(
			`/api/products?locale=${lang}&filters[title][$containsi]=${query}&populate=img&sort[0]=title:asc&pagination[page]=${page}&pagination[pageSize]=8`
		)
		if (data.length === 0) {
			return notFound()
		}

		return data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(error.status)
			console.error(error.response)

			return notFound()
		} else {
			if (typeof error === 'object' && error !== null && 'digest' in error) {
				if (error.digest === 'NEXT_NOT_FOUND') {
					return 'NOT_FOUND'
				}
			} else return notFound()
		}
	}
}

export const searchProductByTitle = cache(getProductByTitle)

const getProductsByCategory = async (lang: string, catUid: string, page: number) => {
	try {
		const {
			data: { data },
		} = await instance.get(
			`/api/categories?locale=${lang}&populate=deep&filters[uid][$in][0]=${catUid}&sort[0]=title:asc&pagination[page]=${page}&pagination[pageSize]=8`
		)
		if (data.length === 0) {
			return notFound()
		}

		return data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(error.status)
			console.error(error.response)

			return notFound()
		} else {
			console.error(error)

			return notFound()
		}
	}
}

export const fetchProductsByCategory = cache(getProductsByCategory)

const getProductsBySubCategory = async (lang: string, subCatUid: number, page: number) => {
	try {
		const {
			data: { data },
		} = await instance.get(
			`api/sub-categories?locale=${lang}&populate[0]=products&filters[uid][$in][0]=${subCatUid}&populate[1]=products.img&sort[0]=title:asc&pagination[page]=${page}&pagination[pageSize]=8`
		)
		if (data.length === 0) {
			return notFound()
		}

		return data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(error.status)
			console.error(error.response)

			return notFound()
		} else {
			console.error(error)

			return notFound()
		}
	}
}

export const fetchProductsBySubCategory = cache(getProductsBySubCategory)

export const getContacts = async (lang: string) => {
	try {
		const {
			data: { data },
		} = await instance.get(`/api/contacts?locale=${lang}`)
		if (data.length === 0) return notFound()

		const [{ attributes }] = data

		return attributes
	} catch (error) {
		if (axios.isAxiosError(error) === undefined) {
			return notFound()
		}
	}
}

export const fetchContacts = cache(getContacts)
