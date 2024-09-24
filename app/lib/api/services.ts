import axios from 'axios'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { instance } from '../instance'
import { ICategory, IProduct, IContacts } from '../interfaces'

// Fetch product by slug
export const getProductBySlug = async (lang: string, slug: string) => {
  try {
    const { data } = await instance.get(`/api/products?locale=${lang}&filters[slug][$eq]=${slug}&populate=deep`)
    
    if (data.length === 0) {
      return notFound()
    }

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.status)
      console.error(error.response)
      return notFound()
    }
    return notFound()
  }
}

// Fetch product by UID (fallback)
export const getProductByUid = async (lang: string, uid: number) => {
  try {
    const { data } = await instance.get(`/api/products?locale=${lang}&filters[uid][$in][0]=${uid}&populate=deep`)
    
    if (data.length === 0) {
      return notFound()
    }

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.status)
      console.error(error.response)
      return notFound()
    }
    return notFound()
  }
}

// Fetch all products
export const getAllProducts = async (lang: string, page: number, limit = 8) => {
  try {
    const { data: { data, meta: { pagination: { total: count } } } } = await instance.get(
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
    }
    return notFound()
  }
}

// Fetch categories
export const getCategories = async (lang: string) => {
  try {
    const { data: { data } } = await instance.get(`/api/categories?locale=${lang}&populate=sub_categories`)
    if (data.length === 0) {
      return notFound()
    }
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.status)
      console.error(error.response)
      return notFound()
    }
    return notFound()
  }
}

const getCategoriesCached = async (lang: string): Promise<ICategory[]> => {
	try {
		const { data: { data } } = await instance.get(`/api/categories?locale=${lang}&populate=sub_categories`)
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

export const fetchCategories = cache(getCategoriesCached)

// Fetch contacts
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