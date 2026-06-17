import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataTable } from "@/organisms/DataTable";
import { RowActions } from "./RowActions";

const meta: Meta<typeof RowActions> = {
	title: "Molecules/RowActions",
	component: RowActions,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Menú desplegable de acciones compacto para celdas de tabla. Agrupa múltiples botones en un solo trigger para ahorrar espacio horizontal.",
			},
		},
	},
	argTypes: {
		size: { control: "select", options: ["xs", "sm"] },
		align: { control: "select", options: ["left", "right"] },
		disabled: { control: "boolean" },
	},
};

export default meta;
type Story = StoryObj<typeof RowActions>;

// ── Icons ────────────────────────────────────────────────────────────────────

const EditIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 16 16"
		fill="currentColor"
		className="w-3 h-3"
		aria-hidden="true"
	>
		<path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.815 2.126a.75.75 0 0 0 .966.966l2.126-.815a2.75 2.75 0 0 0 .892-.596l4.261-4.263a1.75 1.75 0 0 0 0-2.475ZM4.75 14.25a.75.75 0 0 1 0-1.5h6.5a.75.75 0 0 1 0 1.5h-6.5Z" />
	</svg>
);

const TrashIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 16 16"
		fill="currentColor"
		className="w-3 h-3"
		aria-hidden="true"
	>
		<path
			fillRule="evenodd"
			d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.712Z"
			clipRule="evenodd"
		/>
	</svg>
);

const UserIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 16 16"
		fill="currentColor"
		className="w-3 h-3"
		aria-hidden="true"
	>
		<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
	</svg>
);

const CheckIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 16 16"
		fill="currentColor"
		className="w-3 h-3"
		aria-hidden="true"
	>
		<path
			fillRule="evenodd"
			d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
			clipRule="evenodd"
		/>
	</svg>
);

const XIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 16 16"
		fill="currentColor"
		className="w-3 h-3"
		aria-hidden="true"
	>
		<path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
	</svg>
);

// ── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
	name: "Default — acciones básicas",
	args: {
		label: "Acciones",
		size: "sm",
		align: "right",
		items: [
			{
				key: "edit",
				label: "Editar",
				icon: EditIcon,
				onClick: () => alert("Editar"),
			},
			{
				key: "delete",
				label: "Eliminar",
				variant: "danger",
				icon: TrashIcon,
				onClick: () => alert("Eliminar"),
				separator: true,
			},
		],
	},
};

export const WithMany: Story = {
	name: "Muchas acciones",
	args: {
		label: "Acciones",
		size: "sm",
		items: [
			{ key: "view", label: "Ver detalles", onClick: () => {} },
			{ key: "edit", label: "Editar", icon: EditIcon, onClick: () => {} },
			{
				key: "reassign",
				label: "Reasignar asesor",
				icon: UserIcon,
				onClick: () => {},
				separator: true,
			},
			{
				key: "activate",
				label: "Activar cuenta",
				variant: "success",
				icon: CheckIcon,
				onClick: () => {},
			},
			{
				key: "deactivate",
				label: "Desactivar",
				variant: "danger",
				icon: XIcon,
				onClick: () => {},
			},
			{
				key: "delete",
				label: "Eliminar",
				variant: "danger",
				icon: TrashIcon,
				disabled: true,
				onClick: () => {},
				separator: true,
			},
		],
	},
};

export const Compact: Story = {
	name: "Tamaño xs — filas densas",
	args: {
		label: "···",
		size: "xs",
		items: [
			{
				key: "approve",
				label: "Aprobar",
				variant: "success",
				icon: CheckIcon,
				onClick: () => {},
			},
			{
				key: "reject",
				label: "Rechazar",
				variant: "danger",
				icon: XIcon,
				onClick: () => {},
			},
		],
	},
};

// ── Integración en DataTable ─────────────────────────────────────────────────

interface ClientRow {
	id: string;
	empresa: string;
	contacto: string;
	rfc: string;
	vendedor: string;
	status: "A" | "I";
}

const CLIENTS: ClientRow[] = [
	{
		id: "c1",
		empresa: "Persianas DecoHogar",
		contacto: "Carlos Mendoza",
		rfc: "MEDC850712HN5",
		vendedor: "Alejandro Ruiz",
		status: "A",
	},
	{
		id: "c2",
		empresa: "Instalaciones Regias",
		contacto: "Sofía Villarreal",
		rfc: "INRE901103M24",
		vendedor: "Diana Gómez",
		status: "A",
	},
	{
		id: "c3",
		empresa: "Persianistas Asociados",
		contacto: "Manuel Torres",
		rfc: "PTAS780415A52",
		vendedor: "Sin asignar",
		status: "I",
	},
	{
		id: "c4",
		empresa: "Diseño & Cortinas CDMX",
		contacto: "Gabriela Luna",
		rfc: "DICD8809099J1",
		vendedor: "Alejandro Ruiz",
		status: "A",
	},
];

