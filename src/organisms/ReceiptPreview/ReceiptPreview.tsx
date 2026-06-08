import { Button } from "@/atoms/Button";
import type { PaymentType } from "@/atoms/PaymentMethod/PaymentMethod";
import { cn, formatCurrency } from "@/lib/utils";
import type { CartItemData } from "@/molecules/CartItem/CartItem";

const PAYMENT_LABELS: Record<PaymentType, string> = {
	cash: "Efectivo",
	card: "Tarjeta",
	transfer: "Transferencia",
	credit: "Crédito",
	voucher: "Vale",
	other: "Otro",
};

export interface ReceiptData {
	folio?: string;
	date?: string;
	time?: string;
	cashier?: string;
	business?: {
		name: string;
		address?: string;
		phone?: string;
		rfc?: string;
	};
	items: CartItemData[];
	subtotal: number;
	discount?: number;
	discountType?: "percent" | "fixed";
	taxRate?: number;
	tip?: number;
	total: number;
	paymentMethod?: PaymentType;
	tendered?: number;
	change?: number;
	currency?: string;
	locale?: string;
	footer?: string;
}

export interface ReceiptPreviewProps {
	data: ReceiptData;
	onPrint?: () => void;
	compact?: boolean;
	className?: string;
}

export function ReceiptPreview({
	data,
	onPrint,
	compact = false,
	className,
}: ReceiptPreviewProps) {
	const {
		folio,
		date,
		time,
		cashier,
		business,
		items,
		subtotal,
		discount = 0,
		discountType = "percent",
		taxRate = 0,
		tip = 0,
		total,
		paymentMethod,
		tendered,
		change,
		currency = "MXN",
		locale = "es-MX",
		footer,
	} = data;

	const fmt = (v: number) => formatCurrency(v, currency, locale);
	const discountAmt =
		discountType === "percent" ? subtotal * (discount / 100) : discount;
	const taxAmt = (subtotal - discountAmt) * (taxRate / 100);

	return (
		<div className={cn("flex flex-col", className)}>
			{/* Print button */}
			{onPrint && (
				<div className="mb-3 flex justify-end">
					<Button
						variant="primary"
						onClick={onPrint}
						icon={
							<svg
								className="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
								/>
							</svg>
						}
					>
						Imprimir ticket
					</Button>
				</div>
			)}

			{/* Ticket */}
			<div
				className={cn(
					"mx-auto w-full max-w-xs bg-white font-mono text-gray-900 shadow-lg",
					compact ? "text-xs" : "text-sm",
					"rounded-lg border border-gray-200 dark:border-gray-700",
				)}
				style={{ fontFamily: "'Courier New', Courier, monospace" }}
			>
				<div className={cn("p-4", compact ? "p-3" : "p-5")}>
					{/* Business header */}
					{business && (
						<div className="mb-3 text-center">
							<p className="text-base font-bold uppercase">{business.name}</p>
							{business.address && (
								<p className="text-xs">{business.address}</p>
							)}
							{business.phone && (
								<p className="text-xs">Tel: {business.phone}</p>
							)}
							{business.rfc && <p className="text-xs">RFC: {business.rfc}</p>}
						</div>
					)}

					<Divider />

					{/* Meta */}
					<div className="mb-2 space-y-0.5">
						{folio && <ReceiptRow label="Folio:" value={folio} />}
						{date && <ReceiptRow label="Fecha:" value={date} />}
						{time && <ReceiptRow label="Hora:" value={time} />}
						{cashier && <ReceiptRow label="Cajero:" value={cashier} />}
					</div>

					<Divider char="=" />

					{/* Items */}
					<div className="mb-2 space-y-1">
						{items.map((item) => {
							const unitPrice = item.discount
								? item.price * (1 - item.discount / 100)
								: item.price;
							const lineTotal = unitPrice * item.quantity;
							return (
								<div key={item.id}>
									<p className="truncate">{item.name}</p>
									<div className="flex justify-between pl-2 text-xs">
										<span>
											{item.quantity} x {fmt(unitPrice)}
										</span>
										<span>{fmt(lineTotal)}</span>
									</div>
									{item.discount && (
										<p className="pl-2 text-xs text-gray-500">
											{" "}
											Desc {item.discount}%
										</p>
									)}
								</div>
							);
						})}
					</div>

					<Divider />

					{/* Totals */}
					<div className="space-y-0.5">
						<ReceiptRow label="Subtotal:" value={fmt(subtotal)} />
						{discountAmt > 0 && (
							<ReceiptRow
								label={`Descuento${discountType === "percent" ? ` (${discount}%)` : ""}:`}
								value={`-${fmt(discountAmt)}`}
							/>
						)}
						{taxRate > 0 && (
							<ReceiptRow label={`IVA (${taxRate}%):`} value={fmt(taxAmt)} />
						)}
						{tip > 0 && <ReceiptRow label="Propina:" value={fmt(tip)} />}
					</div>

					<Divider char="=" />

					<div className="flex justify-between text-base font-bold">
						<span>TOTAL:</span>
						<span>{fmt(total)}</span>
					</div>

					{/* Payment */}
					{(paymentMethod || tendered !== undefined) && (
						<>
							<Divider />
							{paymentMethod && (
								<ReceiptRow
									label="Forma de pago:"
									value={PAYMENT_LABELS[paymentMethod]}
								/>
							)}
							{tendered !== undefined && (
								<ReceiptRow label="Recibido:" value={fmt(tendered)} />
							)}
							{change !== undefined && change > 0 && (
								<ReceiptRow label="Cambio:" value={fmt(change)} />
							)}
						</>
					)}

					{/* Footer */}
					{footer && (
						<>
							<Divider />
							<p className="text-center text-xs">{footer}</p>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

function Divider({ char = "-" }: { char?: string }) {
	return (
		<p className="my-2 overflow-hidden text-gray-400">{char.repeat(40)}</p>
	);
}

function ReceiptRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex justify-between gap-2">
			<span className="text-gray-600">{label}</span>
			<span className="text-right">{value}</span>
		</div>
	);
}
