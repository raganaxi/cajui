import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect } from "storybook/test";
import { GlassPanel } from "@/atoms/GlassPanel";
import { PriceDisplay } from "@/atoms/PriceDisplay/PriceDisplay";
import { NumPad } from "./NumPad";

const meta: Meta<typeof NumPad> = {
	title: "Atoms/NumPad",
	component: NumPad,
	tags: ["autodocs", "ai-generated", "needs-work"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Teclado numérico táctil para captura de montos en caja. Controla decimales, longitud máxima y dispara `onEnter` al confirmar.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof NumPad>;

function NumPadDemo({ allowDecimals = true }: { allowDecimals?: boolean }) {
	const [value, setValue] = useState("");
	const [confirmed, setConfirmed] = useState<string | null>(null);
	const amount = value ? parseFloat(value) : 0;

	return (
		<div className="flex flex-col items-center gap-4 p-4 w-72 text-white">
			<GlassPanel
				padding="md"
				radius="xl"
				className="w-full text-right bg-white/[0.05] border-white/10"
			>
				<p className="text-xs text-white/50 mb-1">Monto a cobrar</p>
				<PriceDisplay
					value={amount}
					currency="MXN"
					size="2xl"
					variant="highlight"
				/>
				<p className="font-mono text-xs text-white/30 mt-1">{value || "0"}</p>
			</GlassPanel>
			<NumPad
				value={value}
				onChange={setValue}
				onEnter={(v) => {
					setConfirmed(v);
					setValue("");
				}}
				allowDecimals={allowDecimals}
			/>
			{confirmed && (
				<p className="text-sm text-green-600">
					✓ Confirmado: <strong>{confirmed}</strong>
				</p>
			)}
		</div>
	);
}

export const Default: Story = {
	render: () => <NumPadDemo />,
};

export const SinDecimales: Story = {
	name: "Sin decimales (cantidades)",
	render: () => <NumPadDemo allowDecimals={false} />,
};

export const InteractiveKeys: Story = {
	render: () => <NumPadDemo />,
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(canvas.getByRole("button", { name: "7" }));
		await userEvent.click(canvas.getByRole("button", { name: "8" }));
		await userEvent.click(canvas.getByRole("button", { name: "Confirmar" }));
		await expect(await canvas.findByText(/✓ Confirmado: 78/i)).toBeVisible();
	},
};
