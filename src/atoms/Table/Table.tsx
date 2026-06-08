import type React from "react";
import { cn } from "@/lib/utils";

export interface TableContainerProps
	extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export function TableContainer({
	children,
	className,
	...props
}: TableContainerProps) {
	return (
		<div className={cn("caj-table-container", className)} {...props}>
			<div className="overflow-x-auto">{children}</div>
		</div>
	);
}

export interface TableProps
	extends React.TableHTMLAttributes<HTMLTableElement> {
	children: React.ReactNode;
	compact?: boolean;
}

export function Table({
	children,
	className,
	compact = false,
	...props
}: TableProps) {
	return (
		<table
			className={cn("caj-table", compact && "caj-table-compact", className)}
			{...props}
		>
			{children}
		</table>
	);
}

export interface TableHeaderProps
	extends React.HTMLAttributes<HTMLTableSectionElement> {
	children: React.ReactNode;
}

export function TableHeader({
	children,
	className,
	...props
}: TableHeaderProps) {
	return (
		<thead className={cn("caj-table-thead", className)} {...props}>
			{children}
		</thead>
	);
}

export interface TableBodyProps
	extends React.HTMLAttributes<HTMLTableSectionElement> {
	children: React.ReactNode;
}

export function TableBody({ children, className, ...props }: TableBodyProps) {
	return (
		<tbody className={cn("caj-table-tbody", className)} {...props}>
			{children}
		</tbody>
	);
}

export interface TableRowProps
	extends React.HTMLAttributes<HTMLTableRowElement> {
	children: React.ReactNode;
	hover?: boolean;
	striped?: boolean;
	active?: boolean;
}

export function TableRow({
	children,
	className,
	hover = true,
	striped = false,
	active = false,
	...props
}: TableRowProps) {
	return (
		<tr
			className={cn(
				"caj-table-tr",
				hover && "caj-table-tr-hover",
				striped && "caj-table-tr-striped",
				active && "caj-table-tr-active",
				className,
			)}
			{...props}
		>
			{children}
		</tr>
	);
}

export interface TableCellProps
	extends React.TdHTMLAttributes<HTMLTableCellElement> {
	children?: React.ReactNode;
	align?: "left" | "center" | "right";
}

export function TableCell({
	children,
	className,
	align = "left",
	...props
}: TableCellProps) {
	return (
		<td
			className={cn(
				"caj-table-td",
				align === "right" && "text-right tabular-nums",
				align === "center" && "text-center",
				className,
			)}
			{...props}
		>
			{children}
		</td>
	);
}

export interface TableHeadCellProps
	extends React.ThHTMLAttributes<HTMLTableCellElement> {
	children?: React.ReactNode;
	align?: "left" | "center" | "right";
	sortable?: boolean;
}

export function TableHeadCell({
	children,
	className,
	align = "left",
	sortable = false,
	...props
}: TableHeadCellProps) {
	return (
		<th
			className={cn(
				"caj-table-th",
				align === "right" && "text-right",
				align === "center" && "text-center",
				sortable && "caj-table-th-sortable",
				className,
			)}
			{...props}
		>
			{children}
		</th>
	);
}

// Asignaciones de composición
Table.Container = TableContainer;
Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.HeadCell = TableHeadCell;
