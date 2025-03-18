import FarmMapWeb from "../../assets/farm-map-web.webp";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../../components/Button";
import { Link, Outlet } from "react-router-dom";

function Map() {
	const [counter, setCounter] = useState(30);

	useEffect(() => {
		if (counter <= 0) {
			return;
		}
		const t = setInterval(() => {
			setCounter((prev) => prev - 1);
		}, 1000);

		return () => {
			clearInterval(t);
		};
	}, [counter]);

	function handlePlayAgain() {
		setCounter(30);
	}

	if (counter === 0) {
		return (
			<div className="flex items-center py-[20vh] h-screen w-screen absolute bg-amber-900 px-4 flex-col justify-between">
				<p className="text-5xl text-white font-bold">Game Over!</p>
				<div className="w-full flex flex-col md:flex-row gap-2 justify-end items-center">
					<Button text="Try again" onClick={handlePlayAgain} />
					<Link
						className="text-white text-sm w-full py-3 text-center"
						to={"/maps?gained-points=2&department=Current Dept Name"}>
						Go back
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="overflow-y-hidden">
			<img
				src={FarmMapWeb}
				alt="Farm map image"
				width={2500}
				height={2500}
				className="w-screen h-screen hidden md:block"
				loading="lazy"
			/>

			<img
				src="/farm-map.webp"
				alt="Game map"
				width={2200}
				height={2200}
				className="h-screen w-screen md:hidden"
				loading="lazy"
			/>

			{/* Darkening overlay */}
			<div className="absolute inset-0 bg-black opacity-50 z-0" />

			<div className="absolute inset-0 z-10 flex items-center justify-center flex-col">
				<div className="pb-12">
					<p
						className={twMerge(
							"text-3xl font-bold drop-shadow-2xl",
							counter <= 10 ? "text-red-500" : "text-white",
						)}>
						{counter}
					</p>
				</div>
				<div className="w-full">
					<button className="fixed top-[49vh] left-1 text-white">Prev</button>
					<Outlet />
					<button className="fixed top-[49vh] right-1 text-white">Next</button>
				</div>
			</div>
		</div>
	);
}

export default Map;
