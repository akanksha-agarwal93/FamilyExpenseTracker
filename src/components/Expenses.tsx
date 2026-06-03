import { useNavigate } from "react-router-dom"
import { useExpenses } from "../cotext/ExpenseContext"
import { CiEdit } from "react-icons/ci"
import { MdOutlineDelete } from "react-icons/md"

export default function Expenses() {
	const { expenses, deleteExpense } = useExpenses()
	const navigate = useNavigate()
	console.log("Expenses component rendered with expenses:", expenses)

	return (
		<div>
			<h1>Expenses</h1>
			<p>List of expenses will be displayed here.</p>
			<button
				onClick={() => navigate("/add-expense")}
				className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4'
			>
				Add New Expense
			</button>
			{expenses.map(
				(expense) => (
					console.log("Rendering expense:", expense),
					(
						<div
							key={expense.id}
							className='border p-4 mb-4 bg-gray-300 rounded flex flex-row space-between items-center justify-between'
						>
							<h5 className='text-lg font-bold text-gray-600'>
								{expense.name}
							</h5>
							<p>Amount: ${expense.amount.toFixed(2)}</p>
							<p>Category: {expense.category}</p>
							<p>Date: {new Date(expense.date).toLocaleDateString()}</p>
							<div className='flex space-x-2'>
								<button
									className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
									onClick={() => {
										navigate("/edit-expense/" + expense.id)
									}}
								>
									<CiEdit />
								</button>
								<button
									className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
									onClick={() => {
										deleteExpense(expense.id)
									}}
								>
									<MdOutlineDelete />
								</button>
							</div>
						</div>
					)
				),
			)}
		</div>
	)
}
