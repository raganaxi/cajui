import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Product } from "@/molecules/ProductCard/ProductCard";
import type { CatalogFilterGroup } from "./interface";
import { ProductCatalog } from "./ProductCatalog";

const MOCK_PRODUCTS: Product[] = [
	{
		id: "p1",
		name: "Persiana Enrollable Basic",
		price: 280,
		sku: "PER-ENR-BSC",
		category: "Enrollables",
		description:
			"Persiana enrollable ideal para oficinas y recámaras. Control de luz estándar.",
		stock: 20,
		variants: [
			{ id: "v1-1", name: "Gris Claro", colorHex: "#D3D3D3", price: 280 },
			{ id: "v1-2", name: "Blanco Off-white", colorHex: "#FAF9F6", price: 280 },
			{ id: "v1-3", name: "Beige Cálido", colorHex: "#F5F5DC", price: 295 },
		],
	},
	{
		id: "p2",
		name: "Persiana Enrollable Blackout Premium",
		price: 450,
		sku: "PER-ENR-BO",
		category: "Enrollables",
		description:
			"Bloqueo total de luz 100% blackout. Ideal para recámaras y salas de proyección.",
		stock: 15,
		variants: [
			{ id: "v2-1", name: "Negro Absoluto", colorHex: "#0D0D0D", price: 450 },
			{ id: "v2-2", name: "Gris Carbón", colorHex: "#36454F", price: 450 },
			{ id: "v2-3", name: "Blanco Absoluto", colorHex: "#FFFFFF", price: 470 },
		],
	},
	{
		id: "p3",
		name: "Persiana Sheer Elegance",
		price: 650,
		sku: "PER-SHR-ELG",
		category: "Sheer Elegance",
		description:
			"Doble tejido con franjas translúcidas y opacas para un control de luz dinámico.",
		stock: 8,
		variants: [
			{ id: "v3-1", name: "Chocolate Swatch", colorHex: "#5C4033", price: 650 },
			{ id: "v3-2", name: "Arena Natural", colorHex: "#E1A95F", price: 650 },
			{ id: "v3-3", name: "Gris Plata", colorHex: "#C0C0C0", price: 680 },
		],
	},
	{
		id: "p4",
		name: "Persiana Romana Texturizada",
		price: 520,
		sku: "PER-ROM-TXT",
		category: "Romanas",
		description:
			"Persiana romana con pliegues suaves de tela texturizada premium.",
		stock: 12,
		variants: [
			{ id: "v4-1", name: "Lino Gris", colorHex: "#B0C4DE", price: 520 },
			{ id: "v4-2", name: "Lino Crema", colorHex: "#FFFDD0", price: 520 },
		],
	},
	{
		id: "p5",
		name: "Proteína Whey Premium 1kg",
		price: 790,
		sku: "SP-WPR-1K",
		category: "Suplementos",
		description: "Proteína de suero de leche aislada de rápida absorción.",
		stock: 50,
		variants: [
			{ id: "v5-1", name: "Chocolate Belga", colorHex: "#7B3F00", price: 790 },
			{
				id: "v5-2",
				name: "Vainilla Francesa",
				colorHex: "#F3E5AB",
				price: 790,
			},
			{ id: "v5-3", name: "Fresa Silvestre", colorHex: "#DE5D83", price: 810 },
		],
	},
	{
		id: "p6",
		name: "Creatina Monohidratada 500g",
		price: 450,
		sku: "SP-CRT-500",
		category: "Suplementos",
		description:
			"Creatina monohidratada 100% pura micronizada para fuerza y volumen.",
		stock: 35,
	},
];

const MOCK_FILTERS: CatalogFilterGroup[] = [
	{
		id: "telas",
		label: "Tipo de Tela / Material",
		options: [
			{ value: "Translúcida", label: "Translúcida", count: 4 },
			{ value: "Blackout", label: "Blackout", count: 3 },
			{ value: "Lino", label: "Lino Rústico", count: 2 },
			{ value: "Proteína", label: "Suplemento Proteico", count: 1 },
		],
	},
	{
		id: "colores",
		label: "Gamas de Color",
		options: [
			{ value: "Blanco", label: "Blancos & Cremas", count: 4 },
			{ value: "Gris", label: "Grises & Negros", count: 5 },
			{ value: "Chocolate", label: "Cafés & Chocolates", count: 2 },
		],
	},
];

const meta: Meta<typeof ProductCatalog> = {
	title: "Ecommerce / ProductCatalog",
	component: ProductCatalog,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"Catálogo de productos interactivo tipo Shopify. Incluye barra de búsqueda integrada, filtros por categoría (tabs), rango de precios, filtros dinámicos (checklists) y panel drawer adaptativo para dispositivos móviles.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof ProductCatalog>;

export const Default: Story = {
	args: {
		products: MOCK_PRODUCTS,
		filterGroups: MOCK_FILTERS,
		onAddProduct: (prod, variant) => {
			console.log("Añadido al carrito:", {
				producto: prod.name,
				sku: prod.sku,
				variante: variant ? variant.name : "Sin variante",
				precioFinal: variant?.price ?? prod.price,
			});
		},
	},
	decorators: [
		(S) => (
			<div className="caj-panel h-[650px] w-full p-4 rounded-3xl overflow-hidden flex flex-col">
				<S />
			</div>
		),
	],
};
