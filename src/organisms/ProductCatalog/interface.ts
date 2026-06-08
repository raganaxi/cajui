import type { Product, ProductVariant } from "@/molecules/ProductCard/ProductCard";

export interface CatalogFilterGroup {
	id: string;
	label: string;
	options: { value: string; label: string; count?: number }[];
}

export interface ProductCatalogProps {
	products: Product[];
	categories?: string[];
	filterGroups?: CatalogFilterGroup[];
	onAddProduct: (product: Product, selectedVariant?: ProductVariant) => void;
	currency?: string;
	locale?: string;
	className?: string;
}
