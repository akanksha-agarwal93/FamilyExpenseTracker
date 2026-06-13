interface CategoryChartItem {
	color: string
	label: string
	percentage: number
	total: number
	value: string
}

interface CategoryDonutChartProps {
	categories: CategoryChartItem[]
}

export const CategoryDonutChart = ({ categories }: CategoryDonutChartProps) => {
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
					aria-label='Weekly spending by category'
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
							const dashArray = `${category.percentage} ${100 - category.percentage}`
							const dashOffset = offset
							offset -= category.percentage

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
