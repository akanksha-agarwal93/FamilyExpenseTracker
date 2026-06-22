import { useState } from "react"
import { FiCheck, FiChevronDown, FiGrid } from "react-icons/fi"
import {
	expenseCategories,
	type ExpenseCategory,
} from "../types/ExpenseCategory"
import { Button } from "./Button"
import { getExpenseIcon } from "../utils/ExpenseCategoryIcon"

export type CategoryFilter = ExpenseCategory | "All"

interface CategoryFilterDropdownProps {
	id?: string
	label?: string
	onChange: (value: CategoryFilter) => void
	value: CategoryFilter
}

export function CategoryFilterDropdown({
	id = "expense-category-filter",
	label = "Filter by category",
	onChange,
	value,
}: CategoryFilterDropdownProps) {
	const [isOpen, setIsOpen] = useState(false)
	const selectedLabel = value === "All" ? "All categories" : value

	const handleChange = (category: CategoryFilter) => {
		onChange(category)
		setIsOpen(false)
	}

	return (
		<div
			className='relative mb-5'
			onBlur={(event) => {
				if (!event.currentTarget.contains(event.relatedTarget)) {
					setIsOpen(false)
				}
			}}
		>
			<p className='mb-2 text-sm font-semibold text-[#aaa69e]'>{label}</p>
			<Button
				type='button'
				id={id}
				variant='secondary'
				aria-haspopup='listbox'
				aria-expanded={isOpen}
				onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
				fullWidth
				className='h-[43px] justify-between rounded-lg border-[#53534f] bg-[#2e2f2d] px-4 text-[#f2efe8] focus:border-[#85827b] focus:ring-2 focus:ring-[#85827b]/20'
			>
				<span className='flex items-center gap-3'>
					<span className='flex h-7 w-7 items-center justify-center rounded-md bg-[#f4f1e9] text-base text-[#34342f]'>
						{value === "All" ? <FiGrid /> : getExpenseIcon(value)}
					</span>
					{selectedLabel}
				</span>
				<FiChevronDown
					className={`text-lg text-[#aaa69e] transition ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</Button>

			{isOpen && (
				<div
					role='listbox'
					aria-labelledby={id}
					className='absolute z-10 mt-2 max-h-72 w-full overflow-auto rounded-lg border border-[#53534f] bg-[#2e2f2d] p-1 shadow-[0_18px_40px_rgba(0,0,0,0.35)]'
				>
					<Button
						type='button'
						variant='ghost'
						role='option'
						aria-selected={value === "All"}
						onClick={() => handleChange("All")}
						fullWidth
						className='h-auto justify-between rounded-md px-3 py-2 text-left text-base text-[#f2efe8] hover:bg-[#3a3b36] focus:bg-[#3a3b36] focus:outline-none'
					>
						<span className='flex items-center gap-3'>
							<span className='flex h-7 w-7 items-center justify-center rounded-md bg-[#f4f1e9] text-base text-[#34342f]'>
								<FiGrid />
							</span>
							All categories
						</span>
						{value === "All" && <FiCheck />}
					</Button>

					{expenseCategories.map((category) => (
						<Button
							key={category.value}
							type='button'
							variant='ghost'
							role='option'
							aria-selected={value === category.value}
							onClick={() => handleChange(category.value)}
							fullWidth
							className='h-auto justify-between rounded-md px-3 py-2 text-left text-base text-[#f2efe8] hover:bg-[#3a3b36] focus:bg-[#3a3b36] focus:outline-none'
						>
							<span className='flex items-center gap-3'>
								<span className='flex h-7 w-7 items-center justify-center rounded-md bg-[#f4f1e9] text-base text-[#34342f]'>
									{getExpenseIcon(category.value)}
								</span>
								{category.label}
							</span>
							{value === category.value && <FiCheck />}
						</Button>
					))}
				</div>
			)}
		</div>
	)
}
