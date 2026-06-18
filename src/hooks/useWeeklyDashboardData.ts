import { useMemo } from "react"
import { useExpenses } from "../context/ExpenseContextState"
import {
	getDashboardCategories,
	getExpenseDate,
	weekDays,
	getStartOfWeek,
	getEndOfWeek,
	getMondayBasedDayIndex,
} from "../utils/DashboardData"

const WEEKLY_BUDGET = 500

export function useWeeklyDashboardData(referenceDate: Date) {
	const { expenses } = useExpenses()

	return useMemo(() => {
		const startOfWeek = getStartOfWeek(referenceDate)
		const endOfWeek = getEndOfWeek(startOfWeek)
		const weeklyExpenses = expenses.filter((expense) => {
			const expenseDate = getExpenseDate(expense)

			return expenseDate >= startOfWeek && expenseDate < endOfWeek
		})

		const dailyTotals = weekDays.map((day) => ({
			day,
			total: 0,
		}))

		weeklyExpenses.forEach((expense) => {
			const dayIndex = getMondayBasedDayIndex(getExpenseDate(expense))
			dailyTotals[dayIndex].total += expense.amount
		})

		const totalThisWeek = weeklyExpenses.reduce(
			(total, expense) => total + expense.amount,
			0,
		)

		const categories = getDashboardCategories(
			weeklyExpenses,
			totalThisWeek,
		)

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
	}, [expenses, referenceDate])
}
