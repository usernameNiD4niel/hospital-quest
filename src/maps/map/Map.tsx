import Quiz4Pics1Word from "../../components/Quiz4Pics1Word";
import QuizPad from "../../components/QuizPad";
import FarmMapWeb from "../../assets/farm-map-web.webp";
import { useEffect, useState } from "react";

function Map() {
	const [counter, setCounter] = useState(5);

	useEffect(() => {
		if (counter <= 0) {
			return;
		}
		const t = setInterval(() => {
			setCounter(prev => prev - 1);
		}, 1000);

		return () => {
			clearInterval(t);
		}
	}, [counter]);

	return <div className="overflow-y-hidden">
		<img
			src={FarmMapWeb}
			alt="Farm map image"
			width={2500}
			height={2500}
			className="w-screen h-screen hidden md:block"
		/>

		<img
			src="/farm-map.webp"
			alt="Game map"
			width={2200}
			height={2200}
			className="h-screen w-screen md:hidden"
		/>

		{/* Darkening overlay */}
		<div className="absolute inset-0 bg-black opacity-50 z-0" />

		<div className="absolute inset-0 z-10 flex items-center justify-center flex-col">
			<div className="text-white">{counter}</div>
			<Quiz4Pics1Word />
			<QuizPad />
		</div>
	</div>;
}

export default Map;
