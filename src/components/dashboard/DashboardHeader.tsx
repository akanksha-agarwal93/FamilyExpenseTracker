import { FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import type { DashboardPeriod } from "../../types/Dashboard"

const periods = ["Weekly", "Monthly", "Yearly"] as const

interface DashboardHeaderProps {
	onNextPeriod: () => void
	selectedPeriod: DashboardPeriod
	rangeLabel: string
	onPreviousPeriod: () => void
	onPeriodChange: (period: DashboardPeriod) => void
}

export const DashboardHeader = ({
	onNextPeriod,
	onPeriodChange,
	onPreviousPeriod,
	rangeLabel,
	selectedPeriod,
}: DashboardHeaderProps) => {
	const navigate = useNavigate()

	return (
		<header className='mb-5'>
			<div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
				<div className='flex items-center justify-between gap-4'>
					<h1 className='m-0 text-2xl font-bold tracking-normal text-[#f3f1eb]'>
						Dashboard
					</h1>
					<button
						type='button'
						aria-label='Add expense'
						onClick={() => navigate("/add-expense")}
						className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#f4f1e9] text-lg text-[#242520] transition hover:bg-[#dedacf] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5b0a7] sm:hidden'
					>
						<FiPlus />
					</button>
				</div>

				<div className='flex items-center justify-between gap-3'>
					<div
						className='grid grid-cols-3 gap-1 rounded-lg border border-[#555650] bg-[#242522] p-1'
						aria-label='Dashboard period'
					>
						{periods.map((period) => (
							<button
								key={period}
								type='button'
								onClick={() => onPeriodChange(period)}
								className={[
									"h-9 rounded-md px-4 text-sm font-bold transition",
									period === selectedPeriod
										? "bg-[#30312e] text-[#f3f1eb]"
										: "text-[#c8c4bc] hover:bg-[#2b2c29] hover:text-[#f3f1eb]",
								].join(" ")}
							>
								{period}
							</button>
						))}
					</div>
				</div>
			</div>

			<div className='mt-6 flex items-center justify-center gap-8 sm:gap-12'>
				<button
					type='button'
					aria-label='Previous period'
					onClick={onPreviousPeriod}
					className='flex h-11 w-11 items-center justify-center rounded-lg border border-[#5d5d59] bg-[#242522] text-xl text-[#f3f1eb] transition hover:bg-[#30312e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5b0a7]'
				>
					<FiChevronLeft />
				</button>

				<p className='min-w-[140px] text-center text-lg font-black text-[#f3f1eb]'>
					{rangeLabel}
				</p>

				<button
					type='button'
					aria-label='Next period'
					onClick={onNextPeriod}
					className='flex h-11 w-11 items-center justify-center rounded-lg border border-[#5d5d59] bg-[#242522] text-xl text-[#f3f1eb] transition hover:bg-[#30312e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5b0a7]'
				>
					<FiChevronRight />
				</button>
			</div>
		</header>
	)
}
