import { useNavigate } from "react-router-dom"
import type { Expense } from "../types/Expense"
import { useState } from "react"
import {
	expenseCategories,
	type ExpenseCategory,
} from "../types/ExpenseCategory"
import { useAuth } from "../context/AuthContextState"
import { Button } from "./Button"
import { Card, CardBody, CardFooter, CardHeader } from "./Card"
import { Input } from "./Input"
import { getDateInputValue } from "../utils/Formatters"

interface ExpenseFormProps {
	initialExpense?: Expense
	handleSubmit: (expense: Expense) => void
}

export function ExpenseForm({
	initialExpense,
	handleSubmit,
}: ExpenseFormProps) {
	const navigate = useNavigate()
	const { session } = useAuth()
	const expenseId = initialExpense?.id || crypto.randomUUID()
	const userId = initialExpense?.userId || session?.id || ""
	const [expenseName, setExpenseName] = useState(initialExpense?.name || "")
	const [expenseCategory, setExpenseCategory] = useState(
		initialExpense?.category || expenseCategories[0].value,
	)
	const [expenseDate, setExpenseDate] = useState(
		initialExpense?.date ? initialExpense.date.split("T")[0] : "",
	)
	const [expenseAmount, setExpenseAmount] = useState(
		initialExpense?.amount.toString() || "",
	)
	const todayDate = getDateInputValue()

	const handleFormSubmit = () => {
		if (expenseDate > todayDate) return

		const newExpense: Expense = {
			id: expenseId,
			userId,
			name: expenseName,
			category: expenseCategory as ExpenseCategory,
			amount: parseFloat(expenseAmount) || 0,
			date: new Date(expenseDate).toISOString(),
		}

		handleSubmit(newExpense)
	}

	return (
		<div className='flex min-h-[calc(100svh-65px)] w-full items-start justify-center px-4 py-6 text-left sm:py-10'>
			<Card
				as='form'
				onSubmit={(event) => {
					event.preventDefault()
					handleFormSubmit()
				}}
				className='w-full max-w-[576px] overflow-hidden text-[#e8e6df]'
			>
				<CardHeader>
					<h1 className='m-0 text-2xl font-bold leading-tight tracking-normal text-[#f3f1eb]'>
						{initialExpense ? "Edit expense" : "Add expense"}
					</h1>
					<p className='mt-1 text-base font-semibold text-[#a7a49d]'>
						Fill in the details below
					</p>
				</CardHeader>

				<CardBody>
					<Input
						type='text'
						id='expense-name'
						label='Expense name'
						placeholder='e.g Weekly groceries'
						value={expenseName}
						onChange={(e) => setExpenseName(e.target.value)}
						required
					/>

					<div>
						<label
							htmlFor='expense-category'
							className='mb-2 block text-base font-semibold text-[#c5c2bb]'
						>
							Category
						</label>
						<select
							id='expense-category'
							className='h-[43px] w-full rounded-md border border-[#53534f] bg-[#2e2f2d] px-4 text-lg font-semibold text-[#f2efe8] outline-none transition [color-scheme:dark] focus:border-[#85827b] focus:ring-2 focus:ring-[#85827b]/20'
							value={expenseCategory}
							onChange={(e) =>
								setExpenseCategory(e.target.value as ExpenseCategory)
							}
							required
						>
							{expenseCategories.map((category) => (
								<option key={category.value} value={category.value}>
									{category.label}
								</option>
							))}
						</select>
					</div>

					<div className='grid gap-4 sm:grid-cols-2'>
						<Input
							type='number'
							id='expense-amount'
							label='Amount'
							min='0'
							step='0.01'
							placeholder='EUR 0.00'
							value={expenseAmount}
							onChange={(e) => setExpenseAmount(e.target.value)}
							required
						/>

						<Input
							type='date'
							id='expense-date'
							label='Date'
							className='font-bold [color-scheme:dark]'
							value={expenseDate}
							max={todayDate}
							onChange={(e) => setExpenseDate(e.target.value)}
							required
						/>
					</div>
				</CardBody>

				<CardFooter className='py-6'>
					<div className='mx-auto grid max-w-[396px] gap-3 sm:grid-cols-2'>
						<Button
							type='button'
							onClick={() => {
								navigate("/expenses")
							}}
							variant='secondary'
						>
							Cancel
						</Button>

						<Button type='submit'>
							{initialExpense ? "Update expense" : "Submit expense"}
						</Button>
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}
