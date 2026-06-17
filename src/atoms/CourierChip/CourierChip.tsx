import { cn } from "@/lib/utils";

export interface CourierConfig {
	id: string;
	name: string;
	bg: string;
	fg: string;
	accent: string;
}

export interface CourierChipProps {
	courier: CourierConfig;
	size?: "sm" | "md" | "lg";
	className?: string;
}

const SIZE = {
	sm: { padding: "px-2.5 py-1", text: "text-xs", dot: "w-2 h-2 rounded-[3px]" },
	md: {
		padding: "px-3.5 py-1.5",
		text: "text-sm",
		dot: "w-2.5 h-2.5 rounded-[4px]",
	},
	lg: {
		padding: "px-5 py-2.5",
		text: "text-lg",
		dot: "w-3.5 h-3.5 rounded-[5px]",
	},
} as const;

export function CourierChip({
	courier,
	size = "md",
	className,
}: CourierChipProps) {
	const s = SIZE[size];
	return (
		<span
			className={cn(
				"inline-flex items-center gap-2 rounded-full font-bold whitespace-nowrap",
				s.padding,
				s.text,
				className,
			)}
			style={{
				background: courier.bg,
				color: courier.fg,
				boxShadow: `0 4px 14px ${courier.bg}55`,
			}}
		>
			<span
				className={cn("shrink-0", s.dot)}
				style={{
					background: courier.accent,
					boxShadow: "0 0 0 2px rgba(255,255,255,0.35)",
				}}
			/>
			{courier.name}
		</span>
	);
}
