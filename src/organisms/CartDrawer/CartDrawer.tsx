import { useEffect, useRef } from "react";
import { Button } from "@/atoms/Button";
import { GlassPanel } from "@/atoms/GlassPanel";
import { PriceDisplay } from "@/atoms/PriceDisplay";
import { cn, formatCurrency } from "@/lib/utils";
import { QuantityControl } from "@/molecules/QuantityControl";

// ── SVG icons ────────────────────────────────────────────────────────────────

const CartIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		className="w-5 h-5"
		aria-hidden="true"
	>
		<path
			fillRule="evenodd"
			d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zm4.5-2.25a2.25 2.25 0 00-2.25 2.25v.75h4.5V6A2.25 2.25 0 0012 3.75zm-3 9a.75.75 0 011.5 0v3a.75.75 0 01-1.5 0v-3zm4.5 0a.75.75 0 011.5 0v3a.75.75 0 01-1.5 0v-3z"
			clipRule="evenodd"
		/>
	</svg>
);

const TrashIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="currentColor"
		className="w-4 h-4"
		aria-hidden="true"
	>
		<path
			fillRule="evenodd"
			d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
			clipRule="evenodd"
		/>
	</svg>
);

const CloseIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="currentColor"
		className="w-5 h-5"
		aria-hidden="true"
	>
		<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
	</svg>
);

const EmptyCartIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.5"
		className="w-16 h-16"
		aria-hidden="true"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
		/>
	</svg>
);

// ── Interfaces ────────────────────────────────────────────────────────────────

export interface CartDrawerItem {
	id: string;
	name: string;
	subtitle?: string;
	meta?: string;
	details?: string[];
	price: number;
	quantity: number;
	image?: string;
}

export interface CartDrawerProps {
	isOpen: boolean;
	onClose: () => void;
	items: CartDrawerItem[];
	onRemove: (id: string) => void;
	onQuantityChange: (id: string, qty: number) => void;
	subtotal: number;
	taxRate?: number;
	currency?: string;
	onCheckout: () => void;
	checkoutLabel?: string;
	secondaryAction?: {
		label: string;
		onClick: () => void;
	};
	emptyStateTitle?: string;
	emptyStateDescription?: string;
	className?: string;
}

// ── CartDrawerItemRow ─────────────────────────────────────────────────────────

function CartDrawerItemRow({
	item,
	currency,
	onRemove,
	onQuantityChange,
}: {
	item: CartDrawerItem;
	currency: string;
	onRemove: (id: string) => void;
	onQuantityChange: (id: string, qty: number) => void;
}) {
	const lineTotal = item.price * item.quantity;

	return (
		<div className="flex items-start gap-3 py-4 border-b border-white/[0.08] last:border-b-0">
			{/* Image / initials */}
			<div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-white/[0.10]">
				{item.image ? (
					<img
						src={item.image}
						alt={item.name}
						className="h-full w-full object-cover"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center">
						<span className="text-sm font-bold text-white/40">
							{item.name.slice(0, 2).toUpperCase()}
						</span>
					</div>
				)}
			</div>

			{/* Content */}
			<div className="min-w-0 flex-1 flex flex-col gap-1">
				<div className="flex items-start justify-between gap-2">
					<p className="font-bold text-sm text-white leading-tight line-clamp-2">
						{item.name}
					</p>
					{/* Remove button */}
					<button
						type="button"
						onClick={() => onRemove(item.id)}
						className="flex-shrink-0 rounded-lg p-1 text-white/40 hover:bg-red-500/20 hover:text-red-300 transition-colors"
						aria-label={`Eliminar ${item.name}`}
					>
						{TrashIcon}
					</button>
				</div>

				{item.subtitle && (
					<p
						className="text-xs font-medium"
						style={{ color: "rgb(var(--caj-primary))" }}
					>
						{item.subtitle}
					</p>
				)}

				{item.meta && (
					<p className="font-mono text-[11px] text-white/65">{item.meta}</p>
				)}

				{item.details && item.details.length > 0 && (
					<ul className="flex flex-col gap-0.5">
						{item.details.map((d) => (
							<li
								key={d}
								className="text-[11px] text-white/55 flex items-center gap-1.5 before:content-['•'] before:text-white/30"
							>
								{d}
							</li>
						))}
					</ul>
				)}

				<div className="flex items-center justify-between gap-2 mt-1.5">
					<QuantityControl
						value={item.quantity}
						min={1}
						max={9999}
						onChange={(q) => onQuantityChange(item.id, q)}
						size="sm"
					/>
					<PriceDisplay
						value={lineTotal}
						currency={currency}
						size="md"
						variant="highlight"
					/>
				</div>
			</div>
		</div>
	);
}

// ── CartDrawer ────────────────────────────────────────────────────────────────

