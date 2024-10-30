import { queryOptions } from "@tanstack/react-query";

const ENDPOINT_URL = "https://dummyjson.com/products/category-list";

const fetchCategoryList = async (): Promise<Array<string>> => {
	const response = await fetch(ENDPOINT_URL);
	return await response.json();
};

export const optionsCategoryList = queryOptions({
	queryKey: [ENDPOINT_URL],
	queryFn: () => fetchCategoryList(),
	staleTime: Number.POSITIVE_INFINITY,
});
