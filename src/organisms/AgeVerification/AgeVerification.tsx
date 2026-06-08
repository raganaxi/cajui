import { useState } from "react";
import { Button } from "@/atoms/Button";
import { cn } from "@/lib/utils";

export interface AgeVerificationProps {
	minAge?: number;
	productName?: string;
	onApprove: () => void;
	onDeny: () => void;
	requireStaff?: boolean;
	className?: string;
}

/**
 * Age verification modal for restricted products (alcohol, tobacco) in self-checkout kiosks.
 */
export function AgeVerification({
	minAge = 18,
	productName,
	onApprove,
	onDeny,
	requireStaff = false,
	className,
}: AgeVerificationProps) {
	const [confirmed, setConfirmed] = useState(false);

	return (
		<div
			className={cn(
				"caj-age-verification",
				"flex flex-col items-center justify-center gap-6 rounded-2xl border border-caj-warning/35",
				"bg-caj-warning/15 backdrop-blur-md p-8 text-center",
				className,
			)}
			role="alertdialog"
			aria-modal
		>
			{/* Icon */}
			<div className="caj-age-verification-icon flex h-20 w-20 items-center justify-center rounded-full border-4 border-caj-warning/50 bg-caj-warning/20 text-4xl backdrop-blur-sm">
				🔞
			</div>

			<div>
				<h2 className="caj-age-verification-title text-xl font-bold text-caj-warning">
					Verificación de edad
				</h2>
				{productName && (
					<p className="caj-age-verification-subtitle mt-1 text-sm text-white/80">
						<strong>{productName}</strong> requiere verificación de edad
					</p>
				)}
				<p className="caj-age-verification-requirement mt-2 text-base font-semibold text-white">
					Debes tener {minAge} años o más para continuar
				</p>
			</div>

			{requireStaff ? (
				<div className="flex flex-col items-center gap-3 w-full">
					<div className="caj-age-verification-staff-alert flex items-center gap-2 rounded-xl border border-caj-warning/30 bg-caj-warning/15 px-4 py-3">
						<svg
							className="h-5 w-5 text-caj-warning"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
						<p className="text-sm font-semibold text-caj-warning">
							Un empleado verificará tu identificación
						</p>
					</div>
					<Button
						variant="text"
						onClick={onDeny}
						className="caj-age-verification-cancel-btn text-caj-warning hover:text-caj-warning-hover hover:no-underline"
					>
						Cancelar y quitar producto
					</Button>
				</div>
			) : (
				<div className="flex flex-col gap-3 w-full max-w-xs">
					<label className="caj-age-verification-checkbox-label flex cursor-pointer items-start gap-3 rounded-xl border border-caj-warning/30 bg-caj-warning/10 p-3 text-left">
						<input
							type="checkbox"
							checked={confirmed}
							onChange={(e) => setConfirmed(e.target.checked)}
							className="caj-age-verification-checkbox mt-0.5 h-5 w-5 rounded accent-caj-warning"
						/>
						<span className="text-sm text-white/90">
							Confirmo que tengo {minAge} años o más y acepto responsabilidad de
							esta compra
						</span>
					</label>

					<Button
						variant="warning"
						size="lg"
						block
						onClick={onApprove}
						disabled={!confirmed}
						className="caj-age-verification-approve-btn"
					>
						Confirmar — soy mayor de {minAge} años
					</Button>
					<Button
						variant="ghost"
						block
						onClick={onDeny}
						className="caj-age-verification-deny-btn border-caj-warning/30 bg-caj-warning/10 text-caj-warning hover:bg-caj-warning/20"
					>
						Cancelar — quitar producto
					</Button>
				</div>
			)}
		</div>
	);
}
