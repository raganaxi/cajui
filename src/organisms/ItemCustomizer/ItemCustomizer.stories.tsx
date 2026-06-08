import type { Meta, StoryObj } from "@storybook/react-vite";
import { ItemCustomizer } from "./ItemCustomizer";

const meta: Meta<typeof ItemCustomizer> = {
	title: "Kiosk / ItemCustomizer",
	component: ItemCustomizer,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Personalizador visual de productos estilo Cafenio. Renders en vaso SVG con escalado proporcional, sliders de endulzante, y checkboxes interactivos para toppings y leches.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof ItemCustomizer>;

export const Coffee: Story = {
	name: "Café Americano",
	args: {
		product: {
			id: "p-cafe",
			name: "Café Americano Caliente",
			price: 32.0,
			description:
				"Café de grano recién molido de tueste oscuro con agua caliente.",
		},
		onConfirm: (data) => {
			alert(
				`Confirmado: ${data.product.name} (${data.size.label}) - Total: ${data.totalPrice.toFixed(2)}`,
			);
		},
		onCancel: () => alert("Personalización cancelada"),
	},
};

export const Frappuccino: Story = {
	name: "Frapuccino de Caramelo",
	args: {
		product: {
			id: "p-frap",
			name: "Frapuccino de Caramelo",
			price: 52.0,
			description:
				"Bebida helada de café frappe con jarabe de caramelo y chispas.",
		},
		modifiers: [
			{
				id: "sweetness",
				label: "Endulzante / Jarabe",
				type: "slider" as const,
				sliderLabels: ["Sin Dulce", "Ligero", "Regular", "Doble Jarabe"],
				options: [
					{ id: "0", label: "Sin Dulce", extraPrice: 0 },
					{ id: "1", label: "Ligero", extraPrice: 0 },
					{ id: "2", label: "Regular", extraPrice: 0, defaultSelected: true },
					{ id: "3", label: "Doble Jarabe", extraPrice: 6 },
				],
			},
			{
				id: "milk",
				label: "Tipo de Leche",
				type: "select" as const,
				options: [
					{
						id: "whole",
						label: "Leche Entera",
						extraPrice: 0,
						defaultSelected: true,
					},
					{ id: "skim", label: "Leche Deslactosada Light", extraPrice: 5 },
					{ id: "almond", label: "Bebida de Almendra", extraPrice: 10 },
					{ id: "coconut", label: "Bebida de Coco", extraPrice: 12 },
				],
			},
			{
				id: "extras",
				label: "Toppings & Cobertura",
				type: "checklist" as const,
				options: [
					{
						id: "whip",
						label: "Crema Batida Extra",
						extraPrice: 8,
						defaultSelected: true,
					},
					{
						id: "caramel",
						label: "Doble Caramelo Drizzle",
						extraPrice: 7,
						defaultSelected: true,
					},
					{ id: "shot", label: "Espresso Double Shot", extraPrice: 16 },
				],
			},
		],
		onConfirm: (data) => console.log("Confirm:", data),
	},
};
