import React, { useState, useEffect } from 'react';
import { LoginProps } from './interface';
import { cn } from '@/lib/utils';
import { GlassPanel } from '@/atoms/GlassPanel';
import { Button } from '@/atoms/Button';
import { NumPad } from '@/atoms/NumPad';
import { AlertBanner } from '@/atoms/AlertBanner';

export function Login({
  onLogin,
  allowPin = true,
  allowCredentials = true,
  companyBranding,
  error,
  isLoading = false,
  className,
}: LoginProps) {
  // Determine starting tab
  const defaultTab = allowPin ? 'pin' : 'credentials';
  const [activeTab, setActiveTab] = useState<'pin' | 'credentials'>(defaultTab);

  // Form states
  const [pin, setPin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle switching tabs
  const handleTabChange = (tab: 'pin' | 'credentials') => {
    if (isLoading) return;
    setActiveTab(tab);
    setPin(''); // Clear inputs on switch
    setEmail('');
    setPassword('');
  };

  // Submit handlers
  const handlePinSubmit = (finalPin: string) => {
    if (isLoading || !finalPin) return;
    onLogin({ pin: finalPin });
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !email || !password) return;
    onLogin({ email, password });
  };

  // Auto-submit pin when 4 digits are reached
  useEffect(() => {
    if (pin.length === 4 && activeTab === 'pin') {
      // Small timeout to let the last dot fill visually before submitting
      const timer = setTimeout(() => {
        handlePinSubmit(pin);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [pin, activeTab]);

  return (
    <GlassPanel
      strength="medium"
      radius="xl"
      shadow
      className={cn(
        'w-full max-w-[420px] p-8 flex flex-col gap-6 backdrop-blur-xl border-white/10 bg-black/40',
        className
      )}
    >
      {/* Header / Branding */}
      {companyBranding && (
        <div className="flex justify-center mb-2">
          {companyBranding}
        </div>
      )}

      {/* Tabs */}
      {allowPin && allowCredentials && (
        <div className="grid grid-cols-2 p-1.5 bg-white/5 border border-white/10 rounded-xl">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleTabChange('pin')}
            className={cn(
              'py-2.5 text-sm font-semibold rounded-lg transition-all duration-150',
              activeTab === 'pin'
                ? 'bg-white/15 text-white shadow-md backdrop-blur-md border border-white/10'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            )}
          >
            PIN de Acceso
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleTabChange('credentials')}
            className={cn(
              'py-2.5 text-sm font-semibold rounded-lg transition-all duration-150',
              activeTab === 'credentials'
                ? 'bg-white/15 text-white shadow-md backdrop-blur-md border border-white/10'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            )}
          >
            Credenciales
          </button>
        </div>
      )}

      {/* Error display */}
      {error && (
        <AlertBanner
          variant="danger"
          message={error}
          className="rounded-xl border-red-500/20 py-2.5 bg-red-950/20"
        />
      )}

      {/* Forms container */}
      <div className="flex-1 flex flex-col justify-center">
        {/* PIN Login View */}
        {activeTab === 'pin' && allowPin && (
          <div className="flex flex-col items-center gap-6">
            <span className="text-sm font-medium text-white/50 tracking-wide uppercase">
              Ingrese su PIN de 4 dígitos
            </span>

            {/* PIN Indicator Dots */}
            <div className="flex gap-4 justify-center py-2">
              {[0, 1, 2, 3].map((index) => {
                const isActive = pin.length > index;
                return (
                  <div
                    key={index}
                    className={cn(
                      'w-4 h-4 rounded-full border border-white/20 transition-all duration-150',
                      isActive
                        ? 'bg-caj-primary border-caj-primary scale-110 shadow-[0_0_12px_rgba(var(--caj-primary),0.8)]'
                        : 'bg-white/5'
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
                disabled={isLoading}
              />
            </div>
          </div>
        )}

        {/* Credentials Login View */}
        {activeTab === 'credentials' && allowCredentials && (
          <form onSubmit={handleCredentialsSubmit} className="flex flex-col gap-4">
            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="login-email" className="text-xs font-semibold text-white/60">
                Correo Electrónico
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-white/40 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </span>
                <input
                  id="login-email"
                  type="email"
                  required
                  placeholder="ejemplo@cajui.com"
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="caj-input pl-10"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="login-password" className="text-xs font-semibold text-white/60">
                Contraseña
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-white/40 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  id="login-password"
                  type="password"
                  required
                  placeholder="••••••••"
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="caj-input pl-10"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              block
              loading={isLoading}
              className="mt-4"
            >
              Iniciar Sesión
            </Button>
          </form>
        )}
      </div>
    </GlassPanel>
  );
}
