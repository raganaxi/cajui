import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect } from "storybook/test";
import { BarcodeInput } from "./BarcodeInput";

const meta: Meta<typeof BarcodeInput> = {
	title: "Atoms/BarcodeInput",
	component: BarcodeInput,
	tags: ["autodocs", "ai-generated", "needs-work"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Input para lectores de código de barras. Detecta automáticamente si el input viene de un escáner (entrada rápida) vs escritura manual. Dispara `onScan` al presionar Enter o al detectar un código completo.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof BarcodeInput>;

function BarcodeInputDemo(
	props: Partial<React.ComponentProps<typeof BarcodeInput>>,
) {
	const [scannedCode, setScannedCode] = useState<string | null>(null);
	return (
		<div className="flex flex-col gap-2 w-80">
			<BarcodeInput onScan={(code) => setScannedCode(code)} {...props} />
			{scannedCode && (
				<p className="text-sm text-green-500">
					✓ Escaneado:{" "}
					<strong className="font-mono text-white">{scannedCode}</strong>
				</p>
			)}
		</div>
	);
}

export const Default: Story = {
	render: () => <BarcodeInputDemo label="Código de barras" showLastScan />,
};

export const Minimal: Story = {
	render: () => <BarcodeInputDemo placeholder="Scan o código manual…" />,
};

export const InteractiveScan: Story = {
	render: () => <BarcodeInputDemo label="Escanear Producto" />,
	play: async ({ canvas, userEvent }) => {
		const input = canvas.getByRole("textbox", { name: "Escanear Producto" });
		await userEvent.type(input, "XYZ-789{enter}");
		await expect(
			await canvas.findByText(/✓ Escaneado: XYZ-789/i),
		).toBeVisible();
	},
};
