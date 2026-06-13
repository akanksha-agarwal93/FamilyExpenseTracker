interface DashboardMetricCardProps {
	label: string
	value: string
	detail: string
	detailTone?: "muted" | "positive" | "negative" | "accent"
}

const detailToneClass = {
	accent: "text-[#ad9ff1]",
	muted: "text-[#aaa69e]",
	negative: "text-[#ff6b6b]",
	positive: "text-[#28d19a]",
}

export function DashboardMetricCard({
	detail,
	detailTone = "muted",
	label,
	value,
}: DashboardMetricCardProps) {
	return (
		<section className='rounded-lg bg-[#282925] px-4 py-4 text-left'>
			<p className='text-xs font-bold text-[#aaa69e]'>{label}</p>
			<p className='mt-1 truncate text-2xl font-black leading-none tracking-normal text-[#f3f1eb]'>
				{value}
			</p>
			<p className={`mt-1 text-xs font-black ${detailToneClass[detailTone]}`}>
				{detail}
			</p>
		</section>
	)
}
