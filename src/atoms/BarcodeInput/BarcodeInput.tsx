import { useEffect, useRef, useState } from "react";
import { Icon } from "@/atoms/Icon";
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
						<Icon
							name="barcode"
							size="sm"
							className="text-caj-primary animate-pulse"
						/>
					) : (
						<Icon name="barcode" size="sm" className="text-caj-text-muted" />
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
