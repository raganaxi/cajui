import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "@/atoms/Button";
import type { CartDrawerItem } from "./CartDrawer";
import { CartDrawer } from "./CartDrawer";

const meta: Meta<typeof CartDrawer> = {
	title: "Organisms/CartDrawer",
	component: CartDrawer,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"Panel lateral de carrito que desliza desde la derecha. 440 px en escritorio, ancho completo en móvil. Muestra ítems, totales y acciones de pago.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof CartDrawer>;

const Canvas = ({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<div className={`caj-panel p-6 rounded-2xl ${className}`}>{children}</div>
);

const SAMPLE_ITEMS: CartDrawerItem[] = [
	{
		id: "item-1",
		name: "Persiana Roller Blackout",
		subtitle: "Negro Ónix",
		meta: "2.2m × 1.8m (3.96 m²)",
		details: ["Control: Cadena", "Sin cajillo", "Instalación incluida"],
		price: 1240,
		quantity: 1,
	},
	{
		id: "item-2",
		name: "Cortina Sheer Voile",
		subtitle: "Blanco Perla",
		meta: "3.0m × 2.4m (7.20 m²)",
		details: ["Modelo: Pliegue Holandés", "2 paños"],
		price: 870,
		quantity: 2,
	},
	{
		id: "item-3",
		name: "Riel Doble Aluminio",
		price: 320,
		quantity: 3,
	},
];

function subtotalFromItems(items: CartDrawerItem[]) {
	return items.reduce((acc, i) => acc + i.price * i.quantity, 0);
}

// ── Abierto ───────────────────────────────────────────────────────────────────
export const Abierto: Story = {
	name: "Abierto — Con Items",
	render: () => {
		const [open, setOpen] = useState(true);
		const [items, setItems] = useState<CartDrawerItem[]>(SAMPLE_ITEMS);

		function handleRemove(id: string) {
			setItems((prev) => prev.filter((i) => i.id !== id));
		}

		function handleQty(id: string, qty: number) {
			setItems((prev) =>
				prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
			);
		}

		return (
			<Canvas>
				<Button variant="primary" onClick={() => setOpen(true)}>
					Abrir Carrito
				</Button>
				<CartDrawer
					isOpen={open}
					onClose={() => setOpen(false)}
					items={items}
					onRemove={handleRemove}
					onQuantityChange={handleQty}
					subtotal={subtotalFromItems(items)}
					taxRate={16}
					currency="MXN"
					onCheckout={() => alert("¡Procediendo al pago!")}
					checkoutLabel="Proceder al Pago"
				/>
			</Canvas>
		);
	},
};

// ── Vacío ─────────────────────────────────────────────────────────────────────
export const Vacio: Story = {
	name: "Vacío — Empty State",
	render: () => {
		const [open, setOpen] = useState(true);

		return (
			<Canvas>
				<Button variant="primary" onClick={() => setOpen(true)}>
					Abrir Carrito
				</Button>
				<CartDrawer
					isOpen={open}
					onClose={() => setOpen(false)}
					items={[]}
					onRemove={() => {}}
					onQuantityChange={() => {}}
					subtotal={0}
					onCheckout={() => {}}
					emptyStateTitle="Tu carrito está vacío"
					emptyStateDescription="Agrega productos desde el catálogo para comenzar tu pedido."
				/>
			</Canvas>
		);
	},
};

// ── Con Acción Secundaria ──────────────────────────────────────────────────────
export const ConAccionSecundaria: Story = {
	name: "Con Acción Secundaria",
	render: () => {
		const [open, setOpen] = useState(true);
		const [items, setItems] = useState<CartDrawerItem[]>(SAMPLE_ITEMS);

		function handleRemove(id: string) {
			setItems((prev) => prev.filter((i) => i.id !== id));
		}

		function handleQty(id: string, qty: number) {
			setItems((prev) =>
				prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
			);
		}

		return (
			<Canvas>
				<Button variant="primary" onClick={() => setOpen(true)}>
					Abrir Carrito
				</Button>
				<CartDrawer
					isOpen={open}
					onClose={() => setOpen(false)}
					items={items}
					onRemove={handleRemove}
					onQuantityChange={handleQty}
					subtotal={subtotalFromItems(items)}
					taxRate={16}
					currency="MXN"
					onCheckout={() => alert("¡Procediendo al pago!")}
					checkoutLabel="Proceder al Pago"
					secondaryAction={{
						label: "Guardar cotización",
						onClick: () => alert("Cotización guardada"),
					}}
				/>
			</Canvas>
		);
	},
};

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground: Story = {
	args: {
		isOpen: true,
		items: SAMPLE_ITEMS,
		subtotal: subtotalFromItems(SAMPLE_ITEMS),
		taxRate: 16,
		currency: "MXN",
		checkoutLabel: "Proceder al Pago",
		emptyStateTitle: "Tu carrito está vacío",
	},
	render: (args) => {
		const [open, setOpen] = useState(args.isOpen ?? true);
		const [items, setItems] = useState<CartDrawerItem[]>(
			args.items ?? SAMPLE_ITEMS,
		);

		function handleRemove(id: string) {
			setItems((prev) => prev.filter((i) => i.id !== id));
		}

		function handleQty(id: string, qty: number) {
			setItems((prev) =>
				prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
			);
		}

		return (
			<Canvas>
				<Button variant="primary" onClick={() => setOpen(true)}>
					Abrir Carrito
				</Button>
				<CartDrawer
					{...args}
					isOpen={open}
					onClose={() => setOpen(false)}
					items={items}
					onRemove={handleRemove}
					onQuantityChange={handleQty}
					subtotal={subtotalFromItems(items)}
					onCheckout={() => alert("¡Checkout!")}
				/>
			</Canvas>
		);
	},
};
