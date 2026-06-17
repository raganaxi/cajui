import type { SoftKeyboardCharset } from "@/atoms/SoftKeyboard";

export interface ScannerInputProps {
	value: string;
	onChange: (value: string) => void;
	onConfirm: (value: string) => void;
	placeholder?: string;
	/**
	 * Restringe las teclas del teclado táctil.
	 * - "numeric"      → solo dígitos y símbolos numéricos
	 * - "alpha"        → solo letras
	 * - "alphanumeric" → letras y números (default)
	 */
	charset?: SoftKeyboardCharset;
	maxLength?: number;
	/** Milisegundos entre teclas para detectar escáner hardware. Default 80. */
	scanTimeout?: number;
	/**
	 * Cuando se provee, muestra el botón de cámara/QR.
	 * El componente no implementa la captura — delega al padre.
	 */
	onCameraScan?: () => void;
	/** Muestra error visual + mensaje */
	error?: string;
	disabled?: boolean;
	className?: string;
}
