import { createFileRoute, useRouter } from "@tanstack/react-router";
import type { ProductResponse } from "../../types/product";

type GetProductParams = {
	id: string;
};
async function getProduct({ id }: GetProductParams): Promise<ProductResponse> {
	const URL = "https://dummyjson.com/products/{id}";
	const response = await fetch(URL.replace("{id}", id));
	return await response.json();
}

export const Route = createFileRoute("/products/$id")({
	loader: async ({ params }) => await getProduct(params),
	component: Product,
	errorComponent: ({ error, reset }) => {
		const router = useRouter();

		return (
			<div>
				{error.message}
				<button
					type="button"
					onClick={() => {
						// Invalidate the route to reload the loader, which will also reset the error boundary
						router.invalidate();
					}}
				>
					retry
				</button>
			</div>
		);
	},
});

function Product() {
	const product = Route.useLoaderData();
	return (
		<div className="p-2">
			<img src={product.thumbnail} alt={product.title} />
			<h3>{product.title}</h3>
			<p>{product.description}</p>
			<p>Rating: {product.rating}</p>
			<p>Price: {product.price}</p>
			<p>Category: {product.category}</p>
			<p>Minimum Order Quantity: {product.minimumOrderQuantity}</p>
		</div>
	);
}
