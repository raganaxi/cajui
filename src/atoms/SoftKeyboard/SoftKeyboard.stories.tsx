import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SoftKeyboard } from "./SoftKeyboard";

const meta: Meta<typeof SoftKeyboard> = {
	title: "Atoms/SoftKeyboard",
	component: SoftKeyboard,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Teclado táctil configurable. La prop `charset` restringe las teclas disponibles: `alphanumeric` muestra QWERTY + toggle a números, `numeric` solo el panel numérico, `alpha` solo letras. Diseñado para kioscos y tablets sin teclado físico.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof SoftKeyboard>;

function Demo({ charset }: { charset?: "alphanumeric" | "numeric" | "alpha" }) {
	const [value, setValue] = useState("");
	return (
		<div className="w-[400px] flex flex-col gap-3 p-4 caj-panel rounded-2xl">
			<div
				className="caj-glass flex items-center min-h-[52px] px-4 text-xl font-bold text-white tabular-nums"
				style={{ borderRadius: "var(--caj-glass-radius)" }}
			>
				{value || (
					<span className="text-white/40 text-base font-normal">
						Escribe algo…
					</span>
				)}
			</div>
			<SoftKeyboard
				value={value}
				onChange={setValue}
				onEnter={(v) => alert(`Confirmado: ${v}`)}
				charset={charset}
			/>
		</div>
	);
}

export const Alphanumeric: Story = {
	name: "Alfanumérico (default)",
	render: () => <Demo charset="alphanumeric" />,
};

export const Numeric: Story = {
	name: "Solo números",
	render: () => <Demo charset="numeric" />,
};

export const Alpha: Story = {
	name: "Solo letras",
	render: () => <Demo charset="alpha" />,
};
