export interface PriceDisplayProps {
	value: number;
	currency?: string;
	locale?: string;
	variant?: "default" | "positive" | "negative" | "muted" | "highlight";
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
	strikethrough?: boolean;
	prefix?: string;
	suffix?: string;
	className?: string;
	"aria-label"?: string;
}
