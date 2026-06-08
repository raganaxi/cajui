import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { iconMap } from "./icons";
import type { IconProps, IconSize } from "./interface";

const SIZE_MAP: Record<IconSize, number> = {
	xs: 12, // tiny helper icons
	sm: 16, // small button/input icons
	md: 20, // default icons for buttons/lists
	lg: 24, // headers/KPI cards
	xl: 32, // modal highlights/prominent icons
};

export const Icon = forwardRef<SVGSVGElement, IconProps>(
	({ name, icon, size = "md", className, ...props }, ref) => {
		// Resolve the icon component
		const IconComponent = icon || (name ? iconMap[name] : null);

		if (!IconComponent) {
			console.warn(
				"cajui [Icon]: You must provide either a valid 'name' preset or a custom 'icon' component.",
			);
			return null;
		}

		// Resolve size to pixels
		const pixelSize = typeof size === "number" ? size : SIZE_MAP[size] || 20;

		return (
			<IconComponent
				ref={ref}
				size={pixelSize}
				className={cn("caj-icon shrink-0", className)}
				{...props}
			/>
		);
	},
);

Icon.displayName = "Icon";
