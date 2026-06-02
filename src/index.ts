// Styles — consumers: import 'cajui/style.css'
import './styles/cajui.css'

// ─── Atoms ───────────────────────────────────────────────────────────────────
export { GlassPanel } from './atoms/GlassPanel'
export type { GlassPanelProps } from './atoms/GlassPanel'

export { CajuiProvider } from './atoms/CajuiProvider'
export type { CajuiProviderProps } from './atoms/CajuiProvider'

export { Button } from './atoms/Button'
export type { ButtonProps, ButtonVariant, ButtonSize } from './atoms/Button'
// 
export { Dialog } from './atoms/Dialog'
export type { DialogProps, DialogSize } from './atoms/Dialog'
// 
export { PriceDisplay } from './atoms/PriceDisplay'
export type { PriceDisplayProps } from './atoms/PriceDisplay'
// 
// export { NumPad } from './atoms/NumPad'
// export type { NumPadProps } from './atoms/NumPad'
// 
export { StockBadge } from './atoms/StockBadge'
export type { StockBadgeProps, StockStatus } from './atoms/StockBadge'
// 
export { BarcodeInput } from './atoms/BarcodeInput'
export type { BarcodeInputProps } from './atoms/BarcodeInput'
// 
export { PaymentMethod, PaymentMethodGroup } from './atoms/PaymentMethod'
export type { PaymentMethodProps, PaymentMethodGroupProps, PaymentType } from './atoms/PaymentMethod'
// 
export { AlertBanner } from './atoms/AlertBanner'
export type { AlertBannerProps } from './atoms/AlertBanner'
// 
export { TableCard } from './atoms/TableCard'
export type { TableCardProps, TableData, TableStatus, TableShape } from './atoms/TableCard'
// 
export { Branding } from './atoms/Branding'
export type { BrandingProps } from './atoms/Branding'
// 
export { ThemeVisualizer } from './atoms/ThemeVisualizer'
export type { ThemeVisualizerProps } from './atoms/ThemeVisualizer'
// 
// // ─── Molecules ───────────────────────────────────────────────────────────────
export { CategoryFilter } from './molecules/CategoryFilter'
export type { CategoryFilterProps, Category } from './molecules/CategoryFilter'

export { OrderStatus, OrderStatusStepper } from './molecules/OrderStatus'
export type { OrderStatusProps, OrderStatusStepperProps, OrderStatusValue } from './molecules/OrderStatus'

export { KPICard } from './molecules/KPICard'
export type { KPICardProps, KPITrend } from './molecules/KPICard'

export { QuantityControl } from './molecules/QuantityControl'
export type { QuantityControlProps } from './molecules/QuantityControl'

// export { ProductCard } from './molecules/ProductCard'
// export type { ProductCardProps, Product } from './molecules/ProductCard'
// 
// export { CartItem } from './molecules/CartItem'
// export type { CartItemProps, CartItemData } from './molecules/CartItem'
// 
// export { CartSummary } from './molecules/CartSummary'
// export type { CartSummaryProps } from './molecules/CartSummary'
// 
// export { CashCalculator } from './molecules/CashCalculator'
// export type { CashCalculatorProps } from './molecules/CashCalculator'
// 
// export { SplitPayment } from './molecules/SplitPayment'
// export type { SplitPaymentProps, SplitEntry } from './molecules/SplitPayment'
// 
// export { TipSelector } from './molecules/TipSelector'
// export type { TipSelectorProps } from './molecules/TipSelector'
// 
// export { DiscountInput } from './molecules/DiscountInput'
// export type { DiscountInputProps, DiscountType } from './molecules/DiscountInput'
// 
// export { AlphaSearch } from './molecules/AlphaSearch'
// export type { AlphaSearchProps } from './molecules/AlphaSearch'
// 
// export { TableMap } from './molecules/TableMap'
// export type { TableMapProps, TableMapSection } from './molecules/TableMap'
// 
// // ─── Organisms ───────────────────────────────────────────────────────────────
// export { ReceiptPreview } from './organisms/ReceiptPreview'
// export type { ReceiptPreviewProps, ReceiptData } from './organisms/ReceiptPreview'
// 
// export { DataTable } from './organisms/DataTable'
// export type { DataTableProps, Column } from './organisms/DataTable'
// 
// export { ShiftPanel } from './organisms/ShiftPanel'
// export type { ShiftPanelProps, ShiftSummary, ShiftStatus } from './organisms/ShiftPanel'
// 
// export { AgeVerification } from './organisms/AgeVerification'
// export type { AgeVerificationProps } from './organisms/AgeVerification'
// 
// export { AttendantCall } from './organisms/AttendantCall'
// export type { AttendantCallProps, AttendantReason } from './organisms/AttendantCall'
// 
// export { KioskPayment } from './organisms/KioskPayment'
// export type { KioskPaymentProps, KioskPaymentOption, KioskPaymentStatus } from './organisms/KioskPayment'
// 
// export { ItemCustomizer } from './organisms/ItemCustomizer'
// export type { ItemCustomizerProps, ItemSizeOption, CustomizerModifierGroup, CustomizerItemOption } from './organisms/ItemCustomizer'
// 
// export { Login } from './organisms/Login'
// export type { LoginProps, LoginCredentials } from './organisms/Login'
// 
// export { RegisterLocked } from './organisms/RegisterLocked'
// export type { RegisterLockedProps, ShiftSummaryData } from './organisms/RegisterLocked'
// 
// // ─── Templates ───────────────────────────────────────────────────────────────
// export { POSLayout } from './templates/POSLayout'
// export type { POSLayoutProps } from './templates/POSLayout'
// 
// export { SelfCheckoutLayout } from './templates/SelfCheckoutLayout'
// export type { SelfCheckoutLayoutProps } from './templates/SelfCheckoutLayout'

// ─── Tokens ──────────────────────────────────────────────────────────────────
export { seedTokens, designTokens, componentTokens } from './tokens'

// ─── Hooks ───────────────────────────────────────────────────────────────────
export { useCart } from './hooks/useCart'
export type { UseCartOptions } from './hooks/useCart'

export { useBarcode } from './hooks/useBarcode'
export type { UseBarcodeOptions } from './hooks/useBarcode'

// ─── Utils ───────────────────────────────────────────────────────────────────
export { cn, formatCurrency, formatNumber } from './lib/utils'
