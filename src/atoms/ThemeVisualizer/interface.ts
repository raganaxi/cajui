export interface ThemeVisualizerProps {
	/**
	 * Whether to display the brand and status color palette
	 * @default true
	 */
	showColors?: boolean;
	/**
	 * Whether to display the glassmorphism surface design variables
	 * @default true
	 */
	showGlassTokens?: boolean;
	/**
	 * Whether to display background gradients
	 * @default true
	 */
	showGradients?: boolean;
	/**
	 * Additional CSS classes to apply to the container
	 */
	className?: string;
}
