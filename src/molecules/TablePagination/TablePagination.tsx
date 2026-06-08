import type React from "react";
import { cn } from "@/lib/utils";

export interface TablePaginationProps {
	currentPage: number;
	totalPages: number;
	pageSize: number;
	totalItems: number;
	onPageChange: (page: number) => void;
	className?: string;
}

export function TablePagination({
	currentPage,
	totalPages,
	pageSize,
	totalItems,
	onPageChange,
	className,
}: TablePaginationProps) {
	if (totalPages <= 1) return null;

	const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
	const endItem = Math.min(currentPage * pageSize, totalItems);

	const startPage = Math.max(1, Math.min(totalPages - 4, currentPage - 2));
	const pageNumbers = Array.from(
		{ length: Math.min(5, totalPages) },
		(_, i) => startPage + i,
	);

	return (
		<div
			className={cn(
				"flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/60 px-1",
				className,
			)}
		>
			<span>
				{startItem}–{endItem} de {totalItems}
			</span>
			<div className="flex gap-1 select-none">
				<PagBtn
					onClick={() => onPageChange(1)}
					disabled={currentPage === 1}
					aria-label="Primera página"
				>
					«
				</PagBtn>
				<PagBtn
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					aria-label="Página anterior"
				>
					‹
				</PagBtn>
				{pageNumbers.map((p) => (
					<PagBtn
						key={p}
						onClick={() => onPageChange(p)}
						active={p === currentPage}
						aria-label={`Página ${p}`}
						aria-current={p === currentPage ? "page" : undefined}
					>
						{p}
					</PagBtn>
				))}
				<PagBtn
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					aria-label="Página siguiente"
				>
					›
				</PagBtn>
				<PagBtn
					onClick={() => onPageChange(totalPages)}
					disabled={currentPage === totalPages}
					aria-label="Última página"
				>
					»
				</PagBtn>
			</div>
		</div>
	);
}

interface PagBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	active?: boolean;
}

function PagBtn({
	children,
	onClick,
	disabled,
	active,
	className,
	...props
}: PagBtnProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className={cn(
				"h-8 min-w-8 rounded-lg px-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
				active
					? "bg-caj-primary text-white"
					: "border border-white/[0.18] bg-white/[0.08] text-white/70 hover:bg-white/[0.15] hover:text-white",
				disabled && "pointer-events-none opacity-40",
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
}
