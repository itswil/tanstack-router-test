import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

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

type GetProductsParams = {
  q: string;
};
async function getProducts({
  q,
}: GetProductsParams): Promise<ProductsResponse> {
  console.log(111, q);
  const response = await fetch(
    "https://dummyjson.com/products?" + new URLSearchParams({ q }),
  );
  return await response.json();
}

const productSearchParamsSchema = z.object({
  q: z.string().default(""),
});
type ProductSearchParams = z.infer<typeof productSearchParamsSchema>;

export const Route = createFileRoute("/products/search")({
  validateSearch: productSearchParamsSchema,
  loader: async ({ deps: { q } }) => {
    await getProducts({ q });
  },
  component: Search,
});

function Search() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const updateSearch = (name: keyof ProductSearchParams, value: unknown) => {
    navigate({ search: (prev) => ({ ...prev, [name]: value }) });
  };
  return (
    <div className="p-2">
      <h3>Search</h3>
      <input
        type="text"
        name="q"
        value={q}
        onChange={(e) => updateSearch("q", e.target.value)}
      />
    </div>
  );
}
