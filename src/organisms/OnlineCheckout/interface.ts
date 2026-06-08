import type { CartItemData } from "@/molecules/CartItem/CartItem";

export interface ShippingMethodOption {
	id: string;
	label: string;
	price: number;
	duration?: string;
}

export interface OnlineCheckoutProps {
	items: CartItemData[];
	shippingMethods: ShippingMethodOption[];
	taxRate?: number;
	discount?: number;
	discountType?: "percent" | "fixed";
	currency?: string;
	locale?: string;
	onSubmitPayment: (formData: any) => void;
	onCancel?: () => void;
	className?: string;
}
