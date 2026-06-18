import type { DashboardCategoryItem, DashboardPeriod } from "../types/Dashboard"
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

const monthYearFormatter = new Intl.DateTimeFormat("en-US", {
	month: "long",
	year: "numeric",
})

const rangeDateFormatter = new Intl.DateTimeFormat("en-US", {
	day: "numeric",
	month: "short",
})

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

export const getDashboardRangeLabel = (
	date: Date,
	period: DashboardPeriod,
) => {
	const today = new Date()

	if (period === "Weekly") {
		const startOfWeek = getStartOfWeek(date)
		const endOfWeek = new Date(startOfWeek)
		endOfWeek.setDate(startOfWeek.getDate() + 6)
		const currentWeekStart = getStartOfWeek(today)

		if (startOfWeek.getTime() === currentWeekStart.getTime()) {
			return "This week"
		}

		return `${rangeDateFormatter.format(startOfWeek)} - ${rangeDateFormatter.format(endOfWeek)}`
	}

	if (period === "Monthly") {
		const isCurrentMonth =
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear()

		return isCurrentMonth ? "This month" : monthYearFormatter.format(date)
	}

	return date.getFullYear() === today.getFullYear()
		? "This year"
		: date.getFullYear().toString()
}

export const getShiftedDashboardDate = (
	date: Date,
	period: DashboardPeriod,
	direction: -1 | 1,
) => {
	if (period === "Weekly") {
		const nextDate = new Date(date)
		nextDate.setDate(date.getDate() + direction * 7)

		return nextDate
	}

	if (period === "Monthly") {
		return new Date(date.getFullYear(), date.getMonth() + direction, 1)
	}

	return new Date(date.getFullYear() + direction, 0, 1)
}

export const getMondayBasedDayIndex = (date: Date) => {
	const day = date.getDay()

	return day === 0 ? 6 : day - 1
}

export const getExpenseDate = (expense: Expense) => new Date(expense.date)

const normalizeCategory = (category: string): ExpenseCategory => {
	const normalizedCategory = category.trim().toLowerCase()
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
