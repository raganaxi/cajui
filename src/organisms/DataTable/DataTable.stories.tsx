import type { Meta, StoryObj } from "@storybook/react-vite";
import { PriceDisplay } from "@/atoms/PriceDisplay";
import { StockBadge } from "@/atoms/StockBadge";
import { DataTable } from "./DataTable";

interface Product {
	id: string;
	sku: string;
	name: string;
	category: string;
	price: number;
	stock: number;
	cost: number;
}

const DATA: Product[] = Array.from({ length: 50 }, (_, i) => ({
	id: `p${i}`,
	sku: `SKU-${String(i + 1).padStart(4, "0")}`,
	name: [
		"Coca-Cola 600ml",
		"Sabritas 45g",
		"Agua Bonafont",
		"Gomitas Haribo",
		"Jugo Del Valle",
	][i % 5],
	category: ["Bebidas", "Botanas", "Bebidas", "Dulces", "Bebidas"][i % 5],
	price: [18.5, 15, 12, 22, 14][i % 5],
	stock: Math.floor(Math.random() * 50),
	cost: [10, 8, 7, 14, 9][i % 5],
}));

const meta: Meta<typeof DataTable<Product>> = {
	title: "ERP / DataTable",
	component: DataTable,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"Tabla de datos ERP con búsqueda, ordenamiento y paginación. Soporta renderizado personalizado por columna.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof DataTable<Product>>;

export const Inventory: Story = {
	name: "Inventario de productos",
	render: () => (
		<div className="p-4">
			<DataTable
				data={DATA}
				rowKey="id"
				searchable
				searchPlaceholder="Buscar producto, SKU…"
				columns={[
					{
						key: "sku",
						header: "SKU",
						sortable: true,
						width: "120px",
						render: (v) => (
							<span className="font-mono text-xs">{String(v)}</span>
						),
					},
					{ key: "name", header: "Producto", sortable: true },
					{ key: "category", header: "Categoría", sortable: true },
					{
						key: "price",
						header: "Precio",
						align: "right",
						sortable: true,
						render: (v) => (
							<PriceDisplay value={Number(v)} size="sm" variant="highlight" />
						),
					},
					{
						key: "cost",
						header: "Costo",
						align: "right",
						render: (v) => (
							<PriceDisplay value={Number(v)} size="sm" variant="muted" />
						),
					},
					{
						key: "stock",
						header: "Stock",
						align: "center",
						sortable: true,
						render: (v) => <StockBadge quantity={Number(v)} showCount />,
					},
				]}
				onRowClick={(row) => console.log("row", row)}
			/>
		</div>
	),
};

export const Loading: Story = {
	args: {
		data: [],
		rowKey: "id",
		columns: [
			{ key: "name", header: "Nombre" },
			{ key: "price", header: "Precio" },
		],
		loading: true,
	},
};

// Interface and mock data for B2B Client Management Story
interface ClientRow {
	id: string;
	empresa: string;
	contacto: string;
	rfc: string;
	tipo: "local" | "dropshipping";
	vendedor: string;
	status: "A" | "I";
}

const B2B_CLIENTS_DATA: ClientRow[] = [
	{
		id: "c1",
		empresa: "Persianas DecoHogar",
		contacto: "Carlos Mendoza",
		rfc: "MEDC850712HN5",
		tipo: "local",
		vendedor: "Alejandro Ruiz",
		status: "A",
	},
	{
		id: "c2",
		empresa: "Instalaciones Regias",
		contacto: "Sofía Villarreal",
		rfc: "INRE901103M24",
		tipo: "dropshipping",
		vendedor: "Diana Gómez",
		status: "A",
	},
	{
		id: "c3",
		empresa: "Persianistas Asociados",
		contacto: "Manuel Torres",
		rfc: "PTAS780415A52",
		tipo: "local",
		vendedor: "Sin asignar",
		status: "I",
	},
	{
		id: "c4",
		empresa: "Diseño & Cortinas CDMX",
		contacto: "Gabriela Luna",
		rfc: "DICD8809099J1",
		tipo: "dropshipping",
		vendedor: "Alejandro Ruiz",
		status: "A",
	},
];

export const B2BClientManagement = {
	name: "B2B - Gestión de Clientes",
	render: () => (
		<div className="p-4 space-y-3 bg-[#111827] rounded-2xl border border-white/10 text-white">
			<div className="flex justify-between items-center px-2">
				<div>
					<h3 className="text-lg font-bold">Clientes Registrados (B2B/B2C)</h3>
					<p className="text-xs text-white/50">
						Asignación de asesores comerciales y controles de acceso
					</p>
				</div>
			</div>
			<DataTable<ClientRow>
				data={B2B_CLIENTS_DATA}
				rowKey="id"
				searchable
				searchPlaceholder="Buscar por empresa, contacto o RFC..."
				columns={[
					{
						key: "empresa",
						header: "Empresa",
						sortable: true,
						render: (v, row) => (
							<div>
								<span className="font-bold text-white block">{String(v)}</span>
								<span className="text-xs text-white/50">{row.contacto}</span>
							</div>
						),
					},
					{
						key: "rfc",
						header: "RFC",
						render: (v) => (
							<code className="font-mono text-xs bg-white/5 px-2 py-0.5 rounded border border-white/10 text-white/70">
								{String(v)}
							</code>
						),
					},
					{
						key: "tipo",
						header: "Tipo",
						sortable: true,
						render: (v) => (
							<span
								className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
									v === "dropshipping"
										? "bg-purple-500/10 border-purple-500/30 text-purple-300"
										: "bg-blue-500/10 border-blue-500/30 text-blue-300"
								}`}
							>
								{String(v).toUpperCase()}
							</span>
						),
					},
					{
						key: "vendedor",
						header: "Asesor Asignado",
						sortable: true,
						render: (v) => (
							<span
								className={
									v === "Sin asignar"
										? "text-orange-400 font-semibold italic text-xs"
										: "text-white/80 text-sm"
								}
							>
								{String(v)}
							</span>
						),
					},
					{
						key: "status",
						header: "Estado Cuenta",
						render: (v) => (
							<span
								className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold ${
									v === "A"
										? "bg-green-500/15 text-green-400 border border-green-500/30"
										: "bg-red-500/15 text-red-400 border border-red-500/30"
								}`}
							>
								<span
									className={`h-1.5 w-1.5 rounded-full ${v === "A" ? "bg-green-400" : "bg-red-400"}`}
								/>
								{v === "A" ? "Activo" : "Inactivo"}
							</span>
						),
					},
					{
						key: "acciones",
						header: "Acciones",
						align: "right",
						render: (_, row) => (
							<div className="flex gap-2 justify-end">
								<button
									type="button"
									onClick={() =>
										alert(`Reasignando vendedor para: ${row.empresa}`)
									}
									className="px-2.5 py-1 text-xs rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-white/80 transition-colors"
								>
									Reasignar Asesor
								</button>
								<button
									type="button"
									onClick={() =>
										alert(`Cambiando estatus de cuenta para: ${row.empresa}`)
									}
									className={`px-2 py-1 text-xs rounded-lg border font-medium transition-colors ${
										row.status === "A"
											? "border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-300"
											: "border-green-500/30 bg-green-500/10 hover:bg-green-500/20 text-green-300"
									}`}
								>
									{row.status === "A" ? "Desactivar" : "Reactivar"}
								</button>
							</div>
						),
					},
				]}
			/>
		</div>
	),
};

