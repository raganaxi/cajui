import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "./interface";

const VARIANT_CLASS: Record<NonNullable<ButtonProps["variant"]>, string> = {
	primary: "caj-btn-primary",
	success: "caj-btn-success",
	danger: "caj-btn-danger",
	warning: "caj-btn-warning",
	ghost: "caj-btn-ghost",
	text: "caj-btn-text",
	default: "caj-btn-default",
	chip: "caj-btn-chip",
	tab: "caj-btn-tab",
	dashed: "caj-btn-dashed",
};

// These variants manage their own base structure — no caj-btn wrapper
const NO_BASE = new Set<string>(["text", "tab"]);

// These variants respond to the active toggle modifier
const SUPPORTS_ACTIVE = new Set<string>(["default", "chip", "tab"]);

const SIZE_CLASS: Record<NonNullable<ButtonProps["size"]>, string> = {
	xs: "h-6 px-2 text-xs",
	sm: "h-8 px-3 text-xs",
	md: "h-10 px-4 text-sm",
	lg: "h-12 px-6 text-base",
	xl: "h-14 px-8 text-lg",
};

// These variants control their own sizing via CSS
const NO_SIZE = new Set<string>(["text", "tab"]);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			variant = "default",
			size = "md",
			active = false,
			loading = false,
			block = false,
			iconOnly = false,
			icon,
			iconPosition = "left",
			disabled,
			className,
			type = "button",
			...props
		},
		ref,
	) => {
		const isDisabled = disabled || loading;

		return (
			<button
				ref={ref}
				type={type}
				disabled={isDisabled}
				className={cn(
					!NO_BASE.has(variant) && "caj-btn",
					VARIANT_CLASS[variant],
					!NO_SIZE.has(variant) && SIZE_CLASS[size],
					active && SUPPORTS_ACTIVE.has(variant) && "caj-btn--active",
					iconOnly && "caj-btn--icon-only",
					block && "w-full",
					isDisabled && "opacity-40 pointer-events-none",
					className,
				)}
				{...props}
			>
				{loading && (
					<svg
						className="animate-spin h-4 w-4 shrink-0 text-current"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
				)}
				{!loading && icon && iconPosition === "left" && (
					<span className={cn(children ? "mr-0.5" : "")} aria-hidden="true">
						{icon}
					</span>
				)}
				{children && <span>{children}</span>}
				{!loading && icon && iconPosition === "right" && (
					<span className={cn(children ? "ml-0.5" : "")} aria-hidden="true">
						{icon}
					</span>
				)}
			</button>
		);
	},
);

Button.displayName = "Button";
