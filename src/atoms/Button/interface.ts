import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
	| "default" // glass morphism — the standard cajui button
	| "primary" // solid primary with glow
	| "success" // solid success
	| "warning" // solid warning
	| "danger" // solid danger
	| "ghost" // transparent border, hover fills glass
	| "text" // text-only, primary color
	| "chip" // pill-shaped filter toggle
	| "tab" // underline navigation tab
	| "dashed"; // dashed border secondary CTA

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	/** Toggleable selected state — works with default, chip and tab */
	active?: boolean;
	loading?: boolean;
	block?: boolean;
	/** Square aspect ratio for icon-only buttons */
	iconOnly?: boolean;
	icon?: ReactNode;
	iconPosition?: "left" | "right";
}
