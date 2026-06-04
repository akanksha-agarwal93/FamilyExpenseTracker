import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
	FiCoffee,
	FiEdit2,
	FiMonitor,
	FiPlus,
	FiShoppingCart,
	FiTrash2,
	FiTruck,
} from "react-icons/fi"
import { MdOutlineRestaurant } from "react-icons/md"
import { useExpenses } from "../context/ExpenseContextState"
import type { Expense } from "../types/Expense"

const currencyFormatter = new Intl.NumberFormat("en-US", {
	currency: "EUR",
	style: "currency",
})

const dateFormatter = new Intl.DateTimeFormat("en-US", {
	day: "numeric",
	month: "short",
})

function getExpenseDate(expense: Expense) {
	return new Date(expense.date)
}

function isSameDay(firstDate: Date, secondDate: Date) {
	return firstDate.toDateString() === secondDate.toDateString()
}

function getDateGroupLabel(date: Date) {
	const today = new Date()
	const yesterday = new Date()
	yesterday.setDate(today.getDate() - 1)

	if (isSameDay(date, today)) return "TODAY"
	if (isSameDay(date, yesterday)) return "YESTERDAY"

	return dateFormatter.format(date).toUpperCase()
}

function getExpenseIcon(category: string) {
	const normalizedCategory = category.toLowerCase()

	if (normalizedCategory.includes("transport")) return <FiTruck />
	if (normalizedCategory.includes("dining")) return <MdOutlineRestaurant />
	if (normalizedCategory.includes("entertainment")) return <FiMonitor />
	if (normalizedCategory.includes("coffee")) return <FiCoffee />

	return <FiShoppingCart />
}

export default function Expenses() {
	const { expenses, deleteExpense } = useExpenses()
	const navigate = useNavigate()

	const sortedExpenses = useMemo(
		() =>
			[...expenses].sort(
				(firstExpense, secondExpense) =>
					getExpenseDate(secondExpense).getTime() -
					getExpenseDate(firstExpense).getTime(),
			),
		[expenses],
	)

	const totalAmount = expenses.reduce(
		(total, expense) => total + expense.amount,
		0,
	)
	const currentMonth = new Date().getMonth()
	const currentYear = new Date().getFullYear()
	const thisMonthAmount = expenses
		.filter((expense) => {
			const date = getExpenseDate(expense)
			return date.getMonth() === currentMonth && date.getFullYear() === currentYear
		})
		.reduce((total, expense) => total + expense.amount, 0)

	const groupedExpenses = sortedExpenses.reduce<Record<string, Expense[]>>(
		(groups, expense) => {
			const label = getDateGroupLabel(getExpenseDate(expense))
			return {
				...groups,
				[label]: [...(groups[label] || []), expense],
			}
		},
		{},
	)

	return (
		<div className='min-h-svh bg-[#1f1f1d] px-5 py-5 text-left text-[#f1eee7] sm:px-9'>
			<div className='mx-auto w-full max-w-[586px]'>
				<header className='mb-7 flex items-center justify-between gap-4'>
					<h1 className='m-0 text-2xl font-bold tracking-normal text-[#f3f1eb]'>
						Expenses
					</h1>
					<button
						onClick={() => navigate("/add-expense")}
						className='inline-flex h-[45px] items-center gap-2 rounded-lg bg-[#3f3f3b] px-5 text-base font-bold text-[#f3f1eb] transition hover:bg-[#4b4b46] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5b0a7]'
					>
						<FiPlus className='text-lg' />
						Add new
					</button>
				</header>

				<section className='mb-5 grid gap-3 sm:grid-cols-3'>
					<div className='rounded-lg bg-[#282925] px-4 py-4'>
						<p className='text-sm font-semibold text-[#aaa69e]'>Total</p>
						<p className='mt-1 text-2xl font-bold leading-tight text-[#f3f1eb]'>
							{currencyFormatter.format(totalAmount)}
						</p>
					</div>
					<div className='rounded-lg bg-[#282925] px-4 py-4'>
						<p className='text-sm font-semibold text-[#aaa69e]'>This month</p>
						<p className='mt-1 text-2xl font-bold leading-tight text-[#f3f1eb]'>
							{currencyFormatter.format(thisMonthAmount)}
						</p>
					</div>
					<div className='rounded-lg bg-[#282925] px-4 py-4'>
						<p className='text-sm font-semibold text-[#aaa69e]'>Entries</p>
						<p className='mt-1 text-2xl font-bold leading-tight text-[#f3f1eb]'>
							{expenses.length}
						</p>
					</div>
				</section>

				<section className='overflow-hidden rounded-xl border border-[#4a4a46] bg-[#2f302e]'>
					{sortedExpenses.length === 0 ? (
						<div className='px-6 py-12 text-center'>
							<p className='text-lg font-bold text-[#f3f1eb]'>No expenses yet</p>
							<p className='mt-1 text-base font-semibold text-[#aaa69e]'>
								Add your first expense to start tracking.
							</p>
						</div>
					) : (
						Object.entries(groupedExpenses).map(([label, group]) => (
							<div key={label}>
								<div className='border-b border-[#444541] bg-[#252622] px-5 py-3 text-sm font-bold tracking-wide text-[#aaa69e]'>
									{label}
								</div>

								{group.map((expense) => (
									<div
										key={expense.id}
										className='grid grid-cols-[44px_1fr_auto] items-center gap-3 border-b border-[#444541] px-5 py-3 last:border-b-0 sm:grid-cols-[44px_1fr_auto_auto]'
									>
										<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#f4f1e9] text-xl text-[#34342f]'>
											{getExpenseIcon(expense.category)}
										</div>

										<div className='min-w-0'>
											<h2 className='m-0 truncate text-base font-bold leading-tight tracking-normal text-[#f3f1eb]'>
												{expense.name || "Untitled expense"}
											</h2>
											<p className='mt-0.5 truncate text-base font-semibold leading-tight text-[#aaa69e]'>
												{expense.category} ·{" "}
												{dateFormatter.format(getExpenseDate(expense))}
											</p>
										</div>

										<p className='text-base font-bold text-[#f3f1eb]'>
											{currencyFormatter.format(expense.amount)}
										</p>

										<div className='col-span-3 flex justify-end gap-1.5 sm:col-span-1'>
											<button
												aria-label={`Edit ${expense.name || "expense"}`}
												onClick={() => navigate("/edit-expense/" + expense.id)}
												className='flex h-10 w-10 items-center justify-center rounded-lg border border-[#66645e] bg-[#30312e] text-[#d2cec6] transition hover:border-[#817d75] hover:bg-[#383934] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5b0a7]'
											>
												<FiEdit2 />
											</button>
											<button
												aria-label={`Delete ${expense.name || "expense"}`}
												onClick={() => deleteExpense(expense.id)}
												className='flex h-10 w-10 items-center justify-center rounded-lg border border-[#66645e] bg-[#30312e] text-[#d2cec6] transition hover:border-[#817d75] hover:bg-[#383934] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5b0a7]'
											>
												<FiTrash2 />
											</button>
										</div>
									</div>
								))}
							</div>
						))
					)}
				</section>

				<footer className='mt-8 text-center text-base font-semibold text-[#aaa69e]'>
					{expenses.length} {expenses.length === 1 ? "expense" : "expenses"} ·{" "}
					{currencyFormatter.format(totalAmount)} total
				</footer>
			</div>
		</div>
	)
}
