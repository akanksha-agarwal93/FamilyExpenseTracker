import type { ExpenseCategory } from "./ExpenseCategory"

export interface Expense {
	id: string
	userId: string
	name?: string
	amount: number
	category: ExpenseCategory
	date: string
} 
