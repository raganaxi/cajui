import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { AlertBanner } from "@/atoms/AlertBanner";
import { Button } from "@/atoms/Button";
import { GlassPanel } from "@/atoms/GlassPanel";
import { Icon } from "@/atoms/Icon";
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
				"w-full max-w-[440px] py-10 px-10 flex flex-col items-center gap-8 border-white/10 bg-black/45 transition-transform duration-300",
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
						<Icon
							name="lock"
							size={40}
							className="text-caj-primary filter drop-shadow-[0_0_8px_rgba(var(--caj-primary),0.5)]"
						/>
					</div>

					{/* Title Info */}
					<div className="text-center flex flex-col gap-1 w-full">
						<h2 className="text-xl font-bold text-white tracking-wide">
							Terminal Bloqueada
						</h2>
						<div className="flex items-center justify-center gap-1.5 text-white/60">
							<Icon name="user" size="sm" className="text-white/40" />
							<span className="font-semibold text-sm">{cashierName}</span>
						</div>
					</div>
				</>
			)}

			{/* Default View: Tabs */}
			{!isLockMode && allowPin && allowCredentials && (
				<div className="grid grid-cols-2 p-1 bg-black/5 dark:bg-white/5 border border-black/[0.03] dark:border-white/5 rounded-xl w-full relative">
					<button
						type="button"
						disabled={activeLoading}
						onClick={() => handleTabChange("pin")}
						className={cn(
							"py-2 text-sm font-medium rounded-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-caj-primary/40 focus-visible:outline-none select-none",
							activeTab === "pin"
								? "bg-white dark:bg-white/10 text-caj-primary dark:text-white shadow-sm font-semibold"
								: "text-caj-text-muted hover:text-caj-text",
						)}
					>
						PIN de Acceso
					</button>
					<button
						type="button"
						disabled={activeLoading}
						onClick={() => handleTabChange("credentials")}
						className={cn(
							"py-2 text-sm font-medium rounded-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-caj-primary/40 focus-visible:outline-none select-none",
							activeTab === "credentials"
								? "bg-white dark:bg-white/10 text-caj-primary dark:text-white shadow-sm font-semibold"
								: "text-caj-text-muted hover:text-caj-text",
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
					<div className="flex flex-col items-center gap-8 w-full">
						{!isLockMode && (
							<span className="text-xs font-semibold text-caj-text-muted tracking-wider uppercase">
								Ingrese su PIN de 4 dígitos
							</span>
						)}

						{/* PIN Indicator Dots */}
						<div className="flex gap-6 justify-center py-3">
							{[0, 1, 2, 3].map((index) => {
								const isActive = pin.length > index;
								return (
									<div
										key={index}
										className={cn(
											"w-4 h-4 rounded-full border-2 border-black/10 dark:border-white/20 bg-black/5 dark:bg-white/5 transition-all duration-150",
											isActive
												? "bg-caj-primary border-caj-primary scale-125 shadow-[0_0_12px_rgba(var(--caj-primary),0.4)]"
												: "",
										)}
									/>
								);
							})}
						</div>

						{/* NumPad */}
						<div className="w-full">
							<NumPad
								value={pin}
								onChange={setPin}
								onEnter={handlePinSubmit}
								maxLength={4}
								allowDecimals={false}
								disabled={activeLoading}
								className="gap-3"
							/>
						</div>
					</div>
				)}

				{/* Credentials Login View */}
				{!isLockMode && activeTab === "credentials" && allowCredentials && (
					<form
						onSubmit={handleCredentialsSubmit}
						className="flex flex-col gap-6 w-full"
					>
						{/* Email Field */}
						<div className="flex flex-col gap-2 w-full">
							<label
								htmlFor="login-email"
								className="text-xs font-semibold text-caj-text-muted tracking-wide"
							>
								Correo Electrónico
							</label>
							<div className="relative w-full">
								<span className="absolute inset-y-0 left-3.5 flex items-center text-caj-text-muted pointer-events-none">
									<Icon name="atSign" size="sm" />
								</span>
								<input
									id="login-email"
									type="email"
									required
									placeholder="ejemplo@cajui.com"
									disabled={activeLoading}
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="caj-input pl-11 py-3 text-base w-full focus:ring-2 focus:ring-caj-primary/20"
								/>
							</div>
						</div>

						{/* Password Field */}
						<div className="flex flex-col gap-2 w-full">
							<label
								htmlFor="login-password"
								className="text-xs font-semibold text-caj-text-muted tracking-wide"
							>
								Contraseña
							</label>
							<div className="relative w-full">
								<span className="absolute inset-y-0 left-3.5 flex items-center text-caj-text-muted pointer-events-none">
									<Icon name="lock" size="sm" />
								</span>
								<input
									id="login-password"
									type="password"
									required
									placeholder="••••••••"
									disabled={activeLoading}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="caj-input pl-11 py-3 text-base w-full focus:ring-2 focus:ring-caj-primary/20"
								/>
							</div>
						</div>

						{/* Submit Button */}
						<Button
							type="submit"
							variant="primary"
							size="xl"
							block
							loading={activeLoading}
							className="mt-2"
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
								<Icon name="eye" size="sm" />
								Ocultar Resumen de Turno
							</>
						) : (
							<>
								<Icon name="eyeOff" size="sm" />
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
