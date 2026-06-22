import { useEffect, useState, type ReactNode } from "react"
import type { Expense } from "../types/Expense"
import { useAuth } from "./AuthContextState"
import { ExpenseContext } from "./ExpenseContextState"

interface ExpenseProviderProps {
	children: ReactNode
}

export const ExpenseProvider = ({ children }: ExpenseProviderProps) => {
	const { session } = useAuth()
	const [allExpenses, setAllExpenses] = useState<Expense[]>(() => {
		try {
			const saved = localStorage.getItem("expenses")
			return saved ? JSON.parse(saved) : []
		} catch (error) {
			console.error("Failed to load expenses from localStorage:", error)
			return []
		}
	})
	const currentUserId = session?.id || ""
	const expenses = allExpenses.filter(
		(expense) => expense.userId === currentUserId,
	)

	useEffect(() => {
		localStorage.setItem("expenses", JSON.stringify(allExpenses))
	}, [allExpenses])

	const addExpense = (expense: Expense) => {
		setAllExpenses((prev) => [...prev, expense])
	}

	const editExpense = (updatedExpense: Expense) => {
		const expenseId = updatedExpense.id
		setAllExpenses((prev) =>
			prev.map((expense) =>
				expense.id === expenseId ? updatedExpense : expense,
			),
		)
	}

	const deleteExpense = (id: string) => {
		setAllExpenses((prev) => prev.filter((expense) => expense.id !== id))
	}

	return (
		<ExpenseContext.Provider
			value={{ expenses, addExpense, editExpense, deleteExpense }}
		>
			{children}
		</ExpenseContext.Provider>
	)
}
