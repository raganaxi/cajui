import type { Meta, StoryObj } from "@storybook/react-vite";
import { CajuiProvider } from "./CajuiProvider";

const meta: Meta<typeof CajuiProvider> = {
	title: "Atoms/CajuiProvider",
	component: CajuiProvider,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"Wrapper raíz de cajui. Inyecta el fondo de gradiente glass y el atributo `data-cajui-root` necesario para los estilos base. Debe colocarse en la cima del árbol de componentes.",
			},
		},
	},
	argTypes: {
		gradient: {
			control: "select",
			options: ["default", "warm", "cool", "midnight", "none"],
		},
		theme: {
			control: "select",
			options: [
				"cajui",
				"accessible-light",
				"accessible-dark",
				"amalli-light",
				"amalli-dark",
			],
		},
	},
};

export default meta;
type Story = StoryObj<typeof CajuiProvider>;

const Placeholder = () => (
	<div className="flex items-center justify-center h-48 text-white/70 text-sm font-pos border border-white/10 rounded-2xl m-6">
		Contenido de la aplicación
	</div>
);

export const Default: Story = {
	args: { gradient: "default", theme: "cajui" },
	render: (args) => (
		<CajuiProvider {...args}>
			<Placeholder />
		</CajuiProvider>
	),
};

export const AllGradients: Story = {
	render: () => (
		<div className="flex flex-col gap-2">
			{(["default", "warm", "cool", "midnight"] as const).map((g) => (
				<CajuiProvider key={g} gradient={g} theme="cajui" className="min-h-0">
					<div className="flex items-center justify-center h-20 text-white/80 text-sm font-pos">
						gradient="{g}"
					</div>
				</CajuiProvider>
			))}
		</div>
	),
};

export const AccessibleLight: Story = {
	args: { theme: "accessible-light" },
	render: (args) => (
		<CajuiProvider {...args}>
			<div className="flex items-center justify-center h-48 text-sm font-pos m-6 border border-black/10 rounded-2xl">
				Tema accesible claro — sin gradiente
			</div>
		</CajuiProvider>
	),
};

export const AccessibleDark: Story = {
	args: { theme: "accessible-dark" },
	render: (args) => (
		<CajuiProvider {...args}>
			<div className="flex items-center justify-center h-48 text-white/80 text-sm font-pos m-6 border border-white/10 rounded-2xl">
				Tema accesible oscuro — sin gradiente
			</div>
		</CajuiProvider>
	),
};

export const AmalliLight: Story = {
	args: { theme: "amalli-light" },
	render: (args) => (
		<CajuiProvider {...args}>
			<div className="flex items-center justify-center h-48 text-sm font-pos m-6 border border-black/10 rounded-2xl">
				Tema Amalli Claro — Sólido y Orgánico
			</div>
		</CajuiProvider>
	),
};

export const AmalliDark: Story = {
	args: { theme: "amalli-dark" },
	render: (args) => (
		<CajuiProvider {...args}>
			<div className="flex items-center justify-center h-48 text-sm font-pos m-6 border border-white/10 rounded-2xl">
				Tema Amalli Oscuro — Sólido y Profundo
			</div>
		</CajuiProvider>
	),
};
