import { useNavigate } from "react-router-dom"
import { useExpenses } from "../context/ExpenseContextState"
import { ExpenseForm } from "../shared/ExpenseForm"

export function AddExpense() {
	const navigate = useNavigate()
	const { addExpense } = useExpenses()

	return (
		<ExpenseForm
			handleSubmit={(expense) => {
				addExpense(expense)
				navigate("/expenses")
			}}
		/>
	)
}
