import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { ColorSwatch } from "./ColorSwatchPicker";
import { ColorSwatchPicker } from "./ColorSwatchPicker";

const meta: Meta<typeof ColorSwatchPicker> = {
	title: "Molecules/ColorSwatchPicker",
	component: ColorSwatchPicker,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Selector de color mediante swatches circulares. Primer clic selecciona, clic en el ya seleccionado abre un lightbox con detalle.",
			},
		},
	},
	argTypes: {
		size: { control: "select", options: ["sm", "md"] },
		selectedId: { control: "text" },
		label: { control: "text" },
	},
};

export default meta;
type Story = StoryObj<typeof ColorSwatchPicker>;

const Canvas = ({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<div className={`caj-panel p-6 rounded-2xl ${className}`}>{children}</div>
);

const SWATCHES_COLOR: ColorSwatch[] = [
	{
		id: "blanco",
		name: "Blanco Perla",
		hex: "#F5F0E8",
		description: "Tela 100% poliéster, acabado mate satinado.",
	},
	{
		id: "gris",
		name: "Gris Plata",
		hex: "#8C8C8C",
		description: "Ideal para espacios modernos y minimalistas.",
	},
	{
		id: "negro",
		name: "Negro Ónix",
		hex: "#1A1A1A",
		description: "Color oscuro de alta absorción lumínica.",
	},
	{
		id: "beige",
		name: "Beige Duna",
		hex: "#D4B896",
		description: "Tono cálido neutro, combina con cualquier decoración.",
	},
	{
		id: "azul",
		name: "Azul Cielo",
		hex: "#4A90B8",
		description: "Tono fresco y luminoso para espacios abiertos.",
	},
];

// Solid colors used as stand-in textures (data URLs with a stripe pattern)
const TEXTURE_STRIPED =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Crect width='8' height='8' fill='%23c8a87a'/%3E%3Cpath d='M0 0L8 8M-2 6L6-2M2 10L10 2' stroke='%23b8926a' stroke-width='1.5'/%3E%3C/svg%3E";
const TEXTURE_DOTS =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Crect width='8' height='8' fill='%23607D8B'/%3E%3Ccircle cx='2' cy='2' r='1' fill='%234a6572'/%3E%3Ccircle cx='6' cy='6' r='1' fill='%234a6572'/%3E%3C/svg%3E";
const TEXTURE_WEAVE =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Crect width='8' height='8' fill='%23795548'/%3E%3Cpath d='M0 4h4M4 0v4M4 4h4M4 4v4' stroke='%23614438' stroke-width='1'/%3E%3C/svg%3E";

const SWATCHES_TEXTURE: ColorSwatch[] = [
	{
		id: "lino",
		name: "Lino Natural",
		hex: "#c8a87a",
		textureUrl: TEXTURE_STRIPED,
		description: "Tejido natural de lino con patrón diagonal.",
	},
	{
		id: "oxford",
		name: "Oxford Gris",
		hex: "#607D8B",
		textureUrl: TEXTURE_DOTS,
		description: "Tejido Oxford de alta resistencia.",
	},
	{
		id: "yute",
		name: "Yute Marrón",
		hex: "#795548",
		textureUrl: TEXTURE_WEAVE,
		description: "Fibra natural entretejida, acabado rústico.",
	},
	{
		id: "blanco-liso",
		name: "Blanco Liso",
		hex: "#F0EDE8",
		description: "Tela lisa sin textura.",
	},
	{
		id: "negro-liso",
		name: "Negro Liso",
		hex: "#1C1C1C",
		description: "Tela lisa blackout.",
	},
];

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
	name: "Default",
	render: () => {
		const [selected, setSelected] = useState("gris");
		return (
			<Canvas>
				<ColorSwatchPicker
					swatches={SWATCHES_COLOR}
					selectedId={selected}
					onChange={setSelected}
					label="TELA / COLOR"
				/>
				<p className="mt-3 text-xs text-white/40">
					Seleccionado:{" "}
					<span className="text-white/70">
						{SWATCHES_COLOR.find((s) => s.id === selected)?.name ?? "—"}
					</span>
				</p>
			</Canvas>
		);
	},
};

// ── Con Textura ───────────────────────────────────────────────────────────────
export const ConTextura: Story = {
	name: "Con Textura",
	render: () => {
		const [selected, setSelected] = useState("lino");
		return (
			<Canvas>
				<ColorSwatchPicker
					swatches={SWATCHES_TEXTURE}
					selectedId={selected}
					onChange={setSelected}
					label="MATERIAL / TEXTURA"
					size="md"
				/>
				<p className="mt-3 text-xs text-white/40">
					Seleccionado:{" "}
					<span className="text-white/70">
						{SWATCHES_TEXTURE.find((s) => s.id === selected)?.name ?? "—"}
					</span>
				</p>
			</Canvas>
		);
	},
};

// ── Sin selección ─────────────────────────────────────────────────────────────
export const SinSeleccion: Story = {
	name: "Sin Selección",
	render: () => {
		const [selected, setSelected] = useState<string | undefined>(undefined);
		return (
			<Canvas>
				<ColorSwatchPicker
					swatches={SWATCHES_COLOR}
					selectedId={selected}
					onChange={setSelected}
					label="COLOR"
				/>
				<p className="mt-3 text-xs text-white/40">
					{selected
						? `Seleccionado: ${SWATCHES_COLOR.find((s) => s.id === selected)?.name}`
						: "Ninguno seleccionado — haz clic en un swatch"}
				</p>
			</Canvas>
		);
	},
};

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground: Story = {
	args: {
		swatches: SWATCHES_COLOR,
		selectedId: "negro",
		label: "COLOR",
		size: "md",
	},
	render: (args) => {
		const [selected, setSelected] = useState(args.selectedId);
		return (
			<Canvas>
				<ColorSwatchPicker
					{...args}
					selectedId={selected}
					onChange={setSelected}
				/>
			</Canvas>
		);
	},
};
