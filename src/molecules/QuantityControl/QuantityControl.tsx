import { cn } from "@/lib/utils";

export interface QuantityControlProps {
	value: number;
	min?: number;
	max?: number;
	step?: number;
	onChange: (value: number) => void;
	disabled?: boolean;
	size?: "sm" | "md" | "lg";
	className?: string;
}

const SIZE = {
	sm: { btn: "h-7 w-7 text-base", input: "h-7 w-10 text-sm", gap: "gap-1" },
	md: { btn: "h-9 w-9 text-lg", input: "h-9 w-14 text-base", gap: "gap-1.5" },
	lg: { btn: "h-11 w-11 text-xl", input: "h-11 w-16 text-lg", gap: "gap-2" },
};

export function QuantityControl({
	value,
	min = 1,
	max = 9999,
	step = 1,
	onChange,
	disabled = false,
	size = "md",
	className,
}: QuantityControlProps) {
	const s = SIZE[size];
	const canDecrement = value - step >= min;
	const canIncrement = value + step <= max;

	function decrement() {
		if (canDecrement) onChange(value - step);
	}
	function increment() {
		if (canIncrement) onChange(value + step);
	}
	function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
		const n = parseInt(e.target.value, 10);
		if (!Number.isNaN(n) && n >= min && n <= max) onChange(n);
	}

	return (
		<fieldset
			className={cn("inline-flex items-center", s.gap, className)}
			aria-label="Control de cantidad"
		>
			<button
				type="button"
				onClick={decrement}
				disabled={disabled || !canDecrement}
				className={cn(
					"caj-btn-default flex items-center justify-center rounded-xl font-bold transition-all active:scale-95",
					s.btn,
					"disabled:pointer-events-none disabled:opacity-40",
				)}
				aria-label="Disminuir"
			>
				−
			</button>

			<input
				type="number"
				value={value}
				onChange={handleInput}
				min={min}
				max={max}
				step={step}
				disabled={disabled}
				className={cn(
					"caj-input text-center font-semibold tabular-nums",
					s.input,
					"disabled:pointer-events-none disabled:opacity-40",
					"[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none",
				)}
				aria-label="Cantidad"
			/>

			<button
				type="button"
				onClick={increment}
				disabled={disabled || !canIncrement}
				className={cn(
					"caj-btn-primary flex items-center justify-center rounded-xl font-bold transition-all active:scale-95",
					s.btn,
					"disabled:pointer-events-none disabled:opacity-40",
				)}
				aria-label="Aumentar"
			>
				+
			</button>
		</fieldset>
	);
}
