import type { CourierConfig } from "@/atoms/CourierChip";

export type { CourierConfig };

export interface ShippingGuia {
	id: string;
	tracking: string;
	box: number;
	ts: number;
	status: "impresa" | "reimpresa" | "pendiente";
}

export interface ShippingOrder {
	folio: string;
	cliente: string;
	ciudad: string;
	courier: CourierConfig;
	sugeridas: number;
	guias: ShippingGuia[];
}

export interface ShippingKioskProps {
	orders: ShippingOrder[];
	onPrint?: (folio: string, boxes: number[]) => void;
	onReprint?: (folio: string, guiaId: string) => void;
	onUpdateBoxCount?: (folio: string, count: number) => void;
	layout?: "keypad" | "list";
	station?: string;
	brandName?: string;
	/** URL del logotipo de la empresa (se pasa al átomo Branding) */
	logoUrl?: string;
	/** Color primario de marca en hex, e.g. "#4f46e5" (se pasa al átomo Branding) */
	themeColor?: string;
	className?: string;
}
