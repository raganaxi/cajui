import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/atoms/Button";
import { GlassPanel } from "@/atoms/GlassPanel";
import { cn } from "@/lib/utils";
import type { ThemeVisualizerProps } from "./interface";

export function ThemeVisualizer({
	showColors = true,
	showGlassTokens = true,
	showGradients = true,
	className,
}: ThemeVisualizerProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [variables, setVariables] = useState<Record<string, string>>({});
	const [copiedVar, setCopiedVar] = useState<string | null>(null);

	const fetchVariables = useCallback(() => {
		if (!containerRef.current) return;
		const style = getComputedStyle(containerRef.current);
		const vars = [
			"--caj-primary",
			"--caj-primary-hover",
			"--caj-primary-light",
			"--caj-danger",
			"--caj-danger-hover",
			"--caj-warning",
			"--caj-success",
			"--caj-info",
			"--caj-glass-bg",
			"--caj-glass-border",
			"--caj-glass-shadow",
			"--caj-glass-inset",
			"--caj-glass-blur",
			"--caj-glass-radius",
			"--caj-gradient-default",
			"--caj-gradient-warm",
			"--caj-gradient-cool",
			"--caj-gradient-midnight",
		];
		const result: Record<string, string> = {};
		vars.forEach((v) => {
			result[v] = style.getPropertyValue(v).trim();
		});
		setVariables(result);
	}, []);

	// Re-read CSS variables on mount, and whenever window resizes or layout shifts
	useEffect(() => {
		fetchVariables();
		window.addEventListener("resize", fetchVariables);
		// Periodic check to capture dynamic theme updates in Storybook
		const timer = setInterval(fetchVariables, 1000);
		return () => {
			window.removeEventListener("resize", fetchVariables);
			clearInterval(timer);
		};
	}, [fetchVariables]);

	const handleCopy = (variableName: string, value: string) => {
		navigator.clipboard.writeText(`${variableName}: ${value};`);
		setCopiedVar(variableName);
		setTimeout(() => setCopiedVar(null), 1500);
	};

	const colors = [
		{
			key: "--caj-primary",
			name: "Primary (Brand)",
			desc: "Color principal del punto de venta y llamadas a la acción",
		},
		{
			key: "--caj-primary-hover",
			name: "Primary Hover",
			desc: "Color en estado hover para botones primarios",
		},
		{
			key: "--caj-primary-light",
			name: "Primary Light",
			desc: "Fondo suave en alertas e informativos ligeros",
		},
		{
			key: "--caj-success",
			name: "Success (Confirmar)",
			desc: "Validaciones de cobro exitoso e indicadores positivos",
		},
		{
			key: "--caj-danger",
			name: "Danger (Cancelar)",
			desc: "Acciones de cancelación, borrado de items o alertas graves",
		},
		{
			key: "--caj-warning",
			name: "Warning",
			desc: "Avisos preventivos, stock bajo y reintentos",
		},
		{
			key: "--caj-info",
			name: "Info",
			desc: "Detalles informativos de órdenes y estado de terminal",
		},
	];

	const glassTokens = [
		{ key: "--caj-glass-bg", name: "Glass Background", type: "background" },
		{ key: "--caj-glass-border", name: "Glass Border", type: "border" },
		{ key: "--caj-glass-shadow", name: "Glass Shadow", type: "shadow" },
		{ key: "--caj-glass-inset", name: "Glass Inset (Glow)", type: "inset" },
		{ key: "--caj-glass-blur", name: "Glass Blur Strength", type: "blur" },
		{ key: "--caj-glass-radius", name: "Glass Border Radius", type: "radius" },
	];

	const gradients = [
		{
			key: "--caj-gradient-default",
			name: "Default Space",
			val: "linear-gradient(135deg, hsl(215 60% 12%) 0%, hsl(250 45% 16%) 50%, hsl(195 55% 14%) 100%)",
		},
		{
			key: "--caj-gradient-warm",
			name: "Warm Sunset",
			val: "linear-gradient(135deg, hsl(220 40% 12%) 0%, hsl(340 45% 16%) 50%, hsl(25 50% 14%) 100%)",
		},
		{
			key: "--caj-gradient-cool",
			name: "Cool Glacier",
			val: "linear-gradient(135deg, hsl(220 50% 12%) 0%, hsl(220 60% 18%) 50%, hsl(190 60% 14%) 100%)",
		},
		{
			key: "--caj-gradient-midnight",
			name: "Midnight Pitch",
			val: "linear-gradient(135deg, hsl(240 15% 5%) 0%, hsl(240 20% 8%) 50%, hsl(240 15% 5%) 100%)",
		},
	];

	return (
		<div
			ref={containerRef}
			className={cn("w-full flex flex-col gap-8 text-white p-2", className)}
		>
			{/* ── Section A: Colors ── */}
			{showColors && (
				<div className="flex flex-col gap-4">
					<div>
						<h3 className="text-lg font-bold">
							Paleta de Colores de Marca y Estados
						</h3>
						<p className="text-sm text-white/50">
							Canales de color RGB dinámicos para control de opacidad en
							Tailwind.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{colors.map((c) => {
							const val = variables[c.key] || "Cargando...";
							const isRgbChannels = /^\d+\s+\d+\s+\d+$/.test(val);
							const previewBg = isRgbChannels ? `rgb(${val})` : val;

							return (
								<GlassPanel
									key={c.key}
									padding="md"
									radius="lg"
									className="flex items-center gap-4 bg-white/5 border-white/10"
								>
									<div
										className="w-14 h-14 rounded-xl border border-white/20 shadow-md shrink-0 transition-transform duration-250 hover:scale-105"
										style={{ backgroundColor: previewBg }}
									/>
									<div className="flex-1 min-w-0">
										<div className="flex justify-between items-center">
											<span className="font-semibold text-sm truncate">
												{c.name}
											</span>
											<Button
												variant="text"
												size="sm"
												onClick={() => handleCopy(c.key, previewBg)}
												className="text-caj-primary text-[10px] uppercase font-bold tracking-wider"
											>
												{copiedVar === c.key ? "✓ Copiado" : "Copiar"}
											</Button>
										</div>
										<span className="block font-mono text-xs text-white/50 select-all truncate mt-0.5">
											{c.key}
										</span>
										<span className="block text-[11px] text-white/40 italic truncate mt-1">
											{c.desc}
										</span>
									</div>
								</GlassPanel>
							);
						})}
					</div>
				</div>
			)}

			{/* ── Section B: Glassmorphism Tokens ── */}
			{showGlassTokens && (
				<div className="flex flex-col gap-4">
					<div>
						<h3 className="text-lg font-bold">
							Fórmulas de Diseño de Vidrio (Liquid Glass)
						</h3>
						<p className="text-sm text-white/50">
							Configuraciones de translucidez, sombras y difuminado activo.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{glassTokens.map((t) => {
							const val = variables[t.key] || "Cargando...";
							return (
								<GlassPanel
									key={t.key}
									padding="md"
									radius="lg"
									className="flex justify-between items-center bg-white/5 border-white/10"
								>
									<div className="min-w-0 flex-1 pr-4">
										<span className="font-semibold text-sm block">
											{t.name}
										</span>
										<span className="font-mono text-xs text-white/50 block select-all truncate mt-1">
											{t.key}
										</span>
										<span className="font-mono text-[11px] text-caj-primary block truncate mt-1.5">
											{val}
										</span>
									</div>
									<Button
										variant="text"
										size="sm"
										onClick={() => handleCopy(t.key, val)}
										className="text-caj-primary text-[10px] uppercase font-bold tracking-wider shrink-0"
									>
										{copiedVar === t.key ? "✓ Copiado" : "Copiar"}
									</Button>
								</GlassPanel>
							);
						})}
					</div>
				</div>
			)}

			{/* ── Section C: Gradients ── */}
			{showGradients && (
				<div className="flex flex-col gap-4">
					<div>
						<h3 className="text-lg font-bold">
							Fondos de Pantalla y Degradados
						</h3>
						<p className="text-sm text-white/50">
							Fondos líquidos preestablecidos para CajuiProvider.
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{gradients.map((g) => {
							const val = variables[g.key] || g.val;
							return (
								<GlassPanel
									key={g.key}
									padding="md"
									radius="lg"
									className="flex flex-col gap-3 bg-white/5 border-white/10 overflow-hidden"
								>
									<div
										className="w-full h-24 rounded-xl border border-white/10 shadow-inner"
										style={{ background: val }}
									/>
									<div className="flex justify-between items-center min-w-0">
										<div className="truncate">
											<span className="font-semibold text-sm block">
												{g.name}
											</span>
											<span className="font-mono text-xs text-white/50 select-all truncate mt-0.5">
												{g.key}
											</span>
										</div>
										<Button
											variant="text"
											size="sm"
											onClick={() => handleCopy(g.key, val)}
											className="text-caj-primary text-[10px] uppercase font-bold tracking-wider shrink-0"
										>
											{copiedVar === g.key ? "✓" : "Copiar"}
										</Button>
									</div>
								</GlassPanel>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
