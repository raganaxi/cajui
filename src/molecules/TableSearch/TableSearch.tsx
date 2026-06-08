import type React from "react";
import { Icon } from "@/atoms/Icon";
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
			<Icon
				name="search"
				size="sm"
				className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
			/>
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
					<Icon name="close" size="sm" />
				</button>
			)}
		</div>
	);
}
