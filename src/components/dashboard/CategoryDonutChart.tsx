import type { DashboardCategoryItem } from "../../types/Dashboard"

interface CategoryDonutChartProps {
	categories: DashboardCategoryItem[]
	periodLabel: string
}

export const CategoryDonutChart = ({
	categories,
	periodLabel,
}: CategoryDonutChartProps) => {
	let offset = 25

	return (
		<section className='rounded-xl border border-[#575852] bg-[#30312e] px-5 py-5 text-left'>
			<h2 className='m-0 text-base font-black leading-tight tracking-normal text-[#f3f1eb]'>
				By category
			</h2>

			<div className='mt-3 flex flex-wrap gap-x-3 gap-y-2'>
				{categories.length === 0 ? (
					<span className='text-xs font-bold text-[#aaa69e]'>
						No spending yet
					</span>
				) : (
					categories.map((category) => (
						<span
							key={category.value}
							className='inline-flex items-center gap-1 text-xs font-bold text-[#c8c4bc]'
						>
							<span
								className='h-2.5 w-2.5 rounded-sm'
								style={{ backgroundColor: category.color }}
							/>
							{category.label} {category.percentage}%
						</span>
					))
				)}
			</div>

			<div className='relative mx-auto mt-6 flex h-[190px] w-[190px] items-center justify-center'>
				<svg
					viewBox='0 0 42 42'
					className='h-full w-full -rotate-90'
					role='img'
					aria-label={`${periodLabel} spending by category`}
				>
					<circle
						cx='21'
						cy='21'
						r='15.915'
						fill='transparent'
						stroke='#3f403c'
						strokeWidth='7'
					/>
					{categories.length === 0 ? (
						<circle
							cx='21'
							cy='21'
							r='15.915'
							fill='transparent'
							stroke='#555650'
							strokeWidth='7'
							strokeDasharray='100 100'
						/>
					) : (
						categories.map((category) => {
							const dashArray = `${category.chartPercentage} ${100 - category.chartPercentage}`
							const dashOffset = offset
							offset -= category.chartPercentage

							return (
								<circle
									key={category.value}
									cx='21'
									cy='21'
									r='15.915'
									fill='transparent'
									stroke={category.color}
									strokeWidth='7'
									strokeDasharray={dashArray}
									strokeDashoffset={dashOffset}
								/>
							)
						})
					)}
				</svg>
			</div>
		</section>
	)
}
