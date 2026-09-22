import { UserButton } from "@clerk/nextjs";

export default function Home() {
	return (
		<div className="flex min-h-screen justify-center items-center">
			<UserButton />
		</div>
	);
}
