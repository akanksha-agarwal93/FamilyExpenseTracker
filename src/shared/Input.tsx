import type { InputHTMLAttributes, ReactNode } from "react"

type InputSize = "md" | "lg"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	leftIcon?: ReactNode
	inputSize?: InputSize
}

const sizeClasses: Record<InputSize, string> = {
	md: "h-[43px] text-lg",
	lg: "h-11 text-base",
}

export function Input({
	className = "",
	id,
	inputSize = "md",
	label,
	leftIcon,
	...props
}: InputProps) {
	const horizontalPadding = leftIcon ? "px-11" : "px-4"

	return (
		<div>
			<label
				htmlFor={id}
				className='mb-2 block text-base font-semibold text-[#c5c2bb]'
			>
				{label}
			</label>
			<div className='relative'>
				{leftIcon && (
					<span className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9d9990]'>
						{leftIcon}
					</span>
				)}
				<input
					id={id}
					className={[
						"w-full rounded-md border border-[#53534f] bg-[#2e2f2d] font-semibold text-[#f2efe8] outline-none transition placeholder:text-[#7e7d79] focus:border-[#85827b] focus:ring-2 focus:ring-[#85827b]/20",
						sizeClasses[inputSize],
						horizontalPadding,
						className,
					].join(" ")}
					{...props}
				/>
			</div>
		</div>
	)
}
