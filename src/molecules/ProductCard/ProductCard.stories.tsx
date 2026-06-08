import type { Meta, StoryObj } from "@storybook/react-vite";
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
