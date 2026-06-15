import { useState } from "react"
import { CategoryDonutChart } from "./dashboard/CategoryDonutChart"
import { DashboardHeader } from "./dashboard/DashboardHeader"
import { DashboardMetricCard } from "./dashboard/DashboardMetricCard"
import { TopCategoriesList } from "./dashboard/TopCategoriesList"
import { SpendingChart } from "./dashboard/SpendingChart"
import { useMonthlyDashboardData } from "../hooks/useMonthlyDashboardData"
import { useWeeklyDashboardData } from "../hooks/useWeeklyDashboardData"
import type { DashboardPeriod } from "../types/Dashboard"
import { currencyFormatter } from "../utils/Formatters"

const formatWholeCurrency = (amount: number) =>
	currencyFormatter.format(Math.round(amount))

export default function Dashboard() {
	const [selectedPeriod, setSelectedPeriod] =
		useState<DashboardPeriod>("Weekly")
	const weeklyData = useWeeklyDashboardData()
	const monthlyData = useMonthlyDashboardData()
	const isWeekly = selectedPeriod === "Weekly"

	const dashboardData = isWeekly
		? {
				budget: weeklyData.weeklyBudget,
				budgetLeft: weeklyData.budgetLeft,
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
			}
		: {
				budget: monthlyData.monthlyBudget,
				budgetLeft: monthlyData.budgetLeft,
				categories: monthlyData.categories,
				chartData: monthlyData.rangeTotals,
				chartTitle: "Spending this Month",
				dailyAverage: monthlyData.dailyAverage,
				dailyAverageDetail: `${new Date(
					new Date().getFullYear(),
					new Date().getMonth() + 1,
					0,
				).getDate()} days in month`,
				expenseCount: monthlyData.monthlyExpenses.length,
				periodLabel: "this month",
				topCategory: monthlyData.topCategory,
				total: monthlyData.totalThisMonth,
				totalLabel: "This month",
			}

	const budgetDetail =
		dashboardData.budgetLeft >= 0
			? `of ${formatWholeCurrency(dashboardData.budget)} ${isWeekly ? "weekly" : "monthly"}`
			: `${formatWholeCurrency(Math.abs(dashboardData.budgetLeft))} over budget`

	return (
		<div className='min-h-[calc(100svh-65px)] px-5 py-6 text-left text-[#f1eee7] sm:px-9'>
			<div className='mx-auto w-full max-w-[1080px]'>
				<DashboardHeader
					selectedPeriod={selectedPeriod}
					onPeriodChange={setSelectedPeriod}
				/>

				<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
					<DashboardMetricCard
						label={dashboardData.totalLabel}
						value={formatWholeCurrency(dashboardData.total)}
						detail={`${dashboardData.expenseCount} ${dashboardData.expenseCount === 1 ? "expense" : "expenses"} tracked`}
						detailTone='negative'
					/>
					<DashboardMetricCard
						label='Daily avg'
						value={formatWholeCurrency(dashboardData.dailyAverage)}
						detail={dashboardData.dailyAverageDetail}
						detailTone='muted'
					/>
					<DashboardMetricCard
						label='Top category'
						value={dashboardData.topCategory?.label || "None"}
						detail={
							dashboardData.topCategory
								? `${formatWholeCurrency(dashboardData.topCategory.total)} ${dashboardData.periodLabel}`
								: "No spending yet"
						}
						detailTone='accent'
					/>
					<DashboardMetricCard
						label='Budget left'
						value={formatWholeCurrency(dashboardData.budgetLeft)}
						detail={budgetDetail}
						detailTone={
							dashboardData.budgetLeft >= 0 ? "positive" : "negative"
						}
					/>
				</div>

				<div className='mt-5'>
					<SpendingChart
						data={dashboardData.chartData}
						title={dashboardData.chartTitle}
					/>
				</div>

				<div className='mt-5 grid gap-5 lg:grid-cols-[2fr_1fr]'>
					<CategoryDonutChart
						categories={dashboardData.categories}
						periodLabel={selectedPeriod}
					/>
					<TopCategoriesList
						categories={dashboardData.categories}
						periodLabel={dashboardData.periodLabel}
					/>
				</div>
			</div>
		</div>
	)
}
