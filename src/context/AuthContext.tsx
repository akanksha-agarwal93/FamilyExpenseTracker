import { useState, type ReactNode } from "react"
import {
	clearAuthSession,
	getStoredAuthSession,
	saveAuthSession,
	type AuthSession,
} from "../utils/AuthSession"
import { getUserId, saveUser } from "../utils/UserTable"
import type { User } from "../types/User"
import { AuthContext } from "./AuthContextState"

interface AuthProviderProps {
	children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [session, setSession] = useState<AuthSession | null>(
		getStoredAuthSession,
	)

	const signIn = (name: string, email: string) => {
		const normalizedEmail = email.trim()
		const user: User = {
			id: getUserId(normalizedEmail),
			email: normalizedEmail,
			name: name.trim(),
		}
		const nextSession: AuthSession = {
			...user,
			signedInAt: new Date().toISOString(),
		}

		saveUser(user)
		saveAuthSession(nextSession)
		setSession(nextSession)

		return nextSession
	}

	const signOut = () => {
		clearAuthSession()
		setSession(null)
	}

	return (
		<AuthContext.Provider
			value={{
				session,
				isAuthenticated: Boolean(session),
				signIn,
				signOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