export function CartDrawer({
	isOpen,
	onClose,
	items,
	onRemove,
	onQuantityChange,
	subtotal,
	taxRate = 16,
	currency = "MXN",
	onCheckout,
	checkoutLabel = "Proceder al Pago",
	secondaryAction,
	emptyStateTitle = "Tu carrito está vacío",
	emptyStateDescription,
	className,
}: CartDrawerProps) {
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const hasItems = items.length > 0;
	const itemCount = items.reduce((acc, i) => acc + i.quantity, 0);

	// Move focus to close button when drawer opens
	useEffect(() => {
		if (isOpen) {
			// Small timeout to allow CSS transition to begin
			const t = setTimeout(() => {
				closeButtonRef.current?.focus();
			}, 50);
			return () => clearTimeout(t);
		}
	}, [isOpen]);

	// Lock body scroll when open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	const taxAmount = subtotal * (taxRate / 100);
	const total = subtotal + taxAmount;
	const fmt = (v: number) => formatCurrency(v, currency);

	return (
		<>
			{/* Backdrop */}
			<div
				className={cn(
					"fixed inset-0 z-40 bg-black/60 backdrop-blur-[1px] transition-opacity duration-300",
					isOpen
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none",
				)}
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* Drawer */}
			<div
				role="dialog"
				aria-modal="true"
				aria-label="Carrito de compras"
				className={cn(
					"fixed top-0 right-0 z-50 h-screen w-full sm:w-[440px]",
					"flex flex-col",
					"transition-transform duration-300 ease-in-out",
					isOpen ? "translate-x-0" : "translate-x-full",
					className,
				)}
			>
				<GlassPanel
					strength="strong"
					radius="none"
					blur="xl"
					className="h-full flex flex-col overflow-hidden"
				>
					{/* Header */}
					<div className="flex-shrink-0 flex items-center justify-between gap-3 px-5 py-4 border-b border-white/10">
						<div className="flex items-center gap-2.5">
							<span className="text-white/80">{CartIcon}</span>
							<h2 className="font-bold text-white text-base">Tu Carrito</h2>
							{hasItems && (
								<span
									className="inline-flex items-center justify-center rounded-full w-5 h-5 text-[11px] font-bold text-white"
									style={{ backgroundColor: "rgb(var(--caj-primary))" }}
								>
									{itemCount}
								</span>
							)}
						</div>
						<button
							ref={closeButtonRef}
							type="button"
							onClick={onClose}
							aria-label="Cerrar carrito"
							className="rounded-xl p-1.5 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
						>
							{CloseIcon}
						</button>
					</div>

					{/* Content */}
					<div className="flex-1 overflow-y-auto px-5">
						{!hasItems ? (
							/* Empty state */
							<div className="flex flex-col items-center justify-center h-full gap-4 py-12 text-center">
								<span className="text-white/20">{EmptyCartIcon}</span>
								<div className="flex flex-col gap-1.5">
									<p className="font-bold text-white">{emptyStateTitle}</p>
									{emptyStateDescription && (
										<p className="text-sm text-white/55 max-w-[240px]">
											{emptyStateDescription}
										</p>
									)}
								</div>
							</div>
						) : (
							/* Items list */
							<div>
								{items.map((item) => (
									<CartDrawerItemRow
										key={item.id}
										item={item}
										currency={currency}
										onRemove={onRemove}
										onQuantityChange={onQuantityChange}
									/>
								))}
							</div>
						)}
					</div>

					{/* Footer */}
					{hasItems && (
						<div className="flex-shrink-0 border-t border-white/10 px-5 py-4 flex flex-col gap-3">
							{/* Totals */}
							<div className="flex flex-col gap-1">
								<div className="flex items-center justify-between text-sm">
									<span className="text-white/60">Subtotal</span>
									<span className="text-white tabular-nums">
										{fmt(subtotal)}
									</span>
								</div>
								{taxRate > 0 && (
									<div className="flex items-center justify-between text-sm">
										<span className="text-white/60">IVA ({taxRate}%)</span>
										<span className="text-white/60 tabular-nums">
											{fmt(taxAmount)}
										</span>
									</div>
								)}
								<div className="flex items-center justify-between pt-1 border-t border-white/10 mt-1">
									<span className="font-semibold text-white">Total</span>
									<span
										className="font-bold text-xl tabular-nums"
										style={{ color: "rgb(var(--caj-primary))" }}
									>
										{fmt(total)}
									</span>
								</div>
							</div>

							{/* Actions */}
							<Button variant="primary" size="lg" block onClick={onCheckout}>
								{checkoutLabel}
							</Button>
							{secondaryAction && (
								<Button
									variant="default"
									size="md"
									block
									onClick={secondaryAction.onClick}
								>
									{secondaryAction.label}
								</Button>
							)}
						</div>
					)}
				</GlassPanel>
			</div>
		</>
	);
}
