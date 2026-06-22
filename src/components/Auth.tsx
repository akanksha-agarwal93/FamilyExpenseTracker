import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FiCheck, FiLogOut, FiMail, FiShield, FiUser } from "react-icons/fi"
import { useAuth } from "../context/AuthContextState"
import { Button } from "../shared/Button"
import { Card, CardBody, CardHeader } from "../shared/Card"
import { Input } from "../shared/Input"

export function Auth() {
	const navigate = useNavigate()
	const { session, signIn, signOut } = useAuth()
	const [name, setName] = useState(session?.name || "")
	const [email, setEmail] = useState(session?.email || "")

	const canSubmit = useMemo(
		() => Boolean(name.trim() && email.trim()),
		[email, name],
	)

	const handleSubmit = () => {
		if (!canSubmit) return

		signIn(name, email)
		navigate("/dashboard")
	}

	const handleSignOut = () => {
		signOut()
		setName("")
		setEmail("")
	}

	return (
		<div className='min-h-svh bg-[#1f1f1d] px-5 py-6 text-left text-[#f1eee7] sm:px-9 sm:py-10'>
			<div className='mx-auto grid w-full max-w-[1080px] gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch'>
				<section className='flex min-h-[460px] flex-col justify-between rounded-xl border border-[#454642] bg-[#292a27] p-7 shadow-[0_22px_60px_rgba(0,0,0,0.22)] sm:p-8'>
					<div>
						<div className='mb-8 flex h-12 w-12 items-center justify-center rounded-lg bg-[#f4f1e9] text-2xl text-[#242520]'>
							<FiShield />
						</div>
						<p className='text-sm font-bold uppercase tracking-[0.18em] text-[#b8b3aa]'>
							V3 account access
						</p>
						<h1 className='mt-3 max-w-[520px] text-4xl font-bold leading-tight tracking-normal text-[#f3f1eb] sm:text-5xl'>
							Keep every family expense in one trusted place.
						</h1>
						<p className='mt-4 max-w-[520px] text-base font-semibold leading-7 text-[#b8b3aa]'>
							Sign in with your name and email to create a local user session on
							this device.
						</p>
					</div>

					<div className='mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3'>
						{["User table", "Local session", "Expense owner"].map((label) => (
							<div
								key={label}
								className='flex min-h-12 items-center gap-3 rounded-lg border border-[#474843] bg-[#242520] px-4 py-3'
							>
								<span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d6d1c5] text-sm text-[#242520]'>
									<FiCheck />
								</span>
								<span className='text-sm font-bold text-[#ddd8ce]'>
									{label}
								</span>
							</div>
						))}
					</div>
				</section>

				<Card>
					<CardHeader>
						<h2 className='text-2xl font-bold leading-tight tracking-normal text-[#f3f1eb]'>
							{session ? "You are signed in" : "Sign in"}
						</h2>
						<p className='mt-1 text-base font-semibold text-[#a7a49d]'>
							{session
								? `User id: ${session.id}`
								: "Enter your name and email to start your session."}
						</p>
					</CardHeader>

					{session ? (
						<CardBody>
							<div className='rounded-lg border border-[#484944] bg-[#292a27] p-5'>
								<div className='flex items-start gap-4'>
									<span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#f4f1e9] text-xl text-[#242520]'>
										<FiUser />
									</span>
									<div>
										<p className='text-xl font-bold text-[#f3f1eb]'>
											{session.name}
										</p>
										<p className='mt-1 text-base font-semibold text-[#b8b3aa]'>
											{session.email}
										</p>
									</div>
								</div>
							</div>

							<div className='grid gap-3 sm:grid-cols-2'>
								<Button
									type='button'
									onClick={() => navigate("/dashboard")}
									size='lg'
								>
									Go to dashboard
								</Button>
								<Button
									type='button'
									onClick={handleSignOut}
									variant='secondary'
									size='lg'
								>
									<FiLogOut />
									Sign out
								</Button>
							</div>
						</CardBody>
					) : (
						<CardBody>
							<form
								onSubmit={(event) => {
									event.preventDefault()
									handleSubmit()
								}}
								className='space-y-5'
							>
								<Input
									id='auth-name'
									type='text'
									label='Name'
									placeholder='Name'
									inputSize='lg'
									leftIcon={<FiUser />}
									value={name}
									onChange={(event) => setName(event.target.value)}
									required
								/>

								<Input
									id='auth-email'
									type='email'
									label='Email address'
									placeholder='Email address'
									inputSize='lg'
									leftIcon={<FiMail />}
									value={email}
									onChange={(event) => setEmail(event.target.value)}
									required
								/>

								<Button
									type='submit'
									disabled={!canSubmit}
									fullWidth
									size='lg'
								>
									Sign in
								</Button>
							</form>
						</CardBody>
					)}
				</Card>
			</div>
		</div>
	)
}
