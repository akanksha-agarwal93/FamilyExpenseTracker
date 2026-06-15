import type { DashboardCategoryItem } from "../../types/Dashboard"
import { currencyFormatter } from "../../utils/Formatters"
import { getExpenseIcon } from "../../utils/ExpenseCategoryIcon"

interface TopCategoriesListProps {
	categories: DashboardCategoryItem[]
	periodLabel: string
}

export function TopCategoriesList({
	categories,
	periodLabel,
}: TopCategoriesListProps) {
	const maxTotal = Math.max(...categories.map((category) => category.total), 1)

	return (
		<section className='rounded-xl border border-[#575852] bg-[#30312e] px-5 py-5 text-left'>
			<h2 className='m-0 text-base font-black leading-tight tracking-normal text-[#f3f1eb]'>
				Top categories
			</h2>

			<div className='mt-4 space-y-4'>
				{categories.length === 0 ? (
					<div className='rounded-lg border border-[#4b4c47] bg-[#292a27] px-4 py-6 text-center'>
						<p className='text-sm font-bold text-[#f3f1eb]'>No spending yet</p>
						<p className='mt-1 text-xs font-semibold text-[#aaa69e]'>
							Add expenses {periodLabel} to see category trends.
						</p>
					</div>
				) : (
					categories.slice(0, 5).map((category) => (
						<div
							key={category.value}
							className='grid grid-cols-[34px_1fr_auto] items-center gap-3'
						>
							<div className='flex h-8 w-8 items-center justify-center rounded-lg bg-[#f4f1e9] text-base text-[#34342f]'>
								{getExpenseIcon(category.value)}
							</div>

							<div className='min-w-0'>
								<div className='flex items-center gap-1'>
									<span className='truncate text-sm font-black leading-tight text-[#f3f1eb]'>
										{category.label}
									</span>
									<span className='shrink-0 text-xs font-bold text-[#aaa69e]'>
										{category.percentage}%
									</span>
								</div>
								<div className='mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#474842]'>
									<div
										className='h-full rounded-full'
										style={{
											backgroundColor: category.color,
											width: `${Math.max((category.total / maxTotal) * 100, 4)}%`,
										}}
									/>
								</div>
							</div>

							<p className='text-sm font-black text-[#f3f1eb]'>
								{currencyFormatter.format(category.total)}
							</p>
						</div>
					))
				)}
			</div>
		</section>
	)
}
