import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ProductCard, type Product } from '@/molecules/ProductCard/ProductCard'
import { CartItem } from '@/molecules/CartItem/CartItem'
import { CartSummary } from '@/molecules/CartSummary/CartSummary'
import { BarcodeInput } from '@/atoms/BarcodeInput/BarcodeInput'
import { PaymentMethodGroup, type PaymentType } from '@/atoms/PaymentMethod/PaymentMethod'
import { NumPad } from '@/atoms/NumPad/NumPad'
import { useCart } from '@/hooks/useCart'
import { GlassPanel } from '@/atoms/GlassPanel'
import { Button } from '@/atoms/Button'
import type { POSLayoutProps } from './interface'

const DEFAULT_CATALOG: Product[] = [
  { id: 'c1', name: 'Coca-Cola 600ml', price: 18.5, sku: 'COC-600', stock: 24 },
  { id: 'c2', name: 'Sabritas 45g', price: 15.0, sku: 'SAB-45', stock: 3 },
  { id: 'c3', name: 'Agua Bonafont 1L', price: 12.0, sku: 'BON-1L', stock: 12 },
  { id: 'c4', name: 'Gomitas Haribo 80g', price: 22.0, sku: 'HAR-80', stock: 0 },
  { id: 'c5', name: 'Papas Ruffles 40g', price: 16.5, sku: 'RUF-40', stock: 8 },
  { id: 'c6', name: 'Jugo Del Valle 330ml', price: 14.0, sku: 'DEV-330', stock: 18 },
]

export function POSLayout({
  catalog = DEFAULT_CATALOG,
  taxRate = 16,
  currency = 'MXN',
  locale = 'es-MX',
  className,
}: POSLayoutProps) {
  const cart = useCart({ taxRate })
  const [paymentMethod, setPaymentMethod] = useState<PaymentType | null>(null)
  const [step, setStep] = useState<'cart' | 'payment' | 'done'>('cart')
  const [numpadValue, setNumpadValue] = useState('')

  function handleScan(code: string) {
    const product = catalog.find((p) => p.sku === code)
    if (product) cart.add(product)
    else alert(`Código no encontrado: ${code}`)
  }

  function handleCheckout() {
    setStep('payment')
  }

  function handlePay() {
    if (!paymentMethod) return
    setStep('done')
    setTimeout(() => {
      cart.clear()
      setStep('cart')
      setPaymentMethod(null)
      setNumpadValue('')
    }, 2000)
  }

  return (
    <div className={cn('flex h-screen w-full bg-transparent text-white font-pos', className)}>
      {/* ── Left: Product catalog ── */}
      <div className="flex flex-1 flex-col overflow-hidden border-r border-white/10 bg-white/[0.02] backdrop-blur-md">
        <header className="border-b border-white/10 px-4 py-3 bg-white/[0.02]">
          <BarcodeInput onScan={handleScan} label="" placeholder="Escanear o buscar producto…" showLastScan />
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {catalog.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAdd={cart.add}
                currency={currency}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: Cart + checkout ── */}
      <GlassPanel
        blur="xl"
        tint="white"
        strength="medium"
        radius="none"
        shadow={false}
        className="flex w-80 flex-col border-l border-white/10 bg-white/[0.06] rounded-none p-0"
      >
        {step === 'cart' && (
          <>
            <header className="border-b border-white/10 px-4 py-3 bg-white/[0.02]">
              <p className="font-semibold text-white">
                Carrito ({cart.itemCount})
              </p>
            </header>

            <div className="flex-1 overflow-y-auto flex flex-col gap-2 p-3">
              {cart.isEmpty ? (
                <div className="flex flex-1 flex-col items-center justify-center text-center text-white/40">
                  <svg className="mb-2 h-12 w-12 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-sm">Agrega productos al carrito</p>
                </div>
              ) : (
                cart.items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={cart.remove}
                    onQuantityChange={cart.updateQuantity}
                    currency={currency}
                  />
                ))
              )}
            </div>

            <div className="border-t border-white/10 p-3 bg-white/[0.02]">
              <CartSummary
                items={cart.items}
                taxRate={taxRate}
                onCheckout={handleCheckout}
                checkoutLabel="Ir a cobrar"
                currency={currency}
                locale={locale}
              />
            </div>
          </>
        )}

        {step === 'payment' && (
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep('cart')}
                className="rounded-full flex items-center justify-center w-8 h-8 p-0"
                icon={
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                }
              />
              <p className="font-semibold text-white">Forma de pago</p>
            </div>

            <PaymentMethodGroup value={paymentMethod ?? undefined} onChange={setPaymentMethod} />

            {paymentMethod === 'cash' && (
              <div className="flex flex-col gap-2">
                <p className="text-sm text-white/60">Pago recibido:</p>
                <div className="rounded-xl bg-black/30 border border-white/10 p-3 text-right">
                  <span className="font-mono text-xl font-bold text-white">
                    ${numpadValue || '0.00'}
                  </span>
                </div>
                <NumPad value={numpadValue} onChange={setNumpadValue} />
                {numpadValue && parseFloat(numpadValue) >= cart.total && (
                  <div className="rounded-lg bg-green-500/20 border border-green-500/30 p-2 text-center">
                    <p className="text-sm text-green-300">
                      Cambio: <strong>${(parseFloat(numpadValue) - cart.total).toFixed(2)}</strong>
                    </p>
                  </div>
                )}
              </div>
            )}

            <Button
              variant="primary"
              size="lg"
              block
              onClick={handlePay}
              disabled={!paymentMethod || (paymentMethod === 'cash' && parseFloat(numpadValue || '0') < cart.total)}
              className="mt-auto"
            >
              Confirmar cobro
            </Button>
          </div>
        )}

        {step === 'done' && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 border border-green-500/30">
              <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xl font-bold text-green-400">¡Venta completada!</p>
            <p className="text-sm text-white/50">Regresando a caja…</p>
          </div>
        )}
      </GlassPanel>
    </div>
  )
}
