import { useNavigate } from "react-router-dom"

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
				<button
					className='h-[45px] rounded-lg bg-[#f4f1e9] px-5 text-base font-bold text-[#242520] transition hover:bg-[#dedacf] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5b0a7]'
					onClick={() => {
						navigate("/add-expense")
					}}
				>
					Add Expense
				</button>
				<button
					className='h-[45px] rounded-lg border border-[#5d5d59] bg-[#292a27] px-5 text-base font-bold text-[#cfcbc3] transition hover:border-[#77746d] hover:bg-[#30312e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5b0a7]'
					onClick={() => {
						navigate("/expenses")
					}}
				>
					View Expenses
				</button>
				</div>
			</div>
		</div>
	)
}
