import { createContext, useContext } from "react"
import type { AuthSession } from "../utils/AuthSession"

export interface AuthContextType {
	session: AuthSession | null
	isAuthenticated: boolean
	signIn: (name: string, email: string) => AuthSession
	signOut: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
)

export const useAuth = () => {
	const context = useContext(AuthContext)

	if (!context) {
		throw new Error("useAuth must be used inside AuthProvider")
	}

	return context
}
