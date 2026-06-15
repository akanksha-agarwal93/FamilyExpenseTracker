import type { DashboardCategoryItem } from "../types/Dashboard"
import {
	expenseCategories,
	type ExpenseCategory,
} from "../types/ExpenseCategory"
import type { Expense } from "../types/Expense"

const categoryColors: Record<ExpenseCategory, string> = {
	Groceries: "#0d0f8c",
	Transport: "#4aa3df",
	Dining: "#f4a620",
	Entertainment: "#6e62d7",
	Coffee: "#fd7c36",
	"Mobile bill": "#d15a95",
	"House rent": "#3fa88e",
	Bill: "#84b63e",
	Shopping: "#51b6a5",
	Other: "#9a9a94",
}

export const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const

export const getStartOfWeek = (date: Date) => {
	const start = new Date(date)
	const day = start.getDay()
	const diff = day === 0 ? -6 : 1 - day

	start.setDate(start.getDate() + diff)
	start.setHours(0, 0, 0, 0)

	return start
}

export const getEndOfWeek = (startOfWeek: Date) => {
	const end = new Date(startOfWeek)
	end.setDate(startOfWeek.getDate() + 7)

	return end
}

export const getMondayBasedDayIndex = (date: Date) => {
	const day = date.getDay()

	return day === 0 ? 6 : day - 1
}

export const getExpenseDate = (expense: Expense) => new Date(expense.date)

const normalizeCategory = (category: string): ExpenseCategory => {
	const normalizedCategory = category.trim().toLowerCase()
	console.log("Normalized category:", normalizedCategory)
	const matchingCategory = expenseCategories.find(
		(expenseCategory) =>
			expenseCategory.value.toLowerCase() === normalizedCategory,
	)

	if (matchingCategory) return matchingCategory.value
	
	return "Other"
}

export const getDashboardCategories = (
	expenses: Expense[],
	total: number,
): DashboardCategoryItem[] => {
	const categoryTotals = new Map<ExpenseCategory, number>()

	expenses.forEach((expense) => {
		const category = normalizeCategory(expense.category)

		categoryTotals.set(
			category,
			(categoryTotals.get(category) || 0) + expense.amount,
		)
	})

	return expenseCategories
		.map((category) => {
			const categoryTotal = categoryTotals.get(category.value) || 0
			const chartPercentage =
				total > 0 ? (categoryTotal / total) * 100 : 0

			return {
				color: categoryColors[category.value],
				label: category.label,
				percentage: Math.round(chartPercentage),
				total: categoryTotal,
				value: category.value,
			}
		})
		.filter((category) => category.total > 0)
		.sort((firstCategory, secondCategory) => {
			if (secondCategory.total !== firstCategory.total) {
				return secondCategory.total - firstCategory.total
			}

			return firstCategory.label.localeCompare(secondCategory.label)
		})
}
