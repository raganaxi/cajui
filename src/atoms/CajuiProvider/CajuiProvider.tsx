import { cn } from "@/lib/utils";
import { designTokens } from "@/tokens";
import { CajuiContext } from "./context";
import type { CajuiProviderProps } from "./interface";

const GRADIENTS: Record<string, string> = {
	default: designTokens.gradients.default,
	warm: designTokens.gradients.warm,
	cool: designTokens.gradients.cool,
	midnight: designTokens.gradients.midnight,
	none: "",
};

/**
 * Root wrapper for cajui apps.
 * Injects the glass gradient background and the `data-cajui-root` attribute
 * needed for scoped base styles.
 *
 * Place it at the top of your component tree:
 * ```tsx
 * <CajuiProvider gradient="default">
 *   <MyPOSApp />
 * </CajuiProvider>
 * ```
 */
export function CajuiProvider({
	children,
	gradient = "default",
	className,
	style,
	theme = "cajui",
}: CajuiProviderProps) {
	const activeTheme = theme;

	// Accessible and Amalli themes use solid backgrounds — no gradient
	const activeGradient =
		activeTheme.startsWith("accessible") || activeTheme.startsWith("amalli")
			? "none"
			: gradient;
	const bg = GRADIENTS[activeGradient] ?? "";

	return (
		<CajuiContext.Provider
			value={{ theme: activeTheme, gradient: activeGradient }}
		>
			<div
				data-cajui-root
				data-cajui-theme={activeTheme}
				className={cn("min-h-dvh w-full font-pos", className)}
				style={{
					...(bg ? { background: bg } : {}),
					...style,
				}}
			>
				{children}
			</div>
		</CajuiContext.Provider>
	);
}
