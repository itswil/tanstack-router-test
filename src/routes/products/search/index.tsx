import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { productsQueries } from "~/queries/products";

const productSearchParamsSchema = z.object({
	q: z.string().default(""),
	order: z.string().default("asc"),
	sortBy: z.string().default("title"),
});
export type ProductSearchParams = z.infer<typeof productSearchParamsSchema>;

export const Route = createFileRoute("/products/search/")({
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

	return (
		<>
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
		</>
	);
}
