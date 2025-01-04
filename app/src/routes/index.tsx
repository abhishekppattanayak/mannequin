import { A } from "@solidjs/router";
import { createSignal, onCleanup } from "solid-js";

export default function Home() {
	const [getTimer, setTimer] = createSignal(0);
	const createTimer = setInterval(() => {
		setTimer(p => p+1);
	}, 1000);

	// onCleanup(() => {
	// 	clearInterval(createTimer);
	// })

	return (
		<>
			<A href='/login' >Go to /login </A>
			<main>{getTimer()}</main>
		</>
	);
}
