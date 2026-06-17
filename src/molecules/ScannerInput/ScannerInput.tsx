import { useEffect, useRef, useState } from "react";
import { GlassPanel } from "@/atoms/GlassPanel";
import { Icon } from "@/atoms/Icon";
import { SoftKeyboard } from "@/atoms/SoftKeyboard";
import { cn } from "@/lib/utils";
import type { ScannerInputProps } from "./interface";

export function ScannerInput({
	value,
	onChange,
	onConfirm,
	placeholder = "Escanear o escribir…",
	charset = "alphanumeric",
	maxLength,
	scanTimeout = 80,
	onCameraScan,
	error,
	disabled = false,
	className,
}: ScannerInputProps) {
	const [keyboardOpen, setKeyboardOpen] = useState(false);
	const [scanning, setScanning] = useState(false);

	const hiddenInputRef = useRef<HTMLInputElement>(null);
	const lastKeyTimeRef = useRef<number>(0);
	const scanResetRef = useRef<ReturnType<typeof setTimeout>>();

	// Auto-focus the hidden input so hardware scanner events are captured
	useEffect(() => {
		if (!disabled) hiddenInputRef.current?.focus();
	}, [disabled]);

	function handleHiddenKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (disabled) return;

		const now = Date.now();
		const gap = now - lastKeyTimeRef.current;
		lastKeyTimeRef.current = now;

		if (gap < scanTimeout) {
			setScanning(true);
			clearTimeout(scanResetRef.current);
			scanResetRef.current = setTimeout(
				() => setScanning(false),
				scanTimeout * 4,
			);
		}

		if (e.key === "Enter") {
			e.preventDefault();
			if (value.trim().length > 0) {
				onConfirm(value.trim());
				setScanning(false);
			}
			return;
		}

		if (e.key === "Backspace") {
			e.preventDefault();
			onChange(value.slice(0, -1));
			return;
		}

		// Printable chars only
		if (e.key.length === 1) {
			if (maxLength === undefined || value.length < maxLength) {
				onChange(value + e.key);
			}
		}
	}

	const handleDisplayClick = () => {
		if (disabled) return;
		hiddenInputRef.current?.focus();
		setKeyboardOpen((o) => !o);
	};

	const handleClear = (e: React.MouseEvent) => {
		e.stopPropagation();
		onChange("");
		hiddenInputRef.current?.focus();
	};

	return (
		<div className={cn("flex flex-col gap-2", className)}>
			{/* Hidden input — captures hardware scanner and physical keyboard */}
			<input
				ref={hiddenInputRef}
				type="text"
				value=""
				onChange={() => {}}
				onKeyDown={handleHiddenKeyDown}
				disabled={disabled}
				className="sr-only"
				aria-hidden
				tabIndex={-1}
			/>

			{/* ── Display panel ── */}
			<GlassPanel
				blur="md"
				tint="white"
				strength={value ? "medium" : "subtle"}
				radius="lg"
				className={cn(
					"flex items-center gap-3 min-h-[64px] px-4 cursor-pointer",
					error && "ring-2 ring-caj-danger/50",
				)}
				onClick={handleDisplayClick}
			>
				{/* Left: scan indicator or barcode icon */}
				<span className="shrink-0">
					{scanning ? (
						<Icon
							name="barcode"
							size="md"
							className="text-caj-primary animate-pulse"
						/>
					) : (
						<Icon name="barcode" size="md" className="text-white/40" />
					)}
				</span>

				{/* Center: value or placeholder */}
				<span className="flex-1 min-w-0">
					{value ? (
						<span className="text-2xl font-extrabold tabular-nums tracking-widest text-white truncate block">
							{value}
						</span>
					) : (
						<span className="text-base text-white/40 font-semibold">
							{placeholder}
						</span>
					)}
				</span>

				{/* Right: actions */}
				<span className="flex items-center gap-1 shrink-0">
					{value && (
						<button
							type="button"
							onClick={handleClear}
							disabled={disabled}
							aria-label="Limpiar"
							className="flex items-center justify-center w-8 h-8 rounded-lg text-white/40 hover:text-white hover:bg-[var(--caj-glass-bg-hover)] transition-colors"
						>
							<Icon name="x" size="xs" />
						</button>
					)}
					{onCameraScan && (
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								onCameraScan();
							}}
							disabled={disabled}
							aria-label="Escanear con cámara"
							className="flex items-center justify-center w-8 h-8 rounded-lg text-white/40 hover:text-white hover:bg-[var(--caj-glass-bg-hover)] transition-colors"
						>
							<Icon name="camera" size="xs" />
						</button>
					)}
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							setKeyboardOpen((o) => !o);
						}}
						disabled={disabled}
						aria-label={keyboardOpen ? "Cerrar teclado" : "Abrir teclado"}
						className={cn(
							"flex items-center justify-center w-8 h-8 rounded-lg transition-colors",
							keyboardOpen
								? "bg-caj-primary/20 text-caj-primary"
								: "text-white/40 hover:text-white hover:bg-[var(--caj-glass-bg-hover)]",
						)}
					>
						<Icon name="keyboard" size="xs" />
					</button>
				</span>
			</GlassPanel>

			{/* Error message */}
			{error && (
				<p className="flex items-center gap-1.5 text-xs font-semibold text-caj-danger px-1">
					<Icon name="warning" size="xs" />
					{error}
				</p>
			)}

			{/* ── Soft keyboard ── */}
			{keyboardOpen && !disabled && (
				<SoftKeyboard
					value={value}
					onChange={onChange}
					onEnter={(v) => {
						onConfirm(v);
						setKeyboardOpen(false);
					}}
					charset={charset}
					maxLength={maxLength}
				/>
			)}
		</div>
	);
}
