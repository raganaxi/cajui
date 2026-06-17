import { useState } from "react";
import { Icon } from "@/atoms/Icon";
import { cn } from "@/lib/utils";
import type { SoftKeyboardProps } from "./interface";

// ── Key layout ────────────────────────────────────────────

const QWERTY = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	["a", "s", "d", "f", "g", "h", "j", "k", "l"],
	["z", "x", "c", "v", "b", "n", "m"],
] as const;

const NUMPAD_ROWS = [
	["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
	["-", ".", "@", "#", "_", "/", "(", ")"],
] as const;

// ── Individual key ────────────────────────────────────────

const KEY_STYLES = {
	default: "caj-numkey",
	action: "caj-numkey-action",
	enter: "caj-numkey-enter",
	danger: "caj-numkey-danger",
} as const;

function Key({
	children,
	onClick,
	variant = "default",
	grow = 1,
	disabled,
	ariaLabel,
}: {
	children: React.ReactNode;
	onClick: () => void;
	variant?: "default" | "action" | "enter" | "danger";
	grow?: number;
	disabled?: boolean;
	ariaLabel?: string;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			aria-label={ariaLabel}
			style={{ flexGrow: grow }}
			className={cn(
				KEY_STYLES[variant],
				"flex h-10 min-w-0 shrink items-center justify-center text-sm",
				disabled && "pointer-events-none opacity-40",
			)}
		>
			{children}
		</button>
	);
}

// ── SoftKeyboard ──────────────────────────────────────────

export function SoftKeyboard({
	value,
	onChange,
	onEnter,
	charset = "alphanumeric",
	maxLength,
	disabled = false,
	className,
}: SoftKeyboardProps) {
	const [panel, setPanel] = useState<"letters" | "numbers">(() =>
		charset === "numeric" ? "numbers" : "letters",
	);
	const [shifted, setShifted] = useState(false);

	const canToggle = charset === "alphanumeric";

	const append = (char: string) => {
		if (disabled) return;
		if (maxLength !== undefined && value.length >= maxLength) return;
		onChange(value + (shifted ? char.toUpperCase() : char));
		if (shifted) setShifted(false);
	};

	const del = () => {
		if (disabled) return;
		onChange(value.slice(0, -1));
	};

	const confirm = () => {
		if (disabled) return;
		onEnter?.(value);
	};

	// ── Numbers panel ──────────────────────────────────────
	if (panel === "numbers" || charset === "numeric") {
		return (
			<fieldset
				className={cn("flex flex-col gap-1.5 w-full", className)}
				aria-label="Teclado numérico"
			>
				{NUMPAD_ROWS.map((row, ri) => (
					<div key={ri} className="flex gap-1">
						{(row as readonly string[]).map((char) => (
							<Key key={char} onClick={() => append(char)} disabled={disabled}>
								{char}
							</Key>
						))}
						{ri === NUMPAD_ROWS.length - 1 && (
							<Key
								onClick={del}
								variant="action"
								ariaLabel="Borrar"
								disabled={disabled}
							>
								<Icon name="back" size="sm" />
							</Key>
						)}
					</div>
				))}
				<div className="flex gap-1">
					{canToggle && (
						<Key
							onClick={() => setPanel("letters")}
							variant="action"
							grow={1.5}
							disabled={disabled}
						>
							<span className="text-xs font-bold">ABC</span>
						</Key>
					)}
					{!canToggle && (
						<Key
							onClick={del}
							variant="action"
							grow={1.5}
							ariaLabel="Borrar"
							disabled={disabled}
						>
							<Icon name="back" size="sm" />
						</Key>
					)}
					<Key
						onClick={() => append(" ")}
						grow={4}
						ariaLabel="Espacio"
						disabled={disabled}
					>
						<span className="text-xs text-white/40 tracking-widest">
							espacio
						</span>
					</Key>
					<Key
						onClick={confirm}
						variant="enter"
						grow={1.5}
						ariaLabel="Confirmar"
						disabled={disabled}
					>
						<Icon name="check" size="sm" strokeWidth={2.5} />
					</Key>
				</div>
			</fieldset>
		);
	}

	// ── Letters panel (QWERTY) ─────────────────────────────
	return (
		<fieldset
			className={cn("flex flex-col gap-1.5 w-full", className)}
			aria-label="Teclado"
		>
			{/* Row 1: q-p */}
			<div className="flex gap-1">
				{QWERTY[0].map((char) => (
					<Key key={char} onClick={() => append(char)} disabled={disabled}>
						{shifted ? char.toUpperCase() : char}
					</Key>
				))}
			</div>

			{/* Row 2: a-l (centered with padding) */}
			<div className="flex gap-1">
				<div className="flex-[0.5]" />
				{QWERTY[1].map((char) => (
					<Key key={char} onClick={() => append(char)} disabled={disabled}>
						{shifted ? char.toUpperCase() : char}
					</Key>
				))}
				<div className="flex-[0.5]" />
			</div>

			{/* Row 3: shift + z-m + backspace */}
			<div className="flex gap-1">
				<Key
					onClick={() => setShifted((s) => !s)}
					variant={shifted ? "enter" : "action"}
					grow={1.5}
					ariaLabel="Mayúsculas"
					disabled={disabled}
				>
					<Icon name="chevronUp" size="sm" strokeWidth={shifted ? 3 : 2} />
				</Key>
				{QWERTY[2].map((char) => (
					<Key key={char} onClick={() => append(char)} disabled={disabled}>
						{shifted ? char.toUpperCase() : char}
					</Key>
				))}
				<Key
					onClick={del}
					variant="action"
					grow={1.5}
					ariaLabel="Borrar"
					disabled={disabled}
				>
					<Icon name="back" size="sm" />
				</Key>
			</div>

			{/* Row 4: toggle + space + enter */}
			<div className="flex gap-1">
				{canToggle ? (
					<Key
						onClick={() => setPanel("numbers")}
						variant="action"
						grow={1.5}
						disabled={disabled}
					>
						<span className="text-xs font-bold">123</span>
					</Key>
				) : (
					<div className="flex-[1.5]" />
				)}
				<Key
					onClick={() => append(" ")}
					grow={4}
					ariaLabel="Espacio"
					disabled={disabled}
				>
					<span className="text-xs text-white/40 tracking-widest">espacio</span>
				</Key>
				<Key
					onClick={confirm}
					variant="enter"
					grow={1.5}
					ariaLabel="Confirmar"
					disabled={disabled}
				>
					<Icon name="check" size="sm" strokeWidth={2.5} />
				</Key>
			</div>
		</fieldset>
	);
}
