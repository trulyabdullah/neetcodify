import Link from "next/link";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ModeToggle } from "@/components/ui/mode-toggle";

const display = Space_Grotesk({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	variable: "--font-display",
});

const mono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["400", "500"],
	variable: "--font-mono",
});

const steps = [
	{
		number: "01",
		title: "Solve",
		description:
			"Pick a problem by difficulty or tag and write your solution in the built-in editor.",
	},
	{
		number: "02",
		title: "Run",
		description:
			"Your code runs against the problem's test cases, so you see exactly which ones pass.",
	},
	{
		number: "03",
		title: "Track",
		description:
			"Solved problems are marked automatically, and you can group them into playlists.",
	},
];

export default function AboutPage() {
	return (
		<div
			className={`${display.variable} ${mono.variable} min-h-screen bg-background text-foreground font-[family-name:var(--font-display)]`}
		>
			{/* Top bar */}
			<div className="border-b border-foreground/10">
				<div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
					<Link
						href="/"
						className="text-sm font-[family-name:var(--font-mono)] tracking-tight"
					>
						Neetcodify
					</Link>
					<div className="flex items-center gap-6">
						<Link
							href="/problems"
							className="text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							Problems
						</Link>
						<ModeToggle />
					</div>
				</div>
			</div>

			{/* Hero */}
			<div className="max-w-3xl mx-auto px-6 pt-16 pb-20">
				<div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
					<div>
						<h1 className="text-4xl md:text-5xl leading-[1.1] font-medium tracking-tight">
							Practice data structures and algorithms, one
							problem at a time.
						</h1>
						<p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-md">
							Neetcodify is a small practice platform for coding
							interview problems. Pick a problem, write your
							solution, run it against real test cases, and
							track what you've solved.
						</p>
					</div>

					{/* Geometric mark: a small graph, drawn plainly */}
					<svg
						width="140"
						height="140"
						viewBox="0 0 140 140"
						fill="none"
						className="shrink-0 hidden sm:block text-foreground"
						aria-hidden="true"
					>
						<line
							x1="30"
							y1="100"
							x2="70"
							y2="30"
							stroke="currentColor"
							strokeOpacity="0.25"
						/>
						<line
							x1="70"
							y1="30"
							x2="115"
							y2="70"
							stroke="currentColor"
							strokeOpacity="0.25"
						/>
						<line
							x1="30"
							y1="100"
							x2="115"
							y2="70"
							stroke="currentColor"
							strokeOpacity="0.25"
						/>
						<circle
							cx="30"
							cy="100"
							r="6"
							stroke="#4F46E5"
							strokeWidth="1.5"
							fill="none"
						/>
						<rect
							x="64"
							y="24"
							width="12"
							height="12"
							stroke="#4F46E5"
							strokeWidth="1.5"
							fill="none"
						/>
						<polygon
							points="115,60 125,78 105,78"
							stroke="#4F46E5"
							strokeWidth="1.5"
							fill="none"
						/>
					</svg>
				</div>
			</div>

			{/* Steps */}
			<div className="border-t border-foreground/10">
				<div className="max-w-3xl mx-auto px-6 py-14">
					{steps.map((step, index) => (
						<div
							key={step.number}
							className={`grid grid-cols-[3rem_1fr] gap-6 py-6 ${
								index !== 0
									? "border-t border-foreground/10"
									: ""
							}`}
						>
							<span className="font-[family-name:var(--font-mono)] text-sm text-[#4F46E5] pt-1">
								{step.number}
							</span>
							<div>
								<h2 className="text-lg font-medium">
									{step.title}
								</h2>
								<p className="mt-1 text-sm text-muted-foreground leading-relaxed max-w-md">
									{step.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Footer */}
			<div className="border-t border-foreground/10">
				<div className="max-w-3xl mx-auto px-6 py-8">
					<p className="font-[family-name:var(--font-mono)] text-xs text-muted-foreground">
						Built with Next.js, Prisma, Clerk, and JDoodle.
					</p>
				</div>
			</div>
		</div>
	);
}
