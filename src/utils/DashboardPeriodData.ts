import type { useMonthlyDashboardData } from "../hooks/useMonthlyDashboardData"
import type { useWeeklyDashboardData } from "../hooks/useWeeklyDashboardData"
import type { useYearlyDashboardData } from "../hooks/useYearlyDashboardData"
import type {
	DashboardCategoryItem,
	DashboardChartItem,
	DashboardPeriod,
} from "../types/Dashboard"

type WeeklyDashboardData = ReturnType<typeof useWeeklyDashboardData>
type MonthlyDashboardData = ReturnType<typeof useMonthlyDashboardData>
type YearlyDashboardData = ReturnType<typeof useYearlyDashboardData>

interface DashboardPeriodDataParams {
	monthlyData: MonthlyDashboardData
	selectedPeriod: DashboardPeriod
	weeklyData: WeeklyDashboardData
	yearlyData: YearlyDashboardData
}

export interface DashboardPeriodData {
	budget: number
	budgetLeft: number
	budgetPeriod: string
	categories: DashboardCategoryItem[]
	chartData: DashboardChartItem[]
	chartTitle: string
	dailyAverage: number
	dailyAverageDetail: string
	expenseCount: number
	periodLabel: string
	topCategory?: DashboardCategoryItem
	total: number
	totalLabel: string
}

const getDaysInCurrentMonth = () => {
	const today = new Date()

	return new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
}

const getDaysInCurrentYear = () => {
	const currentYear = new Date().getFullYear()

	return (
		(new Date(currentYear + 1, 0, 1).getTime() -
			new Date(currentYear, 0, 1).getTime()) /
		(1000 * 60 * 60 * 24)
	)
}

export const getDashboardPeriodData = ({
	monthlyData,
	selectedPeriod,
	weeklyData,
	yearlyData,
}: DashboardPeriodDataParams): DashboardPeriodData => {
	const periodData: Record<DashboardPeriod, DashboardPeriodData> = {
		Weekly: {
			budget: weeklyData.weeklyBudget,
			budgetLeft: weeklyData.budgetLeft,
			budgetPeriod: "weekly",
			categories: weeklyData.categories,
			chartData: weeklyData.dailyTotals.map((day) => ({
				label: day.day,
				total: day.total,
			})),
			chartTitle: "Spending this Week",
			dailyAverage: weeklyData.dailyAverage,
			dailyAverageDetail: "7 days tracked",
			expenseCount: weeklyData.weeklyExpenses.length,
			periodLabel: "this week",
			topCategory: weeklyData.topCategory,
			total: weeklyData.totalThisWeek,
			totalLabel: "This week",
		},
		Monthly: {
			budget: monthlyData.monthlyBudget,
			budgetLeft: monthlyData.budgetLeft,
			budgetPeriod: "monthly",
			categories: monthlyData.categories,
			chartData: monthlyData.rangeTotals,
			chartTitle: "Spending this Month",
			dailyAverage: monthlyData.dailyAverage,
			dailyAverageDetail: `${getDaysInCurrentMonth()} days in month`,
			expenseCount: monthlyData.monthlyExpenses.length,
			periodLabel: "this month",
			topCategory: monthlyData.topCategory,
			total: monthlyData.totalThisMonth,
			totalLabel: "This month",
		},
		Yearly: {
			budget: yearlyData.yearlyBudget,
			budgetLeft: yearlyData.budgetLeft,
			budgetPeriod: "yearly",
			categories: yearlyData.categories,
			chartData: yearlyData.monthlyTotals,
			chartTitle: "Spending this Year",
			dailyAverage: yearlyData.dailyAverage,
			dailyAverageDetail: `${getDaysInCurrentYear()} days in year`,
			expenseCount: yearlyData.yearlyExpenses.length,
			periodLabel: "this year",
			topCategory: yearlyData.topCategory,
			total: yearlyData.totalThisYear,
			totalLabel: "This year",
		},
	}

	return periodData[selectedPeriod]
}
