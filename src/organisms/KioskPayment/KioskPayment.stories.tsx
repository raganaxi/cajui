import type { Meta, StoryObj } from "@storybook/react-vite";
import { KioskPayment } from "./KioskPayment";

const meta: Meta<typeof KioskPayment> = {
	title: "Kiosk / KioskPayment",
	component: KioskPayment,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Pantalla de pago interactiva estilo Kiosco / Costco Auto-Cobro. Presenta opciones de pago gigantes y guía al usuario con prompts e ilustraciones animadas de la terminal física.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof KioskPayment>;

export const Default: Story = {
	args: {
		amount: 1485.5,
		onSuccess: (methodId) =>
			alert(`Pago completado exitosamente con: ${methodId}`),
		onCancel: () => alert("Pago cancelado por el usuario"),
	},
};

export const DirectPrompt: Story = {
	name: "Espera de tarjeta directa",
	args: {
		amount: 50.0,
		initialStatus: "prompt",
		onSuccess: (methodId) => console.log("success:", methodId),
	},
};

export const ProcessingDemo: Story = {
	name: "Estado de procesamiento",
	args: {
		amount: 99.9,
		initialStatus: "processing",
	},
};
