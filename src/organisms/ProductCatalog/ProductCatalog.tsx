import { useMemo, useState } from "react";
import { Icon } from "@/atoms/Icon";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/molecules/ProductCard/ProductCard";
import type { ProductCatalogProps } from "./interface";

export function ProductCatalog({
	products,
	categories: propsCategories,
	filterGroups = [],
	onAddProduct,
	currency = "MXN",
	className,
}: ProductCatalogProps) {
	// Search and simple category filters
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	// Sidebar filter states
	const [selectedFilters, setSelectedFilters] = useState<
		Record<string, string[]>
	>({});
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);

	// Mobile filter panel visibility
	const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

	// Dynamically compute categories if not provided
	const categories = useMemo(() => {
		if (propsCategories && propsCategories.length > 0) return propsCategories;
		const set = new Set<string>();
		for (const p of products) {
			if (p.category) set.add(p.category);
		}
		return Array.from(set);
	}, [products, propsCategories]);

	// Dynamically compute max price to set initial state
	const maxPossiblePrice = useMemo(() => {
		if (products.length === 0) return 0;
		return Math.max(...products.map((p) => p.price));
	}, [products]);

	// Initialize price range on load
	useMemo(() => {
		setPriceRange([0, maxPossiblePrice]);
	}, [maxPossiblePrice]);

	// Check if any filters are active to show clear button
	const hasActiveFilters = useMemo(() => {
		if (searchQuery.trim() !== "") return true;
		if (selectedCategory !== null) return true;
		if (priceRange[0] > 0 || priceRange[1] < maxPossiblePrice) return true;
		return Object.values(selectedFilters).some((arr) => arr.length > 0);
	}, [
		searchQuery,
		selectedCategory,
		priceRange,
		selectedFilters,
		maxPossiblePrice,
	]);

	// Handle filter toggles
	const handleFilterToggle = (groupId: string, value: string) => {
		setSelectedFilters((prev) => {
			const group = prev[groupId] || [];
			const nextGroup = group.includes(value)
				? group.filter((v) => v !== value)
				: [...group, value];
			return { ...prev, [groupId]: nextGroup };
		});
	};

	// Reset all filters
	const handleClearAll = () => {
		setSearchQuery("");
		setSelectedCategory(null);
		setSelectedFilters({});
		setPriceRange([0, maxPossiblePrice]);
	};

	// Apply all filters: Search, Category, Price, and Dynamic attributes (variants/tags)
	const filteredProducts = useMemo(() => {
		return products.filter((p) => {
			// 1. Search Query Filter
			if (searchQuery.trim()) {
				const q = searchQuery.toLowerCase();
				const nameMatch = p.name.toLowerCase().includes(q);
				const descMatch = p.description?.toLowerCase().includes(q) || false;
				const skuMatch = p.sku?.toLowerCase().includes(q) || false;
				if (!nameMatch && !descMatch && !skuMatch) return false;
			}

			// 2. Category Filter
			if (selectedCategory && p.category !== selectedCategory) {
				return false;
			}

			// 3. Price Filter
			const price = p.price;
			if (price < priceRange[0] || price > priceRange[1]) {
				return false;
			}

			// 4. Dynamic Group Filters (Matching attributes in product/variants)
			for (const [, selectedVals] of Object.entries(selectedFilters)) {
				if (selectedVals.length === 0) continue;

				// Check if product matching attribute exists in options/variants
				// E.g. If B2B attributes (fabric, color, size) are filtered.
				// We check if either the base product name/desc/category matches,
				// or if any of its variants matches the value.
				const matchesVariant = p.variants?.some((v) =>
					selectedVals.some((val) =>
						v.name.toLowerCase().includes(val.toLowerCase()),
					),
				);

				const matchesBase = selectedVals.some(
					(val) =>
						p.name.toLowerCase().includes(val.toLowerCase()) ||
						p.description?.toLowerCase().includes(val.toLowerCase()),
				);

				if (!matchesVariant && !matchesBase) return false;
			}

			return true;
		});
	}, [products, searchQuery, selectedCategory, priceRange, selectedFilters]);

	return (
		<div
			className={cn("flex flex-col h-full gap-4 w-full text-white", className)}
		>
			{/* === Header & Search Bar === */}
			<div className="flex flex-col md:flex-row gap-3 items-center justify-between">
				<div className="relative w-full md:max-w-md">
					<span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
						<Icon name="search" size="sm" />
					</span>
					<input
						type="search"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Buscar productos por nombre, SKU o detalles..."
						className="caj-input pl-10 w-full"
					/>
					{searchQuery && (
						<button
							type="button"
							onClick={() => setSearchQuery("")}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
						>
							✕
						</button>
					)}
				</div>

				{/* Action buttons */}
				<div className="flex w-full md:w-auto items-center gap-2 justify-end">
					{/* Mobile Filter Button */}
					<button
						type="button"
						onClick={() => setIsMobileFilterOpen(true)}
						className="flex md:hidden items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] active:scale-95 text-sm font-semibold"
					>
						<Icon name="filter" size="sm" />
						Filtros
					</button>

					{hasActiveFilters && (
						<button
							type="button"
							onClick={handleClearAll}
							className="px-3 py-1.5 text-xs rounded-lg bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
						>
							Limpiar filtros
						</button>
					)}
				</div>
			</div>

			{/* === Categories Horizontal Bar === */}
			{categories.length > 0 && (
				<div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
					<button
						type="button"
						onClick={() => setSelectedCategory(null)}
						className={cn(
							"px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border",
							selectedCategory === null
								? "bg-caj-primary border-caj-primary text-white"
								: "bg-white/[0.04] border-white/10 text-white/75 hover:bg-white/[0.1] hover:text-white",
						)}
					>
						Todos
					</button>
					{categories.map((cat) => (
						<button
							key={cat}
							type="button"
							onClick={() => setSelectedCategory(cat)}
							className={cn(
								"px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border",
								selectedCategory === cat
									? "bg-caj-primary border-caj-primary text-white"
									: "bg-white/[0.04] border-white/10 text-white/75 hover:bg-white/[0.1] hover:text-white",
							)}
						>
							{cat}
						</button>
					))}
				</div>
			)}

			{/* === Main Workspace layout === */}
			<div className="flex gap-4 items-start flex-1 min-h-0">
				{/* Sidebar (Desktop Only) */}
				<aside className="hidden md:flex flex-col w-64 shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4 gap-5 self-stretch overflow-y-auto">
					<div className="flex items-center justify-between border-b border-white/10 pb-2">
						<h3 className="font-bold text-sm uppercase tracking-wider text-white/60">
							Filtros
						</h3>
					</div>

					{/* Price Filter */}
					<div className="space-y-2">
						<span className="text-xs font-bold text-white/70">
							Rango de precio
						</span>
						<div className="flex items-center gap-2">
							<div className="relative flex-1">
								<span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-white/40">
									$
								</span>
								<input
									type="number"
									value={priceRange[0]}
									onChange={(e) =>
										setPriceRange([Number(e.target.value), priceRange[1]])
									}
									className="caj-input pl-6 py-1 text-xs w-full"
									placeholder="Min"
								/>
							</div>
							<span className="text-white/40 text-xs">—</span>
							<div className="relative flex-1">
								<span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-white/40">
									$
								</span>
								<input
									type="number"
									value={priceRange[1]}
									onChange={(e) =>
										setPriceRange([priceRange[0], Number(e.target.value)])
									}
									className="caj-input pl-6 py-1 text-xs w-full"
									placeholder="Max"
								/>
							</div>
						</div>
					</div>

					{/* Custom Filter Groups */}
					{filterGroups.map((group) => (
						<div key={group.id} className="space-y-2">
							<span className="text-xs font-bold text-white/70 block border-b border-white/5 pb-1">
								{group.label}
							</span>
							<div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
								{group.options.map((opt) => {
									const isChecked =
										selectedFilters[group.id]?.includes(opt.value) || false;
									return (
										<label
											key={opt.value}
											className="flex items-center gap-2 text-xs text-white/80 cursor-pointer select-none hover:text-white"
										>
											<input
												type="checkbox"
												checked={isChecked}
												onChange={() => handleFilterToggle(group.id, opt.value)}
												className="rounded border-white/20 bg-white/5 text-caj-primary focus:ring-caj-primary h-3.5 w-3.5"
											/>
											<span className="flex-1 truncate">{opt.label}</span>
											{opt.count !== undefined && (
												<span className="text-[10px] text-white/40 font-mono">
													({opt.count})
												</span>
											)}
										</label>
									);
								})}
							</div>
						</div>
					))}
				</aside>

				{/* Products Grid Section */}
				<div className="flex-1 overflow-y-auto h-full self-stretch">
					{filteredProducts.length === 0 ? (
						<div className="flex flex-col h-64 items-center justify-center text-white/60">
							<p className="text-3xl">🔍</p>
							<p className="mt-2 text-sm font-semibold">
								No se encontraron productos
							</p>
							<p className="text-xs text-white/40 mt-1">
								Prueba quitando filtros o cambiando la búsqueda.
							</p>
						</div>
					) : (
						<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
							{filteredProducts.map((p) => (
								<ProductCard
									key={p.id}
									product={p}
									currency={currency}
									onAdd={onAddProduct}
								/>
							))}
						</div>
					)}
				</div>
			</div>

			{/* === Mobile Drawer Filter Modal === */}
			{isMobileFilterOpen && (
				<div className="fixed inset-0 z-50 flex justify-end md:hidden">
					{/* Backdrop */}
					<div
						className="absolute inset-0 bg-black/60 backdrop-blur-sm"
						onClick={() => setIsMobileFilterOpen(false)}
					/>

					{/* Panel */}
					<div className="relative w-80 max-w-full bg-[#1e2230]/95 border-l border-white/10 p-5 flex flex-col gap-5 h-full z-10 animate-fade-in shadow-2xl overflow-y-auto">
						<div className="flex items-center justify-between border-b border-white/10 pb-3">
							<h3 className="font-bold text-base text-white">Filtros</h3>
							<button
								type="button"
								onClick={() => setIsMobileFilterOpen(false)}
								className="text-white/60 hover:text-white text-lg font-bold"
							>
								✕
							</button>
						</div>

						{/* Price Range */}
						<div className="space-y-2">
							<span className="text-xs font-bold text-white/70">
								Rango de precio
							</span>
							<div className="flex items-center gap-2">
								<div className="relative flex-1">
									<span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-white/40">
										$
									</span>
									<input
										type="number"
										value={priceRange[0]}
										onChange={(e) =>
											setPriceRange([Number(e.target.value), priceRange[1]])
										}
										className="caj-input pl-6 py-1.5 text-xs w-full"
										placeholder="Min"
									/>
								</div>
								<span className="text-white/40 text-xs">—</span>
								<div className="relative flex-1">
									<span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-white/40">
										$
									</span>
									<input
										type="number"
										value={priceRange[1]}
										onChange={(e) =>
											setPriceRange([priceRange[0], Number(e.target.value)])
										}
										className="caj-input pl-6 py-1.5 text-xs w-full"
										placeholder="Max"
									/>
								</div>
							</div>
						</div>

						{/* Custom Filter Groups */}
						{filterGroups.map((group) => (
							<div key={group.id} className="space-y-2">
								<span className="text-xs font-bold text-white/70 block border-b border-white/5 pb-1">
									{group.label}
								</span>
								<div className="space-y-2.5">
									{group.options.map((opt) => {
										const isChecked =
											selectedFilters[group.id]?.includes(opt.value) || false;
										return (
											<label
												key={opt.value}
												className="flex items-center gap-2 text-xs text-white/80 cursor-pointer select-none"
											>
												<input
													type="checkbox"
													checked={isChecked}
													onChange={() =>
														handleFilterToggle(group.id, opt.value)
													}
													className="rounded border-white/20 bg-white/5 text-caj-primary focus:ring-caj-primary h-4 w-4"
												/>
												<span className="flex-1 truncate">{opt.label}</span>
												{opt.count !== undefined && (
													<span className="text-[10px] text-white/40 font-mono">
														({opt.count})
													</span>
												)}
											</label>
										);
									})}
								</div>
							</div>
						))}

						<div className="mt-auto pt-4 flex gap-2">
							{hasActiveFilters && (
								<button
									type="button"
									onClick={() => {
										handleClearAll();
										setIsMobileFilterOpen(false);
									}}
									className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 text-xs font-semibold"
								>
									Limpiar todo
								</button>
							)}
							<button
								type="button"
								onClick={() => setIsMobileFilterOpen(false)}
								className="flex-1 py-2 rounded-xl bg-caj-primary hover:bg-caj-primary-hover text-white text-xs font-bold"
							>
								Ver resultados ({filteredProducts.length})
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
