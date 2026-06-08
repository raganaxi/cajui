import { useCallback, useMemo, useReducer } from "react";
import type { CartItemData } from "@/molecules/CartItem/CartItem";
import type { Product } from "@/molecules/ProductCard/ProductCard";

interface CartState {
	items: CartItemData[];
	discount: number;
	discountType: "percent" | "fixed";
}

type CartAction =
	| { type: "ADD"; product: Product; quantity?: number }
	| { type: "REMOVE"; id: string }
	| { type: "UPDATE_QTY"; id: string; quantity: number }
	| {
			type: "APPLY_DISCOUNT";
			amount: number;
			discountType?: "percent" | "fixed";
	  }
	| { type: "CLEAR" }
	| { type: "SET_ITEMS"; items: CartItemData[] };

function cartReducer(state: CartState, action: CartAction): CartState {
	switch (action.type) {
		case "ADD": {
			const existing = state.items.find((i) => i.id === action.product.id);
			const qty = action.quantity ?? 1;
			if (existing) {
				return {
					...state,
					items: state.items.map((i) =>
						i.id === action.product.id
							? { ...i, quantity: i.quantity + qty }
							: i,
					),
				};
			}
			const newItem: CartItemData = {
				id: action.product.id,
				name: action.product.name,
				price: action.product.price,
				quantity: qty,
				image: action.product.image,
				sku: action.product.sku,
				unit: action.product.unit,
			};
			return { ...state, items: [...state.items, newItem] };
		}

		case "REMOVE":
			return { ...state, items: state.items.filter((i) => i.id !== action.id) };

		case "UPDATE_QTY":
			if (action.quantity <= 0) {
				return {
					...state,
					items: state.items.filter((i) => i.id !== action.id),
				};
			}
			return {
				...state,
				items: state.items.map((i) =>
					i.id === action.id ? { ...i, quantity: action.quantity } : i,
				),
			};

		case "APPLY_DISCOUNT":
			return {
				...state,
				discount: action.amount,
				discountType: action.discountType ?? "percent",
			};

		case "CLEAR":
			return { items: [], discount: 0, discountType: "percent" };

		case "SET_ITEMS":
			return { ...state, items: action.items };

		default:
			return state;
	}
}

export interface UseCartOptions {
	taxRate?: number;
	initialItems?: CartItemData[];
}

export function useCart({
	taxRate = 0,
	initialItems = [],
}: UseCartOptions = {}) {
	const [state, dispatch] = useReducer(cartReducer, {
		items: initialItems,
		discount: 0,
		discountType: "percent",
	});

	const totals = useMemo(() => {
		const subtotal = state.items.reduce((acc, item) => {
			const unitPrice = item.discount
				? item.price * (1 - item.discount / 100)
				: item.price;
			return acc + unitPrice * item.quantity;
		}, 0);

		const discountAmount =
			state.discountType === "percent"
				? subtotal * (state.discount / 100)
				: state.discount;

		const afterDiscount = subtotal - discountAmount;
		const taxAmount = afterDiscount * (taxRate / 100);
		const total = afterDiscount + taxAmount;
		const itemCount = state.items.reduce((acc, i) => acc + i.quantity, 0);

		return { subtotal, discountAmount, taxAmount, total, itemCount };
	}, [state.items, state.discount, state.discountType, taxRate]);

	const add = useCallback((product: Product, quantity = 1) => {
		dispatch({ type: "ADD", product, quantity });
	}, []);

	const remove = useCallback((id: string) => {
		dispatch({ type: "REMOVE", id });
	}, []);

	const updateQuantity = useCallback((id: string, quantity: number) => {
		dispatch({ type: "UPDATE_QTY", id, quantity });
	}, []);

	const applyDiscount = useCallback(
		(amount: number, discountType: "percent" | "fixed" = "percent") => {
			dispatch({ type: "APPLY_DISCOUNT", amount, discountType });
		},
		[],
	);

	const clear = useCallback(() => {
		dispatch({ type: "CLEAR" });
	}, []);

	return {
		items: state.items,
		discount: state.discount,
		discountType: state.discountType,
		...totals,
		add,
		remove,
		updateQuantity,
		applyDiscount,
		clear,
		isEmpty: state.items.length === 0,
	};
}
