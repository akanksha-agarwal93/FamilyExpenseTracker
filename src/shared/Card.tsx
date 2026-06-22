import type { FormHTMLAttributes, PropsWithChildren } from "react"

interface CardProps
	extends PropsWithChildren,
		FormHTMLAttributes<HTMLDivElement | HTMLFormElement> {
	as?: "div" | "form"
	className?: string
}

interface CardSectionProps
	extends PropsWithChildren,
		FormHTMLAttributes<HTMLDivElement | HTMLFormElement> {
	as?: "div" | "form"
	className?: string
}

export function Card({
	as: Component = "div",
	children,
	className = "",
	...props
}: CardProps) {
	return (
		<Component
			className={[
				"rounded-xl border border-[#4a4a46] bg-[#2f302e] shadow-[0_22px_60px_rgba(0,0,0,0.24)]",
				className,
			].join(" ")}
			{...props}
		>
			{children}
		</Component>
	)
}

export function CardHeader({
	as: Component = "div",
	children,
	className = "",
	...props
}: CardSectionProps) {
	return (
		<Component
			className={[
				"border-b border-[#444541] bg-[#222320] px-7 py-6 sm:px-8",
				className,
			].join(" ")}
			{...props}
		>
			{children}
		</Component>
	)
}

export function CardBody({
	as: Component = "div",
	children,
	className = "",
	...props
}: CardSectionProps) {
	return (
		<Component
			className={["space-y-5 px-7 py-7 sm:px-8", className].join(" ")}
			{...props}
		>
			{children}
		</Component>
	)
}

export function CardFooter({
	as: Component = "div",
	children,
	className = "",
	...props
}: CardSectionProps) {
	return (
		<Component
			className={["border-t border-[#484944] px-7 py-6 sm:px-8", className].join(
				" ",
			)}
			{...props}
		>
			{children}
		</Component>
	)
}
