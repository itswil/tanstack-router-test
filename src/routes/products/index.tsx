import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { productsQueries } from "~/queries/products";

export const Route = createFileRoute("/products/")({
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(productsQueries.list()),
	pendingComponent: () => <div>Loading Products List...</div>,
	errorComponent: () => <div>Oh no! Products List Error</div>,
	component: Products,
});

function Products() {
	const productListQuery = useSuspenseQuery(productsQueries.list());
	const productsResponse = productListQuery.data;

	return (
		<div className="p-2 border-2 border-slate-300">
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
