import type { Product } from "@/molecules/ProductCard/ProductCard";

export interface ItemSizeOption {
	id: string;
	label: string;
	extraPrice: number;
	volumeLabel?: string; // e.g. "12 oz", "16 oz"
	scale: number; // SVG scale factor, e.g. 0.8, 1.0, 1.2
}

export interface CustomizerItemOption {
	id: string;
	label: string;
	extraPrice: number;
	defaultSelected?: boolean;
}

export interface CustomizerModifierGroup {
	id: string;
	label: string;
	type: "select" | "slider" | "checklist";
	options: CustomizerItemOption[];
	// For slider type: e.g. min, max, default value (e.g. 0 to 4 notches of sweetness)
	sliderLabels?: string[];
}

export interface ItemCustomizerProps {
	product: Product;
	sizes?: ItemSizeOption[];
	modifiers?: CustomizerModifierGroup[];
	currency?: string;
	locale?: string;
	onConfirm?: (selection: {
		product: Product;
		size: ItemSizeOption;
		selections: Record<string, string | string[] | number>; // groupID -> selection
		totalPrice: number;
	}) => void;
	onCancel?: () => void;
	className?: string;
}
