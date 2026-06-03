import { useNavigate } from "react-router-dom"
import type { Expense } from "../types/Expense"
import { useState } from "react"

interface ExpenseFormProps {
	initialExpense?: Expense
	handleSubmit: (expense: Expense) => void
}

export function ExpenseForm({
	initialExpense,
	handleSubmit,
}: ExpenseFormProps) {
	const navigate = useNavigate()
	const expenseId = initialExpense?.id || crypto.randomUUID()
	const [expenseName, setExpenseName] = useState(initialExpense?.name || "")
	const [expenseCategory, setExpenseCategory] = useState(
		initialExpense?.category || "",
	)
	const [expenseAmount, setExpenseAmount] = useState(
		initialExpense?.amount.toString() || "",
	)

	const handleFormSubmit = async () => {
		const newExpense: Expense = {
			id: expenseId,
			name: expenseName,
			category: expenseCategory,
			amount: parseFloat(expenseAmount) || 0,
			date: new Date().toISOString(),
		}
		console.log("Submitting new expense:", newExpense)
		handleSubmit(newExpense)
	}
	return (
		<>
			<div>
				<h1>Expense Form</h1>
				<div className='flex-1 flex-row'>
					<label className='mr-2'>Expense Name:</label>
					<input
						type='text'
						id='expense-name'
						className='bg-gray-100'
						value={expenseName}
						onChange={(e) => setExpenseName(e.target.value)}
					/>
				</div>
				<div className='flex-1 flex-row'>
					<label className='mr-2 mt-5'>Expense Category:</label>
					<input
						type='text'
						id='expense-category'
						className='bg-gray-100'
						value={expenseCategory}
						onChange={(e) => setExpenseCategory(e.target.value)}
					/>
				</div>
				<div className='flex-1 flex-row'>
					<label className='mr-2 mt-5'>Expense amount:</label>
					<input
						type='number'
						id='expense-amount'
						className='bg-gray-100'
						value={expenseAmount}
						onChange={(e) => setExpenseAmount(e.target.value)}
					/>
				</div>
				<div>
					<div className='flex items-center justify-content bg-blue-100 mt-5'>
						<button
							onClick={handleFormSubmit}
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
						>
							Submit Expense
						</button>
					</div>
					<button
						onClick={() => {
							navigate("/")
						}}
						className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2 mx-2'
					>
						Cancel
					</button>
				</div>
			</div>
		</>
	)
}
