import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { productsQueries } from "../../queries/products";

const productSearchParamsSchema = z.object({
	q: z.string().default(""),
	order: z.string().default("asc"),
	sortBy: z.string().default("title"),
});
export type ProductSearchParams = z.infer<typeof productSearchParamsSchema>;

export const Route = createFileRoute("/products/search")({
	validateSearch: productSearchParamsSchema,
	loaderDeps: ({ search: { q, order, sortBy } }) => ({
		q,
		order,
		sortBy,
	}),
	loader: async ({ context: { queryClient }, deps: { q, order, sortBy } }) => {
		return {
			dataProducts: queryClient.ensureQueryData(
				productsQueries.search({ q, order, sortBy }),
			),
			dataCategories: queryClient.ensureQueryData(productsQueries.categories()),
		};
	},
	pendingComponent: () => <div>Loading Search Results...</div>,
	errorComponent: () => <div>Oh no! Search Results Error</div>,
	component: Search,
});

function Search() {
	const { q, order, sortBy } = Route.useSearch();

	const searchQuery = useSuspenseQuery(
		productsQueries.search({ q, order, sortBy }),
	);
	const productsResponse = searchQuery.data;

	const categoriesQuery = useSuspenseQuery(productsQueries.categories());
	const categories = categoriesQuery.data;

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

			<pre>{JSON.stringify(categories, null, 2)}</pre>

			<h1 className="text-3xl">Products</h1>
			<ul>
				{productsResponse.products.map((product) => (
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
