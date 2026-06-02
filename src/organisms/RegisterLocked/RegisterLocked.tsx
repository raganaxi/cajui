import { useState, useEffect } from 'react';
import { RegisterLockedProps } from './interface';
import { cn, formatCurrency } from '@/lib/utils';
import { GlassPanel } from '@/atoms/GlassPanel';
import { Button } from '@/atoms/Button';
import { NumPad } from '@/atoms/NumPad';
import { AlertBanner } from '@/atoms/AlertBanner';

export function RegisterLocked({
  cashierName,
  shiftSummary,
  onUnlock,
  onLogout,
  companyBranding,
  error: externalError,
  isLoading: externalLoading = false,
  className,
}: RegisterLockedProps) {
  const [pin, setPin] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const activeError = externalError || localError;
  const activeLoading = externalLoading || isVerifying;

  // Handle shake animation
  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 500);
  };

  // Submit unlock
  const handleUnlock = async (enteredPin: string) => {
    if (activeLoading || !enteredPin) return;

    setIsVerifying(true);
    setLocalError(null);

    try {
      const isCorrect = await onUnlock(enteredPin);
      if (!isCorrect) {
        setLocalError('PIN incorrecto. Acceso denegado.');
        setPin('');
        triggerShake();
      }
    } catch (err) {
      setLocalError('Error al validar el PIN. Intente de nuevo.');
      setPin('');
      triggerShake();
    } finally {
      setIsVerifying(false);
    }
  };

  // Auto-submit pin when 4 digits are entered
  useEffect(() => {
    if (pin.length === 4) {
      const timer = setTimeout(() => {
        handleUnlock(pin);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [pin]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-2xl p-4 overflow-y-auto">
      {/* Custom inline animation for shaking when password is incorrect */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes caj-shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .caj-animate-shake {
          animation: caj-shake 0.4s ease-in-out;
        }
      `}} />

      <GlassPanel
        strength="medium"
        radius="xl"
        shadow
        className={cn(
          'w-full max-w-[420px] p-8 flex flex-col items-center gap-6 border-white/10 bg-black/35 transition-transform duration-300',
          isShaking && 'caj-animate-shake',
          className
        )}
      >
        {/* Company Branding */}
        {companyBranding && (
          <div className="flex justify-center mb-1">
            {companyBranding}
          </div>
        )}

        {/* Pulsing Lock Icon */}
        <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 shadow-[0_0_24px_rgba(255,255,255,0.05)]">
          <div className="absolute inset-0 rounded-full border border-caj-primary/20 animate-ping opacity-30" />
          <svg
            className="w-10 h-10 text-caj-primary filter drop-shadow-[0_0_8px_rgba(var(--caj-primary),0.5)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        {/* Lock Screen Info */}
        <div className="text-center flex flex-col gap-1">
          <h2 className="text-xl font-bold text-white tracking-wide">Terminal Bloqueada</h2>
          <div className="flex items-center justify-center gap-1.5 text-white/60">
            <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-semibold text-sm">{cashierName}</span>
          </div>
        </div>

        {/* Error Display */}
        {activeError && (
          <AlertBanner
            variant="danger"
            message={activeError}
            className="w-full rounded-xl border-red-500/20 py-2 bg-red-950/20"
          />
        )}

        {/* PIN Indicators */}
        <div className="flex gap-4 justify-center py-1">
          {[0, 1, 2, 3].map((index) => {
            const isActive = pin.length > index;
            return (
              <div
                key={index}
                className={cn(
                  'w-4.5 h-4.5 rounded-full border border-white/20 transition-all duration-150',
                  isActive
                    ? 'bg-caj-primary border-caj-primary scale-110 shadow-[0_0_12px_rgba(var(--caj-primary),0.8)]'
                    : 'bg-white/5'
                )}
              />
            );
          })}
        </div>

        {/* PIN Pad */}
        <div className="w-full">
          <NumPad
            value={pin}
            onChange={setPin}
            onEnter={handleUnlock}
            maxLength={4}
            allowDecimals={false}
            disabled={activeLoading}
          />
        </div>

        {/* Shift Summary Collapsible */}
        {shiftSummary && (
          <div className="w-full border-t border-white/5 pt-4 mt-2">
            <button
              type="button"
              onClick={() => setShowSummary(!showSummary)}
              className="flex items-center justify-center gap-2 w-full py-1 text-xs font-semibold text-white/50 hover:text-white/80 transition-colors"
            >
              {showSummary ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Ocultar Resumen de Turno
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                  Ver Resumen de Turno
                </>
              )}
            </button>

            {showSummary && (
              <div className="grid grid-cols-2 gap-3 mt-3 animate-[fadeIn_0.2s_ease-out]">
                <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-center">
                  <span className="block text-[10px] uppercase tracking-wider text-white/40 font-medium">Transacciones</span>
                  <span className="text-sm font-bold text-white">{shiftSummary.salesCount}</span>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-center">
                  <span className="block text-[10px] uppercase tracking-wider text-white/40 font-medium">Total de Turno</span>
                  <span className="text-sm font-bold text-caj-primary">{formatCurrency(shiftSummary.salesTotal)}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Change Cashier / Logout button */}
        {onLogout && (
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
    </div>
  );
}
