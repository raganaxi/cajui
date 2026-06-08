import { cn } from "@/lib/utils";
import { Icon } from "../Icon";

export type PaymentType =
	| "cash"
	| "card"
	| "transfer"
	| "credit"
	| "voucher"
	| "other";

const ICONS: Record<PaymentType, React.ReactNode> = {
	cash: <Icon name="cash" className="h-6 w-6" />,
	card: <Icon name="card" className="h-6 w-6" />,
	transfer: <Icon name="transfer" className="h-6 w-6" />,
	credit: <Icon name="credit" className="h-6 w-6" />,
	voucher: <Icon name="voucher" className="h-6 w-6" />,
	other: <Icon name="moreVertical" className="h-6 w-6" />,
};

const DEFAULT_LABELS: Record<PaymentType, string> = {
	cash: "Efectivo",
	card: "Tarjeta",
	transfer: "Transferencia",
	credit: "Crédito",
	voucher: "Vale / Cupón",
	other: "Otro",
};

export interface PaymentMethodProps {
	method: PaymentType;
	label?: string;
	selected?: boolean;
	disabled?: boolean;
	onSelect?: (method: PaymentType) => void;
	className?: string;
}

export interface PaymentMethodGroupProps {
	methods?: PaymentType[];
	value?: PaymentType | null;
	onChange?: (method: PaymentType) => void;
	disabled?: boolean;
	className?: string;
}

export function PaymentMethod({
	method,
	label,
	selected = false,
	disabled = false,
	onSelect,
	className,
}: PaymentMethodProps) {
	return (
		<button
			type="button"
			onClick={() => onSelect?.(method)}
			disabled={disabled}
			className={cn(
				"caj-payment-btn flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 p-3",
				"min-w-[80px] transition-all duration-100 focus-visible:outline-none",
				"focus-visible:ring-2 focus-visible:ring-caj-primary active:scale-95",
				selected
					? "border-caj-primary/60 bg-caj-primary/20 text-caj-primary backdrop-blur-sm [box-shadow:0_0_16px_rgb(var(--caj-primary)/0.25)]"
					: "border-white/[0.18] bg-white/[0.08] backdrop-blur-sm text-white/60 hover:bg-white/[0.15] hover:text-white hover:border-white/[0.30]",
				disabled && "pointer-events-none opacity-40",
				className,
			)}
			aria-pressed={selected}
			aria-label={label ?? DEFAULT_LABELS[method]}
		>
			{ICONS[method]}
			<span
				className={cn(
					"text-xs font-semibold",
					selected ? "text-caj-primary" : "text-white",
				)}
			>
				{label ?? DEFAULT_LABELS[method]}
			</span>
		</button>
	);
}

export function PaymentMethodGroup({
	methods = ["cash", "card", "transfer", "credit"],
	value,
	onChange,
	disabled = false,
	className,
}: PaymentMethodGroupProps) {
	return (
		<fieldset
			className={cn("flex flex-wrap gap-2", className)}
			aria-label="Método de pago"
		>
			{methods.map((m) => (
				<PaymentMethod
					key={m}
					method={m}
					selected={value === m}
					onSelect={onChange}
					disabled={disabled}
				/>
			))}
		</fieldset>
	);
}
