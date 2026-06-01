import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Family Expense Tracker</h1>
      <p>Welcome to the Family Expense Tracker!</p>
      <div>
        <Link  to="/add-expense">Add Expense</Link>
      </div>
    </div>
  )
}