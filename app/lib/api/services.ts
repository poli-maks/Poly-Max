import axios from 'axios'
import { notFound } from 'next/navigation'
import { cache } from 'react'

import { instance } from '../instance'
import { ICategory, IProduct, IContacts } from '../interfaces'

// Function to fetch categories
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

// Cache the fetching categories function
export const fetchCategories = cache(getCategories)

// Function to fetch all products
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
            } else {
                return notFound()
            }
        }
    }
}

// Cache the fetching of all products
export const fetchAllProducts = cache(getAllProducts)

// Function to fetch a product by UID
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
                    return 
