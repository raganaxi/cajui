import { useCallback, useMemo, useState } from "react";
import { Table } from "@/atoms/Table";
import { cn } from "@/lib/utils";
import { TablePagination } from "@/molecules/TablePagination";
import { TableSearch } from "@/molecules/TableSearch";

export type SortDir = "asc" | "desc" | null;

export interface Column<T> {
	key: keyof T | string;
	header: string;
	width?: string;
	align?: "left" | "center" | "right";
	sortable?: boolean;
	render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
	columns: Column<T>[];
	data: T[];
	rowKey: keyof T | ((row: T) => string);
	loading?: boolean;
	emptyMessage?: string;
	searchable?: boolean;
	searchPlaceholder?: string;
	searchKeys?: (keyof T)[];
	onRowClick?: (row: T) => void;
	selectedKey?: string | null;
	striped?: boolean;
	compact?: boolean;
	pagination?: boolean;
	pageSize?: number;
	className?: string;
}

export function DataTable<T extends object>({
	columns,
	data,
	rowKey,
	loading = false,
	emptyMessage = "Sin registros",
	searchable = false,
	searchPlaceholder = "Buscar…",
	searchKeys,
	onRowClick,
	selectedKey,
	striped = true,
	compact = false,
	pagination = true,
	pageSize = 20,
	className,
}: DataTableProps<T>) {
	const [sortKey, setSortKey] = useState<string | null>(null);
	const [sortDir, setSortDir] = useState<SortDir>(null);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);

	const getKey = useCallback(
		(row: T): string => {
			if (typeof rowKey === "function") return rowKey(row);
			return String(row[rowKey]);
		},
		[rowKey],
	);

	const filtered = useMemo(() => {
		if (!search.trim()) return data;
		const q = search.toLowerCase();
		const keys = searchKeys ?? (columns.map((c) => c.key) as (keyof T)[]);
		return data.filter((row) =>
			keys.some((k) =>
				String((row as Record<string, unknown>)[k as string] ?? "")
					.toLowerCase()
					.includes(q),
			),
		);
	}, [data, search, searchKeys, columns]);

	const sorted = useMemo(() => {
		if (!sortKey || !sortDir) return filtered;
		return [...filtered].sort((a, b) => {
			const av = (a as Record<string, unknown>)[sortKey];
			const bv = (b as Record<string, unknown>)[sortKey];
			const cmp = String(av ?? "").localeCompare(String(bv ?? ""), "es", {
				numeric: true,
			});
			return sortDir === "asc" ? cmp : -cmp;
		});
	}, [filtered, sortKey, sortDir]);

	const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
	const paginated = pagination
		? sorted.slice((page - 1) * pageSize, page * pageSize)
		: sorted;

	function toggleSort(key: string) {
		if (sortKey !== key) {
			setSortKey(key);
			setSortDir("asc");
		} else if (sortDir === "asc") {
			setSortDir("desc");
		} else {
			setSortKey(null);
			setSortDir(null);
		}
		setPage(1);
	}

	function handleSearch(q: string) {
		setSearch(q);
		setPage(1);
	}

	return (
		<div className={cn("flex flex-col gap-3", className)}>
			{searchable && (
				<TableSearch
					value={search}
					onChange={handleSearch}
					placeholder={searchPlaceholder}
				/>
			)}

			<Table.Container>
				<Table compact={compact}>
					<Table.Header>
						<Table.Row hover={false}>
							{columns.map((col) => (
								<Table.HeadCell
									key={String(col.key)}
									align={col.align}
									sortable={col.sortable}
									onClick={() => col.sortable && toggleSort(String(col.key))}
									style={col.width ? { width: col.width } : undefined}
								>
									<span className="inline-flex items-center gap-1">
										{col.header}
										{col.sortable && (
											<span className="text-white/60">
												{sortKey === String(col.key)
													? sortDir === "asc"
														? "↑"
														: "↓"
													: "↕"}
											</span>
										)}
									</span>
								</Table.HeadCell>
							))}
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{loading ? (
							Array.from({ length: 5 }).map((_, i) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows have no stable id
								<Table.Row key={i} hover={false}>
									{columns.map((col) => (
										<Table.Cell key={String(col.key)} align={col.align}>
											<div className="h-4 animate-pulse rounded bg-white/[0.15]" />
										</Table.Cell>
									))}
								</Table.Row>
							))
						) : paginated.length === 0 ? (
							<Table.Row hover={false}>
								<Table.Cell
									colSpan={columns.length}
									className="py-10 text-center text-white/50"
								>
									{emptyMessage}
								</Table.Cell>
							</Table.Row>
						) : (
							paginated.map((row, idx) => {
								const key = getKey(row);
								return (
									<Table.Row
										key={key}
										onClick={() => onRowClick?.(row)}
										hover={!!onRowClick}
										striped={striped && idx % 2 === 1}
										active={selectedKey === key}
									>
										{columns.map((col) => {
											const rawVal = (row as Record<string, unknown>)[
												String(col.key)
											];
											return (
												<Table.Cell key={String(col.key)} align={col.align}>
													{col.render
														? col.render(rawVal, row, idx)
														: String(rawVal ?? "")}
												</Table.Cell>
											);
										})}
									</Table.Row>
								);
							})
						)}
					</Table.Body>
				</Table>
			</Table.Container>

			{/* Paginación */}
			{pagination && (
				<TablePagination
					currentPage={page}
					totalPages={totalPages}
					pageSize={pageSize}
					totalItems={sorted.length}
					onPageChange={setPage}
				/>
			)}
		</div>
	);
}
