import { useState } from "react";
import { Button } from "@/atoms/Button";
import { GlassPanel } from "@/atoms/GlassPanel";
import { cn } from "@/lib/utils";
import { ColorSwatchPicker } from "@/molecules/ColorSwatchPicker";
import { PriceDisplay } from "../../atoms/PriceDisplay/PriceDisplay";
import { StockBadge } from "../../atoms/StockBadge/StockBadge";

export interface ProductVariant {
	id: string;
	name: string; // e.g. "Translúcida Gris"
	price?: number; // specific price (optional)
	image?: string; // specific image (optional)
	colorHex?: string; // swatch color (optional)
	textureUrl?: string; // thumbnail image (optional)
}

export interface Product {
	id: string;
	name: string;
	price: number;
	sku?: string;
	image?: string;
	description?: string;
	category?: string;
	stock?: number;
	unit?: string;
	variants?: ProductVariant[];
	features?: string[];
}

export interface ProductCardProps {
	product: Product;
	currency?: string;
	layout?: "grid" | "list" | "shop";
	selected?: boolean;
	disabled?: boolean;
	onAdd?: (product: Product, selectedVariant?: ProductVariant) => void;
	className?: string;
	lowStockThreshold?: number;
	// shop layout extras
	unitPrice?: number;
	quantity?: number;
	onVariantChange?: (variantId: string) => void;
}

const CartBagIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="currentColor"
		className="w-4 h-4"
		aria-hidden="true"
	>
		<path
			fillRule="evenodd"
			d="M6 5v1H4.667a1.75 1.75 0 00-1.743 1.598l-.826 9.5A1.75 1.75 0 003.84 19H16.16a1.75 1.75 0 001.743-1.902l-.826-9.5A1.75 1.75 0 0015.333 6H14V5a4 4 0 00-8 0zm4-2.5A2.5 2.5 0 007.5 5v1h5V5A2.5 2.5 0 0010 2.5zM7.5 10a2.5 2.5 0 005 0V8.75a.75.75 0 011.5 0V10a4 4 0 01-8 0V8.75a.75.75 0 011.5 0V10z"
			clipRule="evenodd"
		/>
	</svg>
);

