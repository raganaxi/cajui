import { Login } from "../Login";
import type { RegisterLockedProps } from "./interface";

export function RegisterLocked(props: RegisterLockedProps) {
	return <Login variant="lock" {...props} />;
}
