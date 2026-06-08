import type { Meta, StoryObj } from "@storybook/react-vite";
import { PriceDisplay } from "@/atoms/PriceDisplay";
import { StockBadge } from "@/atoms/StockBadge";
import { Table } from "./Table";

const meta: Meta<typeof Table> = {
	title: "ERP / Table (Atómico)",
	component: Table,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"Componente de tabla compuesto a bajo nivel. Permite el control manual completo del marcado y estructura HTML conservando los estilos cajui.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof Table>;

const MOCK_DATA = [
	{
		id: "0001",
		name: "Coca-Cola 600ml",
		category: "Bebidas",
		price: 18.5,
		stock: 45,
	},
	{
		id: "0002",
		name: "Sabritas Sal 45g",
		category: "Botanas",
		price: 15.0,
		stock: 12,
	},
	{
		id: "0003",
		name: "Gomitas Panda 100g",
		category: "Dulces",
		price: 22.0,
		stock: 0,
	},
];

export const Composed: Story = {
	name: "Composición básica",
	render: () => (
		<div className="p-4">
			<Table.Container>
				<Table>
					<Table.Header>
						<Table.Row hover={false}>
							<Table.HeadCell>SKU</Table.HeadCell>
							<Table.HeadCell>Producto</Table.HeadCell>
							<Table.HeadCell>Categoría</Table.HeadCell>
							<Table.HeadCell align="right">Precio</Table.HeadCell>
							<Table.HeadCell align="center">Stock</Table.HeadCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{MOCK_DATA.map((row) => (
							<Table.Row key={row.id}>
								<Table.Cell className="font-mono text-xs text-white/50">
									{row.id}
								</Table.Cell>
								<Table.Cell className="font-semibold">{row.name}</Table.Cell>
								<Table.Cell>{row.category}</Table.Cell>
								<Table.Cell align="right">
									<PriceDisplay
										value={row.price}
										size="sm"
										variant="highlight"
									/>
								</Table.Cell>
								<Table.Cell align="center">
									<StockBadge quantity={row.stock} showCount />
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</Table.Container>
		</div>
	),
};

export const StripedAndCompact: Story = {
	name: "Compacto y Zebra",
	render: () => (
		<div className="p-4">
			<Table.Container>
				<Table compact>
					<Table.Header>
						<Table.Row hover={false}>
							<Table.HeadCell>Producto</Table.HeadCell>
							<Table.HeadCell align="right">Precio</Table.HeadCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{Array.from({ length: 6 }).map((_, i) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: story static rows
							<Table.Row key={i} striped={i % 2 === 1}>
								<Table.Cell>Producto de prueba {i + 1}</Table.Cell>
								<Table.Cell align="right">
									<PriceDisplay value={(i + 1) * 12.5} size="sm" />
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</Table.Container>
		</div>
	),
};
