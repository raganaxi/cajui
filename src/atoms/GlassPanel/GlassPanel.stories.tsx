import type { Meta, StoryObj } from "@storybook/react-vite";
import { GlassPanel } from "./GlassPanel";

const meta: Meta<typeof GlassPanel> = {
	title: "Atoms/GlassPanel",
	component: GlassPanel,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Panel con efecto Liquid Glass. Combina backdrop-filter blur, tint semitransparente, borde sutil y sombra interior. Es el building block principal de la UI de cajui.",
			},
		},
	},
	argTypes: {
		blur: {
			control: "select",
			options: ["none", "xs", "sm", "md", "lg", "xl"],
		},
		tint: {
			control: "select",
			options: ["none", "white", "primary", "danger", "warning", "dark"],
		},
		strength: {
			control: "select",
			options: ["subtle", "medium", "strong"],
		},
		radius: {
			control: "select",
			options: ["none", "sm", "md", "lg", "xl", "2xl", "full"],
		},
		padding: {
			control: "select",
			options: [false, true, "sm", "md", "lg"],
		},
		shadow: { control: "boolean" },
	},
};

export default meta;
type Story = StoryObj<typeof GlassPanel>;

const Content = ({ label }: { label: string }) => (
	<p className="text-white/80 text-sm font-pos">{label}</p>
);

export const Default: Story = {
	args: { padding: "md" },
	render: (args) => (
		<div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-teal-800">
			<GlassPanel {...args}>
				<Content label="GlassPanel por defecto (blur lg, tint white, strength medium)" />
			</GlassPanel>
		</div>
	),
};

export const AllTints: Story = {
	render: () => (
		<div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-teal-800 flex flex-wrap gap-4">
			{(["white", "primary", "danger", "warning", "dark", "none"] as const).map(
				(tint) => (
					<GlassPanel
						key={tint}
						tint={tint}
						padding="md"
						className="w-36 text-center"
					>
						<Content label={tint} />
					</GlassPanel>
				),
			)}
		</div>
	),
};

export const BlurLevels: Story = {
	render: () => (
		<div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-teal-800 flex flex-col gap-3">
			{(["none", "xs", "sm", "md", "lg", "xl"] as const).map((blur) => (
				<GlassPanel
					key={blur}
					blur={blur}
					padding="sm"
					className="flex items-center gap-3"
				>
					<span className="font-mono text-xs text-white/50 w-8">{blur}</span>
					<Content label={`blur="${blur}"`} />
				</GlassPanel>
			))}
		</div>
	),
};

export const StrengthVariants: Story = {
	render: () => (
		<div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-teal-800 flex gap-4">
			{(["subtle", "medium", "strong"] as const).map((strength) => (
				<GlassPanel
					key={strength}
					strength={strength}
					tint="white"
					padding="md"
				>
					<Content label={strength} />
				</GlassPanel>
			))}
		</div>
	),
};

export const Clickable: Story = {
	render: () => (
		<div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-teal-800">
			<GlassPanel padding="md" onClick={() => alert("Panel clickeado")}>
				<Content label="Panel interactivo — haz click" />
			</GlassPanel>
		</div>
	),
};