export function ProductCard({
	product,
	currency = "MXN",
	layout = "grid",
	selected = false,
	disabled = false,
	onAdd,
	className,
	lowStockThreshold = 5,
	unitPrice,
	quantity = 1,
	onVariantChange,
}: ProductCardProps) {
	const [activeVariant, setActiveVariant] = useState<
		ProductVariant | undefined
	>(
		product.variants && product.variants.length > 0
			? product.variants[0]
			: undefined,
	);

	const isOutOfStock = product.stock !== undefined && product.stock <= 0;

	const displayName = activeVariant
		? `${product.name} - ${activeVariant.name}`
		: product.name;
	const displayPrice =
		activeVariant?.price !== undefined ? activeVariant.price : product.price;
	const displayImage = activeVariant?.image || product.image;

	function handleVariantChange(variantId: string) {
		const v = product.variants?.find((x) => x.id === variantId);
		setActiveVariant(v);
		onVariantChange?.(variantId);
	}

	if (layout === "shop") {
		const colorSwatches =
			product.variants
				?.filter((v) => v.colorHex || v.textureUrl)
				.map((v) => ({
					id: v.id,
					name: v.name,
					hex: v.colorHex ?? "#888888",
					textureUrl: v.textureUrl,
				})) ?? [];

		const hasColorSwatches = colorSwatches.length > 0;

		const effectiveUnitPrice =
			unitPrice ?? activeVariant?.price ?? product.price;
		const total = effectiveUnitPrice * quantity;

		return (
			<GlassPanel
				radius="md"
				className={cn(
					"overflow-hidden flex flex-col justify-between",
					(disabled || isOutOfStock) && "pointer-events-none opacity-50",
					className,
				)}
			>
				{/* Hero image */}
				<div className="relative h-44 w-full overflow-hidden bg-white/[0.05]">
					{displayImage ? (
						<img
							src={displayImage}
							alt={product.name}
							className="h-full w-full object-cover"
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center">
							<span className="text-3xl font-bold text-white/20">
								{product.name
									.split(" ")
									.slice(0, 2)
									.map((w) => w[0])
									.join("")
									.toUpperCase()}
							</span>
						</div>
					)}
					{product.category && (
						<span className="absolute top-2 left-2 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/90">
							{product.category}
						</span>
					)}
				</div>

				{/* Body */}
				<div className="flex flex-col gap-2 p-4 flex-1">
					{/* Name + description */}
					<p className="font-bold text-white leading-tight line-clamp-1">
						{product.name}
					</p>
					{product.description && (
						<p className="text-xs text-white/70 leading-relaxed line-clamp-2">
							{product.description}
						</p>
					)}

					{/* Features */}
					{product.features && product.features.length > 0 && (
						<div className="flex flex-wrap gap-1.5">
							{product.features.slice(0, 2).map((f) => (
								<span
									key={f}
									className="caj-glass-subtle rounded-full px-2 py-0.5 text-[9px] font-medium text-white/70 border border-white/10"
								>
									{f}
								</span>
							))}
						</div>
					)}

					{/* Color swatches */}
					{hasColorSwatches && (
						<div className="flex items-center justify-between gap-2 mt-1">
							<span className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
								Tela / Color
							</span>
							<span className="text-[10px] text-white/70 font-medium">
								{activeVariant?.name}
							</span>
						</div>
					)}
					{hasColorSwatches && (
						<ColorSwatchPicker
							swatches={colorSwatches}
							selectedId={activeVariant?.id}
							onChange={handleVariantChange}
							size="md"
						/>
					)}
				</div>

				{/* Footer: pricing + CTA */}
				<div className="border-t border-white/10 bg-white/[0.03] px-4 py-3 flex flex-col gap-3">
					{unitPrice !== undefined ? (
						<div className="flex items-end justify-between gap-2">
							<div className="flex flex-col gap-0.5">
								<span className="text-[10px] text-white/50 uppercase tracking-wider">
									Precio unitario
								</span>
								<PriceDisplay
									value={effectiveUnitPrice}
									currency={currency}
									size="sm"
									variant="muted"
								/>
							</div>
							<div className="flex flex-col items-end gap-0.5">
								<span className="text-[10px] text-white/50 uppercase tracking-wider">
									Total ({quantity}u)
								</span>
								<PriceDisplay
									value={total}
									currency={currency}
									size="lg"
									variant="positive"
								/>
							</div>
						</div>
					) : (
						<div className="flex items-center justify-between">
							<PriceDisplay
								value={effectiveUnitPrice}
								currency={currency}
								size="lg"
								variant="highlight"
							/>
							{product.stock !== undefined && (
								<StockBadge
									quantity={product.stock}
									lowThreshold={lowStockThreshold}
								/>
							)}
						</div>
					)}
					<Button
						variant="primary"
						size="md"
						block
						disabled={disabled || isOutOfStock}
						onClick={() => onAdd?.(product, activeVariant)}
						icon={CartBagIcon}
					>
						Agregar al Carrito
					</Button>
				</div>
			</GlassPanel>
		);
	}

	if (layout === "list") {
		return (
			<div
				className={cn(
					"group flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left",
					"backdrop-blur-md transition-all duration-100",
					"focus-within:ring-2 focus-within:ring-white/40",
					selected
						? "border-caj-primary/60 bg-caj-primary/20 [box-shadow:0_0_20px_rgb(var(--caj-primary)/0.2)]"
						: "border-white/[0.18] bg-white/[0.08]",
					(disabled || isOutOfStock) && "pointer-events-none opacity-50",
					className,
				)}
			>
				<button
					type="button"
					onClick={() => !isOutOfStock && onAdd?.(product, activeVariant)}
					disabled={disabled || isOutOfStock}
					className="flex flex-1 items-center gap-3 text-left focus:outline-none"
				>
					<ProductImage image={displayImage} name={displayName} size="sm" />
					<div className="min-w-0 flex-1">
						<p className="truncate font-semibold text-white">{displayName}</p>
						{product.sku && (
							<p className="truncate font-mono text-xs text-white/50">
								{product.sku}
							</p>
						)}
					</div>
				</button>

				{/* Swatches (if any) in list view */}
				{product.variants && product.variants.length > 0 && (
					<div className="flex items-center gap-1.5 px-2">
						{product.variants.map((v) => (
							<button
								key={v.id}
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									setActiveVariant(v);
								}}
								className={cn(
									"h-6 w-6 rounded-full border transition-all duration-150 focus:outline-none",
									activeVariant?.id === v.id
										? "border-white ring-2 ring-caj-primary scale-110"
										: "border-white/20 hover:border-white/50 hover:scale-105",
								)}
								style={{
									backgroundColor: v.colorHex || "#333",
									backgroundImage: v.textureUrl
										? `url(${v.textureUrl})`
										: undefined,
									backgroundSize: "cover",
								}}
								title={v.name}
							/>
						))}
					</div>
				)}

				{product.stock !== undefined && (
					<StockBadge
						quantity={product.stock}
						lowThreshold={lowStockThreshold}
						showCount
					/>
				)}
				<PriceDisplay
					value={displayPrice}
					currency={currency}
					size="lg"
					variant="highlight"
				/>
			</div>
		);
	}

	return (
		<div
			className={cn(
				"group flex flex-col overflow-hidden rounded-2xl border text-left",
				"backdrop-blur-md transition-all duration-100",
				"focus-within:ring-2 focus-within:ring-white/40",
				selected
					? "border-caj-primary/60 bg-caj-primary/20 [box-shadow:0_0_20px_rgb(var(--caj-primary)/0.2)]"
					: "border-white/[0.18] bg-white/[0.08]",
				(disabled || isOutOfStock) && "pointer-events-none opacity-50",
				className,
			)}
		>
			<button
				type="button"
				onClick={() => !isOutOfStock && onAdd?.(product, activeVariant)}
				disabled={disabled || isOutOfStock}
				className="flex flex-col text-left focus:outline-none w-full"
			>
				<ProductImage image={displayImage} name={displayName} size="lg" />
			</button>
			<div className="flex flex-col gap-1.5 p-3 flex-1 justify-between">
				<div className="space-y-1.5">
					<p className="line-clamp-2 text-sm font-semibold leading-tight text-white">
						{displayName}
					</p>
					{product.sku && (
						<p className="font-mono text-xs text-white/50">{product.sku}</p>
					)}

					{/* Swatches (if any) in grid view */}
					{product.variants && product.variants.length > 0 && (
						<div className="flex flex-wrap items-center gap-1.5 py-1">
							{product.variants.map((v) => (
								<button
									key={v.id}
									type="button"
									onClick={() => setActiveVariant(v)}
									className={cn(
										"h-5 w-5 rounded-full border transition-all duration-150 focus:outline-none",
										activeVariant?.id === v.id
											? "border-white ring-1 ring-caj-primary scale-110"
											: "border-white/20 hover:border-white/50 hover:scale-105",
									)}
									style={{
										backgroundColor: v.colorHex || "#333",
										backgroundImage: v.textureUrl
											? `url(${v.textureUrl})`
											: undefined,
										backgroundSize: "cover",
									}}
									title={v.name}
								/>
							))}
						</div>
					)}
				</div>

				<div className="flex items-center justify-between gap-2 mt-2">
					<PriceDisplay
						value={displayPrice}
						currency={currency}
						size="md"
						variant="highlight"
					/>
					{product.stock !== undefined && (
						<StockBadge
							quantity={product.stock}
							lowThreshold={lowStockThreshold}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

function ProductImage({
	image,
	name,
	size,
}: {
	image?: string;
	name: string;
	size: "sm" | "lg";
}) {
	const cls =
		size === "lg" ? "h-32 w-full" : "h-10 w-10 rounded-lg flex-shrink-0";

	if (image) {
		return (
			<img
				src={image}
				alt={name}
				className={cn(
					cls,
					size === "lg" ? "object-cover" : "object-contain rounded-lg",
				)}
			/>
		);
	}

	const initials = name
		.split(" ")
		.slice(0, 2)
		.map((w) => w[0])
		.join("")
		.toUpperCase();

	return (
		<div
			className={cn(
				cls,
				"flex items-center justify-center bg-white/[0.08]",
				size === "lg" ? "" : "rounded-lg",
			)}
			aria-hidden
		>
			<span className="text-lg font-bold text-gray-400 dark:text-gray-500">
				{initials}
			</span>
		</div>
	);
}
