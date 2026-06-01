import { Link } from "react-router-dom";

export function ExpenseForm() {
    return (
        <>
        <div>
            <h1>Expense Form</h1>
            <div className="flex-1 flex-row">
                <label className="mr-2">Expense Name:</label>
                <input type="text" id="expense-name" className="bg-gray-100"/>
            </div>
            <div className="flex-1 flex-row">
                <label className="mr-2 mt-5">Expense Category:</label>
                <input type="text" id="expense-category" className="bg-gray-100"/>
            </div>
            <div>
                <div className="flex items-center justify-content bg-blue-100 mt-5">
                    <Link to="/expenses">
                        Submit Expense
                    </Link>
                </div>
                    <Link to="/" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2 mx-2">
                        Cancel
                </Link>
            </div>
        </div>
        </>
    )

}