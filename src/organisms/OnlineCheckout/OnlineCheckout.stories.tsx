import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CartItemData } from "@/molecules/CartItem/CartItem";
import type { ShippingMethodOption } from "./interface";
import { OnlineCheckout } from "./OnlineCheckout";

const MOCK_CART_ITEMS: CartItemData[] = [
	{
		id: "cart-1",
		name: "Persiana Enrollable Basic - Gris Claro",
		price: 280,
		quantity: 2,
		sku: "PER-ENR-BSC-v1-2",
		unit: "Pza",
	},
	{
		id: "cart-2",
		name: "Persiana Sheer Elegance - Arena Natural",
		price: 650,
		quantity: 1,
		sku: "PER-SHR-ELG-v3-2",
		unit: "Pza",
		discount: 10, // 10% discount
	},
];

const MOCK_SHIPPING_METHODS: ShippingMethodOption[] = [
	{
		id: "ship-1",
		label: "Estafeta Terrestre",
		price: 150,
		duration: "Entrega estimada: 3 - 5 días hábiles",
	},
	{
		id: "ship-2",
		label: "DHL Express",
		price: 320,
		duration: "Entrega estimada: Siguiente día hábil",
	},
	{
		id: "ship-3",
		label: "Recolección en sucursal (Planta)",
		price: 0,
		duration: "Listo para recolectar en 24 horas",
	},
];

const meta: Meta<typeof OnlineCheckout> = {
	title: "Ecommerce / OnlineCheckout",
	component: OnlineCheckout,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"Pantalla de pasarela de pago en línea (Checkout) con estética *Liquid Glass*. Integra formulario de entrega del cliente, selector de paqueterías con recargos de envío, un input mockeado que replica el Stripe Card Element (con formato dinámico y logotipos de tarjeta), desglose de precios (Subtotal, Descuentos, Envío, IVA y Total) y estado de procesamiento asíncrono para el cobro.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof OnlineCheckout>;

export const Default: Story = {
	args: {
		items: MOCK_CART_ITEMS,
		shippingMethods: MOCK_SHIPPING_METHODS,
		taxRate: 16, // 16% IVA
		discount: 5, // 5% discount on checkout total
		discountType: "percent",
		onSubmitPayment: (data) => {
			console.log("Pago completado con éxito:", data);
			alert(
				`¡Pago exitoso! Marca tarjeta: ${data.paymentMock.cardBrand.toUpperCase()} | Últimos 4 dígitos: ${data.paymentMock.last4}`,
			);
		},
		onCancel: () => {
			console.log("Checkout cancelado");
		},
	},
	decorators: [
		(S) => (
			<div className="caj-panel w-full p-6 rounded-3xl min-h-[700px] overflow-y-auto">
				<S />
			</div>
		),
	],
};
