import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const stockBadgeVariants = cva(
	"inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold border backdrop-blur-sm",
	{
		variants: {
			status: {
				"in-stock": "bg-green-500/20 border-green-500/35 text-green-300",
				"low-stock": "bg-amber-500/20 border-amber-500/35 text-amber-300",
				"out-of-stock": "bg-red-500/20  border-red-500/35  text-red-300",
			},
		},
		defaultVariants: { status: "in-stock" },
	},
);

const DOT_COLORS = {
	"in-stock": "bg-green-500",
	"low-stock": "bg-amber-500",
	"out-of-stock": "bg-red-500",
};

const DEFAULT_LABELS = {
	"in-stock": "En stock",
	"low-stock": "Stock bajo",
	"out-of-stock": "Agotado",
};

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export interface StockBadgeProps
	extends VariantProps<typeof stockBadgeVariants> {
	quantity?: number;
	lowThreshold?: number;
	outThreshold?: number;
	showCount?: boolean;
	labels?: Partial<Record<StockStatus, string>>;
	className?: string;
}

function getStatus(qty: number, low: number, out: number): StockStatus {
	if (qty <= out) return "out-of-stock";
	if (qty <= low) return "low-stock";
	return "in-stock";
}

export function StockBadge({
	quantity,
	lowThreshold = 5,
	outThreshold = 0,
	showCount = false,
	labels,
	className,
}: StockBadgeProps) {
	const status: StockStatus =
		quantity !== undefined
			? getStatus(quantity, lowThreshold, outThreshold)
			: "in-stock";

	const label = labels?.[status] ?? DEFAULT_LABELS[status];

	return (
		<span
			className={cn(
				"caj-stock-badge",
				`caj-stock-${status}`,
				stockBadgeVariants({ status }),
				className,
			)}
		>
			<span
				className={cn("h-1.5 w-1.5 rounded-full", DOT_COLORS[status])}
				aria-hidden
			/>
			{label}
			{showCount && quantity !== undefined && (
				<span className="opacity-75">({quantity})</span>
			)}
		</span>
	);
}
