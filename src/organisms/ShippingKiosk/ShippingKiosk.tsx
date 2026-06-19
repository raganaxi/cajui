import { useEffect, useState } from "react";
import { Branding } from "@/atoms/Branding";
import { Button } from "@/atoms/Button";
import { CourierChip } from "@/atoms/CourierChip";
import { GlassPanel } from "@/atoms/GlassPanel";
import { Icon } from "@/atoms/Icon";
import { cn } from "@/lib/utils";
import { QuantityControl } from "@/molecules/QuantityControl";
import { ScannerInput } from "@/molecules/ScannerInput";
import type {
	ShippingGuia,
	ShippingKioskProps,
	ShippingOrder,
} from "./interface";

function hexToRgba(hex: string, alpha: number): string {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ── Background blobs ─────────────────────────────────────

function Blobs() {
	return (
		<div
			className="caj-kiosk-blobs absolute inset-0 overflow-hidden pointer-events-none [@media(prefers-reduced-motion:reduce)]:hidden"
			aria-hidden
		>
			<div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-caj-primary/30 blur-[80px]" />
			<div className="absolute -bottom-40 -right-32 w-96 h-96 rounded-full bg-caj-info/25 blur-[80px]" />
			<div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-caj-warning/15 blur-[80px]" />
		</div>
	);
}

// ── Clock ────────────────────────────────────────────────

function KioskClock() {
	const [now, setNow] = useState(new Date());
	useEffect(() => {
		const t = setInterval(() => setNow(new Date()), 15_000);
		return () => clearInterval(t);
	}, []);
	return (
		<span className="inline-flex items-center gap-1.5 tabular-nums text-white/50 font-semibold text-sm">
			<Icon name="clock" size="xs" />
			{now.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
		</span>
	);
}

// ── Status pill ──────────────────────────────────────────

function StatusPill({
	printed,
	total,
	pending = 0,
}: {
	printed: number;
	total: number;
	pending?: number;
}) {
	const done = printed >= total && total > 0 && pending === 0;
	const none = printed === 0 && pending === 0;
	return (
		<span
			className={cn(
				"caj-kiosk-status-pill",
				done && "caj-kiosk-status-pill--done",
				none && "caj-kiosk-status-pill--none",
				!done && !none && "caj-kiosk-status-pill--pending",
			)}
		>
			{done && <Icon name="check" size="xs" strokeWidth={3} />}
			{pending > 0 && <Icon name="clock" size="xs" />}
			{printed}/{total} impresas
			{pending > 0 && <span className="opacity-70">· {pending} pend.</span>}
		</span>
	);
}

// ── Printing overlay ─────────────────────────────────────

function PrintingOverlay({
	count,
	accentColor,
	onDone,
}: {
	count: number;
	accentColor: string;
	onDone: () => void;
}) {
	const [phase, setPhase] = useState<"printing" | "done">("printing");

	useEffect(() => {
		let active = true;
		const t1 = setTimeout(() => {
			if (active) setPhase("done");
		}, 1700);
		const t2 = setTimeout(() => {
			if (active) onDone();
		}, 2900);
		return () => {
			active = false;
			clearTimeout(t1);
			clearTimeout(t2);
		};
	}, [onDone]);

	return (
		<div
			className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 [backdrop-filter:blur(24px)_saturate(180%)] [-webkit-backdrop-filter:blur(24px)_saturate(180%)]"
			aria-live="polite"
		>
			<GlassPanel
				blur="lg"
				tint="white"
				strength="strong"
				radius="xl"
				className="flex flex-col items-center gap-5 px-10 py-10 text-white text-center w-72"
			>
				<div className="relative flex items-center justify-center w-24 h-24">
					{phase === "printing" ? (
						<>
							<div className="absolute h-20 w-20 rounded-full border-4 border-white/10 border-t-white/60 animate-spin" />
							<Icon
								name="print"
								size="xl"
								className="text-white/70"
								strokeWidth={1.5}
							/>
						</>
					) : (
						<div
							className="flex items-center justify-center w-20 h-20 rounded-full"
							style={{
								background: hexToRgba(accentColor, 0.2),
								boxShadow: `0 0 32px ${hexToRgba(accentColor, 0.267)}`,
							}}
						>
							<Icon
								name="check"
								size="xl"
								className="text-caj-success"
								strokeWidth={2.5}
							/>
						</div>
					)}
				</div>

				<div>
					<p className="text-2xl font-extrabold">
						{phase === "printing" ? "Imprimiendo guías…" : "¡Listo!"}
					</p>
					<p className="text-sm text-white/60 mt-1 font-medium">
						{phase === "printing"
							? `Enviando ${count} ${count === 1 ? "guía" : "guías"} a la impresora`
							: `${count} ${count === 1 ? "guía impresa" : "guías impresas"}`}
					</p>
				</div>

				{phase === "printing" && (
					<div className="flex gap-2 flex-wrap justify-center">
						{Array.from({ length: Math.min(count, 8) }).map((_, i) => (
							<span
								key={i}
								className="w-3 h-3 rounded-full animate-pulse"
								style={{
									background: accentColor,
									animationDelay: `${i * 0.12}s`,
								}}
							/>
						))}
					</div>
				)}
			</GlassPanel>
		</div>
	);
}

// ── Guia row (historial) ─────────────────────────────────

function GuiaRow({
	guia,
	accentColor,
	onReprint,
	onRetry,
}: {
	guia: ShippingGuia;
	accentColor: string;
	onReprint: () => void;
	onRetry: () => void;
}) {
	const time = new Date(guia.ts).toLocaleTimeString("es-MX", {
		hour: "2-digit",
		minute: "2-digit",
	});
	const isPending = guia.status === "pendiente";
	const isReprint = guia.status === "reimpresa";

	return (
		<GlassPanel
			as="div"
			blur="sm"
			tint={isPending ? "warning" : "white"}
			strength="subtle"
			radius="lg"
			className="flex items-center gap-3 p-3.5"
		>
			<div
				className={cn(
					"flex items-center justify-center w-11 h-11 rounded-xl text-lg font-extrabold shrink-0",
					isPending ? "bg-caj-warning/20 text-caj-warning" : "text-white",
				)}
				style={
					isPending ? undefined : { background: hexToRgba(accentColor, 0.2) }
				}
			>
				{guia.box}
			</div>
			<div className="flex-1 min-w-0">
				<p
					className={cn(
						"font-bold tabular-nums text-sm truncate",
						isPending ? "text-white/50 italic" : "text-white",
					)}
				>
					{isPending ? "Pre-guía generada" : guia.tracking}
				</p>
				<div className="flex items-center gap-2 mt-0.5 text-xs text-white/50 font-semibold">
					<Icon name="clock" size="xs" />
					{time}
					<span
						className={cn(
							"px-1.5 py-0.5 rounded-full font-bold capitalize",
							isPending
								? "bg-caj-warning/20 text-caj-warning"
								: isReprint
									? "bg-caj-warning/20 text-caj-warning"
									: "bg-caj-success/20 text-caj-success",
						)}
					>
						{isPending ? "pendiente" : guia.status}
					</span>
				</div>
			</div>
			{isPending ? (
				<Button
					variant="ghost"
					size="xs"
					icon={<Icon name="refresh" size="xs" />}
					onClick={onRetry}
					className="shrink-0 text-xs text-caj-warning"
				>
					Reintentar
				</Button>
			) : (
				<Button
					variant="ghost"
					size="xs"
					icon={<Icon name="refresh" size="xs" />}
					onClick={onReprint}
					className="shrink-0 text-xs"
				>
					Reimprimir
				</Button>
			)}
		</GlassPanel>
	);
}

// ── Box tile (grid layout B) ─────────────────────────────

function BoxTile({
	box,
	guia,
	accentColor,
	selected,
	onTap,
}: {
	box: number;
	guia?: ShippingGuia;
	accentColor: string;
	selected: boolean;
	onTap: () => void;
}) {
	const isConfirmed = !!guia && guia.status !== "pendiente";
	const isPendingGuia = !!guia && guia.status === "pendiente";
	const time = guia
		? new Date(guia.ts).toLocaleTimeString("es-MX", {
				hour: "2-digit",
				minute: "2-digit",
			})
		: null;
	const isReprint = guia?.status === "reimpresa";

	return (
		<button
			type="button"
			onClick={onTap}
			className={cn(
				"caj-kiosk-box-tile",
				isConfirmed && "caj-kiosk-box-tile--confirmed",
				isPendingGuia && "caj-kiosk-box-tile--pending",
				selected && "caj-kiosk-box-tile--selected",
				!isConfirmed &&
					!isPendingGuia &&
					!selected &&
					"caj-kiosk-box-tile--default",
			)}
		>
			<div className="flex items-center justify-between">
				<span className="font-extrabold text-white text-sm">Caja {box}</span>
				{isConfirmed ? (
					<span
						className="flex items-center justify-center w-7 h-7 rounded-lg"
						style={{ background: hexToRgba(accentColor, 0.2) }}
					>
						<Icon
							name="check"
							size="xs"
							strokeWidth={3}
							style={{ color: accentColor }}
						/>
					</span>
				) : isPendingGuia ? (
					<span className="flex items-center justify-center w-7 h-7 rounded-lg bg-caj-warning/20">
						{selected ? (
							<Icon
								name="check"
								size="xs"
								className="text-caj-warning"
								strokeWidth={3}
							/>
						) : (
							<Icon name="clock" size="xs" className="text-caj-warning" />
						)}
					</span>
				) : (
					<span
						className={cn(
							"flex items-center justify-center w-7 h-7 rounded-lg",
							selected ? "bg-caj-primary" : "bg-[var(--caj-glass-bg-hover)]",
						)}
					>
						{selected ? (
							<Icon
								name="check"
								size="xs"
								className="text-white"
								strokeWidth={3}
							/>
						) : (
							<Icon name="package" size="xs" className="text-white/40" />
						)}
					</span>
				)}
			</div>
			{isConfirmed ? (
				<>
					<p className="text-xs font-bold tabular-nums truncate text-white/60">
						{guia!.tracking}
					</p>
					<div className="flex items-center gap-1.5 text-[11px] text-white/40 font-semibold mt-auto">
						<Icon name="clock" size={10} />
						{time}
						<span
							className={cn(
								"px-1.5 py-0.5 rounded-full",
								isReprint
									? "bg-caj-warning/20 text-caj-warning"
									: "bg-caj-success/20 text-caj-success",
							)}
						>
							{guia!.status}
						</span>
					</div>
				</>
			) : isPendingGuia ? (
				<>
					<p className="text-xs font-bold italic truncate text-caj-warning/70">
						Pre-guía generada
					</p>
					<div className="flex items-center gap-1.5 text-[11px] text-white/40 font-semibold mt-auto">
						<Icon name="clock" size={10} />
						{time}
						<span className="px-1.5 py-0.5 rounded-full bg-caj-warning/20 text-caj-warning">
							pendiente
						</span>
					</div>
				</>
			) : (
				<p className="text-sm font-bold text-white/40 mt-auto">
					{selected ? "Seleccionada" : "Pendiente"}
				</p>
			)}
		</button>
	);
}

// ── Brand bar (shared) ───────────────────────────────────

function BrandBar({
	name,
	station,
	logoUrl,
	themeColor,
}: {
	name: string;
	station: string;
	logoUrl?: string;
	themeColor?: string;
}) {
	return (
		<div className="flex items-center gap-3 shrink-0">
			<div className="flex-1 min-w-0">
				<Branding
					companyName={name}
					size="sm"
					logoUrl={logoUrl}
					themeColor={themeColor}
				/>
			</div>
			<span className="text-sm text-white/40 font-semibold hidden sm:block shrink-0">
				{station}
			</span>
			<KioskClock />
		</div>
	);
}

// ── Main organism ─────────────────────────────────────────

export function ShippingKiosk({
	orders,
	onPrint,
	onReprint,
	onUpdateBoxCount,
	layout = "keypad",
	station = "Estación L1",
	brandName = "cajui",
	logoUrl,
	themeColor,
	className,
}: ShippingKioskProps) {
	const [folio, setFolio] = useState("");
	const [currentFolio, setCurrentFolio] = useState<string | null>(null);
	const [error, setError] = useState("");
	const [printing, setPrinting] = useState<{
		count: number;
		boxes: number[];
		folio: string;
	} | null>(null);
	const [selectedBoxes, setSelectedBoxes] = useState<Set<number>>(new Set());
	const [query, setQuery] = useState("");
	const [boxCounts, setBoxCounts] = useState<Record<string, number>>(() =>
		Object.fromEntries(
			orders.map((o) => [o.folio, Math.max(o.sugeridas, o.guias.length, 1)]),
		),
	);

	useEffect(() => {
		setSelectedBoxes(new Set());
	}, [currentFolio]);

	const orderMap = Object.fromEntries(orders.map((o) => [o.folio, o]));
	const currentOrder = currentFolio ? (orderMap[currentFolio] ?? null) : null;

	const getBoxCount = (f: string) =>
		boxCounts[f] ??
		Math.max(orderMap[f]?.sugeridas ?? 1, orderMap[f]?.guias.length ?? 0, 1);

	const setBoxCount = (f: string, n: number) => {
		const min = Math.max(1, orderMap[f]?.guias.length ?? 0);
		const clamped = Math.min(20, Math.max(min, n));
		setBoxCounts((prev) => ({ ...prev, [f]: clamped }));
		onUpdateBoxCount?.(f, clamped);
	};

	// Only confirmed (impresa/reimpresa) guides count as done
	const getConfirmedCount = (order: ShippingOrder) =>
		order.guias.filter((g) => g.status !== "pendiente").length;

	const getPendingGuiaCount = (order: ShippingOrder) =>
		order.guias.filter((g) => g.status === "pendiente").length;

	// Boxes that still need printing: unstarted OR have a pre-guía pending retry
	const getPendingBoxes = (order: ShippingOrder) => {
		const planned = getBoxCount(order.folio);
		const confirmedBoxes = new Set(
			order.guias.filter((g) => g.status !== "pendiente").map((g) => g.box),
		);
		return Array.from({ length: planned }, (_, i) => i + 1).filter(
			(b) => !confirmedBoxes.has(b),
		);
	};

	// Orders that still have boxes to print or pending pre-guías
	const pendingOrders = orders.filter(
		(o) =>
			getConfirmedCount(o) < getBoxCount(o.folio) || getPendingGuiaCount(o) > 0,
	);

	const handleSearch = () => {
		const o = orderMap[folio.trim()];
		if (!o) {
			setError(`No se encontró el folio ${folio}`);
			return;
		}
		setCurrentFolio(o.folio);
		setFolio("");
		setError("");
	};

	const startPrint = (f: string, boxes: number[]) => {
		setPrinting({ count: boxes.length, boxes, folio: f });
	};

	const confirmPrint = () => {
		if (!printing) return;
		onPrint?.(printing.folio, printing.boxes);
		setPrinting(null);
	};

	// ── Layout A · Detail ──────────────────────────────────
	if (layout === "keypad" && currentOrder) {
		const planned = getBoxCount(currentOrder.folio);
		const printed = getConfirmedCount(currentOrder);
		const pendingGuias = getPendingGuiaCount(currentOrder);
		const pendingBoxes = getPendingBoxes(currentOrder);

		return (
			<div
				className={cn(
					"relative overflow-hidden flex flex-col h-full",
					className,
				)}
				style={{ background: "var(--caj-page-bg)" }}
			>
				<Blobs />
				<div className="relative z-10 flex flex-col h-full p-5 gap-4 overflow-y-auto text-white">
					{/* topbar */}
					<div className="flex items-center gap-3 shrink-0">
						<Button
							variant="ghost"
							size="sm"
							iconOnly
							icon={<Icon name="back" size="sm" />}
							onClick={() => setCurrentFolio(null)}
						/>
						<div className="flex flex-col flex-1">
							<span className="text-xs font-bold text-white/50 uppercase tracking-wider">
								Folio
							</span>
							<span className="text-2xl font-extrabold tabular-nums">
								{currentOrder.folio}
							</span>
						</div>
						<StatusPill
							printed={printed}
							total={planned}
							pending={pendingGuias}
						/>
					</div>

					{/* customer */}
					<GlassPanel
						blur="md"
						tint="white"
						strength="subtle"
						radius="lg"
						className="p-5"
					>
						<div className="flex items-center gap-3 mb-4">
							<div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-caj-primary/70 shrink-0">
								<Icon name="user" size="md" className="text-white" />
							</div>
							<div>
								<p className="text-xl font-extrabold text-white leading-tight">
									{currentOrder.cliente}
								</p>
								<p className="flex items-center gap-1.5 text-sm text-white/60 font-semibold mt-0.5">
									<Icon name="pin" size="xs" />
									{currentOrder.ciudad}
								</p>
							</div>
						</div>
						<div className="flex items-center justify-between pt-3 border-t border-white/10">
							<span className="text-xs font-bold text-white/50 uppercase tracking-wider">
								Paquetería
							</span>
							<CourierChip courier={currentOrder.courier} size="sm" />
						</div>
					</GlassPanel>

					{/* box stepper */}
					<GlassPanel
						blur="md"
						tint="white"
						strength="subtle"
						radius="lg"
						className="p-5 flex flex-col items-center gap-4"
					>
						<div className="self-start">
							<p className="text-lg font-extrabold text-white">
								¿Cuántas cajas?
							</p>
							<p className="text-sm text-white/50 font-medium">
								Cada caja genera una guía de {currentOrder.courier.name}
							</p>
						</div>
						<QuantityControl
							value={planned}
							min={Math.max(1, printed)}
							max={20}
							onChange={(n) => setBoxCount(currentOrder.folio, n)}
							size="lg"
						/>
						<div className="flex items-center gap-4 w-full justify-center pt-3 border-t border-white/10">
							<div className="text-center">
								<p className="text-2xl font-extrabold tabular-nums">
									{pendingBoxes.length - pendingGuias}
								</p>
								<p className="text-xs text-white/50 font-semibold">
									por imprimir
								</p>
							</div>
							{pendingGuias > 0 && (
								<>
									<div className="w-px h-8 bg-white/10" />
									<div className="text-center">
										<p className="text-2xl font-extrabold tabular-nums text-caj-warning">
											{pendingGuias}
										</p>
										<p className="text-xs text-white/50 font-semibold">
											pre-guías
										</p>
									</div>
								</>
							)}
							<div className="w-px h-8 bg-white/10" />
							<div className="text-center">
								<p className="text-2xl font-extrabold tabular-nums">
									{printed}
								</p>
								<p className="text-xs text-white/50 font-semibold">
									ya impresas
								</p>
							</div>
						</div>
					</GlassPanel>

					{/* print CTA */}
					<Button
						variant="primary"
						size="lg"
						block
						disabled={pendingBoxes.length === 0}
						icon={<Icon name="print" size="md" />}
						onClick={() =>
							pendingBoxes.length > 0 &&
							startPrint(currentOrder.folio, pendingBoxes)
						}
					>
						{pendingBoxes.length > 0
							? pendingGuias > 0 && pendingBoxes.length === pendingGuias
								? `Reintentar ${pendingGuias} pre-${pendingGuias === 1 ? "guía" : "guías"}`
								: pendingGuias > 0
									? `Imprimir ${pendingBoxes.length - pendingGuias} + reintentar ${pendingGuias}`
									: `Imprimir ${pendingBoxes.length} ${pendingBoxes.length === 1 ? "guía" : "guías"}`
							: "Todas las guías impresas"}
					</Button>

					{/* history */}
					{currentOrder.guias.length > 0 && (
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-2 text-xs font-bold text-white/50 uppercase tracking-wider">
								<Icon name="package" size="xs" />
								Guías impresas
								<span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-xs">
									{currentOrder.guias.length}
								</span>
							</div>
							<div className="flex flex-col gap-2">
								{currentOrder.guias.map((g) => (
									<GuiaRow
										key={g.id}
										guia={g}
										accentColor={currentOrder.courier.accent}
										onReprint={() => {
											onReprint?.(currentOrder.folio, g.id);
											startPrint(currentOrder.folio, [g.box]);
										}}
										onRetry={() => startPrint(currentOrder.folio, [g.box])}
									/>
								))}
							</div>
						</div>
					)}
				</div>

				{printing && (
					<PrintingOverlay
						count={printing.count}
						accentColor={currentOrder.courier.accent}
						onDone={confirmPrint}
					/>
				)}
			</div>
		);
	}

	// ── Layout A · Search ──────────────────────────────────
	if (layout === "keypad") {
		return (
			<div
				className={cn(
					"relative overflow-hidden flex flex-col h-full",
					className,
				)}
				style={{ background: "var(--caj-page-bg)" }}
			>
				<Blobs />
				<div className="relative z-10 flex flex-col h-full p-5 gap-4 overflow-y-auto text-white">
					<BrandBar
						name={brandName}
						station={station}
						logoUrl={logoUrl}
						themeColor={themeColor}
					/>

					<div className="shrink-0">
						<h1 className="text-3xl font-extrabold tracking-tight">
							Buscar orden
						</h1>
						<p className="text-sm text-white/50 font-medium mt-1">
							Escanea o escribe el folio del pedido
						</p>
					</div>

					<ScannerInput
						value={folio}
						onChange={(v) => {
							setFolio(v);
							setError("");
						}}
						onConfirm={handleSearch}
						placeholder="Folio del pedido"
						charset="alphanumeric"
						maxLength={12}
						error={error || undefined}
						className="shrink-0"
					/>

					{pendingOrders.length > 0 && (
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-2 text-xs font-bold text-white/50 uppercase tracking-wider">
								Pendientes en línea
								<span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-xs">
									{pendingOrders.length}
								</span>
							</div>
							<div className="flex flex-col gap-2 max-h-52 overflow-y-auto">
								{pendingOrders.map((o) => (
									<button
										key={o.folio}
										type="button"
										onClick={() => setCurrentFolio(o.folio)}
										className="caj-glass-subtle flex items-center gap-3 p-3.5 text-left active:scale-95 transition-transform"
										style={{ borderRadius: "var(--caj-glass-radius)" }}
									>
										<span className="text-xl font-extrabold tabular-nums min-w-[56px]">
											{o.folio}
										</span>
										<span className="flex-1 text-sm text-white/60 font-semibold truncate">
											{o.cliente}
										</span>
										<StatusPill
											printed={getConfirmedCount(o)}
											total={getBoxCount(o.folio)}
											pending={getPendingGuiaCount(o)}
										/>
									</button>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}

	// ── Layout B · Detail ──────────────────────────────────
	if (layout === "list" && currentOrder) {
		const planned = getBoxCount(currentOrder.folio);
		const printed = getConfirmedCount(currentOrder);
		const pendingGuias = getPendingGuiaCount(currentOrder);
		const printedMap = new Map(currentOrder.guias.map((g) => [g.box, g]));
		const pendingBoxes = getPendingBoxes(currentOrder);
		const tiles = Array.from({ length: planned }, (_, i) => i + 1);

		const toggleBox = (box: number) => {
			const g = printedMap.get(box);
			if (g && g.status !== "pendiente") {
				// Already confirmed printed → reprint
				onReprint?.(currentOrder.folio, g.id);
				startPrint(currentOrder.folio, [box]);
				return;
			}
			// Unprinted or pending pre-guía → selectable for batch print/retry
			setSelectedBoxes((prev) => {
				const n = new Set(prev);
				n.has(box) ? n.delete(box) : n.add(box);
				return n;
			});
		};

		return (
			<div
				className={cn(
					"relative overflow-hidden flex flex-col h-full",
					className,
				)}
				style={{ background: "var(--caj-page-bg)" }}
			>
				<Blobs />
				<div className="relative z-10 flex flex-col h-full p-5 gap-4 text-white">
					{/* topbar */}
					<div className="flex items-start gap-3 shrink-0">
						<Button
							variant="ghost"
							size="sm"
							iconOnly
							icon={<Icon name="back" size="sm" />}
							onClick={() => setCurrentFolio(null)}
							className="mt-0.5 shrink-0"
						/>
						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2">
								<span className="text-sm font-bold text-white/50 tabular-nums">
									Folio {currentOrder.folio}
								</span>
								<CourierChip courier={currentOrder.courier} size="sm" />
							</div>
							<p className="text-2xl font-extrabold tracking-tight mt-0.5 leading-tight truncate">
								{currentOrder.cliente}
							</p>
						</div>
					</div>

					{/* meta */}
					<div className="flex items-center justify-between shrink-0">
						<span className="flex items-center gap-1.5 text-sm text-white/50 font-semibold">
							<Icon name="pin" size="xs" />
							{currentOrder.ciudad}
						</span>
						<StatusPill
							printed={printed}
							total={planned}
							pending={pendingGuias}
						/>
					</div>

					{/* compact stepper */}
					<GlassPanel
						blur="sm"
						tint="white"
						strength="subtle"
						radius="lg"
						className="flex items-center justify-between px-4 py-3 shrink-0"
					>
						<span className="text-sm font-bold text-white">
							Cajas planeadas
						</span>
						<QuantityControl
							value={planned}
							min={Math.max(1, printed)}
							max={20}
							onChange={(n) => setBoxCount(currentOrder.folio, n)}
							size="sm"
						/>
					</GlassPanel>

					{/* box grid */}
					<div className="flex-1 min-h-0 overflow-y-auto">
						<div className="grid grid-cols-2 gap-3">
							{tiles.map((b) => (
								<BoxTile
									key={b}
									box={b}
									guia={printedMap.get(b)}
									accentColor={currentOrder.courier.accent}
									selected={selectedBoxes.has(b)}
									onTap={() => toggleBox(b)}
								/>
							))}
							<button
								type="button"
								onClick={() => setBoxCount(currentOrder.folio, planned + 1)}
								className="caj-kiosk-add-box-btn"
							>
								<Icon name="plus" size="md" className="text-white/40" />
								Agregar caja
							</button>
						</div>
					</div>

					{/* footer */}
					<div className="shrink-0 pt-1">
						{selectedBoxes.size > 0 ? (
							<Button
								variant="primary"
								size="lg"
								block
								icon={<Icon name="print" size="md" />}
								onClick={() =>
									startPrint(currentOrder.folio, [...selectedBoxes])
								}
							>
								Imprimir {selectedBoxes.size}{" "}
								{selectedBoxes.size === 1 ? "seleccionada" : "seleccionadas"}
							</Button>
						) : pendingBoxes.length > 0 ? (
							<Button
								variant={
									pendingGuias > 0 && pendingBoxes.length === pendingGuias
										? "ghost"
										: "ghost"
								}
								size="lg"
								block
								icon={<Icon name="print" size="md" />}
								onClick={() => startPrint(currentOrder.folio, pendingBoxes)}
							>
								{pendingGuias > 0 && pendingBoxes.length === pendingGuias
									? `Reintentar ${pendingGuias} pre-${pendingGuias === 1 ? "guía" : "guías"}`
									: pendingGuias > 0
										? `Imprimir ${pendingBoxes.length - pendingGuias} + reintentar ${pendingGuias}`
										: `Imprimir ${pendingBoxes.length} pendientes`}
							</Button>
						) : (
							<div
								className="flex items-center justify-center gap-2 h-14 bg-caj-success/20 text-caj-success font-extrabold"
								style={{ borderRadius: "var(--caj-glass-radius)" }}
							>
								<Icon name="check" size="sm" strokeWidth={3} />
								Todas las guías impresas
							</div>
						)}
					</div>
				</div>

				{printing && (
					<PrintingOverlay
						count={printing.count}
						accentColor={currentOrder.courier.accent}
						onDone={confirmPrint}
					/>
				)}
			</div>
		);
	}

	// ── Layout B · List ────────────────────────────────────
	const filtered = orders.filter(
		(o) =>
			!query ||
			o.folio.includes(query.trim()) ||
			o.cliente.toLowerCase().includes(query.trim().toLowerCase()),
	);

	return (
		<div
			className={cn("relative overflow-hidden flex flex-col h-full", className)}
			style={{ background: "var(--caj-page-bg)" }}
		>
			<Blobs />
			<div className="relative z-10 flex flex-col h-full p-5 gap-4 text-white">
				<BrandBar
					name={brandName}
					station={station}
					logoUrl={logoUrl}
					themeColor={themeColor}
				/>
				<h1 className="text-3xl font-extrabold tracking-tight shrink-0">
					Órdenes en línea
				</h1>

				{/* search field */}
				<ScannerInput
					value={query}
					onChange={setQuery}
					onConfirm={setQuery}
					placeholder="Buscar por folio o cliente…"
					charset="alphanumeric"
					className="shrink-0"
				/>

				{/* order list */}
				<div className="flex-1 min-h-0 overflow-y-auto">
					<div className="flex flex-col gap-2.5">
						{filtered.map((o) => (
							<button
								key={o.folio}
								type="button"
								onClick={() => setCurrentFolio(o.folio)}
								className="caj-glass-subtle grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 px-4 py-3.5 text-left active:scale-95 transition-transform"
								style={{ borderRadius: "var(--caj-glass-radius)" }}
							>
								<span className="text-xl font-extrabold tabular-nums min-w-[56px]">
									{o.folio}
								</span>
								<div className="min-w-0">
									<p className="font-bold truncate">{o.cliente}</p>
									<p className="flex items-center gap-1 text-xs text-white/50 font-semibold mt-0.5">
										<Icon name="pin" size={10} />
										{o.ciudad}
									</p>
								</div>
								<div className="flex flex-col items-end gap-1.5">
									<CourierChip courier={o.courier} size="sm" />
									<StatusPill
										printed={getConfirmedCount(o)}
										total={getBoxCount(o.folio)}
										pending={getPendingGuiaCount(o)}
									/>
								</div>
								<Icon
									name="forward"
									size="sm"
									className="text-white/30 shrink-0"
								/>
							</button>
						))}
						{filtered.length === 0 && (
							<p className="text-center text-white/40 font-semibold py-10">
								Sin resultados para &ldquo;{query}&rdquo;
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
