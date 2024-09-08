import axios from 'axios';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { instance } from '../instance';
import { ICategory, IProduct, IContacts } from '../interfaces';

// Function to fetch categories
const getCategories = async (lang: string): Promise<ICategory[]> => {
  try {
    const {
      data: { data },
    } = await instance.get(`/api/categories?locale=${lang}&populate=sub_categories`);
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

// New function to fetch product by slug
export const getProductBySlug = async (lang: string, slug: string) => {
  try {
    const {
      data: { data },
    } = await instance.get(`/api/products?locale=${lang}&filters[slug][$eq]=${slug}&populate=deep`);
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
      } else return notFound();
    }
  }
};

export const fetchProductBySlug = cache(getProductBySlug);

// Keep existing product fetching function but now use slug
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
      `/api/products?locale=${lang}&populate=img&sort[0]=slug:asc&pagination[page]=${page}&pagination[pageSize]=${limit}`
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
      } else return notFound();
    }
  }
};

export const fetchAllProducts = cache(getAllProducts);

// Fetch products by title, category, and subcategory remain unchanged
const getProductsByTitle = async (
  lang: string,
  query: string,
  page: number
): Promise<{ data: IProduct[]; count: number; type?: string } | string | undefined> => {
  // existing implementation
};

export const searchProductsByTitle = cache(getProductsByTitle);

// Fetch by category and subcategory functions
const getProductsByCategory = async (
  lang: string,
  catUid: string,
  page: number
): Promise<{ data: IProduct[]; count: number; type?: string } | string | undefined> => {
  // existing implementation
};

export const fetchProductsByCategory = cache(getProductsByCategory);

const getProductsBySubCategory = async (
  lang: string,
  subCatUid: number,
  page: number
): Promise<{ data: IProduct[]; count: number; type?: string } | string | undefined> => {
  // existing implementation
};

export const fetchProductsBySubCategory = cache(getProductsBySubCategory);

// Fetch contacts function
const getContacts = async (lang: string): Promise<IContacts | undefined> => {
  // existing implementation
};

export const fetchContacts = cache(getContacts);
