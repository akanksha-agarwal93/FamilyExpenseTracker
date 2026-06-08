export const expenseCategories = [
  { icon: "shopping",     label: "Groceries",    value: "Groceries",    bg: "bg-teal-50",   text: "text-teal-700",   pill: "bg-teal-50 text-teal-800"   },
  { icon: "transport",    label: "Transport",    value: "Transport",    bg: "bg-blue-50",   text: "text-blue-700",   pill: "bg-blue-50 text-blue-800"   },
  { icon: "dining",       label: "Dining",       value: "Dining",       bg: "bg-amber-50",  text: "text-amber-700",  pill: "bg-amber-50 text-amber-800"  },
  { icon: "entertainment",label: "Entertainment",value: "Entertainment",bg: "bg-purple-50", text: "text-purple-700", pill: "bg-purple-50 text-purple-800" },
  { icon: "coffee",       label: "Coffee",       value: "Coffee",       bg: "bg-orange-50", text: "text-orange-700", pill: "bg-orange-50 text-orange-800" },
  { icon: "mobile",       label: "Mobile bill",  value: "Mobile bill",  bg: "bg-pink-50",   text: "text-pink-700",   pill: "bg-pink-50 text-pink-800"   },
  { icon: "home",         label: "House rent",   value: "House rent",   bg: "bg-teal-50",   text: "text-teal-700",   pill: "bg-teal-50 text-teal-800"   },
  { icon: "bill",         label: "Bill",         value: "Bill",         bg: "bg-green-50",  text: "text-green-700",  pill: "bg-green-50 text-green-800"  },
  { icon: "shopping",     label: "Shopping",     value: "Shopping",     bg: "bg-teal-50",   text: "text-teal-700",   pill: "bg-teal-50 text-teal-800"   },
  { icon: "shopping",     label: "Other",        value: "Other",        bg: "bg-gray-100",  text: "text-gray-600",   pill: "bg-gray-100 text-gray-700"   },
] as const
export type ExpenseCategory = (typeof expenseCategories)[number]["value"]

export const getExpenseCategory = (category: string) => {
	return (
		expenseCategories.find((expenseCategory) => expenseCategory.value === category) ||
		expenseCategories[expenseCategories.length - 1]
	)
}
