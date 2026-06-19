import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface RowAction {
	key: string;
	label: string;
	onClick: () => void;
	variant?: "default" | "danger" | "success" | "warning";
	icon?: ReactNode;
	disabled?: boolean;
	separator?: boolean;
}

export interface RowActionsProps {
	items: RowAction[];
	/** Trigger button label. Defaults to "Acciones" */
	label?: string;
	/** Trigger button size */
	size?: "xs" | "sm";
	/** Dropdown alignment relative to trigger */
	align?: "left" | "right";
	disabled?: boolean;
}

const TRIGGER_SIZE = {
	xs: "h-6 px-2 text-[11px] gap-1",
	sm: "h-7 px-2.5 text-xs gap-1.5",
};

const ITEM_TEXT = {
	default: "text-white/80 hover:text-white",
	danger: "text-caj-danger",
	success: "text-caj-success",
	warning: "text-caj-warning",
};

// Base hover is handled by .caj-menu-item (uses --caj-glass-bg-hover, works on all themes).
// Semantic variants override it via Tailwind utilities (higher cascade layer).
const ITEM_HOVER_BG = {
	default: "",
	danger: "hover:bg-caj-danger/10",
	success: "hover:bg-caj-success/10",
	warning: "hover:bg-caj-warning/10",
};

export function RowActions({
	items,
	label = "Acciones",
	size = "sm",
	align = "right",
	disabled = false,
}: RowActionsProps) {
	const [open, setOpen] = useState(false);
	const [pos, setPos] = useState({ top: 0, x: 0 });
	const triggerRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	function openMenu() {
		if (!triggerRef.current) return;
		const rect = triggerRef.current.getBoundingClientRect();
		setPos({
			top: rect.bottom + 4,
			x: align === "right" ? rect.right : rect.left,
		});
		setOpen(true);
	}

	function closeMenu() {
		setOpen(false);
	}

	useEffect(() => {
		if (!open) return;

		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") setOpen(false);
		}
		function onPointer(e: MouseEvent) {
			if (
				!triggerRef.current?.contains(e.target as Node) &&
				!menuRef.current?.contains(e.target as Node)
			) {
				setOpen(false);
			}
		}

		document.addEventListener("keydown", onKey);
		document.addEventListener("mousedown", onPointer);
		return () => {
			document.removeEventListener("keydown", onKey);
			document.removeEventListener("mousedown", onPointer);
		};
	}, [open]);

	return (
		<div className="inline-flex">
			<button
				ref={triggerRef}
				type="button"
				disabled={disabled}
				onClick={open ? closeMenu : openMenu}
				aria-haspopup="menu"
				aria-expanded={open}
				className={cn(
					"caj-btn caj-btn-default inline-flex items-center font-semibold",
					TRIGGER_SIZE[size],
					disabled && "opacity-40 pointer-events-none",
				)}
			>
				<span>{label}</span>
				<ChevronIcon
					className={cn(
						"shrink-0 transition-transform duration-150",
						size === "xs" ? "w-2.5 h-2.5" : "w-3 h-3",
						open && "rotate-180",
					)}
				/>
			</button>

			{open && (
				<div
					ref={menuRef}
					role="menu"
					aria-label={label}
					tabIndex={-1}
					style={{
						position: "fixed",
						top: pos.top,
						...(align === "right"
							? { right: window.innerWidth - pos.x }
							: { left: pos.x }),
						zIndex: 9999,
					}}
					className="caj-panel min-w-[10rem] overflow-hidden rounded-lg py-1 animate-[panel-in_0.15s_ease-out_forwards]"
				>
					{items.map((item) => (
						<div key={item.key}>
							{item.separator && (
								<div className="caj-menu-separator" role="presentation" />
							)}
							<button
								type="button"
								role="menuitem"
								disabled={item.disabled}
								onClick={() => {
									item.onClick();
									closeMenu();
								}}
								className={cn(
									"caj-menu-item flex w-full items-center gap-2 px-3 py-1.5 text-xs text-left",
									ITEM_TEXT[item.variant ?? "default"],
									ITEM_HOVER_BG[item.variant ?? "default"],
									item.disabled && "opacity-40 pointer-events-none",
								)}
							>
								{item.icon && (
									<span className="shrink-0 text-current" aria-hidden="true">
										{item.icon}
									</span>
								)}
								{item.label}
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

function ChevronIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			fill="currentColor"
			className={className}
			aria-hidden="true"
		>
			<path
				fillRule="evenodd"
				d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
				clipRule="evenodd"
			/>
		</svg>
	);
}
