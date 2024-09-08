// File: /app/lib/api/services.ts

import axios from 'axios'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { instance } from '../instance'
import { ICategory, IProduct, IContacts } from '../interfaces'

// Fetch Categories
const getCategories = async (lang: string): Promise<ICategory[]> => {
	try {
		const { data: { data } } = await instance.get(`/api/categories?locale=${lang}&populate=sub_categories`)
		if (data.length === 0) {
			return notFound()
		}
		return data
	} catch (error) {
		handleError(error)
		return notFound()
	}
}

export const fetchCategories = cache(getCategories)

// Fetch All Products
const getAllProducts = async (lang: string, page: number, limit = 8): Promise<{ data: IProduct[]; count: number; type?: string } | string | undefined> => {
	try {
		const { data: { data, meta: { pagination: { total: count } } } } = await instance.get(`/api/products?locale=${lang}&populate=img&sort[0]=uid:asc&pagination[page]=${page}&pagination[pageSize]=${limit}`)
		if (data.length === 0) {
			return notFound()
		}
		return { data, count }
	} catch (error) {
		handleError(error)
	}
}

export const fetchAllProducts = cache(getAllProducts)

// Fetch Product By Slug
const getProductBySlug = async (lang: string, slug: string) => {
	try {
		const { data: { data } } = await instance.get(`/api/products?locale=${lang}&filters[slug][$eq]=${slug}&populate=deep`)
		if (data.length === 0) {
			return notFound()
		}
		return data
	} catch (error) {
		handleError(error)
	}
}

export const fetchProductBySlug = cache(getProductBySlug)

// Utility function to handle errors
function handleError(error: unknown) {
	if (axios.isAxiosError(error)) {
		console.error(error.status)
		console.error(error.response)
	} else {
		console.error(error)
	}
}

// Export missing fetch functions
export const fetchProductsBySubCategory = cache(getProductsBySubCategory)
export const fetchProductsByCategory = cache(getProductsByCategory)
export const searchProductsByTitle = cache(getProductsByTitle)
export const fetchContacts = cache(getContacts)

// Ensure you define `getProductsBySubCategory`, `getProductsByCategory`, and `getProductsByTitle` as needed
