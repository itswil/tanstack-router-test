import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import type { ProductsResponse } from "../../types/product";

type GetProductsParams = {
	q: string;
};
async function getProducts({
	q,
}: GetProductsParams): Promise<ProductsResponse> {
	console.log(111, q);
	const response = await fetch(
		`https://dummyjson.com/products?${new URLSearchParams({ q })}`,
	);
	return await response.json();
}

const productSearchParamsSchema = z.object({
	q: z.string().default(""),
});
type ProductSearchParams = z.infer<typeof productSearchParamsSchema>;

export const Route = createFileRoute("/products/search")({
	validateSearch: productSearchParamsSchema,
	loader: async ({ deps: { q } }) => {
		await getProducts({ q });
	},
	component: Search,
});

function Search() {
	const { q } = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });

	const updateSearch = (name: keyof ProductSearchParams, value: unknown) => {
		navigate({ search: (prev) => ({ ...prev, [name]: value }) });
	};
	return (
		<div className="p-2">
			<h3>Search</h3>
			<input
				type="text"
				name="q"
				value={q}
				onChange={(e) => updateSearch("q", e.target.value)}
			/>
		</div>
	);
}
