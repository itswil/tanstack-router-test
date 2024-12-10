import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
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
	const queryClient = useQueryClient();
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
				queryClient.invalidateQueries({
					queryKey: productsQueries.all(),
				});
			},
		});
	};

	return (
		<div className="p-4 bg-opacity-20 bg-slate-300 rounded-xl">
			<h1 className="text-3xl">Edit: {product.title}</h1>
			<form action={handleSubmit}>
				<div className="mb-4">
					<label htmlFor="title">Title</label>
					<br />
					<input
						type="text"
						name="title"
						className="w-full"
						value={product.title}
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="description">Description</label>
					<br />
					<input
						type="text"
						name="description"
						className="w-full"
						value={product.description}
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="price">Price</label>
					<br />
					<input
						type="text"
						name="price"
						className="w-full"
						value={product.price}
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="category">Category</label>
					<br />
					<input
						type="text"
						name="category"
						className="w-full"
						value={product.category}
					/>
				</div>

				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
