import { currencyFormatter } from "../../utils/Formatters"

interface DailyTotal {
	day: string
	total: number
}

interface WeeklySpendingChartProps {
	dailyTotals: DailyTotal[]
}

const chartTicks = [90, 80, 70, 60, 50, 40, 30, 20, 10, 0]

export function WeeklySpendingChart({ dailyTotals }: WeeklySpendingChartProps) {
	const maxTotal = Math.max(...dailyTotals.map((day) => day.total), 90)
	const maxTick = Math.max(90, Math.ceil(maxTotal / 10) * 10)
	const ticks = chartTicks.map((tick) => Math.round((tick / 90) * maxTick))

	return (
		<section className='rounded-xl border border-[#575852] bg-[#30312e] px-5 py-5 text-left'>
			<div className='mb-4 flex items-start justify-between gap-3'>
				<div>
					<h2 className='m-0 text-base font-black leading-tight tracking-normal text-[#f3f1eb]'>
						Spending this Week
					</h2>
					<div className='mt-2 flex items-center gap-2 text-xs font-bold text-[#c8c4bc]'>
						<span className='h-2.5 w-2.5 rounded-sm bg-[#a8a0e8]' />
						Spending
					</div>
				</div>
			</div>

			<div className='grid min-h-[220px] grid-cols-[34px_1fr] gap-3'>
				<div className='flex flex-col justify-between pb-7 text-right text-xs font-semibold text-[#8f8d87]'>
					{ticks.map((tick) => (
						<span key={tick}>{currencyFormatter.format(tick)}</span>
					))}
				</div>

				<div className='relative'>
					<div className='absolute inset-x-0 top-0 bottom-7 flex flex-col justify-between'>
						{ticks.map((tick) => (
							<span key={tick} className='border-t border-[#41423d]' />
						))}
					</div>

					<div className='relative z-10 grid h-full grid-cols-7 items-end gap-3 pb-7'>
						{dailyTotals.map((day) => {
							const height = maxTick > 0 ? (day.total / maxTick) * 100 : 0

							return (
								<div
									key={day.day}
									className='relative flex h-full min-w-0 flex-col items-center justify-end gap-2'
								>
									<div
										className='w-full max-w-[72px] rounded-t-md bg-[#a8a0e8] transition'
										style={{ height: `${Math.max(height, day.total > 0 ? 5 : 0)}%` }}
										title={`${day.day}: ${currencyFormatter.format(day.total)}`}
									/>
									<span className='absolute bottom-0 text-xs font-semibold text-[#96938d]'>
										{day.day}
									</span>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}
