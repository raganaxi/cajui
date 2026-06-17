export type CajuiGradient = "default" | "warm" | "cool" | "midnight" | "none";

export type CajuiTheme =
	| "cajui"
	| "accessible-light"
	| "accessible-dark"
	| "amalli-light"
	| "amalli-dark"
	| "novera";

export interface CajuiProviderProps {
	children: React.ReactNode;
	gradient?: CajuiGradient;
	className?: string;
	style?: React.CSSProperties;
	theme?: CajuiTheme;
}
