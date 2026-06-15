import { useMemo } from "react"
import { useExpenses } from "../context/ExpenseContextState"
import {
	getDashboardCategories,
	getExpenseDate,
} from "../utils/DashboardData"

const MONTHLY_BUDGET = 2000

export function useMonthlyDashboardData() {
	const { expenses } = useExpenses()

	return useMemo(() => {
		const today = new Date()
		const currentMonth = today.getMonth()
		const currentYear = today.getFullYear()
		const daysInMonth = new Date(
			currentYear,
			currentMonth + 1,
			0,
		).getDate()
		const monthRanges = [
			{ label: "1-7", start: 1, end: 7 },
			{ label: "8-14", start: 8, end: 14 },
			{ label: "15-21", start: 15, end: 21 },
			{ label: "22-28", start: 22, end: 28 },
			{ label: `29-${daysInMonth}`, start: 29, end: daysInMonth },
		]

		const monthlyExpenses = expenses.filter((expense) => {
			const expenseDate = getExpenseDate(expense)

			return (
				expenseDate.getMonth() === currentMonth &&
				expenseDate.getFullYear() === currentYear
			)
		})

		const rangeTotals = monthRanges.map((range) => ({
			label: range.label,
			total: 0,
		}))

		monthlyExpenses.forEach((expense) => {
			const dayOfMonth = getExpenseDate(expense).getDate()
			const rangeIndex = monthRanges.findIndex(
				(range) => dayOfMonth >= range.start && dayOfMonth <= range.end,
			)

			if (rangeIndex >= 0) {
				rangeTotals[rangeIndex].total += expense.amount
			}
		})

		const totalThisMonth = monthlyExpenses.reduce(
			(total, expense) => total + expense.amount,
			0,
		)
		const categories = getDashboardCategories(
			monthlyExpenses,
			totalThisMonth,
		)

		return {
			budgetLeft: MONTHLY_BUDGET - totalThisMonth,
			categories,
			dailyAverage: totalThisMonth / daysInMonth,
			monthlyBudget: MONTHLY_BUDGET,
			monthlyExpenses,
			rangeTotals,
			topCategory: categories[0],
			totalThisMonth,
		}
	}, [expenses])
}
