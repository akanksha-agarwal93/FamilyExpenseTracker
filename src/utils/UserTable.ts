import type { User } from "../types/User"

const USER_TABLE_KEY = "family-expense-users"

export const getUserId = (email: string) => email.toLowerCase()

export const getStoredUsers = (): User[] => {
	try {
		const storedUsers = localStorage.getItem(USER_TABLE_KEY)
		return storedUsers ? (JSON.parse(storedUsers) as User[]) : []
	} catch {
		return []
	}
}

export const saveUser = (user: User) => {
	const users = getStoredUsers()
	const existingUserIndex = users.findIndex(
		(storedUser) => storedUser.id === user.id,
	)

	const nextUsers =
		existingUserIndex >= 0
			? users.map((storedUser) =>
					storedUser.id === user.id ? user : storedUser,
				)
			: [...users, user]

	localStorage.setItem(USER_TABLE_KEY, JSON.stringify(nextUsers))
}
