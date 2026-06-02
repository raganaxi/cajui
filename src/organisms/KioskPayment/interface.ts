export type KioskPaymentStatus = 'select' | 'prompt' | 'processing' | 'success' | 'error'

export interface KioskPaymentOption {
  id: string
  label: string
  description?: string
  icon: React.ReactNode
}

export interface KioskPaymentProps {
  amount: number
  currency?: string
  locale?: string
  options?: KioskPaymentOption[]
  onSuccess?: (paymentMethodId: string) => void
  onCancel?: () => void
  className?: string
  initialStatus?: KioskPaymentStatus
}
