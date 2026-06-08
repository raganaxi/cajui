import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heart } from "lucide-react";
import { Icon } from "./Icon";
import { iconMap } from "./icons";

const meta: Meta<typeof Icon> = {
	title: "Atoms/Icon",
	component: Icon,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Componente átomo para renderizar iconografía de forma consistente en cajui. Permite usar nombres predefinidos comunes para POS/ERP (sin necesidad de importar de lucide-react) o pasar componentes de icono directos de lucide-react.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
	args: {
		name: "search",
		size: "md",
	},
};

export const Sizes: Story = {
	render: () => (
		<div className="flex items-end gap-6 p-6 bg-slate-900 rounded-xl text-white">
			<div className="text-center">
				<Icon name="settings" size="xs" />
				<span className="text-[10px] text-slate-400 block mt-2">xs (12px)</span>
			</div>
			<div className="text-center">
				<Icon name="settings" size="sm" />
				<span className="text-[10px] text-slate-400 block mt-2">sm (16px)</span>
			</div>
			<div className="text-center">
				<Icon name="settings" size="md" />
				<span className="text-[10px] text-slate-400 block mt-2">md (20px)</span>
			</div>
			<div className="text-center">
				<Icon name="settings" size="lg" />
				<span className="text-[10px] text-slate-400 block mt-2">lg (24px)</span>
			</div>
			<div className="text-center">
				<Icon name="settings" size="xl" />
				<span className="text-[10px] text-slate-400 block mt-2">xl (32px)</span>
			</div>
			<div className="text-center">
				<Icon name="settings" size={48} />
				<span className="text-[10px] text-slate-400 block mt-2">
					Custom (48px)
				</span>
			</div>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className="flex gap-6 p-6 bg-slate-900 rounded-xl">
			<Icon name="info" className="text-blue-400" />
			<Icon name="success" className="text-green-400" />
			<Icon name="warning" className="text-amber-400" />
			<Icon name="danger" className="text-red-400" />
			<Icon name="sparkles" className="text-purple-400 animate-pulse" />
		</div>
	),
};

export const CustomLucideIcon: Story = {
	args: {
		icon: Heart,
		size: "lg",
		className: "text-rose-500 fill-rose-500",
	},
};

export const PresetCatalog: Story = {
	render: () => (
		<div className="p-6 bg-slate-900 rounded-xl text-white max-w-4xl">
			<h3 className="text-lg font-bold mb-4">
				Catálogo de Iconos Predefinidos
			</h3>
			<p className="text-sm text-slate-400 mb-6">
				Usa la propiedad <code>name="..."</code> con cualquiera de estos
				identificadores:
			</p>
			<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
				{Object.keys(iconMap).map((key) => {
					const iconKey = key as keyof typeof iconMap;
					return (
						<div
							key={iconKey}
							className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-800 bg-slate-950/50 hover:bg-slate-950 transition-colors"
						>
							<Icon name={iconKey} size="md" className="text-slate-200" />
							<span className="text-[11px] text-slate-400 text-center mt-2 break-all font-mono select-all">
								{iconKey}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	),
};
