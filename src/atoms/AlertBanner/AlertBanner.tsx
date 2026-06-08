import { cva, type VariantProps } from "class-variance-authority";
import { useState } from "react";
import { Icon } from "@/atoms/Icon";
import { cn } from "@/lib/utils";

const alertVariants = cva(
	"flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm backdrop-blur-md",
	{
		variants: {
			variant: {
				info: "bg-blue-500/15  border-blue-400/30  text-blue-200",
				success: "bg-green-500/15 border-green-400/30 text-green-200",
				warning: "bg-amber-500/15 border-amber-400/30 text-amber-200",
				danger: "bg-red-500/15   border-red-400/30   text-red-200",
				low_stock: "bg-amber-500/15 border-amber-400/30 text-amber-200",
			},
		},
		defaultVariants: { variant: "info" },
	},
);

const ICONS: Record<string, React.ReactNode> = {
	info: <Icon name="info" className="h-5 w-5 shrink-0 mt-0.5" />,
	success: <Icon name="success" className="h-5 w-5 shrink-0 mt-0.5" />,
	warning: <Icon name="warning" className="h-5 w-5 shrink-0 mt-0.5" />,
	danger: <Icon name="danger" className="h-5 w-5 shrink-0 mt-0.5" />,
	low_stock: <Icon name="package" className="h-5 w-5 shrink-0 mt-0.5" />,
};

export interface AlertBannerProps extends VariantProps<typeof alertVariants> {
	title?: string;
	message: string;
	dismissible?: boolean;
	action?: { label: string; onClick: () => void };
	className?: string;
}

export function AlertBanner({
	variant = "info",
	title,
	message,
	dismissible = false,
	action,
	className,
}: AlertBannerProps) {
	const [dismissed, setDismissed] = useState(false);

	if (dismissed) return null;

	return (
		<div
			className={cn(
				"caj-alert",
				`caj-alert-${variant}`,
				alertVariants({ variant }),
				className,
			)}
			role="alert"
		>
			{ICONS[variant ?? "info"]}

			<div className="min-w-0 flex-1">
				{title && <p className="font-semibold">{title}</p>}
				<p className={title ? "mt-0.5 opacity-90" : ""}>{message}</p>
				{action && (
					<button
						type="button"
						onClick={action.onClick}
						className="mt-1.5 font-semibold underline underline-offset-2 hover:no-underline"
					>
						{action.label}
					</button>
				)}
			</div>

			{dismissible && (
				<button
					type="button"
					onClick={() => setDismissed(true)}
					className="shrink-0 rounded p-0.5 opacity-60 hover:opacity-100"
					aria-label="Cerrar"
				>
					<Icon name="close" className="h-4 w-4" />
				</button>
			)}
		</div>
	);
}
