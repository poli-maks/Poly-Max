import axios from 'axios'
import { notFound } from 'next/navigation'
import { cache } from 'react'

import { instance } from '../instance'
import { ICategory, IProduct, IContacts } from '../interfaces'

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

export const getAllProducts = async (
	lang: string,
	page: number,
	limit = 8
): Promise<{ data: IProduct[]; count: number; type?: string } | string | undefined> => {
	try {
		const {
			data: {
				data,
				meta: {
					pagination: { total: count },
				},
			},
		} = await instance.get(
			`/api/products?locale=${lang}&populate=img&sort[0]=uid:asc&pagination[page]=${page}&pagination[pageSize]=${limit}`
		)
		if (data.length === 0) {
			return notFound()
		}

		return { data, count }
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

export const fetchAllProducts = cache(getAllProducts)

export const getProductByUid = async (lang: string, uid: number) => {
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
			if (typeof error === 'object' && error !== null && 'digest' in error) {
				if (error.digest === 'NEXT_NOT_FOUND') {
					return 'NOT_FOUND'
				}
			} else return notFound()
		}
	}
}

export const fetchProductByUid = cache(getProductByUid)

// New Function to Fetch Product by Name (Slug)
export const getProductByName = async (lang: string, name: string): Promise<IProduct | null> => {
	try {
		const {
			data: { data },
		} = await instance.get(
			`/api/products?locale=${lang}&filters[slug][$eq]=${encodeURIComponent(name)}&populate=deep`
		)

		if (data.length === 0) {
			return null; // Return null instead of notFound() to match the function signature
		}

		return data[0] as IProduct; // Assuming that the slug is unique, so only one product is returned
	} catch (error) {
		console.error(error); // Log the error for debugging

		// Return null in case of any error
		return null;
	}
}

export const fetchProductByName = cache(getProductByName)

const getProductsByTitle = async (
	lang: string,
	query: string,
	page: number
): Promise<{ data: IProduct[]; count: number; type?: string } | string | undefined> => {
	try {
		const {
			data: {
				data,
				meta: {
					pagination: { total: count },
				},
			},
		} = await instance.get(
			`/api/products?locale=${lang}&filters[title][$containsi]=${query}&populate=img&sort[0]=title:asc&pagination[page]=${page}&pagination[pageSize]=8`
		)
		if (data.length === 0) {
			return notFound()
		}

		return { data, count }
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

export const searchProductsByTitle = cache(getProductsByTitle)

const getProductsByCategory = async (
	lang: string,
	catUid: string,
	page: number
): Promise<{ data: IProduct[]; count: number; type?: string } | string | undefined> => {
	try {
		const {
			data: {
				data,
				meta: {
					pagination: { total: count },
				},
			},
		} = await instance.get(
			`/api/products?locale=${lang}&populate=deep,2&filters[categories][uid][$eq]=${catUid}&sort[0]=title:asc&pagination[page]=${page}&pagination[pageSize]=8`
		)

		if (data.length === 0) {
			return notFound()
		}

		return { data, count }
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

export const fetchProductsByCategory = cache(getProductsByCategory)

const getProductsBySubCategory = async (
	lang: string,
	subCatUid: number,
	page: number
): Promise<{ data: IProduct[]; count: number; type?: string } | string | undefined> => {
	try {
		const {
			data: {
				data,
				meta: {
					pagination: { total: count },
				},
			},
		} = await instance.get(
			`/api/products?locale=${lang}&populate=deep,2&filters[sub_categories][uid][$eq]=${subCatUid}&sort[0]=title:asc&pagination[page]=${page}&pagination[pageSize]=8`
		)

		if (data.length === 0) {
			return notFound()
		}

		return { data, count }
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

export const fetchProductsBySubCategory = cache(getProductsBySubCategory)

const getContacts = async (lang: string): Promise<IContacts | undefined> => {
	try {
		const response = await instance.get(`/api/contacts?locale=${lang}`)
		const { data } = response.data

		if (!data || data.length === 0) {
			return undefined
		}

		const [{ attributes }] = data

		return attributes
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(error.status)
			console.error(error.response)

			return undefined
		} else {
			console.error(error)

			return undefined
		}
	}
}

export const fetchContacts = cache(getContacts)
