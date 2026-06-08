import type { ReactNode } from "react";

export interface ShiftSummaryData {
	salesCount: number;
	salesTotal: number;
}

export interface RegisterLockedProps {
	/**
	 * The name of the currently active cashier whose terminal is locked
	 */
	cashierName: string;
	/**
	 * Optional summary data of the current shift (number of sales, total revenue)
	 */
	shiftSummary?: ShiftSummaryData;
	/**
	 * Callback to unlock the register.
	 * Returns true or resolves to true if the PIN is correct, false otherwise.
	 */
	onUnlock: (pin: string) => boolean | Promise<boolean>;
	/**
	 * Callback to completely log out the cashier and return to the main sign-in page
	 */
	onLogout?: () => void;
	/**
	 * Optional custom Branding node to display at the top of the lock card
	 */
	companyBranding?: ReactNode;
	/**
	 * External error message (e.g. if verification fails on the backend)
	 */
	error?: string;
	/**
	 * Loading state during unlock verification
	 * @default false
	 */
	isLoading?: boolean;
	/**
	 * Additional CSS classes to apply to the outermost wrapper
	 */
	className?: string;
}
