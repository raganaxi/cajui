import { useEffect, useState } from "react";
import { Button } from "@/atoms/Button";
import { GlassPanel } from "@/atoms/GlassPanel";
import { cn, formatCurrency } from "@/lib/utils";
import type {
	KioskPaymentOption,
	KioskPaymentProps,
	KioskPaymentStatus,
} from "./interface";

const DEFAULT_OPTIONS: KioskPaymentOption[] = [
	{
		id: "card",
		label: "Tarjeta Bancaria",
		description: "Crédito o Débito (Visa, Mastercard, AMEX)",
		icon: (
			<svg
				className="h-10 w-10 text-white"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1.2}
					d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
				/>
			</svg>
		),
	},
	{
		id: "nfc",
		label: "Pago Móvil / Contactless",
		description: "Apple Pay, Google Wallet o tarjetas de aproximación",
		icon: (
			<svg
				className="h-10 w-10 text-white"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1.2}
					d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
				/>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1.5}
					d="M12 12a2 2 0 100-4 2 2 0 000 4z"
				/>
			</svg>
		),
	},
	{
		id: "points",
		label: "Membresía / Puntos",
		description: "Paga con tus puntos acumulados de lealtad",
		icon: (
			<svg
				className="h-10 w-10 text-white"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1.2}
					d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.246.582 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.175 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.883c-.779-.564-.38-1.81.582-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z"
				/>
			</svg>
		),
	},
];

