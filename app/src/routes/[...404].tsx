import { A } from "@solidjs/router";

export default function NotFound() {
	return (
		<main class="h-screen grid place-content-center *:text-center dark:bg-neutral-900 dark:text-white " >
			<h1 class="text-lg md:text-2xl font-semibold" >
				<span class="text-red-400" >Error 404:</span>
				{" "}
				<span>Page Not Found :P</span>
			</h1>
			<h1 class="text-md md:text-xl" >
				<span>Go back to</span>
				{" "}
				<A href="/" class="text-blue-600 dark:text-blue-400 hover:underline" >Home</A>
			</h1>
		</main>
	);
}
