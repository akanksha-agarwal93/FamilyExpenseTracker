import { useState } from "react"
import { FiCheck, FiChevronDown, FiGrid } from "react-icons/fi"
import {
	expenseCategories,
	type ExpenseCategory,
} from "../types/ExpenseCategory"
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
			<button
				type='button'
				id={id}
				aria-haspopup='listbox'
				aria-expanded={isOpen}
				onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
				className='flex h-[43px] w-full items-center justify-between rounded-lg border border-[#53534f] bg-[#2e2f2d] px-4 text-base font-bold text-[#f2efe8] outline-none transition focus:border-[#85827b] focus:ring-2 focus:ring-[#85827b]/20'
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
			</button>

			{isOpen && (
				<div
					role='listbox'
					aria-labelledby={id}
					className='absolute z-10 mt-2 max-h-72 w-full overflow-auto rounded-lg border border-[#53534f] bg-[#2e2f2d] p-1 shadow-[0_18px_40px_rgba(0,0,0,0.35)]'
				>
					<button
						type='button'
						role='option'
						aria-selected={value === "All"}
						onClick={() => handleChange("All")}
						className='flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-base font-bold text-[#f2efe8] transition hover:bg-[#3a3b36] focus:bg-[#3a3b36] focus:outline-none'
					>
						<span className='flex items-center gap-3'>
							<span className='flex h-7 w-7 items-center justify-center rounded-md bg-[#f4f1e9] text-base text-[#34342f]'>
								<FiGrid />
							</span>
							All categories
						</span>
						{value === "All" && <FiCheck />}
					</button>

					{expenseCategories.map((category) => (
						<button
							key={category.value}
							type='button'
							role='option'
							aria-selected={value === category.value}
							onClick={() => handleChange(category.value)}
							className='flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-base font-bold text-[#f2efe8] transition hover:bg-[#3a3b36] focus:bg-[#3a3b36] focus:outline-none'
						>
							<span className='flex items-center gap-3'>
								<span className='flex h-7 w-7 items-center justify-center rounded-md bg-[#f4f1e9] text-base text-[#34342f]'>
									{getExpenseIcon(category.value)}
								</span>
								{category.label}
							</span>
							{value === category.value && <FiCheck />}
						</button>
					))}
				</div>
			)}
		</div>
	)
}
