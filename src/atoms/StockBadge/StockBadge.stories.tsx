import type { Meta, StoryObj } from "@storybook/react-vite";
import { StockBadge } from "./StockBadge";

const meta: Meta<typeof StockBadge> = {
	title: "Atoms/StockBadge",
	component: StockBadge,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Indicador visual de nivel de stock. Se calcula automáticamente a partir de `quantity`, `lowThreshold` y `outThreshold`.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof StockBadge>;

export const InStock: Story = { args: { quantity: 50 } };
export const LowStock: Story = {
	name: "Stock bajo",
	args: { quantity: 3, showCount: true },
};
export const OutOfStock: Story = { name: "Agotado", args: { quantity: 0 } };

export const AllStates: Story = {
	name: "Todos los estados",
	render: () => (
		<div className="flex flex-col gap-2">
			<StockBadge quantity={50} showCount />
			<StockBadge quantity={4} showCount />
			<StockBadge quantity={0} showCount />
		</div>
	),
};
