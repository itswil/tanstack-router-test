import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { productsQueries } from "../../queries/products";
import type { ProductsResponse } from "../../types/product";

const ENDPOINT_URL = "https://dummyjson.com/products/category-list";

const fetchCategoryList = async (): Promise<Array<string>> => {
	const response = await fetch(ENDPOINT_URL);
	return await response.json();
};

const optionsCategoryList = queryOptions({
	queryKey: [ENDPOINT_URL],
	queryFn: () => fetchCategoryList(),
	staleTime: Number.POSITIVE_INFINITY,
});

type GetProductsParams = {
	q: string;
	order: string;
	sortBy: string;
};
async function getProducts({
	q,
	order,
	sortBy,
}: GetProductsParams): Promise<ProductsResponse> {
	const response = await fetch(
		`https://dummyjson.com/products/search?${new URLSearchParams({ q, order, sortBy })}`,
	);
	return await response.json();
}

const productSearchParamsSchema = z.object({
	q: z.string().default(""),
	order: z.string().default("asc"),
	sortBy: z.string().default("title"),
});
type ProductSearchParams = z.infer<typeof productSearchParamsSchema>;

export const Route = createFileRoute("/products/search")({
	validateSearch: productSearchParamsSchema,
	loaderDeps: ({ search: { q, order, sortBy } }) => ({
		q,
		order,
		sortBy,
	}),
	loader: async ({ context: { queryClient }, deps: { q, order, sortBy } }) => {
		return {
			dataProducts: await getProducts({ q, order, sortBy }),
			dataCategories: queryClient.ensureQueryData(productsQueries.categories()),
			// suppose I need categories for a drop down, how do I set staleTime for this ONLY?
			// https://tanstack.com/router/v1/docs/framework/react/guide/data-loading#using-staletime-to-control-how-long-data-is-considered-fresh
		};
	},
	component: Search,
});

function Search() {
	const { dataCategories, dataProducts } = Route.useLoaderData();

	const { q, order, sortBy } = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });
	const [searchTerm, setSearchTerm] = useState(q || "");

	const updateSearch = (key: keyof ProductSearchParams, value: string) => {
		navigate({ search: (prev) => ({ ...prev, [key]: value }) });
	};
	return (
		<div className="p-2">
			<h1 className="text-3xl">Search</h1>
			<input
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<button type="button" onClick={() => updateSearch("q", searchTerm)}>
				Search
			</button>
			<br />

			<select
				name="sortBy"
				value={sortBy}
				onChange={(e) => updateSearch("sortBy", e.target.value)}
			>
				<option key={"title"} value={"title"}>
					Title
				</option>
				<option key={"description"} value={"description"}>
					Description
				</option>
			</select>
			<br />

			<select
				name="order"
				value={order}
				onChange={(e) => updateSearch("order", e.target.value)}
			>
				<option key={"asc"} value={"asc"}>
					Ascending
				</option>
				<option key={"desc"} value={"desc"}>
					Descending
				</option>
			</select>

			<pre>{JSON.stringify(dataCategories, null, 2)}</pre>

			<h1 className="text-3xl">Products</h1>
			<ul>
				{dataProducts.products.map((product) => (
					<li key={product.id}>
						<Link to={"/products/$id"} params={{ id: `${product.id}` }}>
							{product.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
