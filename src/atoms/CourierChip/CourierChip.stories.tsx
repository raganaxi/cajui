import type { Meta, StoryObj } from "@storybook/react-vite";
import { CourierChip } from "./CourierChip";
import type { CourierConfig } from "./CourierChip";

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

const meta: Meta<typeof CourierChip> = {
	title: "Atoms / CourierChip",
	component: CourierChip,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className="flex flex-wrap gap-3 p-6">
				<Story />
			</div>
		),
	],
	parameters: {
		docs: {
			description: {
				component:
					"Chip de marca para paqueterías. Usa los colores oficiales de cada carrier para identificación visual rápida.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof CourierChip>;

export const Default: Story = {
	args: { courier: DHL, size: "md" },
};

export const AllCarriers: Story = {
	name: "Todos los carriers",
	render: () => (
		<div className="flex flex-col gap-6 p-6">
			{[DHL, FEDEX, ESTAFETA, PAQUETEXPRESS].map((c) => (
				<div key={c.id} className="flex items-center gap-4">
					<CourierChip courier={c} size="sm" />
					<CourierChip courier={c} size="md" />
					<CourierChip courier={c} size="lg" />
				</div>
			))}
		</div>
	),
};
