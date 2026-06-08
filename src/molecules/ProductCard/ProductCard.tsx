import { useState } from "react";
import { cn } from "@/lib/utils";
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
}

export interface ProductCardProps {
	product: Product;
	currency?: string;
	layout?: "grid" | "list";
	selected?: boolean;
	disabled?: boolean;
	onAdd?: (product: Product, selectedVariant?: ProductVariant) => void;
	className?: string;
	lowStockThreshold?: number;
}

export function ProductCard({
	product,
	currency = "MXN",
	layout = "grid",
	selected = false,
	disabled = false,
	onAdd,
	className,
	lowStockThreshold = 5,
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
