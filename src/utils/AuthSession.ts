import type { User } from "../types/User"

export interface AuthSession extends User {
	signedInAt: string
}

const AUTH_SESSION_KEY = "family-expense-auth-session"

export const getStoredAuthSession = (): AuthSession | null => {
	try {
		const storedSession = localStorage.getItem(AUTH_SESSION_KEY)
		return storedSession ? (JSON.parse(storedSession) as AuthSession) : null
	} catch {
		return null
	}
}

export const saveAuthSession = (session: AuthSession) => {
	localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session))
}

export const clearAuthSession = () => {
	localStorage.removeItem(AUTH_SESSION_KEY)
}

export const hasAuthSession = () => Boolean(getStoredAuthSession())
