import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { type Product, ProductCard } from "./ProductCard";

const SAMPLE: Product = {
	id: "prod-1",
	name: "Refresco Coca-Cola 600ml",
	price: 18.5,
	sku: "COC-600",
	stock: 24,
	category: "Bebidas",
};

const LOW_STOCK: Product = {
	...SAMPLE,
	id: "prod-2",
	stock: 3,
	name: "Agua Bonafont 1L",
	price: 12.0,
	sku: "BON-1L",
};
const OUT: Product = {
	...SAMPLE,
	id: "prod-3",
	stock: 0,
	name: "Sabritas Original 45g",
	price: 15.0,
	sku: "SAB-45",
};

const meta: Meta<typeof ProductCard> = {
	title: "POS / ProductCard",
	component: ProductCard,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"Tarjeta de producto para la cuadrícula de selección del POS y catálogo. Soporta layout `grid` y `list`, y visualización interactiva de variantes de producto (e.g. colores o materiales).",
			},
		},
	},
};

const PRODUCT_WITH_VARIANTS: Product = {
	id: "prod-variants",
	name: "Persiana Enrollable",
	price: 350,
	sku: "PER-ENR",
	stock: 15,
	category: "Persianas",
	variants: [
		{ id: "v1", name: "Translúcida Blanca", colorHex: "#FFFFFF", price: 350 },
		{ id: "v2", name: "Translúcida Gris", colorHex: "#808080", price: 370 },
		{ id: "v3", name: "Black-out Negro", colorHex: "#1A1A1A", price: 420 },
		{ id: "v4", name: "Premium Sheer Café", colorHex: "#5C4033", price: 480 },
	],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Grid: Story = {
	args: { product: SAMPLE },
	decorators: [
		(S) => (
			<div className="w-48">
				<S />
			</div>
		),
	],
};

export const List: Story = {
	args: { product: SAMPLE, layout: "list" },
	decorators: [
		(S) => (
			<div className="w-80">
				<S />
			</div>
		),
	],
};

export const WithVariantsGrid: Story = {
	name: "Con variantes (Grid)",
	args: { product: PRODUCT_WITH_VARIANTS },
	decorators: [
		(S) => (
			<div className="w-48">
				<S />
			</div>
		),
	],
};

export const WithVariantsList: Story = {
	name: "Con variantes (List)",
	args: { product: PRODUCT_WITH_VARIANTS, layout: "list" },
	decorators: [
		(S) => (
			<div className="w-96">
				<S />
			</div>
		),
	],
};

const Canvas = ({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<div className={`caj-panel p-6 rounded-2xl ${className}`}>{children}</div>
);

const SHOP_PRODUCT: Product = {
	id: "shop-1",
	name: "Persiana Roller Blackout",
	price: 890,
	description:
		"Persiana enrollable de alta calidad con tela blackout. Bloquea 100% la luz exterior.",
	category: "Persianas",
	stock: 12,
	features: ["Blackout 100%", "Instalación incluida"],
	variants: [
		{
			id: "s1",
			name: "Blanco Perla",
			colorHex: "#F5F0E8",
			price: 890,
		},
		{
			id: "s2",
			name: "Gris Plata",
			colorHex: "#8C8C8C",
			price: 920,
		},
		{
			id: "s3",
			name: "Negro Ónix",
			colorHex: "#1A1A1A",
			price: 960,
		},
		{
			id: "s4",
			name: "Beige Duna",
			colorHex: "#D4B896",
			price: 890,
		},
	],
};

export const ShopBasico: Story = {
	name: "Shop — Básico",
	render: () => (
		<Canvas className="w-72">
			<ProductCard
				product={SHOP_PRODUCT}
				layout="shop"
				onAdd={(p, v) => console.log("add", p.name, v?.name)}
			/>
		</Canvas>
	),
};

export const ShopConCalculadora: Story = {
	name: "Shop — Con Calculadora",
	render: () => {
		const [qty, setQty] = useState(2);
		const unitPrice = 890;
		return (
			<Canvas className="w-72 flex flex-col gap-4">
				<div className="flex items-center gap-3">
					<span className="text-sm text-white/60">Cantidad:</span>
					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => setQty(Math.max(1, qty - 1))}
							className="caj-btn-default w-8 h-8 rounded-lg font-bold text-lg flex items-center justify-center"
						>
							−
						</button>
						<span className="font-bold text-white w-8 text-center">{qty}</span>
						<button
							type="button"
							onClick={() => setQty(qty + 1)}
							className="caj-btn-primary w-8 h-8 rounded-lg font-bold text-lg flex items-center justify-center"
						>
							+
						</button>
					</div>
				</div>
				<ProductCard
					product={SHOP_PRODUCT}
					layout="shop"
					unitPrice={unitPrice}
					quantity={qty}
					onAdd={(p, v) => console.log("add", p.name, v?.name, "qty:", qty)}
				/>
			</Canvas>
		);
	},
};

export const ShopSinImagen: Story = {
	name: "Shop — Sin Imagen",
	render: () => (
		<Canvas className="w-72">
			<ProductCard
				product={{
					...SHOP_PRODUCT,
					image: undefined,
					name: "Cortina Plisada Premium",
					description:
						"Cortina plisada con acabado premium y sistema de guías.",
				}}
				layout="shop"
				onAdd={(p) => console.log("add", p.name)}
			/>
		</Canvas>
	),
};

export const ShopConVariantes: Story = {
	name: "Shop — Con Variantes de Tela",
	render: () => {
		const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
			undefined,
		);
		return (
			<Canvas className="w-72 flex flex-col gap-3">
				<ProductCard
					product={{
						...SHOP_PRODUCT,
						name: "Cortina Sheer Voile",
						description:
							"Cortina translúcida de voile con múltiples opciones de tela.",
						features: ["Translúcida", "Lavable"],
						variants: [
							{
								id: "t1",
								name: "Blanco Lino",
								colorHex: "#F5F0E8",
								price: 650,
							},
							{
								id: "t2",
								name: "Gris Perla",
								colorHex: "#BDBDBD",
								price: 680,
							},
							{
								id: "t3",
								name: "Azul Cielo",
								colorHex: "#90CAF9",
								price: 700,
							},
							{ id: "t4", name: "Rosa Nude", colorHex: "#F8BBD9", price: 650 },
							{ id: "t5", name: "Verde Sage", colorHex: "#A5D6A7", price: 670 },
						],
					}}
					layout="shop"
					onVariantChange={setSelectedVariant}
					onAdd={(p, v) => console.log("add", p.name, v?.name)}
				/>
				{selectedVariant && (
					<p className="text-xs text-white/40 text-center">
						Variante activa:{" "}
						<span className="text-white/70">{selectedVariant}</span>
					</p>
				)}
			</Canvas>
		);
	},
};

export const ProductGrid: Story = {
	name: "Grid de productos (demo POS)",
	render: () => (
		<div className="grid grid-cols-3 gap-3 p-4 w-[500px]">
			<ProductCard product={SAMPLE} onAdd={(p) => console.log("add", p)} />
			<ProductCard product={LOW_STOCK} onAdd={(p) => console.log("add", p)} />
			<ProductCard product={OUT} onAdd={(p) => console.log("add", p)} />
			<ProductCard
				product={{
					...SAMPLE,
					id: "p4",
					name: "Gomitas Haribo 80g",
					price: 22.0,
				}}
				onAdd={(p) => console.log("add", p)}
			/>
			<ProductCard
				product={{
					...SAMPLE,
					id: "p5",
					name: "Papas Ruffles 40g",
					price: 16.5,
					stock: 8,
				}}
				onAdd={(p) => console.log("add", p)}
			/>
			<ProductCard
				product={{
					...SAMPLE,
					id: "p6",
					name: "Jugo Del Valle 330ml",
					price: 14.0,
					stock: 0,
				}}
				onAdd={(p) => console.log("add", p)}
			/>
		</div>
	),
};
