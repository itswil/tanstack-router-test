import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { productsQueries } from "~/queries/products";
import type { ProductResponse } from "~/types/product";

export const Route = createFileRoute("/products/$id_/edit")({
	loader: ({ context: { queryClient }, params }) => {
		queryClient.prefetchQuery(productsQueries.detail(params.id));
	},
	component: Edit,
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

function Edit() {
	const { id } = Route.useParams();
	const productQuery = useSuspenseQuery(productsQueries.detail(id));
	const product = productQuery.data;

	const productMutation = useMutation({
		mutationFn: (productData: Partial<ProductResponse>) => {
			return fetch(`https://dummyjson.com/products/${id}`, {
				method: "PUT",
				body: JSON.stringify(productData),
				headers: {
					"Content-Type": "application/json",
				},
			});
		},
	});

	const handleSubmit = (formData) => {
		const userData = Object.fromEntries(formData);

		productMutation.mutate(userData, {
			onSuccess: () => {
				alert("Product updated successfully!");
				formData.reset();
			},
		});
	};

	return (
		<div className="p-4 bg-opacity-20 bg-slate-300 rounded-xl">
			<h1 className="text-3xl">Edit: {product.title}</h1>
			<form action={handleSubmit}>
				<input type="text" name="title" value={product.title} />
				<input type="text" name="description" value={product.description} />
				<input type="text" name="price" value={product.price} />
				<input type="text" name="category" value={product.category} />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
