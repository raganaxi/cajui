import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { AlertBanner } from "@/atoms/AlertBanner";
import { Button } from "@/atoms/Button";
import { GlassPanel } from "@/atoms/GlassPanel";
import { NumPad } from "@/atoms/NumPad";
import { cn, formatCurrency } from "@/lib/utils";
import type { LoginProps } from "./interface";

export function Login({
	variant = "default",
	onLogin,
	allowPin = true,
	allowCredentials = true,
	companyBranding,
	error: externalError,
	isLoading: externalLoading = false,
	className,
	// Lock-specific props
	cashierName,
	shiftSummary,
	onUnlock,
	onLogout,
}: LoginProps) {
	const isLockMode = variant === "lock";

	// Determine starting tab (only for default variant)
	const defaultTab = allowPin ? "pin" : "credentials";
	const [activeTab, setActiveTab] = useState<"pin" | "credentials">(defaultTab);

	// Form states
	const [pin, setPin] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Lock Screen local states
	const [showSummary, setShowSummary] = useState(false);
	const [localError, setLocalError] = useState<string | null>(null);
	const [isVerifying, setIsVerifying] = useState(false);
	const [isShaking, setIsShaking] = useState(false);

	const activeError = externalError || localError;
	const activeLoading = externalLoading || isVerifying;

	// Handle switching tabs
	const handleTabChange = (tab: "pin" | "credentials") => {
		if (activeLoading) return;
		setActiveTab(tab);
		setPin(""); // Clear inputs on switch
		setEmail("");
		setPassword("");
	};

	// Handle shake animation
	const triggerShake = useCallback(() => {
		setIsShaking(true);
		setTimeout(() => {
			setIsShaking(false);
		}, 500);
	}, []);

	// Submit handlers
	const handlePinSubmit = useCallback(
		async (finalPin: string) => {
			if (activeLoading || !finalPin) return;

			if (isLockMode && onUnlock) {
				setIsVerifying(true);
				setLocalError(null);
				try {
					const isCorrect = await onUnlock(finalPin);
					if (!isCorrect) {
						setLocalError("PIN incorrecto. Acceso denegado.");
						setPin("");
						triggerShake();
					}
				} catch (_err) {
					setLocalError("Error al validar el PIN. Intente de nuevo.");
					setPin("");
					triggerShake();
				} finally {
					setIsVerifying(false);
				}
			} else {
				onLogin?.({ pin: finalPin });
			}
		},
		[activeLoading, isLockMode, onLogin, onUnlock, triggerShake],
	);

	const handleCredentialsSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (activeLoading || !email || !password) return;
		onLogin?.({ email, password });
	};

	// Auto-submit pin when 4 digits are reached
	useEffect(() => {
		if (pin.length === 4) {
			const timer = setTimeout(() => {
				handlePinSubmit(pin);
			}, 150);
			return () => clearTimeout(timer);
		}
	}, [pin, handlePinSubmit]);

	const loginCard = (
		<GlassPanel
			strength="medium"
			radius="xl"
			shadow
			className={cn(
				"w-full max-w-[420px] p-8 flex flex-col items-center gap-6 border-white/10 bg-black/45 transition-transform duration-300",
				isShaking && "animate-shake",
				!isLockMode && "items-stretch", // Left-aligned in login form
				className,
			)}
		>
			{/* Header / Branding */}
			{companyBranding && (
				<div className="flex justify-center mb-2 w-full">{companyBranding}</div>
			)}

			{/* Lock Screen Header details */}
			{isLockMode && (
				<>
					{/* Lock Icon */}
					<div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 shadow-[0_0_24px_rgba(255,255,255,0.05)]">
						<div className="absolute inset-0 rounded-full border border-caj-primary/20 animate-ping opacity-30" />
						<svg
							className="w-10 h-10 text-caj-primary filter drop-shadow-[0_0_8px_rgba(var(--caj-primary),0.5)]"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							/>
						</svg>
					</div>

					{/* Title Info */}
					<div className="text-center flex flex-col gap-1 w-full">
						<h2 className="text-xl font-bold text-white tracking-wide">
							Terminal Bloqueada
						</h2>
						<div className="flex items-center justify-center gap-1.5 text-white/60">
							<svg
								className="w-4 h-4 text-white/40"
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
							<span className="font-semibold text-sm">{cashierName}</span>
						</div>
					</div>
				</>
			)}

			{/* Default View: Tabs */}
			{!isLockMode && allowPin && allowCredentials && (
				<div className="grid grid-cols-2 p-1.5 bg-white/5 border border-white/10 rounded-xl w-full">
					<button
						type="button"
						disabled={activeLoading}
						onClick={() => handleTabChange("pin")}
						className={cn(
							"py-2.5 text-sm font-semibold rounded-lg transition-all duration-150",
							activeTab === "pin"
								? "bg-white/15 text-white shadow-md backdrop-blur-md border border-white/10"
								: "text-white/60 hover:text-white hover:bg-white/5",
						)}
					>
						PIN de Acceso
					</button>
					<button
						type="button"
						disabled={activeLoading}
						onClick={() => handleTabChange("credentials")}
						className={cn(
							"py-2.5 text-sm font-semibold rounded-lg transition-all duration-150",
							activeTab === "credentials"
								? "bg-white/15 text-white shadow-md backdrop-blur-md border border-white/10"
								: "text-white/60 hover:text-white hover:bg-white/5",
						)}
					>
						Credenciales
					</button>
				</div>
			)}

			{/* Error display */}
			{activeError && (
				<AlertBanner
					variant="danger"
					message={activeError}
					className="w-full rounded-xl border-red-500/20 py-2.5 bg-red-950/20"
				/>
			)}

			{/* Forms container */}
			<div className="w-full flex-1 flex flex-col justify-center">
				{/* PIN View (Always active in Lock Mode, or tab in default mode) */}
				{(isLockMode || (activeTab === "pin" && allowPin)) && (
					<div className="flex flex-col items-center gap-6 w-full">
						{!isLockMode && (
							<span className="text-sm font-medium text-white/50 tracking-wide uppercase">
								Ingrese su PIN de 4 dígitos
							</span>
						)}

						{/* PIN Indicator Dots */}
						<div className="flex gap-4 justify-center py-2">
							{[0, 1, 2, 3].map((index) => {
								const isActive = pin.length > index;
								return (
									<div
										key={index}
										className={cn(
											"w-4.5 h-4.5 rounded-full border border-white/20 transition-all duration-150",
											isActive
												? "bg-caj-primary border-caj-primary scale-110 shadow-[0_0_12px_rgba(var(--caj-primary),0.8)]"
												: "bg-white/5",
										)}
									/>
								);
							})}
						</div>

						{/* NumPad */}
						<div className="w-full mt-2">
							<NumPad
								value={pin}
								onChange={setPin}
								onEnter={handlePinSubmit}
								maxLength={4}
								allowDecimals={false}
								disabled={activeLoading}
							/>
						</div>
					</div>
				)}

				{/* Credentials Login View */}
				{!isLockMode && activeTab === "credentials" && allowCredentials && (
					<form
						onSubmit={handleCredentialsSubmit}
						className="flex flex-col gap-4 w-full"
					>
						{/* Email Field */}
						<div className="flex flex-col gap-1.5 w-full">
							<label
								htmlFor="login-email"
								className="text-xs font-semibold text-white/60"
							>
								Correo Electrónico
							</label>
							<div className="relative w-full">
								<span className="absolute inset-y-0 left-3 flex items-center text-white/40 pointer-events-none">
									<svg
										className="w-4 h-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
										/>
									</svg>
								</span>
								<input
									id="login-email"
									type="email"
									required
									placeholder="ejemplo@cajui.com"
									disabled={activeLoading}
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="caj-input pl-10 w-full"
								/>
							</div>
						</div>

						{/* Password Field */}
						<div className="flex flex-col gap-1.5 w-full">
							<label
								htmlFor="login-password"
								className="text-xs font-semibold text-white/60"
							>
								Contraseña
							</label>
							<div className="relative w-full">
								<span className="absolute inset-y-0 left-3 flex items-center text-white/40 pointer-events-none">
									<svg
										className="w-4 h-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
										/>
									</svg>
								</span>
								<input
									id="login-password"
									type="password"
									required
									placeholder="••••••••"
									disabled={activeLoading}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="caj-input pl-10 w-full"
								/>
							</div>
						</div>

						{/* Submit Button */}
						<Button
							type="submit"
							variant="primary"
							size="lg"
							block
							loading={activeLoading}
							className="mt-4"
						>
							Iniciar Sesión
						</Button>
					</form>
				)}
			</div>

			{/* Lock Screen: Shift Summary Collapsible */}
			{isLockMode && shiftSummary && (
				<div className="w-full border-t border-white/5 pt-4 mt-2">
					<button
						type="button"
						onClick={() => setShowSummary(!showSummary)}
						className="flex items-center justify-center gap-2 w-full py-1 text-xs font-semibold text-white/50 hover:text-white/80 transition-colors"
					>
						{showSummary ? (
							<>
								<svg
									className="w-4 h-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
								Ocultar Resumen de Turno
							</>
						) : (
							<>
								<svg
									className="w-4 h-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
									/>
								</svg>
								Ver Resumen de Turno
							</>
						)}
					</button>

					{showSummary && (
						<div className="grid grid-cols-2 gap-3 mt-3 animate-[fadeIn_0.2s_ease-out] w-full">
							<div className="bg-white/5 border border-white/5 rounded-xl p-3 text-center">
								<span className="block text-[10px] uppercase tracking-wider text-white/40 font-medium">
									Transacciones
								</span>
								<span className="text-sm font-bold text-white">
									{shiftSummary.salesCount}
								</span>
							</div>
							<div className="bg-white/5 border border-white/5 rounded-xl p-3 text-center">
								<span className="block text-[10px] uppercase tracking-wider text-white/40 font-medium">
									Total de Turno
								</span>
								<span className="text-sm font-bold text-caj-primary animate-pulse">
									{formatCurrency(shiftSummary.salesTotal)}
								</span>
							</div>
						</div>
					)}
				</div>
			)}

			{/* Lock Screen: Logout Button */}
			{isLockMode && onLogout && (
				<Button
					variant="text"
					disabled={activeLoading}
					onClick={onLogout}
					className="w-full text-xs text-white/40 hover:text-white/80 transition-colors mt-2"
				>
					Cerrar Sesión (Cambiar de Cajero)
				</Button>
			)}
		</GlassPanel>
	);

	// In Lock Mode, render inside full-screen backdrop overlay
	if (isLockMode) {
		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-2xl p-4 overflow-y-auto w-full h-full">
				{loginCard}
			</div>
		);
	}

	return loginCard;
}
