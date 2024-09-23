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

// Fetch products by subcategory
const getProductsBySubCategory = async (lang: string, subCategoryUid: number) => {
    try {
        const { data } = await instance.get(
            `/api/products?locale=${lang}&filters[sub_category][uid][$eq]=${subCategoryUid}`
        );

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchProductsBySubCategory = cache(getProductsBySubCategory);

// Fetch contacts
const getContacts = async (lang: string) => {
    try {
        const { data } = await instance.get(`/api/contacts?locale=${lang}`);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchContacts = cache(getContacts);

// Fetch product by UID
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