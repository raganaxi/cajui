import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ScannerInput } from "./ScannerInput";

const meta: Meta<typeof ScannerInput> = {
	title: "Molecules/ScannerInput",
	component: ScannerInput,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Componente de entrada para kioscos táctiles. Detecta automáticamente escáneres hardware (ráfaga de teclas < 80 ms) y muestra el teclado táctil (`SoftKeyboard`) cuando el usuario activa la entrada manual. El botón de cámara es un punto de extensión — el padre implementa la captura vía `onCameraScan`.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof ScannerInput>;

function Demo({
	charset,
	placeholder,
	showCamera,
}: {
	charset?: "alphanumeric" | "numeric" | "alpha";
	placeholder?: string;
	showCamera?: boolean;
}) {
	const [value, setValue] = useState("");
	const [confirmed, setConfirmed] = useState<string | null>(null);
	return (
		<div className="w-[420px] flex flex-col gap-4 p-5">
			<ScannerInput
				value={value}
				onChange={setValue}
				onConfirm={(v) => {
					setConfirmed(v);
					setValue("");
				}}
				placeholder={placeholder ?? "Escanear o escribir…"}
				charset={charset}
				onCameraScan={showCamera ? () => alert("Abrir cámara QR") : undefined}
			/>
			{confirmed && (
				<p className="text-sm text-white/60 text-center font-semibold">
					✓ Confirmado:{" "}
					<span className="text-white font-bold">{confirmed}</span>
				</p>
			)}
		</div>
	);
}

export const Alphanumeric: Story = {
	name: "Búsqueda alfanumérica",
	render: () => (
		<Demo
			charset="alphanumeric"
			placeholder="Buscar por folio o cliente…"
			showCamera
		/>
	),
};

export const NumericFolio: Story = {
	name: "Folio numérico",
	render: () => <Demo charset="numeric" placeholder="Folio del pedido" />,
};

export const ConCamara: Story = {
	name: "Con botón de cámara QR",
	render: () => (
		<Demo charset="alphanumeric" placeholder="Escanear código QR…" showCamera />
	),
};
