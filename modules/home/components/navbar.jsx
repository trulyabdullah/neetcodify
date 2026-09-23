"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { UserRole } from "@prisma/client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
	{ href: "/problems", label: "Problems" },
	{ href: "/about", label: "About" },
	{ href: "/profile", label: "Profile" },
];

const Navbar = ({ userRole }) => {
	const [isOpen, setIsOpen] = useState(false);
	const isAdmin = userRole && userRole === UserRole.ADMIN;

	return (
		<nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-5xl px-4">
			<div className="bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 transition-all duration-200 hover:bg-white/15 dark:hover:bg-black/15">
				<div className="px-4 sm:px-6 py-4 flex justify-between items-center">
					<Link
						href={"/"}
						className="flex items-center gap-2 shrink-0"
					>
						<Image
							src={"/logo.svg"}
							alt="TreeBio"
							width={42}
							height={42}
						/>
						<span className="font-bold text-xl sm:text-2xl tracking-widest text-amber-300">
							NeetCodify
						</span>
					</Link>

					{/* Desktop nav links */}
					<div className="hidden md:flex flex-row items-center justify-center gap-x-4">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-amber-600 cursor-pointer dark:hover:text-amber-400"
							>
								{link.label}
							</Link>
						))}
					</div>

					{/* Desktop actions */}
					<div className="hidden md:flex items-center gap-4">
						<ModeToggle />
						<Show when="signed-in">
							{isAdmin && (
								<Link href={"/create-problem"}>
									<Button
										variant={"outline"}
										size={"default"}
									>
										Create Problem
									</Button>
								</Link>
							)}
							<UserButton />
						</Show>
						<Show when="signed-out">
							<div className="flex items-center gap-2">
								<SignInButton>
									<Button
										variant="ghost"
										size="sm"
										className="text-sm font-medium hover:bg-white/20 dark:hover:bg-white/10"
									>
										Sign In
									</Button>
								</SignInButton>
								<SignUpButton>
									<Button
										size="sm"
										className="text-sm font-medium bg-amber-400 hover:bg-amber-500 text-white"
									>
										Sign Up
									</Button>
								</SignUpButton>
							</div>
						</Show>
					</div>

					{/* Mobile controls — always compact, never overflows */}
					<div className="flex md:hidden items-center gap-2">
						<ModeToggle />
						<Show when="signed-in">
							<UserButton />
						</Show>
						<button
							onClick={() => setIsOpen((prev) => !prev)}
							aria-label="Toggle menu"
							aria-expanded={isOpen}
							className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-white/20 dark:hover:bg-white/10"
						>
							{isOpen ? (
								<X className="w-5 h-5" />
							) : (
								<Menu className="w-5 h-5" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile dropdown panel */}
				{isOpen && (
					<div className="md:hidden border-t border-white/20 dark:border-white/10 px-4 py-4 space-y-4">
						<div className="flex flex-col gap-3">
							{navLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									onClick={() => setIsOpen(false)}
									className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400"
								>
									{link.label}
								</Link>
							))}
						</div>

						<Show when="signed-in">
							{isAdmin && (
								<Link
									href={"/create-problem"}
									onClick={() => setIsOpen(false)}
								>
									<Button
										variant={"outline"}
										size={"default"}
										className="w-full"
									>
										Create Problem
									</Button>
								</Link>
							)}
						</Show>

						<Show when="signed-out">
							<div className="flex flex-col gap-2">
								<SignInButton>
									<Button
										variant="ghost"
										size="sm"
										className="w-full text-sm font-medium hover:bg-white/20 dark:hover:bg-white/10"
									>
										Sign In
									</Button>
								</SignInButton>
								<SignUpButton>
									<Button
										size="sm"
										className="w-full text-sm font-medium bg-amber-400 hover:bg-amber-500 text-white"
									>
										Sign Up
									</Button>
								</SignUpButton>
							</div>
						</Show>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
