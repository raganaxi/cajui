export interface BrandingProps {
	/**
	 * The name of the company or application to be displayed
	 */
	companyName: string;
	/**
	 * Optional URL to the company logo image
	 */
	logoUrl?: string;
	/**
	 * Optional theme color override (e.g., '#4f46e5', 'rgb(79, 70, 229)').
	 * Overrides the local `--caj-primary` CSS variable on the branding panel container.
	 */
	themeColor?: string;
	/**
	 * Logo/brand block sizing
	 * @default 'md'
	 */
	size?: "sm" | "md" | "lg";
	/**
	 * Whether to apply a subtle Liquid Glass tint utilizing the primary theme color
	 * @default false
	 */
	glassTint?: boolean;
	/**
	 * Additional CSS classes to apply to the container
	 */
	className?: string;
}
