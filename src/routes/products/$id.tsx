import { createFileRoute, useRouter } from "@tanstack/react-router";
import { productsQueries } from "../../queries/products";

export const Route = createFileRoute("/products/$id")({
	loader: ({ context: { queryClient }, params }) =>
		queryClient.ensureQueryData(productsQueries.detail(params.id)),
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
			<h1 className="text-3xl">{product.title}</h1>
			<p>{product.description}</p>
			<p>Rating: {product.rating}</p>
			<p>Price: {product.price}</p>
			<p>Category: {product.category}</p>
			<p>Minimum Order Quantity: {product.minimumOrderQuantity}</p>
		</div>
	);
}
