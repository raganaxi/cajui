import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Branding } from "./Branding";

const meta: Meta<typeof Branding> = {
	title: "Atoms/Branding",
	component: Branding,
	tags: ["autodocs", "ai-generated", "needs-work"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Componente de branding y marca blanca para POS y sistemas ERP. Permite definir el nombre de la empresa, el logotipo y sobreescribir dinámicamente el color primario de la librería.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof Branding>;

export const Default: Story = {
	args: {
		companyName: "Cajui POS",
	},
};

export const GlassTinted: Story = {
	args: {
		companyName: "Glass ERP",
		glassTint: true,
	},
};

export const Sizes: Story = {
	render: () => (
		<div className="caj-panel flex flex-col gap-8 items-start p-6 rounded-xl">
			<div>
				<span className="text-xs text-white/50 block mb-2">Pequeño (sm)</span>
				<Branding companyName="MiniMarket" size="sm" glassTint />
			</div>
			<div>
				<span className="text-xs text-white/50 block mb-2">
					Mediano (md - Default)
				</span>
				<Branding companyName="SuperMercado" size="md" glassTint />
			</div>
			<div>
				<span className="text-xs text-white/50 block mb-2">Grande (lg)</span>
				<Branding companyName="MegaStore" size="lg" glassTint />
			</div>
		</div>
	),
};

export const ThemeOverrides: Story = {
	render: () => (
		<div className="caj-panel flex flex-col gap-6 p-6 rounded-xl">
			<div>
				<span className="text-xs text-white/50 block mb-2">
					Violeta (#8b5cf6)
				</span>
				<Branding companyName="Violet POS" themeColor="#8b5cf6" glassTint />
			</div>
			<div>
				<span className="text-xs text-white/50 block mb-2">Rosa (#ec4899)</span>
				<Branding companyName="Pink Retail" themeColor="#ec4899" glassTint />
			</div>
			<div>
				<span className="text-xs text-white/50 block mb-2">
					Naranja (#f97316)
				</span>
				<Branding companyName="Orange Food" themeColor="#f97316" glassTint />
			</div>
			<div>
				<span className="text-xs text-white/50 block mb-2">Cian (#06b6d4)</span>
				<Branding companyName="Cyan Pharmacy" themeColor="#06b6d4" glassTint />
			</div>
		</div>
	),
};

export const CustomLogo: Story = {
	args: {
		companyName: "Google Cloud",
		logoUrl:
			"https://www.gstatic.com/images/branding/product/1x/google_cloud_64dp.png",
		glassTint: true,
	},
};

export const CssCheck: Story = {
	args: {
		companyName: "Theme Test",
		themeColor: "#8b5cf6",
		glassTint: true,
	},
	play: async ({ canvas }) => {
		const container = canvas.getByText("Theme Test").closest("div");
		expect(container).not.toBeNull();
		if (container) {
			const computedStyle = getComputedStyle(container);
			expect(computedStyle.getPropertyValue("--caj-primary").trim()).toBe(
				"139 92 246",
			);
		}
	},
};
