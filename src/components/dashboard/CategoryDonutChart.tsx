import {
	Pie,
	PieChart,
	ResponsiveContainer,
	Sector,
	type PieSectorShapeProps,
} from "recharts"
import type { DashboardCategoryItem } from "../../types/Dashboard"

interface CategoryDonutChartProps {
	categories: DashboardCategoryItem[]
	periodLabel: string
}

interface CategoryChartDatum {
	color: string
	label: string
	total: number
}

const renderCategorySector = ({
	cornerRadius,
	cx,
	cy,
	endAngle,
	innerRadius,
	outerRadius,
	payload,
	startAngle,
}: PieSectorShapeProps) => (
	<Sector
		cornerRadius={cornerRadius}
		cx={cx}
		cy={cy}
		endAngle={endAngle}
		fill={(payload as CategoryChartDatum).color}
		innerRadius={innerRadius}
		outerRadius={outerRadius}
		startAngle={startAngle}
		stroke='none'
	/>
)

export const CategoryDonutChart = ({
	categories,
	periodLabel,
}: CategoryDonutChartProps) => {
	const chartData: CategoryChartDatum[] =
		categories.length > 0
			? categories
			: [{ label: "No spending", total: 1, color: "#555650" }]

	return (
		<section className='rounded-xl border border-[#575852] bg-[#30312e] px-5 py-5 text-left'>
			<h2 className='m-0 text-base font-black leading-tight tracking-normal text-[#f3f1eb]'>
				By category
			</h2>

			<div className='mt-3 flex flex-wrap gap-x-3 gap-y-2'>
				{categories.length === 0 ? (
					<span className='text-xs font-bold text-[#aaa69e]'>
						No spending yet
					</span>
				) : (
					categories.map((category) => (
						<span
							key={category.value}
							className='inline-flex items-center gap-1 text-xs font-bold text-[#c8c4bc]'
						>
							<span
								className='h-2.5 w-2.5 rounded-sm'
								style={{ backgroundColor: category.color }}
							/>
							{category.label} {category.percentage}%
						</span>
					))
				)}
			</div>

			<div
				className='mx-auto mt-6 h-[190px] w-full max-w-[240px]'
				role='img'
				aria-label={`${periodLabel} spending by category`}
			>
				<ResponsiveContainer width='100%' height='100%'>
					<PieChart>
						<Pie
							data={chartData}
							dataKey='total'
							nameKey='label'
							cx='50%'
							cy='50%'
							innerRadius={48}
							outerRadius={76}
							stroke='none'
							isAnimationActive={false}
							shape={renderCategorySector}
						/>
					</PieChart>
				</ResponsiveContainer>
			</div>
		</section>
	)
}
