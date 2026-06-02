import { useState } from 'react'
import { cn } from '@/lib/utils'
import { AlphaSearch } from '@/molecules/AlphaSearch/AlphaSearch'
import { CartItem } from '@/molecules/CartItem/CartItem'
import { CartSummary } from '@/molecules/CartSummary/CartSummary'
import { CashCalculator } from '@/molecules/CashCalculator/CashCalculator'
import { PaymentMethodGroup, type PaymentType } from '@/atoms/PaymentMethod/PaymentMethod'
import { AgeVerification } from '@/organisms/AgeVerification/AgeVerification'
import { AttendantCall } from '@/organisms/AttendantCall/AttendantCall'
import { AlertBanner } from '@/atoms/AlertBanner/AlertBanner'
import { useCart } from '@/hooks/useCart'
import { GlassPanel } from '@/atoms/GlassPanel'
import { Button } from '@/atoms/Button'
import type { Product } from '@/molecules/ProductCard/ProductCard'
import type { SelfCheckoutLayoutProps } from './interface'

const DEFAULT_CATALOG: Product[] = [
  { id: 'a1', name: 'Aguacate Hass', price: 22.9, sku: 'FRU-001', stock: 30, unit: 'pieza' },
  { id: 'a2', name: 'Arroz Verde Valle 1kg', price: 28.5, sku: 'ABA-010', stock: 15 },
  { id: 'b1', name: 'Bolillo', price: 3.5, sku: 'PAN-001', stock: 50, unit: 'pieza' },
  { id: 'b2', name: 'Bonafont 1.5L', price: 14.0, sku: 'BEB-020', stock: 24 },
  { id: 'c1', name: 'Coca-Cola 600ml', price: 18.5, sku: 'BEB-030', stock: 48 },
  { id: 'c2', name: 'Cerveza Corona 355ml', price: 28.0, sku: 'ALC-001', stock: 60 },
  { id: 'c3', name: 'Caldo de Pollo Knorr', price: 19.9, sku: 'ABA-020', stock: 20 },
  { id: 'd1', name: 'Detergente Ariel 1kg', price: 89.0, sku: 'LIM-010', stock: 8 },
  { id: 'e1', name: 'Ejotes 500g', price: 16.0, sku: 'FRU-010', stock: 12 },
  { id: 'f1', name: 'Frijoles La Sierra', price: 34.5, sku: 'ABA-030', stock: 25 },
  { id: 'g1', name: 'Galletas Oreo 432g', price: 55.0, sku: 'GAL-001', stock: 18 },
  { id: 'g2', name: 'Gomitas Haribo 80g', price: 22.0, sku: 'DUL-010', stock: 35 },
  { id: 'j1', name: 'Jabón Dove Piel Sensible', price: 24.5, sku: 'HIG-010', stock: 14 },
  { id: 'j2', name: 'Jugo Del Valle 330ml', price: 14.0, sku: 'BEB-040', stock: 30 },
  { id: 'l1', name: 'Leche Lala Entera 1L', price: 26.5, sku: 'LAC-001', stock: 22 },
  { id: 'l2', name: 'Limones 1kg', price: 18.0, sku: 'FRU-020', stock: 40 },
  { id: 'm1', name: 'Manzana Roja 1kg', price: 35.0, sku: 'FRU-030', stock: 20 },
  { id: 'm2', name: 'Maíz Maseca 1kg', price: 22.5, sku: 'ABA-040', stock: 30 },
  { id: 'p1', name: 'Pan de Caja Bimbo', price: 49.0, sku: 'PAN-010', stock: 12 },
  { id: 'p2', name: 'Papas Ruffles 42g', price: 16.5, sku: 'BOT-010', stock: 45 },
  { id: 'q1', name: 'Queso Oaxaca 400g', price: 65.0, sku: 'LAC-010', stock: 8 },
  { id: 's1', name: 'Sabritas Original 45g', price: 15.0, sku: 'BOT-020', stock: 60 },
  { id: 's2', name: 'Shampoo Pantene 400ml', price: 79.0, sku: 'HIG-020', stock: 10 },
  { id: 't1', name: 'Tomate Saladet 1kg', price: 22.0, sku: 'FRU-040', stock: 25 },
  { id: 'y1', name: 'Yogurt Yoplait 150g', price: 12.5, sku: 'LAC-020', stock: 20 },
]

const DEFAULT_ALCOHOL_SKUS = ['ALC-001']

type Step = 'shopping' | 'age_check' | 'payment' | 'cash' | 'done'

