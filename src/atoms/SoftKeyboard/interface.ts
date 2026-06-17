export type SoftKeyboardCharset = "alphanumeric" | "numeric" | "alpha";

export interface SoftKeyboardProps {
	value: string;
	onChange: (value: string) => void;
	onEnter?: (value: string) => void;
	/**
	 * Restricts available keys.
	 * - "numeric"      → solo dígitos y símbolos numéricos (sin letras, sin toggle)
	 * - "alpha"        → solo letras (sin panel de números, sin toggle)
	 * - "alphanumeric" → letras y números con toggle entre paneles
	 * @default "alphanumeric"
	 */
	charset?: SoftKeyboardCharset;
	maxLength?: number;
	disabled?: boolean;
	className?: string;
}
