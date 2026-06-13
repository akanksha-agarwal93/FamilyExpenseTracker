import { useMemo } from "react"
import { useExpenses } from "../context/ExpenseContextState"
import {
	expenseCategories,
	type ExpenseCategory,
} from "../types/ExpenseCategory"
import type { Expense } from "../types/Expense"

const WEEKLY_BUDGET = 500

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const

const categoryColors: Record<ExpenseCategory, string> = {
	Groceries: "#2daf8c",
	Transport: "#4aa3df",
	Dining: "#f4a62a",
	Entertainment: "#6e62d7",
	Coffee: "#dd7c36",
	"Mobile bill": "#d15a95",
	"House rent": "#3fa88e",
	Bill: "#84b63e",
	Shopping: "#51b6a5",
	Other: "#9a9a94",
}

const getExpenseDate = (expense: Expense) => new Date(expense.date)

const getStartOfWeek = (date: Date) => {
	const start = new Date(date)
	const day = start.getDay()
	const diff = day === 0 ? -6 : 1 - day

	start.setDate(start.getDate() + diff)
	start.setHours(0, 0, 0, 0)

	return start
}

const getEndOfWeek = (startOfWeek: Date) => {
	const end = new Date(startOfWeek)
	end.setDate(startOfWeek.getDate() + 7)

	return end
}

const getMondayBasedDayIndex = (date: Date) => {
	const day = date.getDay()

	return day === 0 ? 6 : day - 1
}

export function useWeeklyDashboardData() {
	const { expenses } = useExpenses()

	return useMemo(() => {
		const startOfWeek = getStartOfWeek(new Date())
		const endOfWeek = getEndOfWeek(startOfWeek)
		const weeklyExpenses = expenses.filter((expense) => {
			const expenseDate = getExpenseDate(expense)

			return expenseDate >= startOfWeek && expenseDate < endOfWeek
		})

		const dailyTotals = weekDays.map((day) => ({
			day,
			total: 0,
		}))
		const categoryTotals = new Map<ExpenseCategory, number>()

		weeklyExpenses.forEach((expense) => {
			const dayIndex = getMondayBasedDayIndex(getExpenseDate(expense))
			dailyTotals[dayIndex].total += expense.amount
			categoryTotals.set(
				expense.category,
				(categoryTotals.get(expense.category) || 0) + expense.amount,
			)
		})

		const totalThisWeek = weeklyExpenses.reduce(
			(total, expense) => total + expense.amount,
			0,
		)

		const categories = expenseCategories
			.map((category) => {
				const total = categoryTotals.get(category.value) || 0
				const percentage =
					totalThisWeek > 0 ? Math.round((total / totalThisWeek) * 100) : 0

				return {
					color: categoryColors[category.value],
					label: category.label,
					percentage,
					total,
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

		const topCategory = categories[0]
		const dailyAverage = totalThisWeek / 7

		return {
			budgetLeft: WEEKLY_BUDGET - totalThisWeek,
			categories,
			dailyAverage,
			dailyTotals,
			topCategory,
			totalThisWeek,
			weeklyBudget: WEEKLY_BUDGET,
			weeklyExpenses,
		}
	}, [expenses])
}
