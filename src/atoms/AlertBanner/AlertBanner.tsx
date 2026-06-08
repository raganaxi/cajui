import { cva, type VariantProps } from "class-variance-authority";
import { useState } from "react";
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
	info: (
		<svg
			className="h-5 w-5 shrink-0 mt-0.5"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			aria-hidden="true"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	),
	success: (
		<svg
			className="h-5 w-5 shrink-0 mt-0.5"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			aria-hidden="true"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	),
	warning: (
		<svg
			className="h-5 w-5 shrink-0 mt-0.5"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			aria-hidden="true"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
			/>
		</svg>
	),
	danger: (
		<svg
			className="h-5 w-5 shrink-0 mt-0.5"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			aria-hidden="true"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	),
	low_stock: (
		<svg
			className="h-5 w-5 shrink-0 mt-0.5"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			aria-hidden="true"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
			/>
		</svg>
	),
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
					<svg
						className="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			)}
		</div>
	);
}
