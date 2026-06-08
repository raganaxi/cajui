import type { Product } from "@/molecules/ProductCard/ProductCard";

export interface POSLayoutProps {
	catalog?: Product[];
	taxRate?: number;
	currency?: string;
	locale?: string;
	className?: string;
}