export function KioskPayment({
	amount,
	currency = "MXN",
	locale = "es-MX",
	options,
	onSuccess,
	onCancel,
	className,
	initialStatus = "select",
}: KioskPaymentProps) {
	const [status, setStatus] = useState<KioskPaymentStatus>(initialStatus);
	const [selectedMethod, setSelectedMethod] = useState<string>("");
	const fmt = (v: number) => formatCurrency(v, currency, locale);

	const finalOptions = options ?? DEFAULT_OPTIONS;

	function handleSelect(methodId: string) {
		setSelectedMethod(methodId);
		setStatus("prompt");
	}

	// Simulate POS Terminal Payment Cycle
	useEffect(() => {
		if (status === "prompt") {
			const timer = setTimeout(() => {
				setStatus("processing");
			}, 3500); // Card inserted after 3.5s
			return () => clearTimeout(timer);
		}

		if (status === "processing") {
			const timer = setTimeout(() => {
				setStatus("success");
			}, 3000); // Authorization takes 3s
			return () => clearTimeout(timer);
		}

		if (status === "success") {
			const timer = setTimeout(() => {
				onSuccess?.(selectedMethod);
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [status, selectedMethod, onSuccess]);

	return (
		<GlassPanel
			blur="lg"
			tint="white"
			strength="medium"
			radius="xl"
			className={cn(
				"flex flex-col overflow-hidden max-w-2xl mx-auto w-full p-6 text-white min-h-[460px] justify-between",
				className,
			)}
		>
			{/* ── HEADER: Total Amount ── */}
			<div className="flex flex-col items-center text-center gap-1 border-b border-white/10 pb-4">
				<span className="text-sm font-semibold uppercase tracking-wider text-white/50">
					Monto Total a Pagar
				</span>
				<span className="text-4xl font-extrabold text-white tracking-tight tabular-nums drop-shadow-md">
					{fmt(amount)}
				</span>
			</div>

			{/* ── CONTENT BODY (STATE DRIVEN) ── */}
			<div className="flex-1 flex flex-col items-center justify-center my-6">
				{/* === STATE: SELECT METHOD === */}
				{status === "select" && (
					<div className="w-full flex flex-col gap-3">
						<p className="text-center text-sm text-white/60 mb-2 font-medium">
							Seleccione su forma de pago:
						</p>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
							{finalOptions.map((opt) => (
								<button
									key={opt.id}
									type="button"
									onClick={() => handleSelect(opt.id)}
									className={cn(
										"flex flex-col items-center text-center justify-center p-5 gap-3 rounded-2xl border transition-all duration-200 cursor-pointer select-none active:scale-95 group",
										"border-white/10 bg-white/[0.04] backdrop-blur-md hover:bg-white/[0.12] hover:border-white/30 hover:[box-shadow:0_10px_30px_rgba(255,255,255,0.05)]",
									)}
								>
									<div className="rounded-2xl bg-white/[0.06] p-3 border border-white/10 group-hover:scale-110 transition-transform duration-250">
										{opt.icon}
									</div>
									<div>
										<h3 className="text-base font-bold text-white tracking-wide">
											{opt.label}
										</h3>
										{opt.description && (
											<p className="text-xs text-white/50 mt-1 leading-normal">
												{opt.description}
											</p>
										)}
									</div>
								</button>
							))}
						</div>
					</div>
				)}

				{/* === STATE: PROMPT INSTRUCTION (Costco-style Terminal) === */}
				{status === "prompt" && (
					<div className="flex flex-col items-center text-center gap-6 animate-fade-in max-w-sm">
						{/* Pulsing NFC / Reader SVG Illustration */}
						<div className="relative flex items-center justify-center h-28 w-28 bg-white/[0.03] border border-white/10 rounded-full [box-shadow:0_0_40px_rgba(255,255,255,0.05)]">
							{/* Radial signal waves */}
							<div
								className="absolute inset-0 rounded-full border border-caj-primary/40 animate-ping opacity-60"
								style={{ animationDuration: "2s" }}
							/>
							<div
								className="absolute inset-2 rounded-full border border-white/20 animate-ping opacity-45"
								style={{ animationDuration: "3s" }}
							/>

							<svg
								className="h-14 w-14 text-caj-primary"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.2}
									d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
								/>
							</svg>
						</div>

						<div className="space-y-2">
							<h2 className="text-2xl font-black text-white tracking-wide">
								{selectedMethod === "nfc"
									? "Acerque su celular"
									: "Inserte o deslice su tarjeta"}
							</h2>
							<p className="text-sm text-white/60 leading-relaxed font-medium">
								Por favor, siga las instrucciones en la terminal de pago que se
								encuentra debajo de la pantalla.
							</p>
						</div>
					</div>
				)}

				{/* === STATE: PROCESSING === */}
				{status === "processing" && (
					<div className="flex flex-col items-center text-center gap-6 animate-fade-in">
						{/* Spinning authorization ring */}
						<div className="relative flex items-center justify-center h-24 w-24">
							<div className="h-20 w-20 rounded-full border-4 border-white/10 border-t-caj-primary animate-spin" />
						</div>

						<div className="space-y-1.5">
							<h2 className="text-xl font-bold text-white">
								Autorizando transacción...
							</h2>
							<p className="text-sm text-white/50 animate-pulse font-medium">
								Por favor, no retire su tarjeta
							</p>
						</div>
					</div>
				)}

				{/* === STATE: SUCCESS === */}
				{status === "success" && (
					<div className="flex flex-col items-center text-center gap-5 animate-fade-in">
						{/* Green glowing check */}
						<div className="flex items-center justify-center h-24 w-24 rounded-full bg-green-500/20 border border-green-500/40 [box-shadow:0_0_30px_rgba(34,197,94,0.3)]">
							<svg
								className="h-12 w-12 text-green-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2.5}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>

						<div className="space-y-1">
							<h2 className="text-2xl font-black text-green-400">
								¡Pago Exitoso!
							</h2>
							<p className="text-sm text-white/60">
								Imprimiendo ticket de compra...
							</p>
						</div>
					</div>
				)}

				{/* === STATE: ERROR === */}
				{status === "error" && (
					<div className="flex flex-col items-center text-center gap-5 animate-fade-in">
						<div className="flex items-center justify-center h-24 w-24 rounded-full bg-red-500/20 border border-red-500/40 [box-shadow:0_0_30px_rgba(239,68,68,0.3)]">
							<svg
								className="h-12 w-12 text-red-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2.5}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</div>

						<div className="space-y-1.5 max-w-xs">
							<h2 className="text-2xl font-black text-red-400">
								Transacción Declinada
							</h2>
							<p className="text-sm text-white/60">
								Intente de nuevo, use otro método de pago o llame a un
								asistente.
							</p>
						</div>
					</div>
				)}
			</div>

			{/* ── FOOTER: Back/Cancel Button ── */}
			<div className="flex justify-between items-center border-t border-white/10 pt-4">
				{status === "select"
					? onCancel && (
							<Button variant="ghost" onClick={onCancel}>
								Cancelar
							</Button>
						)
					: status !== "success" &&
						status !== "processing" && (
							<Button
								variant="ghost"
								onClick={() => setStatus("select")}
								icon={
									<svg
										className="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10 19l-7-7m0 0l7-7m-7 7h18"
										/>
									</svg>
								}
							>
								Volver a métodos de pago
							</Button>
						)}

				{status === "error" && (
					<Button variant="primary" onClick={() => setStatus("prompt")}>
						Reintentar pago
					</Button>
				)}
			</div>
		</GlassPanel>
	);
}
