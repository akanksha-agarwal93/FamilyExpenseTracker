import "./App.css"
import { AddExpense } from "./components/AddExpense"
import { AppLayout } from "./components/AppLayout"
import { Auth } from "./components/Auth"
import Dashboard from "./components/Dashboard"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { ExpenseProvider } from "./context/ExpenseContext"
import Expenses from "./components/Expenses"
import { EditExpense } from "./components/EditExpense"
import { hasAuthSession } from "./utils/AuthSession"

function ProtectedAppLayout() {
	if (!hasAuthSession()) {
		return <Navigate to='/' replace />
	}

	return (
		<ExpenseProvider>
			<AppLayout />
		</ExpenseProvider>
	)
}

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Auth />,
			errorElement: <div>Page Not Found</div>,
		},
		{
			path: "/",
			element: <ProtectedAppLayout />,
			children: [
				{
					path: "dashboard",
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
			<RouterProvider router={router} />
		</>
	)
}

export default App