export function SelfCheckoutLayout({
  catalog = DEFAULT_CATALOG,
  alcoholSkus = DEFAULT_ALCOHOL_SKUS,
  taxRate = 0,
  currency = 'MXN',
  locale = 'es-MX',
  className,
}: SelfCheckoutLayoutProps) {
  const cart = useCart({ taxRate })
  const [step, setStep] = useState<Step>('shopping')
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentType | null>(null)

  const alcoholSet = new Set(alcoholSkus)

  function handleAdd(product: Product) {
    if (alcoholSet.has(product.sku ?? '')) {
      setPendingProduct(product)
      setStep('age_check')
      return
    }
    cart.add(product)
  }

  function handleAgeApproved() {
    if (pendingProduct) cart.add(pendingProduct)
    setPendingProduct(null)
    setStep('shopping')
  }

  function handleAgeDenied() {
    setPendingProduct(null)
    setStep('shopping')
  }

  return (
    <div className={cn('flex h-screen w-full bg-transparent text-white font-pos', className)}>
      {/* ── Main: product browser ── */}
      <div className="flex flex-1 flex-col overflow-hidden bg-white/[0.01] backdrop-blur-md">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-3 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-white">cajui</span>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white/80 border border-white/10">
              Auto cobro
            </span>
          </div>
          <AttendantCall
            onCall={(reason) => console.log('call:', reason)}
            className="!py-2 !px-3 text-sm"
          />
        </header>

        {/* Alert for scanning instructions */}
        {!cart.isEmpty && (
          <div className="px-4 pt-3">
            <AlertBanner
              variant="info"
              message="Escanea el código de barras o busca tu producto con las letras de abajo."
              dismissible
            />
          </div>
        )}

        {/* AlphaSearch */}
        <div className="flex-1 overflow-hidden p-4">
          {step === 'age_check' && pendingProduct ? (
            <AgeVerification
              productName={pendingProduct.name}
              onApprove={handleAgeApproved}
              onDeny={handleAgeDenied}
              requireStaff
            />
          ) : (
            <AlphaSearch products={catalog} onAdd={handleAdd} currency={currency} />
          )}
        </div>
      </div>

      {/* ── Right: cart + checkout ── */}
      <GlassPanel
        blur="xl"
        tint="white"
        strength="medium"
        radius="none"
        shadow={false}
        className="flex w-80 shrink-0 flex-col border-l border-white/10 bg-white/[0.06] rounded-none p-0"
      >
        {step === 'shopping' && (
          <>
            <div className="border-b border-white/10 px-4 py-3 bg-white/[0.02]">
              <p className="font-semibold text-white">Tu compra ({cart.itemCount})</p>
            </div>
            <div className="flex-1 overflow-y-auto flex flex-col gap-2 p-3">
              {cart.isEmpty ? (
                <div className="flex flex-1 flex-col items-center justify-center text-center text-white/40">
                  <p className="text-3xl">🛒</p>
                  <p className="mt-2 text-sm">Busca y agrega productos</p>
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
                onCheckout={() => setStep('payment')}
                checkoutLabel="Pagar"
                currency={currency}
                locale={locale}
              />
            </div>
          </>
        )}

        {step === 'payment' && (
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Button variant="text" onClick={() => setStep('shopping')}>
              ← Volver
            </Button>
            <p className="font-semibold text-white">Forma de pago</p>
            <PaymentMethodGroup
              methods={['cash', 'card', 'transfer']}
              value={paymentMethod ?? undefined}
              onChange={setPaymentMethod}
            />
            <Button
              variant="primary"
              size="lg"
              block
              onClick={() => paymentMethod === 'cash' ? setStep('cash') : setStep('done')}
              disabled={!paymentMethod}
              className="mt-auto"
            >
              Continuar
            </Button>
          </div>
        )}

        {step === 'cash' && (
          <div className="flex-1 overflow-y-auto p-4">
            <Button variant="text" onClick={() => setStep('payment')} className="mb-3">
              ← Volver
            </Button>
            <CashCalculator
              total={cart.total}
              onConfirm={() => setStep('done')}
              currency={currency}
              locale={locale}
            />
          </div>
        )}

        {step === 'done' && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 border border-green-500/30 text-4xl">
              ✅
            </div>
            <p className="text-xl font-bold text-green-400">¡Gracias por tu compra!</p>
            <p className="text-sm text-white/60">Retira tu ticket y producto</p>
            <Button
              variant="primary"
              onClick={() => { cart.clear(); setStep('shopping'); setPaymentMethod(null) }}
            >
              Nueva compra
            </Button>
          </div>
        )}
      </GlassPanel>
    </div>
  )
}
