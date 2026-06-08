import type { ReactNode } from "react";

export interface LoginCredentials {
	pin?: string;
	email?: string;
	password?: string;
}

export interface ShiftSummaryData {
	salesCount: number;
	salesTotal: number;
}

export type LoginVariant = "default" | "lock";

export interface LoginProps {
	/**
	 * Mode of the component: "default" for a standard sign-in, or "lock" for terminal lock screen.
	 * @default "default"
	 */
	variant?: LoginVariant;
	/**
	 * Callback triggered when a login attempt is submitted (used in "default" variant)
	 */
	onLogin?: (credentials: LoginCredentials) => void;
	/**
	 * Whether to allow PIN-based fast access using the NumPad
	 * @default true
	 */
	allowPin?: boolean;
	/**
	 * Whether to allow classic email/password credentials access
	 * @default true
	 */
	allowCredentials?: boolean;
	/**
	 * Optional custom Branding node to display at the top of the card
	 */
	companyBranding?: ReactNode;
	/**
	 * Optional error message to display in the login interface
	 */
	error?: string;
	/**
	 * Whether the login/unlock process is in an active loading state
	 * @default false
	 */
	isLoading?: boolean;
	/**
	 * Additional CSS classes to apply to the card container
	 */
	className?: string;

	// Lock Screen Specific Props
	/**
	 * The name of the currently active cashier whose terminal is locked (used in "lock" variant)
	 */
	cashierName?: string;
	/**
	 * Optional summary data of the current shift (used in "lock" variant)
	 */
	shiftSummary?: ShiftSummaryData;
	/**
	 * Callback to unlock the register (used in "lock" variant).
	 * Returns true or resolves to true if the PIN is correct, false otherwise.
	 */
	onUnlock?: (pin: string) => boolean | Promise<boolean>;
	/**
	 * Callback to completely log out the cashier and return to the main sign-in page (used in "lock" variant)
	 */
	onLogout?: () => void;
}
