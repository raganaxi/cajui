import { useState } from "react";
import { Icon } from "@/atoms/Icon";
import { cn, formatCurrency } from "@/lib/utils";
import { CartItem } from "@/molecules/CartItem/CartItem";
import type { OnlineCheckoutProps, ShippingMethodOption } from "./interface";

// Simple card brand detector
function getCardBrand(
	number: string,
): "visa" | "mastercard" | "amex" | "unknown" {
	const cleanNumber = number.replace(/\D/g, "");
	if (cleanNumber.startsWith("4")) return "visa";
	if (/^(5[1-5]|2[2-7])/.test(cleanNumber)) return "mastercard";
	if (/^(34|37)/.test(cleanNumber)) return "amex";
	return "unknown";
}

// Format card number with spaces (1234 5678 1234 5678)
function formatCardNumber(value: string): string {
	const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
	const matches = v.match(/\d{4,16}/g);
	const match = (matches && matches[0]) || "";
	const parts = [];

	for (let i = 0, len = match.length; i < len; i += 4) {
		parts.push(match.substring(i, i + 4));
	}

	if (parts.length > 0) {
		return parts.join(" ");
	}
	return v;
}

// Format expiry (MM/AA)
function formatExpiry(value: string): string {
	const clean = value.replace(/\D/g, "");
	if (clean.length >= 2) {
		return `${clean.slice(0, 2)}/${clean.slice(2, 4)}`;
	}
	return clean;
}

