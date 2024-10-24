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

type ProductReview = {
	rating: number;
	comment: string;
	date: string;
	reviewerName: string;
};

export type ProductResponse = {
	id: number;
	title: string;
	description: string;
	thumbnail?: string;
	rating: number;
	price: number;
	category: string;
	minimumOrderQuantity: number;
};

export type ProductsResponse = {
	products: Array<Product>;
	total: number;
	skip: number;
	limit: number;
};
