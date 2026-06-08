import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CartItemData } from "@/molecules/CartItem/CartItem";
import { CartSummary } from "./CartSummary";

const ITEMS: CartItemData[] = [
	{ id: "1", name: "Coca-Cola 600ml", price: 18.5, quantity: 3 },
	{ id: "2", name: "Sabritas 45g", price: 15.0, quantity: 2, discount: 10 },
	{ id: "3", name: "Agua Bonafont 1L", price: 12.0, quantity: 1 },
];

const meta: Meta<typeof CartSummary> = {
	title: "POS / CartSummary",
	component: CartSummary,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"Panel de totales del carrito. Calcula subtotal, descuento y IVA automáticamente. Incluye botón de cobro.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof CartSummary>;

export const Default: Story = {
	args: {
		items: ITEMS,
		onCheckout: (total) => alert(`Cobrar: $${total.toFixed(2)}`),
	},
	decorators: [
		(S) => (
			<div className="w-72">
				<S />
			</div>
		),
	],
};

export const WithIVA: Story = {
	name: "Con IVA 16%",
	args: { items: ITEMS, taxRate: 16, onCheckout: (t) => alert(t) },
	decorators: [
		(S) => (
			<div className="w-72">
				<S />
			</div>
		),
	],
};

export const WithDiscount: Story = {
	name: "Con descuento 15%",
	args: { items: ITEMS, discount: 15, onCheckout: (t) => alert(t) },
	decorators: [
		(S) => (
			<div className="w-72">
				<S />
			</div>
		),
	],
};

export const Empty: Story = {
	args: { items: [], onCheckout: (t) => alert(t) },
	decorators: [
		(S) => (
			<div className="w-72">
				<S />
			</div>
		),
	],
};
