import { queryOptions } from "@tanstack/react-query";
import type { ProductResponse, ProductsResponse } from "../types/product";

const fetchCategoryList = async (): Promise<Array<string>> => {
	const response = await fetch("https://dummyjson.com/products/category-list");
	return await response.json();
};

const fetchProduct = async (id: string): Promise<ProductResponse> => {
	const response = await fetch(`https://dummyjson.com/products/${id}`);
	return await response.json();
};

const fetchProducts = async (): Promise<ProductsResponse> => {
	const response = await fetch("https://dummyjson.com/products");
	return await response.json();
};

// https://tkdodo.eu/blog/the-query-options-api#query-factories
export const productsQueries = {
	all: () => ["products"],

	categories: () =>
		queryOptions({
			queryKey: [...productsQueries.all(), "categories"],
			queryFn: () => fetchCategoryList(),
			staleTime: Number.POSITIVE_INFINITY,
		}),

	details: () => [...productsQueries.all(), "detail"],
	detail: (id: string) =>
		queryOptions({
			queryKey: [...productsQueries.details(), id],
			queryFn: () => fetchProduct(id),
		}),

	list: () =>
		queryOptions({
			queryKey: [...productsQueries.all(), "list"],
			queryFn: () => fetchProducts(),
		}),
};
