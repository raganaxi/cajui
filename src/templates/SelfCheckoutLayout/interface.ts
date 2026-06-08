import type { Product } from "@/molecules/ProductCard/ProductCard";

export interface SelfCheckoutLayoutProps {
	catalog?: Product[];
	alcoholSkus?: string[];
	taxRate?: number;
	currency?: string;
	locale?: string;
	className?: string;
}
