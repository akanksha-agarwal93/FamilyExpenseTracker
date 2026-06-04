import { useEffect, useState, type ReactNode } from "react"
import type { Expense } from "../types/Expense"
import { ExpenseContext } from "./ExpenseContextState"

interface ExpenseProviderProps {
	children: ReactNode
}

export const ExpenseProvider = ({ children }: ExpenseProviderProps) => {
	const [expenses, setExpenses] = useState<Expense[]>(() => {
		try {
			const saved = localStorage.getItem("expenses")
			return saved ? JSON.parse(saved) : []
		} catch (error) {
			console.error("Failed to load expenses from localStorage:", error)
			return []
		}
	})

	useEffect(() => {
		localStorage.setItem("expenses", JSON.stringify(expenses))
	}, [expenses])

	const addExpense = (expense: Expense) => {
		setExpenses((prev) => [...prev, expense])
	}

	const editExpense = (updatedExpense: Expense) => {
		const expenseId = updatedExpense.id
		setExpenses((prev) =>
			prev.map((expense) =>
				expense.id === expenseId ? updatedExpense : expense,
			),
		)
	}

	const deleteExpense = (id: string) => {
		setExpenses((prev) => prev.filter((expense) => expense.id !== id))
	}

	return (
		<ExpenseContext.Provider
			value={{ expenses, addExpense, editExpense, deleteExpense }}
		>
			{children}
		</ExpenseContext.Provider>
	)
}
