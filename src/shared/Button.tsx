import type { ButtonHTMLAttributes, ReactNode } from "react"

type ButtonVariant = "primary" | "secondary" | "ghost" | "icon" | "accent"
type ButtonSize = "sm" | "md" | "lg" | "icon"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	variant?: ButtonVariant
	size?: ButtonSize
	fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
	primary:
		"border-[#484844] bg-[#4a4a46] text-[#f3f1eb] hover:bg-[#585751] disabled:hover:bg-[#4a4a46]",
	secondary:
		"border-[#5d5d59] bg-[#292a27] text-[#cfcbc3] hover:border-[#77746d] hover:bg-[#30312e]",
	ghost:
		"border-transparent bg-transparent text-[#c9c5bd] hover:bg-[#333430] hover:text-[#f3f1eb]",
	icon: "border-[#66645e] bg-[#30312e] text-[#d2cec6] hover:border-[#817d75] hover:bg-[#383934]",
	accent:
		"border-[#f4f1e9] bg-[#f4f1e9] text-[#242520] hover:border-[#dedacf] hover:bg-[#dedacf]",
}

const sizeClasses: Record<ButtonSize, string> = {
	sm: "h-10 rounded-lg px-3 text-sm",
	md: "h-[45px] rounded-md px-5 text-base",
	lg: "h-12 rounded-md px-5 text-base",
	icon: "h-10 w-10 rounded-lg p-0 text-base",
}

export function Button({
	children,
	className = "",
	fullWidth = false,
	size = "md",
	type = "button",
	variant = "primary",
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			className={[
				"inline-flex items-center justify-center gap-2 border font-bold transition disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5b0a7]",
				variantClasses[variant],
				sizeClasses[size],
				fullWidth ? "w-full" : "",
				className,
			].join(" ")}
			{...props}
		>
			{children}
		</button>
	)
}
