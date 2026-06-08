import { useCallback, useEffect, useRef } from "react";

export interface UseBarcodeOptions {
	minLength?: number;
	scanTimeout?: number;
	prefix?: string;
	suffix?: string;
	disabled?: boolean;
}

/**
 * Listens for barcode scanner input on the document level.
 * Scanners fire rapid keystrokes followed by Enter; this hook
 * distinguishes scanner input from manual typing using timing.
 */
export function useBarcode(
	onScan: (code: string) => void,
	{
		minLength = 3,
		scanTimeout = 80,
		prefix = "",
		suffix = "",
		disabled = false,
	}: UseBarcodeOptions = {},
) {
	const bufferRef = useRef("");
	const lastKeyTimeRef = useRef(0);
	const timerRef = useRef<ReturnType<typeof setTimeout>>();
	const onScanRef = useRef(onScan);
	onScanRef.current = onScan;

	const flush = useCallback(() => {
		const code = bufferRef.current;
		bufferRef.current = "";
		const stripped = code
			.replace(prefix ? new RegExp(`^${prefix}`) : "", "")
			.replace(suffix ? new RegExp(`${suffix}$`) : "", "")
			.trim();
		if (stripped.length >= minLength) {
			onScanRef.current(stripped);
		}
	}, [minLength, prefix, suffix]);

	useEffect(() => {
		if (disabled) return;

		function handleKeyDown(e: KeyboardEvent) {
			// Ignore if focus is inside an input/textarea (let BarcodeInput handle it)
			const tag = (e.target as HTMLElement)?.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA") return;

			const now = Date.now();
			lastKeyTimeRef.current = now;

			if (e.key === "Enter") {
				clearTimeout(timerRef.current);
				flush();
				return;
			}

			if (e.key.length === 1) {
				bufferRef.current += e.key;
				clearTimeout(timerRef.current);
				timerRef.current = setTimeout(() => {
					bufferRef.current = "";
				}, scanTimeout * 5);
			}
		}

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [disabled, flush, scanTimeout]);
}
