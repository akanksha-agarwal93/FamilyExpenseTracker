import {
	FiTruck,
	FiMonitor,
	FiCoffee,
	FiHome,
	FiFileText,
	FiShoppingCart,
} from "react-icons/fi"
import { MdOutlineRestaurant } from "react-icons/md"
import { AiOutlineMobile } from "react-icons/ai"
import { getExpenseCategory } from "../types/ExpenseCategory"

export const getExpenseIcon = (category: string) => {
	const { icon } = getExpenseCategory(category)

	if (icon === "transport") return <FiTruck />
	if (icon === "dining") return <MdOutlineRestaurant />
	if (icon === "entertainment") return <FiMonitor />
	if (icon === "coffee") return <FiCoffee />
	if (icon === "home") return <FiHome />
	if (icon === "bill") return <FiFileText />
	if (icon === "mobile") return <AiOutlineMobile />
	return <FiShoppingCart />
}
