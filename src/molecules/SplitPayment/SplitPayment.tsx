import { useMemo, useState } from "react";
import { cn, formatCurrency } from "@/lib/utils";
import type { PaymentType } from "../../atoms/PaymentMethod/PaymentMethod";
import { PaymentMethod } from "../../atoms/PaymentMethod/PaymentMethod";

export interface SplitEntry {
	id: string;
	amount: number;
	method: PaymentType | null;
	label?: string;
}

export interface SplitPaymentProps {
	total: number;
	currency?: string;
	locale?: string;
	maxSplits?: number;
	onConfirm?: (splits: SplitEntry[]) => void;
	className?: string;
}

const METHODS: PaymentType[] = ["cash", "card", "transfer", "credit"];

function makeSplit(id: string): SplitEntry {
	return { id, amount: 0, method: null };
}

export function SplitPayment({
	total,
	currency = "MXN",
	locale = "es-MX",
	maxSplits = 4,
	onConfirm,
	className,
}: SplitPaymentProps) {
	const [splits, setSplits] = useState<SplitEntry[]>([
		makeSplit("1"),
		makeSplit("2"),
	]);

	const fmt = (v: number) => formatCurrency(v, currency, locale);

	const totalAssigned = useMemo(
		() => splits.reduce((acc, s) => acc + (s.amount || 0), 0),
		[splits],
	);
	const remaining = Math.max(0, total - totalAssigned);
	const isValid =
		Math.abs(totalAssigned - total) < 0.01 &&
		splits.every((s) => s.method !== null && s.amount > 0);

	function addSplit() {
		if (splits.length < maxSplits) {
			setSplits((prev) => [...prev, makeSplit(String(Date.now()))]);
		}
	}

	function removeSplit(id: string) {
		if (splits.length > 2) setSplits((prev) => prev.filter((s) => s.id !== id));
	}

	function updateAmount(id: string, value: string) {
		const amount = parseFloat(value) || 0;
		setSplits((prev) => prev.map((s) => (s.id === id ? { ...s, amount } : s)));
	}

	function updateMethod(id: string, method: PaymentType) {
		setSplits((prev) => prev.map((s) => (s.id === id ? { ...s, method } : s)));
	}

	function distributeEvenly() {
		const per = +(total / splits.length).toFixed(2);
		const remainder = +(total - per * (splits.length - 1)).toFixed(2);
		setSplits((prev) =>
			prev.map((s, i) => ({
				...s,
				amount: i === prev.length - 1 ? remainder : per,
			})),
		);
	}

	function assignRemaining(id: string) {
		const others = splits
			.filter((s) => s.id !== id)
			.reduce((a, s) => a + s.amount, 0);
		const rem = +(total - others).toFixed(2);
		setSplits((prev) =>
			prev.map((s) => (s.id === id ? { ...s, amount: Math.max(0, rem) } : s)),
		);
	}

	return (
		<div className={cn("flex flex-col gap-4", className)}>
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<p className="font-semibold text-white">Dividir pago</p>
					<p className="text-sm text-white/60">Total: {fmt(total)}</p>
				</div>
				<button
					type="button"
					onClick={distributeEvenly}
					className="text-xs font-semibold text-caj-primary underline underline-offset-2"
				>
					Dividir igual
				</button>
			</div>

			{/* Progress bar */}
			<div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.15]">
				<div
					className={cn(
						"h-full rounded-full transition-all",
						totalAssigned > total ? "bg-red-500" : "bg-caj-primary",
					)}
					style={{ width: `${Math.min(100, (totalAssigned / total) * 100)}%` }}
				/>
			</div>
			<div className="flex justify-between text-xs text-white/60">
				<span>
					Asignado: <strong className="text-white">{fmt(totalAssigned)}</strong>
				</span>
				<span
					className={remaining > 0.01 ? "text-amber-300" : "text-green-300"}
				>
					{remaining > 0.01 ? `Falta: ${fmt(remaining)}` : "✓ Completo"}
				</span>
			</div>

			{/* Split rows */}
			<div className="flex flex-col gap-3">
				{splits.map((split, idx) => (
					<div
						key={split.id}
						className="rounded-xl border border-white/[0.18] bg-white/[0.08] backdrop-blur-md p-3"
					>
						<div className="flex items-center justify-between mb-2">
							<span className="text-xs font-semibold text-white/60">
								Pago {idx + 1}
							</span>
							<div className="flex gap-2">
								<button
									type="button"
									onClick={() => assignRemaining(split.id)}
									className="text-xs text-caj-primary hover:underline"
								>
									Asignar restante
								</button>
								{splits.length > 2 && (
									<button
										type="button"
										onClick={() => removeSplit(split.id)}
										className="text-xs text-caj-danger hover:underline"
									>
										Quitar
									</button>
								)}
							</div>
						</div>

						<div className="flex gap-2">
							<div className="relative flex-1">
								<input
									type="number"
									value={split.amount || ""}
									onChange={(e) => updateAmount(split.id, e.target.value)}
									placeholder="0.00"
									min={0}
									step={0.01}
									className="caj-input pr-14 tabular-nums"
								/>
								<span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-medium text-white/60">
									{currency}
								</span>
							</div>
						</div>

						<div className="mt-2 flex flex-wrap gap-1.5">
							{METHODS.map((m) => (
								<PaymentMethod
									key={m}
									method={m}
									selected={split.method === m}
									onSelect={(method) => updateMethod(split.id, method)}
									className="!min-w-0 flex-row gap-1 px-2.5 py-1.5"
								/>
							))}
						</div>
					</div>
				))}
			</div>

			{/* Add split */}
			{splits.length < maxSplits && (
				<button
					type="button"
					onClick={addSplit}
					className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/[0.18] py-3 text-sm font-semibold text-white/60 hover:border-white/[0.40] hover:text-white transition-colors"
				>
					+ Agregar forma de pago
				</button>
			)}

			{/* Confirm */}
			{onConfirm && (
				<button
					type="button"
					onClick={() => isValid && onConfirm(splits)}
					disabled={!isValid}
					className="caj-btn-primary w-full py-3 text-base disabled:pointer-events-none disabled:opacity-50"
				>
					Confirmar {splits.length} pagos
				</button>
			)}
		</div>
	);
}
