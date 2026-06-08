import { cva } from "class-variance-authority";
import { GlassPanel } from "@/atoms/GlassPanel";
import { cn } from "@/lib/utils";

const trendVariants = cva("caj-kpi-trend mb-0.5", {
	variants: {
		trend: {
			up: "caj-kpi-trend-up",
			down: "caj-kpi-trend-down",
			neutral: "caj-kpi-trend-neutral",
		},
	},
});

export type KPITrend = "up" | "down" | "neutral";

export interface KPICardProps {
	label: string;
	value: string | number;
	previousValue?: string | number;
	trend?: KPITrend;
	trendLabel?: string;
	icon?: React.ReactNode;
	color?: "default" | "green" | "blue" | "amber" | "red" | "purple";
	description?: string;
	className?: string;
}

const ICON_BG_CLASS = {
	default: "caj-kpi-icon-default",
	green: "caj-kpi-icon-green",
	blue: "caj-kpi-icon-blue",
	amber: "caj-kpi-icon-amber",
	red: "caj-kpi-icon-red",
	purple: "caj-kpi-icon-purple",
};

function TrendArrow({ trend }: { trend: KPITrend }) {
	if (trend === "up") return <span>↑</span>;
	if (trend === "down") return <span>↓</span>;
	return <span>→</span>;
}

export function KPICard({
	label,
	value,
	previousValue,
	trend,
	trendLabel,
	icon,
	color = "default",
	description,
	className,
}: KPICardProps) {
	const changePercent =
		trend === undefined &&
		typeof value === "number" &&
		typeof previousValue === "number" &&
		previousValue !== 0
			? ((value - previousValue) / Math.abs(previousValue)) * 100
			: null;

	const derivedTrend: KPITrend | undefined =
		trend ??
		(changePercent !== null
			? changePercent > 0
				? "up"
				: changePercent < 0
					? "down"
					: "neutral"
			: undefined);

	return (
		<GlassPanel
			strength="medium"
			radius="lg"
			shadow
			padding="md"
			className={cn("caj-kpi-card flex flex-col gap-3", className)}
		>
			<div className="flex items-start justify-between">
				<p className="text-sm font-medium text-white/60">{label}</p>
				{icon && (
					<span className={cn("caj-kpi-icon", ICON_BG_CLASS[color])}>
						{icon}
					</span>
				)}
			</div>

			<div className="flex items-end gap-2 flex-wrap">
				<span className="text-2xl font-bold tabular-nums text-white">
					{value}
				</span>
				{derivedTrend && (
					<span className={trendVariants({ trend: derivedTrend })}>
						<TrendArrow trend={derivedTrend} />
						{trendLabel ??
							(changePercent !== null
								? `${Math.abs(changePercent).toFixed(1)}%`
								: "")}
					</span>
				)}
			</div>

			{description && <p className="text-xs text-white/40">{description}</p>}
		</GlassPanel>
	);
}
