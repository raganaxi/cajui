import { useEffect, useState } from "react";
import { Button } from "@/atoms/Button";
import { GlassPanel } from "@/atoms/GlassPanel";
import { cn } from "@/lib/utils";

export type AttendantReason =
	| "help"
	| "age_verification"
	| "weight_item"
	| "price_check"
	| "coupon"
	| "other";

const REASON_LABELS: Record<AttendantReason, string> = {
	help: "Necesito ayuda",
	age_verification: "Verificar edad",
	weight_item: "Producto por peso",
	price_check: "Verificar precio",
	coupon: "Usar cupón / oferta",
	other: "Otro motivo",
};

const REASON_ICONS: Record<AttendantReason, string> = {
	help: "🙋",
	age_verification: "🪪",
	weight_item: "⚖️",
	price_check: "🏷️",
	coupon: "🎟️",
	other: "💬",
};

export interface AttendantCallProps {
	reasons?: AttendantReason[];
	onCall?: (reason: AttendantReason) => void;
	onCancel?: () => void;
	waitingMessage?: string;
	className?: string;
}

/**
 * Self-checkout "call attendant" button and waiting state.
 */
export function AttendantCall({
	reasons = [
		"help",
		"age_verification",
		"weight_item",
		"price_check",
		"coupon",
		"other",
	],
	onCall,
	onCancel,
	waitingMessage = "Un empleado llegará en un momento…",
	className,
}: AttendantCallProps) {
	const [step, setStep] = useState<"idle" | "choosing" | "waiting">("idle");
	const [elapsed, setElapsed] = useState(0);

	useEffect(() => {
		if (step !== "waiting") {
			setElapsed(0);
			return;
		}
		const id = setInterval(() => setElapsed((s) => s + 1), 1000);
		return () => clearInterval(id);
	}, [step]);

	function callWith(reason: AttendantReason) {
		setStep("waiting");
		onCall?.(reason);
	}

	function cancel() {
		setStep("idle");
		onCancel?.();
	}

	if (step === "idle") {
		return (
			<Button
				variant="warning"
				size="xl"
				onClick={() => setStep("choosing")}
				icon={<span className="text-2xl">🔔</span>}
				className={cn(
					"flex items-center gap-3 h-auto py-4 rounded-2xl font-bold",
					className,
				)}
			>
				Llamar a un empleado
			</Button>
		);
	}

	if (step === "choosing") {
		return (
			<GlassPanel
				tint="white"
				radius="lg"
				padding="md"
				className={cn("flex flex-col gap-3", className)}
			>
				<p className="font-semibold text-white">¿Por qué necesitas ayuda?</p>
				<div className="grid grid-cols-2 gap-2">
					{reasons.map((reason) => (
						<button
							key={reason}
							type="button"
							onClick={() => callWith(reason)}
							className={cn(
								"caj-glass-subtle flex flex-col items-center gap-1.5 border rounded-xl p-3",
								"text-center transition-all hover:border-caj-warning/35 hover:bg-caj-warning/15 active:scale-95",
							)}
						>
							<span className="text-2xl">{REASON_ICONS[reason]}</span>
							<span className="text-xs font-semibold text-white">
								{REASON_LABELS[reason]}
							</span>
						</button>
					))}
				</div>
				<Button variant="text" onClick={() => setStep("idle")}>
					Cancelar
				</Button>
			</GlassPanel>
		);
	}

	// Waiting
	return (
		<GlassPanel
			tint="warning"
			radius="lg"
			padding="lg"
			className={cn(
				"flex flex-col items-center gap-4 text-center border-2 border-caj-warning/35",
				className,
			)}
		>
			<div className="relative flex h-16 w-16 items-center justify-center">
				<span className="text-4xl">🔔</span>
				<span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-caj-warning text-xs font-bold text-white">
					!
				</span>
			</div>
			<div>
				<p className="text-lg font-bold text-caj-warning/90">
					Empleado notificado
				</p>
				<p className="text-sm text-white/80">{waitingMessage}</p>
			</div>
			<div className="flex items-center gap-2 text-sm text-caj-warning">
				<span className="inline-block h-2 w-2 animate-pulse rounded-full bg-caj-warning" />
				Esperando… {elapsed > 0 && `(${elapsed}s)`}
			</div>
			{onCancel && (
				<Button
					variant="text"
					onClick={cancel}
					className="text-caj-warning hover:text-caj-warning/80 hover:no-underline"
				>
					Ya no necesito ayuda
				</Button>
			)}
		</GlassPanel>
	);
}
