// Styles — consumers: import 'cajui/style.css'
import "./styles/cajui.css";

export type { AlertBannerProps } from "./atoms/AlertBanner";
//
export { AlertBanner } from "./atoms/AlertBanner";
export type { BarcodeInputProps } from "./atoms/BarcodeInput";
//
export { BarcodeInput } from "./atoms/BarcodeInput";
export type { BrandingProps } from "./atoms/Branding";
//
export { Branding } from "./atoms/Branding";
export type { ButtonProps, ButtonSize, ButtonVariant } from "./atoms/Button";
export { Button } from "./atoms/Button";
export type { CajuiProviderProps } from "./atoms/CajuiProvider";
export { CajuiProvider } from "./atoms/CajuiProvider";
export type { DialogProps, DialogSize } from "./atoms/Dialog";
//
export { Dialog } from "./atoms/Dialog";
export type { GlassPanelProps } from "./atoms/GlassPanel";
// ─── Atoms ───────────────────────────────────────────────────────────────────
export { GlassPanel } from "./atoms/GlassPanel";
export type { IconName, IconProps, IconSize } from "./atoms/Icon";
export { Icon } from "./atoms/Icon";
export type {
	PaymentMethodGroupProps,
	PaymentMethodProps,
	PaymentType,
} from "./atoms/PaymentMethod";
//
export { PaymentMethod, PaymentMethodGroup } from "./atoms/PaymentMethod";
export type { PriceDisplayProps } from "./atoms/PriceDisplay";
//
export { PriceDisplay } from "./atoms/PriceDisplay";
export type { StockBadgeProps, StockStatus } from "./atoms/StockBadge";
//
// export { NumPad } from './atoms/NumPad'
// export type { NumPadProps } from './atoms/NumPad'
//
export { StockBadge } from "./atoms/StockBadge";
export type {
	TableBodyProps,
	TableCellProps,
	TableContainerProps,
	TableHeadCellProps,
	TableHeaderProps,
	TableProps,
	TableRowProps,
} from "./atoms/Table";
export { Table } from "./atoms/Table";
export type {
	TableCardProps,
	TableData,
	TableShape,
	TableStatus,
} from "./atoms/TableCard";
//
export { TableCard } from "./atoms/TableCard";
export type { ThemeVisualizerProps } from "./atoms/ThemeVisualizer";
//
export { ThemeVisualizer } from "./atoms/ThemeVisualizer";
export type { AlphaSearchProps } from "./molecules/AlphaSearch";
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
export { AlphaSearch } from "./molecules/AlphaSearch";
export type { CartItemData, CartItemProps } from "./molecules/CartItem";
export { CartItem } from "./molecules/CartItem";
export type { CartSummaryProps } from "./molecules/CartSummary";
export { CartSummary } from "./molecules/CartSummary";
export type { Category, CategoryFilterProps } from "./molecules/CategoryFilter";
//
// // ─── Molecules ───────────────────────────────────────────────────────────────
export { CategoryFilter } from "./molecules/CategoryFilter";
export type { KPICardProps, KPITrend } from "./molecules/KPICard";
export { KPICard } from "./molecules/KPICard";
export type {
	OrderStatusProps,
	OrderStatusStepperProps,
	OrderStatusValue,
} from "./molecules/OrderStatus";
export { OrderStatus, OrderStatusStepper } from "./molecules/OrderStatus";
export type { Product, ProductCardProps } from "./molecules/ProductCard";
export { ProductCard } from "./molecules/ProductCard";
export type { QuantityControlProps } from "./molecules/QuantityControl";
export { QuantityControl } from "./molecules/QuantityControl";
export type { TablePaginationProps } from "./molecules/TablePagination";
export { TablePagination } from "./molecules/TablePagination";
export type { TableSearchProps } from "./molecules/TableSearch";
export { TableSearch } from "./molecules/TableSearch";
export type { Column, DataTableProps, SortDir } from "./organisms/DataTable";
//
// export { TableMap } from './molecules/TableMap'
// export type { TableMapProps, TableMapSection } from './molecules/TableMap'
//
// // ─── Organisms ───────────────────────────────────────────────────────────────
// export { ReceiptPreview } from './organisms/ReceiptPreview'
// export type { ReceiptPreviewProps, ReceiptData } from './organisms/ReceiptPreview'
//
export { DataTable } from "./organisms/DataTable";
export type {
	CustomizerItemOption,
	CustomizerModifierGroup,
	ItemCustomizerProps,
	ItemSizeOption,
} from "./organisms/ItemCustomizer";
export { ItemCustomizer } from "./organisms/ItemCustomizer";
export type {
	KioskPaymentOption,
	KioskPaymentProps,
	KioskPaymentStatus,
} from "./organisms/KioskPayment";
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
export { KioskPayment } from "./organisms/KioskPayment";
export type {
	OnlineCheckoutProps,
	ShippingMethodOption,
} from "./organisms/OnlineCheckout";
export { OnlineCheckout } from "./organisms/OnlineCheckout";
export type {
	CatalogFilterGroup,
	ProductCatalogProps,
} from "./organisms/ProductCatalog";
// New E-commerce components
export { ProductCatalog } from "./organisms/ProductCatalog";
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

export type { UseBarcodeOptions } from "./hooks/useBarcode";
export { useBarcode } from "./hooks/useBarcode";
export type { UseCartOptions } from "./hooks/useCart";
// ─── Hooks ───────────────────────────────────────────────────────────────────
export { useCart } from "./hooks/useCart";
// ─── Utils ───────────────────────────────────────────────────────────────────
export { cn, formatCurrency, formatNumber } from "./lib/utils";
// ─── Tokens ──────────────────────────────────────────────────────────────────
export { componentTokens, designTokens, seedTokens } from "./tokens";
