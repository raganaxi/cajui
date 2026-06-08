import type { Meta, StoryObj } from "@storybook/react-vite";
import { CashCalculator } from "./CashCalculator";

const meta: Meta<typeof CashCalculator> = {
	title: "POS / CashCalculator",
	component: CashCalculator,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Calculadora de cambio con desglose de billetes/monedas. Muestra los billetes exactos a regresar al cliente.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof CashCalculator>;

export const Default: Story = {
	args: {
		total: 148.5,
		currency: "MXN",
		onConfirm: (tendered, change) =>
			alert(`Cobrado: $${tendered} | Cambio: $${change}`),
	},
	decorators: [
		(S) => (
			<div className="w-80 p-4">
				<S />
			</div>
		),
	],
};

export const HighAmount: Story = {
	name: "Monto alto ($4,850)",
	args: {
		total: 4850,
		currency: "MXN",
		onConfirm: (t, c) => console.log(t, c),
	},
	decorators: [
		(S) => (
			<div className="w-80 p-4">
				<S />
			</div>
		),
	],
};
