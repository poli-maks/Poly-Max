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

// Fetch products by category
export const getProductsByCategory = async (lang: string, categoryUid: string, page: number) => {
  try {
    const { data: { data, meta: { pagination: { total: count } } } } = await instance.get(
      `/api/products?locale=${lang}&filters[categories][uid][$eq]=${categoryUid}&sort[0]=title:asc&pagination[page]=${page}&pagination[pageSize]=8`
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

// Fetch products by sub-category
export const getProductsBySubCategory = async (lang: string, subCategoryUid: number, page: number) => {
  try {
    const { data: { data, meta: { pagination: { total: count } } } } = await instance.get(
      `/api/products?locale=${lang}&filters[sub_categories][uid][$eq]=${subCategoryUid}&sort[0]=title:asc&pagination[page]=${page}&pagination[pageSize]=8`
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

// Search products by title
export const searchProductsByTitle = async (lang: string, query: string, page: number) => {
  try {
    const { data: { data, meta: { pagination: { total: count } } } } = await instance.get(
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
    }
    return notFound()
  }
}

// Cache the categories
export const fetchCategories = cache(getCategories)