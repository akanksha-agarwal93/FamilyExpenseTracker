import { useExpenses } from "../cotext/ExpenseContext";

export default function Expenses() {
    const expenses = useExpenses();
    console.log("Expenses component rendered with expenses:", expenses);

    return (
        <div>
            <h1>Expenses</h1>
            <p>List of expenses will be displayed here.</p>
            {expenses.expenses.map((expense) => (
                <div key={expense.id} className="border p-4 mb-4 bg-gray-100 rounded">
                    <h3>{expense.name}</h3>
                    <p>Amount: ${expense.amount.toFixed(2)}</p>
                    <p>Category: {expense.category}</p>
                    <p>Date: {expense.date.toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    )   
}