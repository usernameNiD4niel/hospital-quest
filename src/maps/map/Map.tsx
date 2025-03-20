import FarmMapWeb from "../../assets/farm-map-web.webp";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../../components/Button";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Departments, QUESTIONS } from "../../constants/maps";
import QuizOption from "./quiz/QuizOption";
import { FillerProp } from "../../types";

function Map() {
	const [counter, setCounter] = useState(30);
	const [direction, setDirection] = useState(1);
	const [question, setQuestion] = useState(0);
	const location = useLocation();

	useEffect(() => {
		if (counter <= 0) {
			return;
		}
		const t = setInterval(() => {
			setCounter((prev) => prev - 1);
		}, 1000);

		return () => {
			clearInterval(t);
			// localStorage.removeItem("__questions__");
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

	const variants = {
		enter: (dir: number) => ({
			x: dir > 0 ? "100%" : "-100%",
			opacity: 0
		}),
		center: { x: "0%", opacity: 1 },
		exit: (dir: number) => ({
			x: dir > 0 ? "-100%" : "100%",
			opacity: 0
		})
	}
	const splittedPath = location.pathname.split("/");
	const department = decodeURIComponent(splittedPath[splittedPath.length - 1]) as Departments;

	function handleNext() {
		if (question >= QUESTIONS[department].length) {
			return;
		}
		if (question === 4) {
			// means the user submits the answer.

		} else {
			setDirection(1);
			setQuestion(prev => prev + 1);
		}
	}

	function handlePrev() {
		if (question <= 0) {
			return;
		}
		setDirection(0);
		setQuestion(prev => prev - 1);
	}

	function getFiller(): FillerProp {
		switch (question) {
			case 0:
				return "one";
			case 1:
				return "two";
			case 2:
				return "three";
			case 3:
				return "four";
			case 4:
				return "five";

		}
		return "five";
	}

	return (
		<div className="overflow-y-hidden relative">
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
			<div className="absolute inset-0 bg-black opacity-80 z-0" />

			<div className="absolute inset-0 z-10 flex items-center pt-[10vh] flex-col">
				<div className="pb-12">
					<p
						className={twMerge(
							"text-3xl font-bold drop-shadow-2xl",
							counter <= 10 ? "text-red-500" : "text-white",
						)}>
						{counter}
					</p>
				</div>
				<div className="w-full relative flex flex-col items-center space-y-6">
					{/* <button className="fixed top-[49vh] left-1 text-white">Prev</button> */}
					<AnimatePresence mode="wait" custom={direction}>
						<motion.div
							key={question}
							variants={variants}
							custom={direction}
							initial="enter"
							animate="center"
							exit="exit"
							transition={{ duration: 0.3, ease: "easeInOut" }}
							className="w-full h-full"
						>
							<QuizOption quiz={QUESTIONS[department][question]} key={`${department}-${question}`} filler={getFiller()} />
						</motion.div>
					</AnimatePresence>
					{/* <button className="fixed top-[49vh] right-1 text-white">Next</button> */}
					<div className="w-full flex justify-between items-center max-w-xs md:max-w-lg px-4 space-x-4">
						<Button text="Previous" onClick={handlePrev} disabled={question === 0} />
						<Button text={question !== 4 ? "Next" : "Submit"} onClick={handleNext} disabled={question === 4} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Map;
