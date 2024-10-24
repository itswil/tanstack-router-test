import { Link, createFileRoute } from "@tanstack/react-router";
import type { ProductsResponse } from "../../types/product";

async function getProducts(): Promise<ProductsResponse> {
	const response = await fetch("https://dummyjson.com/products");
	return await response.json();
}

export const Route = createFileRoute("/products/")({
	loader: async () => await getProducts(),
	component: Products,
});

function Products() {
	const data = Route.useLoaderData();
	return (
		<div className="p-2">
			<h3>Products</h3>
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
