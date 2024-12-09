import { useSuspenseQuery } from "@tanstack/react-query";
import {
	Link,
	Outlet,
	createFileRoute,
	useRouter,
} from "@tanstack/react-router";
import { productsQueries } from "~/queries/products";

export const Route = createFileRoute("/products/$id")({
	loader: ({ context: { queryClient }, params }) => {
		queryClient.prefetchQuery(productsQueries.detail(params.id));
	},
	component: Product,
	pendingComponent: () => <div>Loading Product...</div>,
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
	const { id } = Route.useParams();
	const productQuery = useSuspenseQuery(productsQueries.detail(id));
	const product = productQuery.data;

	return (
		<div className="p-4 bg-opacity-20 bg-slate-300 rounded-xl">
			<Link to="/products/$id/edit" params={{ id: `${product.id}` }}>
				Edit
			</Link>
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
