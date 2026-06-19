import { useState } from "react";
import { Button } from "@/atoms/Button";
import { cn } from "@/lib/utils";

export interface ColorSwatch {
	id: string;
	name: string;
	hex: string;
	textureUrl?: string;
	description?: string;
}

export interface ColorSwatchPickerProps {
	swatches: ColorSwatch[];
	selectedId?: string;
	onChange: (id: string) => void;
	label?: string;
	size?: "sm" | "md";
	className?: string;
}

const ZoomIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="currentColor"
		className="w-3 h-3"
		aria-hidden="true"
	>
		<path
			fillRule="evenodd"
			d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
			clipRule="evenodd"
		/>
		<path d="M9.75 7a.75.75 0 00-1.5 0v1.25H7a.75.75 0 000 1.5h1.25V11a.75.75 0 001.5 0V9.75H11a.75.75 0 000-1.5H9.75V7z" />
	</svg>
);

const CloseIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="currentColor"
		className="w-4 h-4"
		aria-hidden="true"
	>
		<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
	</svg>
);

export function ColorSwatchPicker({
	swatches,
	selectedId,
	onChange,
	label,
	size = "md",
	className,
}: ColorSwatchPickerProps) {
	const [lightboxSwatch, setLightboxSwatch] = useState<ColorSwatch | null>(
		null,
	);

	const swatchSize = size === "sm" ? "w-5 h-5" : "w-6 h-6";

	function handleSwatchClick(swatch: ColorSwatch) {
		if (selectedId === swatch.id) {
			// Already selected — open lightbox
			setLightboxSwatch(swatch);
		} else {
			onChange(swatch.id);
		}
	}

	function closeLightbox() {
		setLightboxSwatch(null);
	}

	function handleSelect(swatch: ColorSwatch) {
		onChange(swatch.id);
		closeLightbox();
	}

	return (
		<>
			<div className={cn("flex flex-col gap-1.5", className)}>
				{label && (
					<span className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
						{label}
					</span>
				)}
				<div className="flex flex-wrap items-center gap-2">
					{swatches.map((swatch) => {
						const isSelected = selectedId === swatch.id;
						return (
							<button
								key={swatch.id}
								type="button"
								onClick={() => handleSwatchClick(swatch)}
								title={swatch.name}
								aria-label={`${swatch.name}${isSelected ? " (seleccionado)" : ""}`}
								aria-pressed={isSelected}
								className={cn(
									"relative rounded-full border transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
									swatchSize,
									isSelected
										? "ring-2 ring-caj-primary ring-offset-1 scale-110 border-white/60"
										: "border-white/20 hover:scale-105 hover:border-white/40",
								)}
								style={{
									backgroundColor: swatch.hex,
									backgroundImage: swatch.textureUrl
										? `url(${swatch.textureUrl})`
										: undefined,
									backgroundSize: "cover",
									backgroundPosition: "center",
								}}
							>
								{isSelected && (
									<span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30 text-white">
										{ZoomIcon}
									</span>
								)}
							</button>
						);
					})}
				</div>
			</div>

			{/* Lightbox */}
			{lightboxSwatch && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
					onClick={closeLightbox}
					role="dialog"
					aria-modal="true"
					aria-label={`Detalle de color: ${lightboxSwatch.name}`}
				>
					<div
						className="caj-glass-strong border border-white/20 rounded-2xl p-6 flex flex-col items-center gap-4 w-72 max-w-[90vw]"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Close button */}
						<div className="w-full flex justify-end">
							<button
								type="button"
								onClick={closeLightbox}
								aria-label="Cerrar"
								className="rounded-lg p-1 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
							>
								{CloseIcon}
							</button>
						</div>

						{/* Large swatch */}
						<div
							className="w-36 h-36 rounded-full border-2 border-white/20 shadow-xl"
							style={{
								backgroundColor: lightboxSwatch.hex,
								backgroundImage: lightboxSwatch.textureUrl
									? `url(${lightboxSwatch.textureUrl})`
									: undefined,
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
						/>

						{/* Name */}
						<p className="text-base font-bold text-white text-center">
							{lightboxSwatch.name}
						</p>

						{/* Hex code */}
						<p className="font-mono text-xs text-white/60 tracking-widest">
							{lightboxSwatch.hex.toUpperCase()}
						</p>

						{/* Description */}
						{lightboxSwatch.description && (
							<p className="text-sm text-white/70 text-center leading-relaxed">
								{lightboxSwatch.description}
							</p>
						)}

						{/* Actions */}
						<div className="flex gap-2 w-full pt-1">
							<Button variant="default" size="sm" block onClick={closeLightbox}>
								Cerrar
							</Button>
							<Button
								variant="primary"
								size="sm"
								block
								onClick={() => handleSelect(lightboxSwatch)}
							>
								Seleccionar
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
