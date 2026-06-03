import { useNavigate, useParams } from "react-router-dom"
import type { Expense } from "../types/Expense"
import { useExpenses } from "../context/ExpenseContext"
import { ExpenseForm } from "../shared/ExpenseForm"

export function EditExpense() {
	const navigate = useNavigate()
	const { id } = useParams<{ id: string }>()
	const { expenses, editExpense } = useExpenses()
	const expense = expenses.find((e) => e.id === id)

	if (!id || !expense) {
		return <div>Expense not found</div>
	}

	return (
		<ExpenseForm
			initialExpense={expense}
			handleSubmit={(expense: Expense) => {
				editExpense(expense)
				navigate("/expenses")
			}}
		/>
	)
}
