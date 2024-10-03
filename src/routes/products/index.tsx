import { createFileRoute, Link } from "@tanstack/react-router";

type ProductReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
};
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: Array<string>;
  brand: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Array<ProductReview>;
  returnPolicy: string;
  minimumOrderQuantity: number;
  images: string[];
};
type ProductsResponse = {
  products: Array<Product>;
  total: number;
  skip: number;
  limit: number;
};

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
            <Link to={`/products/$id`} params={{ id: `${product.id}` }}>
              {product.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
