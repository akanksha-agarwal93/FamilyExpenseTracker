import type { ExpenseCategory } from "./ExpenseCategory"

export type DashboardPeriod = "Weekly" | "Monthly"

export interface DashboardChartItem {
	label: string
	total: number
}

export interface DashboardCategoryItem {
	chartPercentage: number
	color: string
	label: string
	percentage: number
	total: number
	value: ExpenseCategory
}