export function OnlineCheckout({
	items,
	shippingMethods = [],
	taxRate = 16,
	discount = 0,
	discountType = "percent",
	currency = "MXN",
	locale = "es-MX",
	onSubmitPayment,
	onCancel,
	className,
}: OnlineCheckoutProps) {
	// Shipping Form States
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zipCode, setZipCode] = useState("");

	// Shipping selection
	const [selectedShipping, setSelectedShipping] =
		useState<ShippingMethodOption | null>(
			shippingMethods.length > 0 ? shippingMethods[0] : null,
		);

	// Mock Stripe card states
	const [cardNumber, setCardNumber] = useState("");
	const [cardExpiry, setCardExpiry] = useState("");
	const [cardCvc, setCardCvc] = useState("");
	const [cardZip, setCardZip] = useState("");

	// Card brand detection
	const cardBrand = getCardBrand(cardNumber);

	// Form validation and loading
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formError, setFormError] = useState("");

	// Calculate costs
	const subtotal = items.reduce((acc, item) => {
		const unitPrice = item.discount
			? item.price * (1 - item.discount / 100)
			: item.price;
		return acc + unitPrice * item.quantity;
	}, 0);

	const discountAmount =
		discountType === "percent" ? subtotal * (discount / 100) : discount;

	const afterDiscount = subtotal - discountAmount;
	const shippingCost = selectedShipping ? selectedShipping.price : 0;
	const taxAmount = (afterDiscount + shippingCost) * (taxRate / 100);
	const total = afterDiscount + shippingCost + taxAmount;

	const fmt = (v: number) => formatCurrency(v, currency, locale);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setFormError("");

		// Simple validations
		if (!email || !name || !phone || !address || !city || !state || !zipCode) {
			setFormError("Por favor completa todos los campos de envío.");
			return;
		}

		if (cardNumber.replace(/\s/g, "").length < 15) {
			setFormError("Número de tarjeta inválido.");
			return;
		}

		if (cardExpiry.length < 5) {
			setFormError("Fecha de vencimiento inválida.");
			return;
		}

		if (cardCvc.length < 3) {
			setFormError("Código CVC inválido.");
			return;
		}

		setIsSubmitting(true);

		// Simulate payment delay
		setTimeout(() => {
			setIsSubmitting(false);
			onSubmitPayment({
				shippingAddress: { email, name, phone, address, city, state, zipCode },
				shippingMethod: selectedShipping,
				totals: { subtotal, discountAmount, shippingCost, taxAmount, total },
				paymentMock: { cardBrand, last4: cardNumber.slice(-4) },
			});
		}, 2500);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={cn(
				"grid grid-cols-1 lg:grid-cols-12 gap-6 w-full text-white max-w-6xl mx-auto",
				className,
			)}
		>
			{/* === LEFT COLUMN: Checkout details (Forms) === */}
			<div className="lg:col-span-7 flex flex-col gap-5">
				{/* 1. Contact & Shipping form */}
				<div className="caj-glass p-5 rounded-2xl border border-white/10 space-y-4">
					<h3 className="text-base font-bold tracking-wide uppercase text-white/60 border-b border-white/5 pb-2">
						1. Datos de Contacto y Envío
					</h3>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						<div className="space-y-1">
							<label
								htmlFor="email"
								className="text-xs font-semibold text-white/75"
							>
								Correo electrónico
							</label>
							<input
								id="email"
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="ejemplo@correo.com"
								className="caj-input py-2 text-sm"
							/>
						</div>
						<div className="space-y-1">
							<label
								htmlFor="phone"
								className="text-xs font-semibold text-white/75"
							>
								Teléfono de contacto
							</label>
							<input
								id="phone"
								type="tel"
								required
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								placeholder="10 dígitos"
								className="caj-input py-2 text-sm"
							/>
						</div>
						<div className="sm:col-span-2 space-y-1">
							<label
								htmlFor="name"
								className="text-xs font-semibold text-white/75"
							>
								Nombre completo de quien recibe
							</label>
							<input
								id="name"
								type="text"
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Nombre y Apellidos"
								className="caj-input py-2 text-sm"
							/>
						</div>
						<div className="sm:col-span-2 space-y-1">
							<label
								htmlFor="address"
								className="text-xs font-semibold text-white/75"
							>
								Dirección (Calle, Número y Colonia)
							</label>
							<input
								id="address"
								type="text"
								required
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								placeholder="Av. Principal #123, Col. Centro"
								className="caj-input py-2 text-sm"
							/>
						</div>
						<div className="space-y-1">
							<label
								htmlFor="city"
								className="text-xs font-semibold text-white/75"
							>
								Ciudad
							</label>
							<input
								id="city"
								type="text"
								required
								value={city}
								onChange={(e) => setCity(e.target.value)}
								placeholder="Ciudad"
								className="caj-input py-2 text-sm"
							/>
						</div>
						<div className="grid grid-cols-2 gap-2">
							<div className="space-y-1">
								<label
									htmlFor="state"
									className="text-xs font-semibold text-white/75"
								>
									Estado
								</label>
								<input
									id="state"
									type="text"
									required
									value={state}
									onChange={(e) => setState(e.target.value)}
									placeholder="Estado"
									className="caj-input py-2 text-sm"
								/>
							</div>
							<div className="space-y-1">
								<label
									htmlFor="zipCode"
									className="text-xs font-semibold text-white/75"
								>
									C.P.
								</label>
								<input
									id="zipCode"
									type="text"
									required
									value={zipCode}
									onChange={(e) => setZipCode(e.target.value)}
									placeholder="Código Postal"
									className="caj-input py-2 text-sm"
								/>
							</div>
						</div>
					</div>
				</div>

				{/* 2. Shipping Methods */}
				{shippingMethods.length > 0 && (
					<div className="caj-glass p-5 rounded-2xl border border-white/10 space-y-4">
						<h3 className="text-base font-bold tracking-wide uppercase text-white/60 border-b border-white/5 pb-2">
							2. Método de Envío / Entrega
						</h3>
						<div className="grid grid-cols-1 gap-2.5">
							{shippingMethods.map((method) => {
								const isSelected = selectedShipping?.id === method.id;
								return (
									<button
										key={method.id}
										type="button"
										onClick={() => setSelectedShipping(method)}
										className={cn(
											"flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-150 active:scale-[0.99]",
											isSelected
												? "border-caj-primary/60 bg-caj-primary/10 [box-shadow:0_0_15px_rgba(var(--caj-primary-hover),0.1)]"
												: "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]",
										)}
									>
										<div className="flex items-center gap-3">
											<div
												className={cn(
													"h-4 w-4 rounded-full border flex items-center justify-center transition-colors",
													isSelected
														? "border-caj-primary bg-caj-primary"
														: "border-white/30",
												)}
											>
												{isSelected && (
													<div className="h-1.5 w-1.5 rounded-full bg-white" />
												)}
											</div>
											<div>
												<span className="font-semibold text-sm block">
													{method.label}
												</span>
												{method.duration && (
													<span className="text-xs text-white/50">
														{method.duration}
													</span>
												)}
											</div>
										</div>
										<span className="text-sm font-bold">
											{method.price === 0 ? "Gratis" : fmt(method.price)}
										</span>
									</button>
								);
							})}
						</div>
					</div>
				)}

				{/* 3. Payment Method (Stripe Card Element Mockup) */}
				<div className="caj-glass p-5 rounded-2xl border border-white/10 space-y-4">
					<h3 className="text-base font-bold tracking-wide uppercase text-white/60 border-b border-white/5 pb-2">
						3. Detalles de Pago (Stripe pasarela)
					</h3>

					<div className="space-y-3">
						<label className="text-xs font-semibold text-white/75">
							Tarjeta de Crédito o Débito
						</label>

						{/* Mocked Stripe Card input */}
						<div className="caj-glass flex flex-col sm:flex-row border border-white/15 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-caj-primary/50 focus-within:border-caj-primary/60 transition-all">
							{/* Card Brand Logo + Number input */}
							<div className="flex flex-1 items-center px-3 gap-2 border-b sm:border-b-0 sm:border-r border-white/10">
								{/* Card Brand icon indicator */}
								<span className="flex-shrink-0 w-8 h-5 flex items-center justify-center bg-white/5 rounded border border-white/10 font-bold text-[10px] text-white/50 uppercase tracking-tight">
									{cardBrand === "visa" && (
										<span className="text-blue-400 font-extrabold">VISA</span>
									)}
									{cardBrand === "mastercard" && (
										<span className="text-orange-400 font-extrabold">MC</span>
									)}
									{cardBrand === "amex" && (
										<span className="text-green-400 font-extrabold">AMEX</span>
									)}
									{cardBrand === "unknown" && <span>Card</span>}
								</span>
								<input
									type="text"
									required
									value={cardNumber}
									onChange={(e) =>
										setCardNumber(formatCardNumber(e.target.value))
									}
									placeholder="Número de tarjeta"
									className="bg-transparent border-0 focus:ring-0 focus:outline-none w-full py-2.5 text-sm font-mono placeholder:text-white/30 text-white"
									maxLength={19}
								/>
							</div>

							{/* Expiry, CVC, Zip fields inline */}
							<div className="flex w-full sm:w-auto divide-x divide-white/10">
								<input
									type="text"
									required
									value={cardExpiry}
									onChange={(e) => setExpiryValue(e.target.value)}
									placeholder="MM/AA"
									className="bg-transparent border-0 focus:ring-0 focus:outline-none w-20 text-center py-2.5 text-sm font-mono placeholder:text-white/30 text-white"
									maxLength={5}
								/>
								<input
									type="password"
									required
									value={cardCvc}
									onChange={(e) =>
										setCardCvc(e.target.value.replace(/\D/g, ""))
									}
									placeholder="CVC"
									className="bg-transparent border-0 focus:ring-0 focus:outline-none w-16 text-center py-2.5 text-sm font-mono placeholder:text-white/30 text-white"
									maxLength={4}
								/>
								<input
									type="text"
									required
									value={cardZip}
									onChange={(e) =>
										setCardZip(e.target.value.replace(/\D/g, ""))
									}
									placeholder="C.P."
									className="bg-transparent border-0 focus:ring-0 focus:outline-none flex-1 sm:w-20 text-center py-2.5 text-sm font-mono placeholder:text-white/30 text-white"
									maxLength={5}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* === RIGHT COLUMN: Order Summary === */}
			<div className="lg:col-span-5 flex flex-col gap-4">
				<div className="caj-glass p-5 rounded-2xl border border-white/10 flex flex-col gap-4 self-start w-full">
					<h3 className="text-base font-bold tracking-wide uppercase text-white/60 border-b border-white/5 pb-2">
						Resumen del Pedido
					</h3>

					{/* Scrollable list of items */}
					<div className="space-y-2 max-h-72 overflow-y-auto pr-1">
						{items.map((item) => (
							<CartItem
								key={item.id}
								item={item}
								currency={currency}
								readOnly
							/>
						))}
					</div>

					{/* Cost Breakdown */}
					<div className="border-t border-white/10 pt-3 space-y-1.5 text-sm">
						<div className="flex justify-between text-white/60">
							<span>Subtotal</span>
							<span className="font-mono">{fmt(subtotal)}</span>
						</div>
						{discount > 0 && (
							<div className="flex justify-between text-red-300">
								<span>
									Descuento {discountType === "percent" ? `(${discount}%)` : ""}
								</span>
								<span className="font-mono">-{fmt(discountAmount)}</span>
							</div>
						)}
						<div className="flex justify-between text-white/60">
							<span>Envío</span>
							<span className="font-mono">
								{shippingCost === 0 ? "Gratis" : fmt(shippingCost)}
							</span>
						</div>
						<div className="flex justify-between text-white/60">
							<span>IVA ({taxRate}%)</span>
							<span className="font-mono">{fmt(taxAmount)}</span>
						</div>
						<div className="flex justify-between text-lg font-bold border-t border-white/10 pt-2 text-white">
							<span>Total</span>
							<span className="text-caj-primary font-mono">{fmt(total)}</span>
						</div>
					</div>

					{formError && (
						<p className="text-xs text-red-400 font-semibold text-center mt-2">
							⚠️ {formError}
						</p>
					)}

					{/* Submit / Cancel actions */}
					<div className="space-y-2 mt-4">
						<button
							type="submit"
							disabled={isSubmitting || items.length === 0}
							className="caj-btn-primary py-3 rounded-xl w-full flex items-center justify-center font-bold text-sm select-none active:scale-98 transition-all disabled:opacity-50 disabled:pointer-events-none"
						>
							{isSubmitting ? (
								<div className="flex items-center gap-2">
									<Icon
										name="loading"
										size="sm"
										className="animate-spin text-white"
									/>
									Procesando Pago...
								</div>
							) : (
								`Pagar Ahora — ${fmt(total)}`
							)}
						</button>

						{onCancel && (
							<button
								type="button"
								onClick={onCancel}
								disabled={isSubmitting}
								className="caj-btn w-full py-2 rounded-xl text-xs font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-30"
							>
								Cancelar y volver
							</button>
						)}
					</div>
				</div>
			</div>
		</form>
	);

	function setExpiryValue(val: string) {
		let formatted = val.replace(/\D/g, "");
		if (cardNumber.length > 0) {
			formatted = formatExpiry(val);
		}
		setCardExpiry(formatted);
	}
}
