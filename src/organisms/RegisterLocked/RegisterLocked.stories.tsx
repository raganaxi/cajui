import type { Meta, StoryObj } from "@storybook/react-vite";
import { Branding } from "@/atoms/Branding";
import { RegisterLocked } from "./RegisterLocked";

const meta: Meta<typeof RegisterLocked> = {
	title: "Organisms/RegisterLocked",
	component: RegisterLocked,
	tags: ["autodocs", "ai-generated", "needs-work"],
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"Pantalla completa de bloqueo de terminal. Oculta la interfaz del punto de venta tras un desenfoque (backdrop-blur) profundo cuando el cajero se ausenta, requiriendo su PIN para continuar y permitiendo ver opcionalmente un resumen privado de su turno.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof RegisterLocked>;

export const Default: Story = {
	args: {
		cashierName: "Sofia Loren (Caja 03)",
		companyBranding: <Branding companyName="Cajui POS" size="sm" />,
		onUnlock: (pin) => {
			console.log("Validando PIN:", pin);
			return pin === "1234";
		},
		onLogout: () => alert("Cerrando sesión del cajero..."),
	},
	render: (args) => (
		<div className="w-screen h-screen bg-slate-900 flex items-center justify-center relative">
			<div className="absolute inset-0 flex flex-col justify-between p-6 opacity-30 pointer-events-none">
				<header className="flex justify-between border-b border-white/10 pb-4">
					<div className="font-bold">CAJUI POS TERMINAL</div>
					<div>Caja abierta • Turno #14</div>
				</header>
				<main className="flex-1 grid grid-cols-3 gap-4 py-6">
					<div className="border border-white/10 rounded-xl p-4">
						Panel de Categorías
					</div>
					<div className="border border-white/10 rounded-xl p-4 col-span-2">
						Listado de Productos
					</div>
				</main>
			</div>
			<RegisterLocked {...args} />
		</div>
	),
};

export const WithShiftSummary: Story = {
	args: {
		cashierName: "Juan Pérez (Administrador)",
		companyBranding: (
			<Branding
				companyName="SuperMarket Cloud"
				size="sm"
				themeColor="#06b6d4"
			/>
		),
		shiftSummary: {
			salesCount: 42,
			salesTotal: 8450.75,
		},
		onUnlock: (pin) => pin === "9999",
		onLogout: () => alert("Cerrando sesión..."),
	},
	render: (args) => (
		<div className="w-screen h-screen bg-slate-900 flex items-center justify-center relative">
			<div className="absolute inset-0 flex flex-col justify-between p-6 opacity-30 pointer-events-none">
				<header className="flex justify-between border-b border-white/10 pb-4">
					<div className="font-bold">SUPERMARKET TERMINAL</div>
					<div>Caja abierta</div>
				</header>
				<main className="flex-1 grid grid-cols-3 gap-4 py-6">
					<div className="border border-white/10 rounded-xl p-4">
						Panel de Categorías
					</div>
					<div className="border border-white/10 rounded-xl p-4 col-span-2">
						Listado de Productos
					</div>
				</main>
			</div>
			<RegisterLocked {...args} />
		</div>
	),
};
