import type { Meta, StoryObj } from "@storybook/react-vite";
import { PriceDisplay } from "./PriceDisplay";

const meta: Meta<typeof PriceDisplay> = {
	title: "Atoms/PriceDisplay",
	component: PriceDisplay,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					'Displays a formatted monetary value. Supports MXN, USD, EUR and any ISO 4217 currency. Use `size="2xl"` for the main total in checkout.',
			},
		},
	},
	argTypes: {
		value: { control: "number" },
		currency: {
			control: "select",
			options: ["MXN", "USD", "EUR", "COP", "ARS"],
		},
		size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl"] },
		variant: {
			control: "select",
			options: ["default", "positive", "negative", "muted", "highlight"],
		},
	},
};

export default meta;
type Story = StoryObj<typeof PriceDisplay>;

export const Default: Story = {
	args: { value: 1299.99, currency: "MXN" },
};

export const Total: Story = {
	name: "Total (checkout)",
	args: { value: 4850.0, currency: "MXN", size: "2xl", variant: "highlight" },
};

export const Discount: Story = {
	name: "Precio con descuento",
	render: () => (
		<div className="flex items-center gap-3">
			<PriceDisplay
				value={1499.99}
				currency="MXN"
				size="md"
				variant="muted"
				strikethrough
			/>
			<PriceDisplay
				value={999.99}
				currency="MXN"
				size="lg"
				variant="positive"
			/>
		</div>
	),
};

export const Negative: Story = {
	name: "Saldo negativo / descuento",
	args: { value: -250.0, currency: "MXN", variant: "negative" },
};

export const USD: Story = {
	args: { value: 59.99, currency: "USD", locale: "en-US" },
};