// Interface and mock data for Pending Access Requests Story
interface RequestRow {
	id: string;
	nombre: string;
	empresa: string;
	email: string;
	telefono: string;
	fecha: string;
}

const PENDING_REQUESTS_DATA: RequestRow[] = [
	{
		id: "r1",
		nombre: "Juan Pérez",
		empresa: "Blinds & Co",
		email: "juan@blindsco.com",
		telefono: "8112345678",
		fecha: "2026-06-05",
	},
	{
		id: "r2",
		nombre: "Lucía Ortiz",
		empresa: "Decoraciones Lucy",
		email: "contacto@decolucy.com",
		telefono: "5543210987",
		fecha: "2026-06-07",
	},
	{
		id: "r3",
		nombre: "Pedro Gómez",
		empresa: "Suplementos Regios",
		email: "pedro@supregios.mx",
		telefono: "3311223344",
		fecha: "2026-06-08",
	},
];

export const PendingAccessRequests = {
	name: "B2B - Aprobación de Solicitudes",
	render: () => (
		<div className="p-4 space-y-3 bg-[#111827] rounded-2xl border border-white/10 text-white">
			<div>
				<h3 className="text-lg font-bold">Solicitudes de Acceso Pendientes</h3>
				<p className="text-xs text-white/50">
					Auto-registros de distribuidores esperando validación manual
				</p>
			</div>
			<DataTable<RequestRow>
				data={PENDING_REQUESTS_DATA}
				rowKey="id"
				searchable
				searchPlaceholder="Filtrar solicitudes..."
				columns={[
					{ key: "nombre", header: "Solicitante", sortable: true },
					{ key: "empresa", header: "Empresa", sortable: true },
					{ key: "email", header: "Email" },
					{ key: "telefono", header: "Teléfono" },
					{
						key: "fecha",
						header: "Fecha Registro",
						sortable: true,
						render: (v) => (
							<span className="text-white/60 text-xs">{String(v)}</span>
						),
					},
					{
						key: "acciones",
						header: "Acción de Acceso",
						align: "right",
						render: (_, row) => (
							<div className="flex gap-2 justify-end">
								<button
									type="button"
									onClick={() =>
										alert(
											`Aprobada solicitud de: ${row.nombre} (${row.empresa}). Se enviará invitación de contraseña.`,
										)
									}
									className="px-3 py-1 text-xs rounded-lg font-bold border border-green-500/30 bg-green-500/20 hover:bg-green-500/30 text-green-300 transition-colors"
								>
									Aprobar Distribuidor
								</button>
								<button
									type="button"
									onClick={() =>
										alert(
											`Rechazada solicitud de: ${row.nombre} (${row.empresa})`,
										)
									}
									className="px-2 py-1 text-xs rounded-lg font-medium border border-white/10 hover:bg-white/10 text-white/60 transition-colors"
								>
									Rechazar
								</button>
							</div>
						),
					},
				]}
			/>
		</div>
	),
};
