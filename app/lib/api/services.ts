import axios from 'axios';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { instance } from '../instance';
import { ICategory, IProduct } from '../interfaces';

// Fetch categories
const getCategories = async (lang: string): Promise<ICategory[]> => {
	try {
		const { data: { data } } = await instance.get(`/api/categories?locale=${lang}&populate=sub_categories`);
		if (data.length === 0) {
			return notFound();
		}
		return data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(error.status);
			console.error(error.response);
			return notFound();
		} else {
			console.error(error);
			return notFound();
		}
	}
};

export const fetchCategories = cache(getCategories);

// Fetch all products
export const getAllProducts = async (
	lang: string,
	page: number,
	limit = 8
): Promise<{ data: IProduct[]; count: number; type?: string } | string | undefined> => {
	try {
		const { data: { data, meta: { pagination: { total: count } } } } = await instance.get(
			`/api/products?locale=${lang}&populate=img&sort[0]=uid:asc&pagination[page]=${page}&pagination[pageSize]=${limit}`
		);
		if (data.length === 0) {
			return notFound();
		}
		return { data, count };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(error.status);
			console.error(error.response);
			return notFound();
		} else {
			if (typeof error === 'object' && error !== null && 'digest' in error) {
				if (error.digest === 'NEXT_NOT_FOUND') {
					return 'NOT_FOUND';
				}
			}
			return notFound();
		}
	}
};

export const fetchAllProducts = cache(getAllProducts);

// Fetch product by slug
export const getProductBySlug = async (lang: string, slug: string) => {
	try {
		const { data: { data } } = await instance.get(`/api/products?locale=${lang}&filters[slug][$eq]=${slug}&populate=deep`);
		if (data.length === 0) {
			return notFound();
		}
		return data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(error.status);
			console.error(error.response);
			return notFound();
		} else {
			if (typeof error === 'object' && error !== null && 'digest' in error) {
				if (error.digest === 'NEXT_NOT_FOUND') {
					return 'NOT_FOUND';
				}
			}
			return notFound();
		}
	}
};

export const fetchProductBySlug = cache(getProductBySlug);

// Fetch product by UID (for reference)
export const getProductByUid = async (lang: string, uid: number) => {
	try {
		const { data: { data } } = await instance.get(`/api/products?locale=${lang}&filters[uid][$in][0]=${uid}&populate=deep`);
		if (data.length === 0) {
			return notFound();
		}
		return data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(error.status);
			console.error(error.response);
			return notFound();
		} else {
			if (typeof error === 'object' && error !== null && 'digest' in error) {
				if (error.digest === 'NEXT_NOT_FOUND') {
					return 'NOT_FOUND';
				}
			}
			return notFound();
		}
	}
};

// Fetch products by title
const getProductsByTitle = async (
	lang: string,
	query: string,
	page: number
): Promise<{ data: IProduct[]; count: number; type?: string } | string | undefined> => {
	try {
		const { data: { data, meta: { pagination: { total: count } } } } = await instance.get(
			`/api/products?locale=${lang}&filters[title][$containsi]=${query}&populate=img&sort[0]=title:asc&pagination[page]=${page}&pagination[pageSize]=8`
		);
		if (data.length === 0) {
			return notFound();
		}
		return { data, count };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(error.status);
			console.error(error.response);
			return notFound();
		} else {
			if (typeof error === 'object' && error !== null && 'digest' in error) {
				if (error.digest === 'NEXT_NOT_FOUND') {
					return 'NOT_FOUND';
				}
			}
			return notFound();
		}
	}
};

export const searchProductsByTitle = cache(getProductsByTitle);

// Fetch products by category
const getProductsByCategory = async (
	lang: string,
	catUid: string,
	page: number
): Promise<{ data: IProduct[]; count: number; type?: string } | string | undefined> => {
	try {
		const { data: { data, meta: { pagination: { total: count } } } } = await instance.get(
			`/api/products?locale=${lang}&populate=deep,2&filters[categories][uid][$eq]=${catUid}&sort[0]=title:asc&pagination[page]=${page}&pagination[pageSize]=8`
		);
		if (data.length === 0) {
			return notFound();
		}
		return { data, count };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(error.status);
			console.error(error.response);
			return notFound();
		} else {
			if (typeof error === 'object' && error !== null && 'digest' in error) {
				if (error.digest === 'NEXT_NOT_FOUND') {
					return 'NOT_FOUND';
				}
			}
			return notFound();
		}
	}
};

export const fetchProductsByCategory = cache(getProductsByCategory);