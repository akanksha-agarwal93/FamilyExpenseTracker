import "./App.css"
import { AddExpense } from "./components/AddExpense"
import { AppLayout } from "./components/AppLayout"
import Dashboard from "./components/Dashboard"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ExpenseProvider } from "./context/ExpenseContext"
import Expenses from "./components/Expenses"
import { EditExpense } from "./components/EditExpense"

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <AppLayout />,
			errorElement: <div>Page Not Found</div>,
			children: [
				{
					index: true,
					element: <Dashboard />,
				},
				{
					path: "add-expense",
					element: <AddExpense />,
				},
				{
					path: "expenses",
					element: <Expenses />,
				},
				{
					path: "edit-expense/:id",
					element: <EditExpense />,
				},
			],
		},
	])
	return (
		<>
			<ExpenseProvider>
				<RouterProvider router={router} />
			</ExpenseProvider>
		</>
	)
}

export default App
