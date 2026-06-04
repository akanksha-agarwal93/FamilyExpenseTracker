import { createContext, useContext } from "react"
import type { Expense } from "../types/Expense"

export interface ExpenseContextType {
	expenses: Expense[]
	addExpense: (expense: Expense) => void
	editExpense: (updatedExpense: Expense) => void
	deleteExpense: (id: string) => void
}

export const ExpenseContext = createContext<ExpenseContextType | undefined>(
	undefined,
)

export const useExpenses = () => {
	const context = useContext(ExpenseContext)

	if (!context) {
		throw new Error("useExpenses must be used inside ExpenseProvider")
	}

	return context
}
