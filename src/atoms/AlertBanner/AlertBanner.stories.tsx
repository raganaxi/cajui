import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertBanner } from "./AlertBanner";

const meta: Meta<typeof AlertBanner> = {
	title: "Atoms/AlertBanner",
	component: AlertBanner,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Banner de alerta con estilos Liquid Glass. Soporta variantes info, success, warning, danger y low_stock. Puede incluir título, acción y botón de cierre.",
			},
		},
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["info", "success", "warning", "danger", "low_stock"],
		},
		dismissible: { control: "boolean" },
	},
};

export default meta;
type Story = StoryObj<typeof AlertBanner>;

export const Default: Story = {
	args: {
		message: "Tienes un mensaje informativo.",
	},
};

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-col gap-3 w-96">
			<AlertBanner
				variant="info"
				message="Información del sistema actualizada."
			/>
			<AlertBanner
				variant="success"
				title="Venta completada"
				message="El pago se procesó correctamente."
			/>
			<AlertBanner
				variant="warning"
				title="Advertencia"
				message="Stock por debajo del mínimo recomendado."
			/>
			<AlertBanner
				variant="danger"
				title="Error"
				message="No se pudo conectar con el servidor de pagos."
			/>
			<AlertBanner
				variant="low_stock"
				title="Stock bajo"
				message="Quedan menos de 5 unidades de este producto."
			/>
		</div>
	),
};

export const WithAction: Story = {
	args: {
		variant: "warning",
		title: "Sesión por expirar",
		message: "Tu sesión expirará en 5 minutos.",
		action: { label: "Renovar sesión", onClick: () => alert("Renovando…") },
	},
};

export const Dismissible: Story = {
	args: {
		variant: "info",
		title: "Actualización disponible",
		message: "Hay una nueva versión de cajui disponible.",
		dismissible: true,
	},
};
