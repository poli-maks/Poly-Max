import axios from 'axios';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { instance } from '../instance';
import { ICategory, IProduct, IContacts } from '../interfaces';

// Fetch Categories
const getCategories = async (lang: string): Promise<ICategory[]> => {
  // ...existing code...
};

export const fetchCategories = cache(getCategories);

// Fetch All Products
export const getAllProducts = async (
  lang: string,
  page: number,
  limit = 8
): Promise<{ data: IProduct[]; count: number; type?: string } | string | undefined> => {
  // ...existing code...
};

export const fetchAllProducts = cache(getAllProducts);

// Fetch Product by UID
export const getProductByUid = async (lang: string, uid: number) => {
  // ...existing code...
};

export const fetchProductByUid = cache(getProductByUid);

// Fetch Product by Name (Slug)
export const getProductByName = async (lang: string, name: string): Promise<IProduct | null> => {
  // ...existing code...
};

export const fetchProductByName = cache(getProductByName);

// Fetch Products by Title
const getProductsByTitle = async (
  lang: string,
  query: string,
  page: number
): Promise<{ data: IProduct[]; count: number; type?: string } | string | undefined> => {
  // ...existing code...
};

export const searchProductsByTitle = cache(getProductsByTitle);

// Fetch Products by Category
const getProductsByCategory = async (
  lang: string,
  catUid: string,
  page: number
): Promise<{ data: IProduct[]; count: number; type?: string } | string | undefined> => {
  // ...existing code...
};

export const fetchProductsByCategory = cache(getProductsByCategory);

// Fetch Products by Subcategory
const getProductsBySubCategory = async (
  lang: string,
  subCatUid: number,
  page: number
): Promise<{ data: IProduct[]; count: number; type?: string } | string | undefined> => {
  // ...existing code...
};

export const fetchProductsBySubCategory = cache(getProductsBySubCategory);

// Fetch Contacts
const getContacts = async (lang: string): Promise<IContacts | undefined> => {
  // ...existing code...
};

export const fetchContacts = cache(getContacts);
