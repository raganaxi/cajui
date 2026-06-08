import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
	title: "Atoms/Button",
	component: Button,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Sistema completo de botones cajui con estética Liquid Glass. Cubre acciones primarias, toggles de filtro, navegación por tabs, CTAs secundarias e interacciones de tabla y formulario.",
			},
		},
	},
	argTypes: {
		variant: {
			control: "select",
			options: [
				"default",
				"primary",
				"success",
				"warning",
				"danger",
				"ghost",
				"text",
				"chip",
				"tab",
				"dashed",
			],
		},
		size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
		active: { control: "boolean" },
		loading: { control: "boolean" },
		disabled: { control: "boolean" },
		block: { control: "boolean" },
		iconOnly: { control: "boolean" },
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

// ── SVG icons reutilizables ──────────────────────────────────────────────────
const PlusIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="currentColor"
		className="w-4 h-4"
		aria-hidden="true"
	>
		<path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
	</svg>
);
const TrashIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="currentColor"
		className="w-4 h-4"
		aria-hidden="true"
	>
		<path
			fillRule="evenodd"
			d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
			clipRule="evenodd"
		/>
	</svg>
);
const EditIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="currentColor"
		className="w-4 h-4"
		aria-hidden="true"
	>
		<path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.155 1.263a.5.5 0 01-.65-.65z" />
	</svg>
);
const SearchIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="currentColor"
		className="w-4 h-4"
		aria-hidden="true"
	>
		<path
			fillRule="evenodd"
			d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
			clipRule="evenodd"
		/>
	</svg>
);
const CloseIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="currentColor"
		className="w-4 h-4"
		aria-hidden="true"
	>
		<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
	</svg>
);
const DotsIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="currentColor"
		className="w-4 h-4"
		aria-hidden="true"
	>
		<path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
	</svg>
);
const CheckIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="currentColor"
		className="w-4 h-4"
		aria-hidden="true"
	>
		<path
			fillRule="evenodd"
			d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
			clipRule="evenodd"
		/>
	</svg>
);

// ── Canvas wrapper con fondo glass ───────────────────────────────────────────
const Canvas = ({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<div
		className={`p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 ${className}`}
	>
		{children}
	</div>
);

// ── Todas las variantes ──────────────────────────────────────────────────────
export const AllVariants: Story = {
	name: "Todas las variantes",
	render: () => (
		<Canvas className="flex flex-col gap-5 min-w-[480px]">
			<div>
				<p className="text-xs text-white/40 font-pos mb-2">Acciones</p>
				<div className="flex flex-wrap gap-2">
					<Button variant="primary">Primary</Button>
					<Button variant="default">Default (glass)</Button>
					<Button variant="success">Success</Button>
					<Button variant="warning">Warning</Button>
					<Button variant="danger">Danger</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="text">Text link</Button>
				</div>
			</div>
			<div>
				<p className="text-xs text-white/40 font-pos mb-2">
					Filtros y navegación
				</p>
				<div className="flex flex-wrap gap-2 items-center">
					<Button variant="chip">Chip inactivo</Button>
					<Button variant="chip" active>
						Chip activo
					</Button>
					<Button variant="tab">Tab inactivo</Button>
					<Button variant="tab" active>
						Tab activo
					</Button>
				</div>
			</div>
			<div>
				<p className="text-xs text-white/40 font-pos mb-2">CTA secundaria</p>
				<Button variant="dashed" icon={PlusIcon}>
					Agregar elemento
				</Button>
			</div>
		</Canvas>
	),
};

// ── Tamaños ──────────────────────────────────────────────────────────────────
export const Sizes: Story = {
	name: "Tamaños",
	render: () => (
		<Canvas className="flex flex-col gap-4">
			<div className="flex items-center gap-3 flex-wrap">
				{(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
					<Button key={s} variant="primary" size={s}>
						{s.toUpperCase()}
					</Button>
				))}
			</div>
			<div className="flex items-center gap-3 flex-wrap">
				{(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
					<Button key={s} variant="default" size={s}>
						Glass {s}
					</Button>
				))}
			</div>
			<div className="flex items-center gap-3 flex-wrap">
				{(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
					<Button key={s} variant="chip" size={s}>
						Chip {s}
					</Button>
				))}
			</div>
		</Canvas>
	),
};

// ── Estado glass: inactivo / activo / disabled ────────────────────────────────
export const GlassStates: Story = {
	name: "Glass — estados (default)",
	render: () => (
		<Canvas className="flex flex-wrap gap-3">
			<Button variant="default">Normal</Button>
			<Button variant="default" active>
				Activo / seleccionado
			</Button>
			<Button variant="default" disabled>
				Deshabilitado
			</Button>
			<Button variant="default" loading>
				Cargando
			</Button>
		</Canvas>
	),
};

// ── Filter chips interactivo ─────────────────────────────────────────────────
export const FilterChips: Story = {
	name: "Chips de filtro (interactivo)",
	render: () => {
		const CATEGORIAS = ["Todos", "Bebidas", "Alimentos", "Postres", "Combos"];
		const [selected, setSelected] = useState("Todos");
		return (
			<Canvas className="flex flex-col gap-4 min-w-[400px]">
				<div className="flex flex-wrap gap-2">
					{CATEGORIAS.map((cat) => (
						<Button
							key={cat}
							variant="chip"
							active={selected === cat}
							onClick={() => setSelected(cat)}
						>
							{cat}
						</Button>
					))}
				</div>
				<p className="text-xs text-white/40 font-pos">
					Filtro activo: <span className="text-white/70">{selected}</span>
				</p>
			</Canvas>
		);
	},
};

