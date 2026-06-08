import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect } from "storybook/test";
import { QuantityControl } from "./QuantityControl";

const meta: Meta<typeof QuantityControl> = {
	title: "POS / QuantityControl",
	component: QuantityControl,
	tags: ["autodocs", "ai-generated", "needs-work"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Control +/− de cantidad para líneas de carrito. Soporta mínimo, máximo y paso configurable.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof QuantityControl>;

function Demo(props: Partial<React.ComponentProps<typeof QuantityControl>>) {
	const [qty, setQty] = useState(1);
	return <QuantityControl value={qty} onChange={setQty} {...props} />;
}

export const Default: Story = { render: () => <Demo /> };
export const Large: Story = { render: () => <Demo size="lg" /> };
export const Small: Story = { render: () => <Demo size="sm" min={0} /> };
export const WithMax: Story = {
	name: "Con máximo (10)",
	render: () => <Demo max={10} />,
};

export const InteractiveIncrement: Story = {
	render: () => <Demo min={1} max={5} />,
	play: async ({ canvas, userEvent }) => {
		const input = canvas.getByRole("spinbutton", {
			name: "Cantidad",
		}) as HTMLInputElement;
		const plusBtn = canvas.getByRole("button", { name: "Aumentar" });
		const minusBtn = canvas.getByRole("button", { name: "Disminuir" });

		await expect(input.value).toBe("1");

		await userEvent.click(plusBtn);
		await expect(input.value).toBe("2");

		await userEvent.click(plusBtn);
		await expect(input.value).toBe("3");

		await userEvent.click(minusBtn);
		await expect(input.value).toBe("2");
	},
};
