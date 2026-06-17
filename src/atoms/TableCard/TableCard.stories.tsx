import type { Meta, StoryObj } from "@storybook/react-vite";
import { TableCard, type TableData } from "./TableCard";

const meta: Meta<typeof TableCard> = {
	title: "Atoms/TableCard",
	component: TableCard,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Tarjeta interactiva que representa una mesa en el salón. Muestra número, capacidad, estatus y tiempo ocupado. Soporta formas square, round y rectangle.",
			},
		},
	},
	argTypes: {
		size: { control: "select", options: ["sm", "md", "lg"] },
	},
};

export default meta;
type Story = StoryObj<typeof TableCard>;

const sampleTable: TableData = {
	id: "t1",
	number: 4,
	capacity: 4,
	status: "available",
};

export const Default: Story = {
	args: { table: sampleTable },
};

export const AllStatuses: Story = {
	render: () => (
		<div className="p-6 rounded-3xl caj-panel flex flex-wrap gap-4">
			<TableCard
				table={{ id: "t1", number: 1, capacity: 4, status: "available" }}
			/>
			<TableCard
				table={{
					id: "t2",
					number: 2,
					capacity: 6,
					status: "occupied",
					guests: 4,
					timeSeated: "45 min",
				}}
			/>
			<TableCard
				table={{ id: "t3", number: 3, capacity: 2, status: "reserved" }}
			/>
			<TableCard
				table={{ id: "t4", number: 4, capacity: 4, status: "dirty" }}
			/>
			<TableCard
				table={{ id: "t5", number: 5, capacity: 8, status: "paying" }}
			/>
		</div>
	),
};

export const Shapes: Story = {
	render: () => (
		<div className="p-6 rounded-3xl caj-panel flex gap-4 items-center">
			<TableCard table={{ ...sampleTable, id: "s1" }} shape="square" />
			<TableCard table={{ ...sampleTable, id: "s2" }} shape="round" />
			<TableCard table={{ ...sampleTable, id: "s3" }} shape="rectangle" />
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div className="p-6 rounded-3xl caj-panel flex gap-4 items-end">
			<TableCard table={{ ...sampleTable, id: "sm" }} size="sm" />
			<TableCard table={{ ...sampleTable, id: "md" }} size="md" />
			<TableCard table={{ ...sampleTable, id: "lg" }} size="lg" />
		</div>
	),
};

export const SalonGrid: Story = {
	name: "Salón completo",
	render: () => (
		<div className="p-6 rounded-3xl caj-panel">
			<p className="text-white/50 text-xs font-pos mb-4">Sección A</p>
			<div className="grid grid-cols-4 gap-3">
				<TableCard
					table={{ id: "a1", number: 1, capacity: 2, status: "available" }}
				/>
				<TableCard
					table={{
						id: "a2",
						number: 2,
						capacity: 4,
						status: "occupied",
						guests: 3,
						timeSeated: "20 min",
					}}
				/>
				<TableCard
					table={{ id: "a3", number: 3, capacity: 4, status: "reserved" }}
				/>
				<TableCard
					table={{ id: "a4", number: 4, capacity: 6, status: "dirty" }}
				/>
				<TableCard
					table={{ id: "a5", number: 5, capacity: 2, status: "paying" }}
				/>
				<TableCard
					table={{ id: "a6", number: 6, capacity: 4, status: "available" }}
				/>
				<TableCard
					table={{
						id: "a7",
						number: 7,
						capacity: 8,
						status: "occupied",
						guests: 7,
						timeSeated: "1h 10m",
					}}
				/>
				<TableCard
					table={{ id: "a8", number: 8, capacity: 4, status: "available" }}
				/>
			</div>
		</div>
	),
};