// ── Tab navigation interactivo ───────────────────────────────────────────────
export const TabNavigation: Story = {
	name: "Tabs de navegación (interactivo)",
	render: () => {
		const TABS = ["Resumen", "Productos", "Historial", "Configuración"];
		const [active, setActive] = useState("Resumen");
		return (
			<Canvas className="min-w-[420px]">
				<div className="flex border-b border-white/[0.10]">
					{TABS.map((tab) => (
						<Button
							key={tab}
							variant="tab"
							active={active === tab}
							onClick={() => setActive(tab)}
						>
							{tab}
						</Button>
					))}
				</div>
				<p className="mt-4 text-sm text-white/50 font-pos">
					Sección activa: <span className="text-white/80">{active}</span>
				</p>
			</Canvas>
		);
	},
};

// ── Botones de solo icono ────────────────────────────────────────────────────
export const IconButtons: Story = {
	name: "Botones solo icono",
	render: () => (
		<Canvas className="flex flex-col gap-4">
			<div>
				<p className="text-xs text-white/40 font-pos mb-2">Tamaños (glass)</p>
				<div className="flex items-center gap-2">
					{(["xs", "sm", "md", "lg"] as const).map((s) => (
						<Button
							key={s}
							variant="default"
							size={s}
							iconOnly
							icon={SearchIcon}
							aria-label="Buscar"
						/>
					))}
				</div>
			</div>
			<div>
				<p className="text-xs text-white/40 font-pos mb-2">Variantes</p>
				<div className="flex gap-2">
					<Button
						variant="default"
						iconOnly
						icon={SearchIcon}
						aria-label="Buscar"
					/>
					<Button
						variant="primary"
						iconOnly
						icon={PlusIcon}
						aria-label="Agregar"
					/>
					<Button
						variant="danger"
						iconOnly
						icon={TrashIcon}
						aria-label="Eliminar"
					/>
					<Button
						variant="ghost"
						iconOnly
						icon={EditIcon}
						aria-label="Editar"
					/>
					<Button
						variant="ghost"
						iconOnly
						icon={DotsIcon}
						aria-label="Opciones"
					/>
					<Button
						variant="ghost"
						iconOnly
						icon={CloseIcon}
						aria-label="Cerrar"
					/>
				</div>
			</div>
		</Canvas>
	),
};

// ── Acciones de tabla ────────────────────────────────────────────────────────
export const TableActions: Story = {
	name: "Acciones de tabla",
	render: () => (
		<Canvas className="min-w-[560px]">
			<div className="flex flex-col gap-2">
				{[
					"Producto A — $1,299",
					"Producto B — $450",
					"Producto C — $3,200",
				].map((row) => (
					<div
						key={row}
						className="flex items-center justify-between rounded-xl border border-white/[0.10] bg-white/[0.04] px-4 py-3"
					>
						<span className="text-sm text-white/80 font-pos">{row}</span>
						<div className="flex gap-1">
							<Button
								variant="ghost"
								size="xs"
								iconOnly
								icon={EditIcon}
								aria-label="Editar"
							/>
							<Button
								variant="ghost"
								size="xs"
								iconOnly
								icon={DotsIcon}
								aria-label="Más opciones"
							/>
							<Button
								variant="danger"
								size="xs"
								iconOnly
								icon={TrashIcon}
								aria-label="Eliminar"
							/>
						</div>
					</div>
				))}
			</div>
		</Canvas>
	),
};

// ── Acciones de formulario ───────────────────────────────────────────────────
export const FormActions: Story = {
	name: "Acciones de formulario",
	render: () => (
		<Canvas className="flex flex-col gap-6 min-w-[360px]">
			<div>
				<p className="text-xs text-white/40 font-pos mb-3">
					Patrón confirmar / cancelar
				</p>
				<div className="flex gap-3">
					<Button variant="ghost" block>
						Cancelar
					</Button>
					<Button variant="primary" block icon={CheckIcon}>
						Confirmar
					</Button>
				</div>
			</div>
			<div>
				<p className="text-xs text-white/40 font-pos mb-3">
					CTA principal ancho completo
				</p>
				<Button variant="primary" size="lg" block>
					Procesar pago
				</Button>
			</div>
			<div>
				<p className="text-xs text-white/40 font-pos mb-3">
					Acción destructiva
				</p>
				<div className="flex gap-3">
					<Button variant="ghost" block>
						Volver
					</Button>
					<Button variant="danger" block icon={TrashIcon}>
						Eliminar registro
					</Button>
				</div>
			</div>
			<div>
				<p className="text-xs text-white/40 font-pos mb-3">
					Agregar elemento (dashed)
				</p>
				<Button variant="dashed" icon={PlusIcon}>
					Agregar producto
				</Button>
			</div>
		</Canvas>
	),
};

// ── Loading states ───────────────────────────────────────────────────────────
export const Loading: Story = {
	name: "Estados de carga",
	render: () => (
		<Canvas className="flex flex-wrap gap-3">
			<Button variant="primary" loading>
				Guardando…
			</Button>
			<Button variant="success" loading>
				Procesando
			</Button>
			<Button variant="default" loading>
				Cargando
			</Button>
			<Button variant="danger" loading>
				Eliminando
			</Button>
		</Canvas>
	),
};

// ── Playground (controls) ────────────────────────────────────────────────────
export const Playground: Story = {
	args: {
		variant: "primary",
		size: "md",
		children: "Botón cajui",
		active: false,
		loading: false,
		disabled: false,
		block: false,
		iconOnly: false,
	},
	render: (args) => (
		<Canvas>
			<Button {...args} />
		</Canvas>
	),
};
