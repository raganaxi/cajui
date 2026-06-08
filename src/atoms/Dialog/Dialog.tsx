import type React from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "../Button";
import { useCajuiTheme } from "../CajuiProvider/context";
import { Icon } from "../Icon";
import type { DialogProps } from "./interface";

export const Dialog: React.FC<DialogProps> = ({
	open,
	onClose,
	title,
	children,
	footer,
	size = "md",
	closeOnOverlayClick = true,
	showClose = true,
	className,
	overlayClassName,
}) => {
	const [mounted, setMounted] = useState(false);
	const overlayRef = useRef<HTMLDivElement>(null);
	const { theme } = useCajuiTheme();

	// Set mounted flag to run portals only on client side
	useEffect(() => {
		setMounted(true);
		return () => setMounted(false);
	}, []);

	// Lock body scrolling when dialog is open
	useEffect(() => {
		if (open) {
			const originalStyle = window.getComputedStyle(document.body).overflow;
			document.body.style.overflow = "hidden";
			return () => {
				document.body.style.overflow = originalStyle;
			};
		}
	}, [open]);

	// Close dialog on Escape keypress
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape" && open) {
				onClose();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [open, onClose]);

	if (!mounted || !open) return null;

	const handleOverlayClick = (e: React.MouseEvent) => {
		if (closeOnOverlayClick && e.target === overlayRef.current) {
			onClose();
		}
	};

	const sizeClasses = {
		sm: "max-w-sm w-full",
		md: "max-w-md w-full",
		lg: "max-w-lg w-full",
		xl: "max-w-2xl w-full",
	}[size];

	return createPortal(
		<div data-cajui-root data-cajui-theme={theme} className="font-pos">
			{/* biome-ignore lint/a11y/noStaticElementInteractions: backdrop overlay closes dialog on click/key */}
			<div
				ref={overlayRef}
				tabIndex={-1}
				onClick={handleOverlayClick}
				onKeyDown={(e) => {
					if (e.key === "Escape") onClose();
				}}
				className={cn(
					"caj-dialog-overlay fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/65 transition-opacity duration-200",
					overlayClassName,
				)}
			>
				<div
					className={cn(
						"caj-dialog-panel caj-panel animate-panel-in flex flex-col rounded-2xl max-h-[90vh]",
						sizeClasses,
						className,
					)}
				>
					{/* Header */}
					{(title || showClose) && (
						<div className="caj-dialog-header flex items-center justify-between px-6 py-4 border-b border-white/10">
							{title ? (
								<h3 className="text-lg font-bold tracking-tight text-white/95">
									{title}
								</h3>
							) : (
								<div />
							)}

							{showClose && (
								<Button
									variant="ghost"
									size="sm"
									icon={<Icon name="close" size="sm" />}
									onClick={onClose}
									aria-label="Cerrar diálogo"
									className="caj-dialog-close text-white/60 hover:text-white hover:bg-white/10 transition-colors border-none rounded-full flex items-center justify-center w-8 h-8 p-0"
								/>
							)}
						</div>
					)}

					{/* Content Body */}
					<div className="flex-1 px-6 py-5 overflow-y-auto text-sm text-white/85 leading-relaxed">
						{children}
					</div>

					{/* Footer */}
					{footer && (
						<div className="caj-dialog-footer flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10 bg-white/[0.02]">
							{footer}
						</div>
					)}
				</div>
			</div>
		</div>,
		document.body,
	);
};