export const InClientTable: Story = {
	name: "Integrado — tabla de clientes B2B",
	render: () => (
		<div className="caj-panel p-4 space-y-3 rounded-2xl min-w-[700px]">
			<div className="flex justify-between items-center px-2">
				<div>
					<h3 className="text-lg font-bold">Clientes Registrados (B2B/B2C)</h3>
					<p className="text-xs text-white/50">
						Asignación de asesores comerciales y controles de acceso
					</p>
				</div>
			</div>
			<DataTable<ClientRow>
				data={CLIENTS}
				rowKey="id"
				searchable
				searchPlaceholder="Buscar por empresa, contacto…"
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
						key: "vendedor",
						header: "Asesor",
						render: (v) => (
							<span
								className={
									v === "Sin asignar"
										? "text-amber-400 italic text-xs"
										: "text-white/80 text-sm"
								}
							>
								{String(v)}
							</span>
						),
					},
					{
						key: "status",
						header: "Estado",
						render: (v) => (
							<span
								className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold ${v === "A" ? "bg-green-500/15 text-green-400 border border-green-500/30" : "bg-red-500/15 text-red-400 border border-red-500/30"}`}
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
							<RowActions
								align="right"
								items={[
									{
										key: "reasignar",
										label: "Reasignar asesor",
										icon: UserIcon,
										onClick: () => alert(`Reasignando asesor: ${row.empresa}`),
									},
									{
										key: "toggle",
										label:
											row.status === "A"
												? "Desactivar cuenta"
												: "Reactivar cuenta",
										variant: row.status === "A" ? "danger" : "success",
										icon: row.status === "A" ? XIcon : CheckIcon,
										onClick: () => alert(`Cambiando estatus: ${row.empresa}`),
										separator: true,
									},
								]}
							/>
						),
					},
				]}
			/>
		</div>
	),
};

interface RequestRow {
	id: string;
	nombre: string;
	empresa: string;
	email: string;
	fecha: string;
}

const REQUESTS: RequestRow[] = [
	{
		id: "r1",
		nombre: "Juan Pérez",
		empresa: "Blinds & Co",
		email: "juan@blindsco.com",
		fecha: "2026-06-05",
	},
	{
		id: "r2",
		nombre: "Lucía Ortiz",
		empresa: "Decoraciones Lucy",
		email: "contacto@decolucy.com",
		fecha: "2026-06-07",
	},
	{
		id: "r3",
		nombre: "Pedro Gómez",
		empresa: "Suplementos Regios",
		email: "pedro@supregios.mx",
		fecha: "2026-06-08",
	},
];

export const InRequestTable: Story = {
	name: "Integrado — aprobación de solicitudes",
	render: () => (
		<div className="caj-panel p-4 space-y-3 rounded-2xl min-w-[700px]">
			<div>
				<h3 className="text-lg font-bold">Solicitudes de Acceso Pendientes</h3>
				<p className="text-xs text-white/50">
					Auto-registros esperando validación
				</p>
			</div>
			<DataTable<RequestRow>
				data={REQUESTS}
				rowKey="id"
				columns={[
					{ key: "nombre", header: "Solicitante", sortable: true },
					{ key: "empresa", header: "Empresa", sortable: true },
					{ key: "email", header: "Email" },
					{
						key: "fecha",
						header: "Fecha",
						render: (v) => (
							<span className="text-white/60 text-xs">{String(v)}</span>
						),
					},
					{
						key: "acciones",
						header: "Acción",
						align: "right",
						render: (_, row) => (
							<RowActions
								label="Revisar"
								align="right"
								items={[
									{
										key: "approve",
										label: "Aprobar distribuidor",
										variant: "success",
										icon: CheckIcon,
										onClick: () =>
											alert(`Aprobado: ${row.nombre} (${row.empresa})`),
									},
									{
										key: "reject",
										label: "Rechazar solicitud",
										variant: "danger",
										icon: XIcon,
										onClick: () => alert(`Rechazado: ${row.nombre}`),
										separator: true,
									},
								]}
							/>
						),
					},
				]}
			/>
		</div>
	),
};
