import { createContext, useContext } from "react";
import type { CajuiGradient, CajuiTheme } from "./interface";

interface CajuiContextValue {
	theme: CajuiTheme;
	gradient: CajuiGradient;
}

export const CajuiContext = createContext<CajuiContextValue>({
	theme: "cajui",
	gradient: "default",
});

export function useCajuiTheme(): CajuiContextValue {
	return useContext(CajuiContext);
}
