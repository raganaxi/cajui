import type React from "react";
import { cn } from "@/lib/utils";

export interface TableSearchProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
}

export function TableSearch({
	value,
	onChange,
	placeholder = "Buscar…",
	className,
	...props
}: TableSearchProps) {
	return (
		<div className={cn("relative w-full", className)}>
			<svg
				className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
			<input
				type="search"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				className="caj-input pl-9 pr-8"
				{...props}
			/>
			{value && (
				<button
					type="button"
					onClick={() => onChange("")}
					className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
					aria-label="Limpiar búsqueda"
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
