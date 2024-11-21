import { useSuspenseQuery } from "@tanstack/react-query";
import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { productsQueries } from "~/queries/products";

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
	loader: async ({ context: { queryClient } }) => {
		return {
			dataCategories: queryClient.ensureQueryData(productsQueries.categories()),
		};
	},
	pendingComponent: () => <div>Loading Search Layout...</div>,
	errorComponent: () => <div>Oh no! Search Layout Error</div>,
	component: Layout,
});

function Layout() {
	const { q, order, sortBy } = Route.useSearch();

	const categoriesQuery = useSuspenseQuery(productsQueries.categories());
	const categories = categoriesQuery.data;

	const navigate = useNavigate({ from: Route.fullPath });
	const [searchTerm, setSearchTerm] = useState(q || "");

	const updateSearch = (key: keyof ProductSearchParams, value: string) => {
		navigate({ search: (prev) => ({ ...prev, [key]: value }) });
	};
	return (
		<div className="p-4 bg-opacity-20 bg-slate-300 rounded-xl">
			<h1 className="text-3xl">Search</h1>

			<div className="py-4">
				<form
					onSubmit={(event) => {
						event?.preventDefault();
						updateSearch("q", searchTerm);
					}}
				>
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<button type="button">Search</button>
				</form>

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

				<br />

				<select name="category">
					{categories.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
				<span>(this doesn't actually do anything)</span>
			</div>

			<Outlet />
		</div>
	);
}
