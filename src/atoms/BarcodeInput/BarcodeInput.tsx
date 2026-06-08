import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface BarcodeInputProps {
	onScan: (code: string) => void;
	placeholder?: string;
	disabled?: boolean;
	autoFocus?: boolean;
	minLength?: number;
	scanTimeout?: number;
	className?: string;
	inputClassName?: string;
	label?: string;
	showLastScan?: boolean;
}

export function BarcodeInput({
	onScan,
	placeholder = "Escanear o ingresar código…",
	disabled = false,
	autoFocus = false,
	minLength = 3,
	scanTimeout = 80,
	className,
	inputClassName,
	label,
	showLastScan = false,
}: BarcodeInputProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const timerRef = useRef<ReturnType<typeof setTimeout>>();
	const lastKeyTimeRef = useRef<number>(0);
	const [value, setValue] = useState("");
	const [lastScan, setLastScan] = useState<string | null>(null);
	const [isScanning, setIsScanning] = useState(false);

	useEffect(() => {
		if (autoFocus) inputRef.current?.focus();
	}, [autoFocus]);

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		const now = Date.now();
		const timeDiff = now - lastKeyTimeRef.current;
		lastKeyTimeRef.current = now;

		// Scanner fires keys rapidly (< scanTimeout ms between keystrokes)
		if (timeDiff < scanTimeout) {
			setIsScanning(true);
		}

		if (e.key === "Enter") {
			e.preventDefault();
			const code = value.trim();
			if (code.length >= minLength) {
				onScan(code);
				if (showLastScan) setLastScan(code);
				setValue("");
				setIsScanning(false);
			}
		}
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setValue(e.target.value);

		clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => setIsScanning(false), scanTimeout * 3);
	}

	return (
		<div className={cn("flex flex-col gap-1", className)}>
			{label && (
				<label
					htmlFor="barcode-input"
					className="text-sm font-medium text-caj-text"
				>
					{label}
				</label>
			)}
			<div className="relative">
				<div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
					{isScanning ? (
						<svg
							className="h-4 w-4 animate-pulse text-caj-primary"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
							/>
						</svg>
					) : (
						<svg
							className="h-4 w-4 text-caj-text-muted"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
							/>
						</svg>
					)}
				</div>
				<input
					ref={inputRef}
					id="barcode-input"
					type="text"
					value={value}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					placeholder={placeholder}
					disabled={disabled}
					className={cn(
						"caj-input pl-9 font-mono",
						isScanning && "border-caj-primary ring-2 ring-caj-primary/20",
						inputClassName,
					)}
					aria-label={label ?? "Escáner de código de barras"}
				/>
			</div>
			{showLastScan && lastScan && (
				<p className="flex items-center gap-1.5 text-xs text-caj-text-muted">
					<span className="h-1.5 w-1.5 rounded-full bg-green-500" />
					Último:{" "}
					<strong className="font-mono text-caj-text">{lastScan}</strong>
				</p>
			)}
		</div>
	);
}
