import { useNavigate, useParams } from "react-router-dom"
import type { Expense } from "../types/Expense"
import { useState } from "react"
import { useExpenses } from "../context/ExpenseContext"

export function EditExpense() {
	const navigate = useNavigate()
	const { id } = useParams<{ id: string }>()
	const { expenses, editExpense } = useExpenses()
	const expense = expenses.find((e) => e.id === id)

	if (!id || !expense) {
		return <div>Expense not found</div>
	}

	const [expenseName, setExpenseName] = useState(expense.name)
	const [expenseCategory, setExpenseCategory] = useState(expense.category)
	const [expenseAmount, setExpenseAmount] = useState(expense.amount.toString())

	const handleSubmit = async () => {
		const newExpense: Expense = {
			id: id,
			name: expenseName,
			category: expenseCategory,
			amount: parseFloat(expenseAmount) || 0,
			date: new Date().toISOString(),
		}
		console.log("Submitting new expense:", newExpense)
		editExpense(newExpense)
		navigate("/expenses")
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
							onClick={handleSubmit}
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
