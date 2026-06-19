import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { CourierConfig, ShippingGuia, ShippingOrder } from "./interface";
import { ShippingKiosk } from "./ShippingKiosk";

// ── Courier configs ──────────────────────────────────────

const DHL: CourierConfig = {
	id: "dhl",
	name: "DHL",
	bg: "#FFCC00",
	fg: "#3a2f00",
	accent: "#D40511",
};
const FEDEX: CourierConfig = {
	id: "fedex",
	name: "FedEx",
	bg: "#4D148C",
	fg: "#ffffff",
	accent: "#FF6600",
};
const ESTAFETA: CourierConfig = {
	id: "estafeta",
	name: "Estafeta",
	bg: "#E40520",
	fg: "#ffffff",
	accent: "#0a3a8c",
};
const PAQUETEXPRESS: CourierConfig = {
	id: "paquetexpress",
	name: "Paquetexpress",
	bg: "#1f2937",
	fg: "#ffffff",
	accent: "#E2231A",
};

// ── Mock helpers ─────────────────────────────────────────

let _seq = 4180;
function makeTracking(courier: CourierConfig): string {
	_seq += 7;
	return `${courier.id.slice(0, 3).toUpperCase()}${String(_seq).padStart(6, "0")}MX`;
}

function makeGuia(
	courier: CourierConfig,
	box: number,
	minutesAgo: number,
	status: ShippingGuia["status"] = "impresa",
): ShippingGuia {
	return {
		id: `g${Math.random().toString(36).slice(2, 8)}`,
		tracking: status === "pendiente" ? "" : makeTracking(courier),
		box,
		ts: Date.now() - minutesAgo * 60_000,
		status,
	};
}

const INITIAL_ORDERS: ShippingOrder[] = [
	{
		folio: "10482",
		cliente: "María Hernández López",
		ciudad: "Guadalajara, JAL",
		courier: ESTAFETA,
		sugeridas: 3,
		guias: [makeGuia(ESTAFETA, 1, 42)],
	},
	{
		folio: "10483",
		cliente: "Carlos Ramírez Soto",
		ciudad: "Monterrey, NL",
		courier: DHL,
		sugeridas: 2,
		guias: [],
	},
	{
		folio: "10485",
		cliente: "Ana Gabriela Torres",
		ciudad: "CDMX",
		courier: FEDEX,
		sugeridas: 1,
		guias: [makeGuia(FEDEX, 1, 96)],
	},
	{
		folio: "10487",
		cliente: "Restaurante El Fogón S.A.",
		ciudad: "Puebla, PUE",
		courier: PAQUETEXPRESS,
		sugeridas: 5,
		guias: [
			makeGuia(PAQUETEXPRESS, 1, 130),
			makeGuia(PAQUETEXPRESS, 2, 128),
			makeGuia(PAQUETEXPRESS, 3, 5, "pendiente"),
		],
	},
	{
		folio: "10490",
		cliente: "Jorge Mendoza Ruiz",
		ciudad: "Querétaro, QRO",
		courier: DHL,
		sugeridas: 2,
		guias: [],
	},
	{
		folio: "10491",
		cliente: "Farmacia Vida S.A. de C.V.",
		ciudad: "Mérida, YUC",
		courier: ESTAFETA,
		sugeridas: 4,
		guias: [
			makeGuia(ESTAFETA, 1, 220),
			makeGuia(ESTAFETA, 2, 219),
			makeGuia(ESTAFETA, 3, 218),
			makeGuia(ESTAFETA, 4, 215),
		],
	},
];

// ── Interactive wrapper ──────────────────────────────────

function KioskDemo({
	layout,
	brandName = "cajui",
	logoUrl,
	themeColor,
}: {
	layout: "keypad" | "list";
	brandName?: string;
	logoUrl?: string;
	themeColor?: string;
}) {
	const [orders, setOrders] = useState<ShippingOrder[]>(INITIAL_ORDERS);

	const handlePrint = (folio: string, boxes: number[]) => {
		setOrders((prev) =>
			prev.map((o) => {
				if (o.folio !== folio) return o;
				const existingByBox = new Map(o.guias.map((g) => [g.box, g]));
				const newGuias: ShippingGuia[] = [
					...o.guias.filter((g) => !boxes.includes(g.box)),
					...boxes.map((b, i) => {
						const existing = existingByBox.get(b);
						if (existing?.status === "pendiente") {
							return makeGuia(o.courier, b, 0, "impresa");
						}
						return makeGuia(
							o.courier,
							b,
							0,
							i % 3 === 2 ? "pendiente" : "impresa",
						);
					}),
				];
				newGuias.sort((a, b) => a.box - b.box);
				return { ...o, guias: newGuias };
			}),
		);
	};

	const handleReprint = (folio: string, guiaId: string) => {
		setOrders((prev) =>
			prev.map((o) => {
				if (o.folio !== folio) return o;
				return {
					...o,
					guias: o.guias.map((g) =>
						g.id === guiaId
							? { ...g, status: "reimpresa" as const, ts: Date.now() }
							: g,
					),
				};
			}),
		);
	};

	return (
		<ShippingKiosk
			orders={orders}
			onPrint={handlePrint}
			onReprint={handleReprint}
			layout={layout}
			station="Estación de empaque · L4"
			brandName={brandName}
			logoUrl={logoUrl}
			themeColor={themeColor}
			className="min-h-screen"
		/>
	);
}

// ── Storybook meta ───────────────────────────────────────

const meta: Meta<typeof ShippingKiosk> = {
	title: "Kiosk / ShippingKiosk",
	component: ShippingKiosk,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"Kiosko táctil para impresión de guías de envío. Diseñado para tablet y móvil. Compuesto con atoms cajui (GlassPanel, Branding, Button, Icon, NumPad, QuantityControl) + CourierChip. Soporta dos variantes de layout: teclado numérico (folio) y lista de órdenes con cuadrícula de cajas. Las paqueterías que generan pre-guías muestran estado `pendiente` hasta confirmar impresión.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof ShippingKiosk>;

export const Keypad: Story = {
	name: "Layout A · Teclado numérico",
	render: () => <KioskDemo layout="keypad" />,
};

export const Lista: Story = {
	name: "Layout B · Lista de órdenes",
	render: () => <KioskDemo layout="list" />,
};

export const BrandPersonalizado: Story = {
	name: "Marca personalizada",
	render: () => (
		<KioskDemo layout="list" brandName="Envíos MX" themeColor="#7c3aed" />
	),
};

export const TemaAmalliLight: Story = {
	name: "Tema · Amalli Light",
	parameters: {
		backgrounds: { default: "amalli-light" },
	},
	render: () => <KioskDemo layout="list" />,
};

export const TemaAmalliDark: Story = {
	name: "Tema · Amalli Dark",
	parameters: {
		backgrounds: { default: "amalli-dark" },
	},
	render: () => <KioskDemo layout="list" />,
};

export const TemaAccessibleLight: Story = {
	name: "Tema · Accessible Light",
	parameters: {
		backgrounds: { default: "accessible-light" },
	},
	render: () => <KioskDemo layout="list" />,
};

export const TemaAccessibleDark: Story = {
	name: "Tema · Accessible Dark",
	parameters: {
		backgrounds: { default: "accessible-dark" },
	},
	render: () => <KioskDemo layout="list" />,
};
