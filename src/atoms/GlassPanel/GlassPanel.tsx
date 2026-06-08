import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { GlassPanelProps } from "./interface";

const glassPanelVariants = cva("relative", {
	variants: {
		blur: {
			none: "",
			xs: "[backdrop-filter:blur(4px)_saturate(120%)] [-webkit-backdrop-filter:blur(4px)_saturate(120%)]",
			sm: "[backdrop-filter:blur(8px)_saturate(150%)] [-webkit-backdrop-filter:blur(8px)_saturate(150%)]",
			md: "[backdrop-filter:blur(16px)_saturate(160%)] [-webkit-backdrop-filter:blur(16px)_saturate(160%)]",
			lg: "[backdrop-filter:blur(24px)_saturate(180%)] [-webkit-backdrop-filter:blur(24px)_saturate(180%)]",
			xl: "[backdrop-filter:blur(32px)_saturate(200%)] [-webkit-backdrop-filter:blur(32px)_saturate(200%)]",
		},
		tint: {
			none: "bg-transparent border-transparent",
			white: "bg-white/[0.08] border-white/[0.18]",
			primary: "bg-caj-primary/[0.15] border-caj-primary/[0.35]",
			danger: "bg-caj-danger/[0.15]  border-caj-danger/[0.35]",
			warning: "bg-caj-warning/[0.15] border-caj-warning/[0.35]",
			dark: "bg-black/[0.30] border-white/[0.08]",
		},
		strength: {
			subtle: "",
			medium: "",
			strong: "",
		},
		radius: {
			none: "rounded-none",
			sm: "rounded-xl",
			md: "rounded-[14px]",
			lg: "rounded-2xl",
			xl: "rounded-3xl",
			"2xl": "rounded-[24px]",
			full: "rounded-full",
		},
		shadow: {
			true: "[box-shadow:0_8px_32px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.25)]",
			false: "",
		},
	},
	compoundVariants: [
		{
			tint: "white",
			strength: "subtle",
			className: "bg-white/[0.05] border-white/[0.10]",
		},
		{
			tint: "white",
			strength: "strong",
			className:
				"bg-white/[0.18] border-white/[0.32] [box-shadow:0_12px_40px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.38)]",
		},
	],
	defaultVariants: {
		blur: "lg",
		tint: "white",
		strength: "medium",
		radius: "lg",
		shadow: true,
	},
});

const PADDING = {
	false: "",
	true: "p-4",
	sm: "p-3",
	md: "p-4",
	lg: "p-6",
};

export function GlassPanel({
	children,
	blur,
	tint,
	strength,
	radius,
	padding = false,
	shadow,
	className,
	as: Tag = "div",
	onClick,
	style,
}: GlassPanelProps) {
	const padClass =
		typeof padding === "boolean"
			? PADDING[String(padding) as "true" | "false"]
			: PADDING[padding];

	const strengthClass = {
		subtle: "caj-glass-subtle",
		medium: "caj-glass",
		strong: "caj-glass-strong",
	}[strength ?? "medium"];

	return (
		<Tag
			className={cn(
				glassPanelVariants({
					blur,
					tint,
					strength,
					radius,
					shadow: shadow as boolean | undefined,
				}),
				strengthClass,
				"border",
				padClass,
				onClick && "cursor-pointer",
				className,
			)}
			onClick={onClick}
			style={style}
		>
			{children}
		</Tag>
	);
}
