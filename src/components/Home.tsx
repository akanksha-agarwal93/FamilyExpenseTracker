import { useNavigate } from "react-router-dom"

export default function Home() {
	const navigate = useNavigate()
	return (
		<div>
			<h1>Family Expense Tracker</h1>
			<p>Welcome to the Family Expense Tracker!</p>
			<div className='flex flex-col gap-4 mt-5'>
				<button
					className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
					onClick={() => {
						navigate("/add-expense")
					}}
				>
					Add Expense
				</button>
				<button
					className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
					onClick={() => {
						navigate("/expenses")
					}}
				>
					View Expenses
				</button>
			</div>
		</div>
	)
}
