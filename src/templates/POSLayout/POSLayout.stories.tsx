import type { Meta, StoryObj } from "@storybook/react-vite";
import { POSLayout } from "./POSLayout";

const meta: Meta<typeof POSLayout> = {
	title: "Templates / POSLayout",
	component: POSLayout,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"Plantilla de pantalla de punto de venta completa usando cajui con estética Apple Liquid Glass.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof POSLayout>;

export const Default: Story = {};
