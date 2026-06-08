import type { LucideIcon } from "lucide-react";
import type { SVGProps } from "react";
import type { IconName } from "./icons";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "size"> {
	/** Preset icon name from cajui's standard map */
	name?: IconName;
	/** Custom lucide-react icon component */
	icon?: LucideIcon;
	/** Preset size ('xs', 'sm', 'md', 'lg', 'xl') or custom size in pixels */
	size?: IconSize | number;
}
export type { IconName };
