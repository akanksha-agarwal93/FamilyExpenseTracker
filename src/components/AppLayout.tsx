import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { FiHome, FiList, FiLogOut, FiPlusCircle } from "react-icons/fi"
import { useAuth } from "../context/AuthContextState"
import { Button } from "../shared/Button"

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
	[
		"inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-bold transition",
		isActive
			? "bg-[#f4f1e9] text-[#242520]"
			: "text-[#c9c5bd] hover:bg-[#333430] hover:text-[#f3f1eb]",
	].join(" ")

export function AppLayout() {
	const navigate = useNavigate()
	const { signOut } = useAuth()

	const handleSignOut = () => {
		signOut()
		navigate("/")
	}

	return (
		<div className='min-h-svh bg-[#1f1f1d] text-[#f3f1eb]'>
			<nav className='sticky top-0 z-20 border-b border-[#3d3e39] bg-[#1f1f1d]/95 px-5 py-3 backdrop-blur sm:px-9'>
				<div className='mx-auto flex w-full max-w-[1080px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
					<NavLink
						to='/dashboard'
						className='inline-flex items-center gap-2 text-lg font-bold text-[#f3f1eb]'
					>
						<span className='flex h-9 w-9 items-center justify-center rounded-lg bg-[#f4f1e9] text-[#242520]'>
							<FiHome />
						</span>
						Family Expenses
					</NavLink>

					<div className='flex flex-wrap gap-2'>
						<NavLink to='/dashboard' className={navLinkClass}>
							<FiHome />
							Dashboard
						</NavLink>
						<NavLink to='/expenses' className={navLinkClass}>
							<FiList />
							Expenses
						</NavLink>
						<NavLink to='/add-expense' className={navLinkClass}>
							<FiPlusCircle />
							Add
						</NavLink>
						<Button
							type='button'
							onClick={handleSignOut}
							variant='ghost'
							size='sm'
						>
							<FiLogOut />
							Sign out
						</Button>
					</div>
				</div>
			</nav>

			<main>
				<Outlet />
			</main>
		</div>
	)
}
