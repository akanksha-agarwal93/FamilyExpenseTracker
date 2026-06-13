import { CategoryDonutChart } from "./dashboard/CategoryDonutChart"
import { DashboardHeader } from "./dashboard/DashboardHeader"
import { DashboardMetricCard } from "./dashboard/DashboardMetricCard"
import { TopCategoriesList } from "./dashboard/TopCategoriesList"
import { WeeklySpendingChart } from "./dashboard/WeeklySpendingChart"
import { useWeeklyDashboardData } from "../hooks/useWeeklyDashboardData"
import { currencyFormatter } from "../utils/Formatters"

const formatWholeCurrency = (amount: number) =>
	currencyFormatter.format(Math.round(amount))

export default function Dashboard() {
	const {
		budgetLeft,
		categories,
		dailyAverage,
		dailyTotals,
		topCategory,
		totalThisWeek,
		weeklyBudget,
		weeklyExpenses,
	} = useWeeklyDashboardData()

	const budgetDetail =
		budgetLeft >= 0
			? `of ${formatWholeCurrency(weeklyBudget)} weekly`
			: `${formatWholeCurrency(Math.abs(budgetLeft))} over budget`

	return (
		<div className='min-h-[calc(100svh-65px)] px-5 py-6 text-left text-[#f1eee7] sm:px-9'>
			<div className='mx-auto w-full max-w-[1080px]'>
				<DashboardHeader />

				<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
					<DashboardMetricCard
						label='This week'
						value={formatWholeCurrency(totalThisWeek)}
						detail={`${weeklyExpenses.length} ${weeklyExpenses.length === 1 ? "expense" : "expenses"} tracked`}
						detailTone='negative'
					/>
					<DashboardMetricCard
						label='Daily avg'
						value={formatWholeCurrency(dailyAverage)}
						detail='7 days tracked'
						detailTone='muted'
					/>
					<DashboardMetricCard
						label='Top category'
						value={topCategory?.label || "None"}
						detail={
							topCategory
								? `${formatWholeCurrency(topCategory.total)} this week`
								: "No spending yet"
						}
						detailTone='accent'
					/>
					<DashboardMetricCard
						label='Budget left'
						value={formatWholeCurrency(budgetLeft)}
						detail={budgetDetail}
						detailTone={budgetLeft >= 0 ? "positive" : "negative"}
					/>
				</div>

				<div className='mt-5'>
					<WeeklySpendingChart dailyTotals={dailyTotals} />
				</div>

				<div className='mt-5 grid gap-5 lg:grid-cols-[2fr_1fr]'>
					<CategoryDonutChart categories={categories} />
					<TopCategoriesList categories={categories} />
				</div>
			</div>
		</div>
	)
}
