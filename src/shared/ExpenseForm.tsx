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
	const [expenseDate, setExpenseDate] = useState(
		initialExpense?.date ? initialExpense.date.split("T")[0] : "",
	)
	const [expenseAmount, setExpenseAmount] = useState(
		initialExpense?.amount.toString() || "",
	)

	const handleFormSubmit = () => {
		const newExpense: Expense = {
			id: expenseId,
			name: expenseName,
			category: expenseCategory,
			amount: parseFloat(expenseAmount) || 0,
			date: new Date(expenseDate).toISOString(),
		}

		handleSubmit(newExpense)
	}

	return (
		<div className='flex min-h-[calc(100svh-65px)] w-full items-start justify-center px-4 py-6 text-left sm:py-10'>
			<form
				onSubmit={(event) => {
					event.preventDefault()
					handleFormSubmit()
				}}
				className='w-full max-w-[576px] overflow-hidden rounded-xl border border-[#4a4a46] bg-[#2f302e] text-[#e8e6df] shadow-[0_22px_60px_rgba(0,0,0,0.24)]'
			>
				<div className='border-b border-[#444541] bg-[#222320] px-7 py-6 sm:px-8'>
					<h1 className='m-0 text-2xl font-bold leading-tight tracking-normal text-[#f3f1eb]'>
						{initialExpense ? "Edit expense" : "Add expense"}
					</h1>
					<p className='mt-1 text-base font-semibold text-[#a7a49d]'>
						Fill in the details below
					</p>
				</div>

				<div className='space-y-5 px-7 py-7 sm:px-8'>
					<div>
						<label
							htmlFor='expense-name'
							className='mb-2 block text-base font-semibold text-[#c5c2bb]'
						>
							Expense name
						</label>
						<input
							type='text'
							id='expense-name'
							placeholder='e.g Weekly groceries'
							className='h-[43px] w-full rounded-md border border-[#53534f] bg-[#2e2f2d] px-4 text-lg font-semibold text-[#f2efe8] outline-none transition placeholder:text-[#7e7d79] focus:border-[#85827b] focus:ring-2 focus:ring-[#85827b]/20'
							value={expenseName}
							onChange={(e) => setExpenseName(e.target.value)}
							required
						/>
					</div>

					<div>
						<label
							htmlFor='expense-category'
							className='mb-2 block text-base font-semibold text-[#c5c2bb]'
						>
							Category
						</label>
						<input
							type='text'
							id='expense-category'
							placeholder='e.g Groceries, Transport'
							className='h-[43px] w-full rounded-md border border-[#53534f] bg-[#2e2f2d] px-4 text-lg font-semibold text-[#f2efe8] outline-none transition placeholder:text-[#7e7d79] focus:border-[#85827b] focus:ring-2 focus:ring-[#85827b]/20'
							value={expenseCategory}
							onChange={(e) => setExpenseCategory(e.target.value)}
							required
						/>
					</div>

					<div className='grid gap-4 sm:grid-cols-2'>
						<div>
							<label
								htmlFor='expense-amount'
								className='mb-2 block text-base font-semibold text-[#c5c2bb]'
							>
								Amount
							</label>
							<input
								type='number'
								id='expense-amount'
								min='0'
								step='0.01'
								placeholder='€0.00'
								className='h-[43px] w-full rounded-md border border-[#53534f] bg-[#2e2f2d] px-4 text-lg font-semibold text-[#f2efe8] outline-none transition placeholder:text-[#7e7d79] focus:border-[#85827b] focus:ring-2 focus:ring-[#85827b]/20'
								value={expenseAmount}
								onChange={(e) => setExpenseAmount(e.target.value)}
								required
							/>
						</div>

						<div>
							<label
								htmlFor='expense-date'
								className='mb-2 block text-base font-semibold text-[#c5c2bb]'
							>
								Date
							</label>
							<input
								type='date'
								id='expense-date'
								className='h-[43px] w-full rounded-md border border-[#53534f] bg-[#2e2f2d] px-4 text-lg font-bold text-[#f2efe8] outline-none transition [color-scheme:dark] placeholder:text-[#7e7d79] focus:border-[#85827b] focus:ring-2 focus:ring-[#85827b]/20'
								value={expenseDate}
								onChange={(e) => setExpenseDate(e.target.value)}
								required
							/>
						</div>
					</div>

					<div className='border-t border-[#484944] pt-6'>
						<div className='mx-auto grid max-w-[396px] gap-3 sm:grid-cols-2'>
							<button
								type='button'
								onClick={() => {
									navigate("/expenses")
								}}
								className='h-[45px] rounded-md border border-[#5d5d59] bg-[#292a27] px-5 text-base font-bold text-[#cfcbc3] transition hover:border-[#77746d] hover:bg-[#30312e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5b0a7]'
							>
								Cancel
							</button>

							<button
								type='submit'
								className='h-[45px] rounded-md border border-[#484844] bg-[#4a4a46] px-5 text-base font-bold text-[#f3f1eb] transition hover:bg-[#585751] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5b0a7]'
							>
								{initialExpense ? "Update expense" : "Submit expense"}
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}
