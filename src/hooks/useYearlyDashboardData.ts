import { useMemo } from "react"
import { useExpenses } from "../context/ExpenseContextState"
import {
	getDashboardCategories,
	getExpenseDate,
} from "../utils/DashboardData"

const YEARLY_BUDGET = 24000

const monthLabels = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
] as const

export function useYearlyDashboardData() {
	const { expenses } = useExpenses()

	return useMemo(() => {
		const currentYear = new Date().getFullYear()
		const daysInYear =
			(new Date(currentYear + 1, 0, 1).getTime() -
				new Date(currentYear, 0, 1).getTime()) /
			(1000 * 60 * 60 * 24)

		const yearlyExpenses = expenses.filter(
			(expense) => getExpenseDate(expense).getFullYear() === currentYear,
		)

		const monthlyTotals = monthLabels.map((label) => ({
			label,
			total: 0,
		}))

		yearlyExpenses.forEach((expense) => {
			const monthIndex = getExpenseDate(expense).getMonth()
			monthlyTotals[monthIndex].total += expense.amount
		})

		const totalThisYear = yearlyExpenses.reduce(
			(total, expense) => total + expense.amount,
			0,
		)
		const categories = getDashboardCategories(
			yearlyExpenses,
			totalThisYear,
		)

		return {
			budgetLeft: YEARLY_BUDGET - totalThisYear,
			categories,
			dailyAverage: totalThisYear / daysInYear,
			monthlyTotals,
			topCategory: categories[0],
			totalThisYear,
			yearlyBudget: YEARLY_BUDGET,
			yearlyExpenses,
		}
	}, [expenses])
}
