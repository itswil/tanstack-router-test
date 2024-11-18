import { Link, createFileRoute } from "@tanstack/react-router";
import { productsQueries } from "../../queries/products";
import type { ProductsResponse } from "../../types/product";

export const Route = createFileRoute("/products/")({
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(productsQueries.list()),
	component: Products,
});

function Products() {
	const data = Route.useLoaderData();

	return (
		<div className="p-2">
			<h1 className="text-3xl">Products</h1>
			<ul>
				{data.products.map((product) => (
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
