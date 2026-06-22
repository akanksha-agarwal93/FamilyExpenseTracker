import { useNavigate } from "react-router-dom"
import { Button } from "../shared/Button"

export default function Home() {
	const navigate = useNavigate()
	return (
		<div className='flex min-h-[calc(100svh-65px)] items-center justify-center px-5 py-10 text-center sm:px-9'>
			<div className='w-full max-w-[586px]'>
				<h1 className='m-0 text-4xl font-bold tracking-normal text-[#f3f1eb] sm:text-5xl'>
					Family Expense Tracker
				</h1>
				<p className='mt-3 text-lg font-semibold text-[#aaa69e]'>
					Track spending, review totals, and keep the household budget visible.
				</p>
				<div className='mx-auto mt-7 grid max-w-[396px] gap-3 sm:grid-cols-2'>
					<Button
						type='button'
						variant='accent'
						onClick={() => {
							navigate("/add-expense")
						}}
					>
						Add Expense
					</Button>
					<Button
						type='button'
						variant='secondary'
						onClick={() => {
							navigate("/expenses")
						}}
					>
						View Expenses
					</Button>
				</div>
			</div>
		</div>
	)
}
