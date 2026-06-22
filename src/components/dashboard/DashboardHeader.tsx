import { FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import type { DashboardPeriod } from "../../types/Dashboard"
import { Button } from "../../shared/Button"

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
					<Button
						type='button'
						variant='accent'
						size='icon'
						aria-label='Add expense'
						onClick={() => navigate("/add-expense")}
						className='text-lg sm:hidden'
					>
						<FiPlus />
					</Button>
				</div>

				<div className='flex items-center justify-between gap-3'>
					<div
						className='grid grid-cols-3 gap-1 rounded-lg border border-[#555650] bg-[#242522] p-1'
						aria-label='Dashboard period'
					>
						{periods.map((period) => (
							<Button
								key={period}
								type='button'
								variant='ghost'
								size='sm'
								onClick={() => onPeriodChange(period)}
								className={[
									"h-9 rounded-md border-transparent px-4",
									period === selectedPeriod
										? "bg-[#30312e] text-[#f3f1eb]"
										: "text-[#c8c4bc] hover:bg-[#2b2c29] hover:text-[#f3f1eb]",
								].join(" ")}
							>
								{period}
							</Button>
						))}
					</div>
				</div>
			</div>

			<div className='mt-6 flex items-center justify-center gap-8 sm:gap-12'>
				<Button
					type='button'
					variant='secondary'
					size='icon'
					aria-label='Previous period'
					onClick={onPreviousPeriod}
					className='h-11 w-11 bg-[#242522] text-xl text-[#f3f1eb]'
				>
					<FiChevronLeft />
				</Button>

				<p className='min-w-[140px] text-center text-lg font-black text-[#f3f1eb]'>
					{rangeLabel}
				</p>

				<Button
					type='button'
					variant='secondary'
					size='icon'
					aria-label='Next period'
					onClick={onNextPeriod}
					className='h-11 w-11 bg-[#242522] text-xl text-[#f3f1eb]'
				>
					<FiChevronRight />
				</Button>
			</div>
		</header>
	)
}
