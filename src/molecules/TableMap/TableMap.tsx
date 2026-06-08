import {
	TableCard,
	type TableCardProps,
	type TableData,
	type TableShape,
	type TableStatus,
} from "@/atoms/TableCard";
import { cn } from "@/lib/utils";

export type { TableCardProps, TableData, TableShape, TableStatus };
export { TableCard };

const STATUS_LABELS: Record<TableStatus, string> = {
	available: "Libre",
	occupied: "Ocupada",
	reserved: "Reservada",
	dirty: "Por limpiar",
	paying: "Pagando",
};

export interface TableMapSection {
	name: string;
	tables: TableData[];
}

export interface TableMapProps {
	sections?: TableMapSection[];
	tables?: TableData[];
	onSelectTable?: (table: TableData) => void;
	selectedId?: string | null;
	shape?: TableShape;
	size?: "sm" | "md" | "lg";
	showLegend?: boolean;
	className?: string;
}

export function TableMap({
	sections,
	tables,
	onSelectTable,
	selectedId,
	shape = "square",
	size = "md",
	showLegend = true,
	className,
}: TableMapProps) {
	const allSections: TableMapSection[] =
		sections ?? (tables ? [{ name: "", tables }] : []);

	return (
		<div className={cn("flex flex-col gap-4", className)}>
			{allSections.map((section) => (
				<div key={section.name}>
					{section.name && (
						<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">
							{section.name}
						</p>
					)}
					<div className="flex flex-wrap gap-3">
						{section.tables.map((table) => (
							<div
								key={table.id}
								className={cn(
									"rounded-2xl transition-all",
									selectedId === table.id &&
										"ring-2 ring-caj-primary ring-offset-2",
								)}
							>
								<TableCard
									table={table}
									shape={shape}
									size={size}
									onClick={onSelectTable}
								/>
							</div>
						))}
					</div>
				</div>
			))}

			{showLegend && (
				<div className="flex flex-wrap gap-3 border-t border-white/[0.10] pt-3">
					{(Object.entries(STATUS_LABELS) as [TableStatus, string][]).map(
						([status, label]) => (
							<span
								key={status}
								className="flex items-center gap-1.5 text-xs text-white/60"
							>
								<span
									className={cn("h-3 w-3 rounded-sm border", {
										"border-green-500/50 bg-green-500/20":
											status === "available",
										"border-red-500/50 bg-red-500/20": status === "occupied",
										"border-amber-500/50 bg-amber-500/20":
											status === "reserved",
										"border-white/20 bg-white/[0.05]": status === "dirty",
										"border-blue-500/50 bg-blue-500/20": status === "paying",
									})}
								/>
								{label}
							</span>
						),
					)}
				</div>
			)}
		</div>
	);
}
