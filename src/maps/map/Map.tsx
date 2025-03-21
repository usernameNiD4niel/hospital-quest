import FarmMapWeb from "../../assets/farm-map-web.webp";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../../components/Button";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Departments, QUESTIONS } from "../../constants/maps";
import QuizOption from "./quiz/QuizOption";
import { FillerProp, QATypes } from "../../types";

function Map() {
	const [counter, setCounter] = useState(30);
	const [direction, setDirection] = useState(1);
	const [question, setQuestion] = useState(0);
	const location = useLocation();
	const [qa, setQA] = useState<QATypes[]>([]);

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

	if (counter === 0 && qa.length > 1) {
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
			const questions = localStorage.getItem("__questions__");
			if (questions) {
				const s = JSON.parse(questions) as Record<FillerProp, string>;
				const theTruth = QUESTIONS[department];
				const answers = Object.values(s);

				const qa: QATypes[] = [];

				for (let i = 0; i < theTruth.length; ++i) {
					const truth = theTruth[i];

					qa.push({
						answer: truth.answer,
						isCorrect: answers[i] === truth.answer,
						question: truth.question
					});
				}

				setQA(qa);
				localStorage.removeItem("__questions__");
			}
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
				<div className="w-full relative flex flex-col items-center space-y-6 overflow-hidden">
					{/* <button className="fixed top-[49vh] left-1 text-white">Prev</button> */}
					<AnimatePresence mode="wait" custom={direction}>
						<motion.div
							key={question}
							variants={variants}
							custom={direction}
							initial="enter"
							animate="center"
							exit="exit"
							transition={{ duration: 0.5, ease: "easeInOut" }}
							className="w-full h-full"
						>
							<QuizOption quiz={QUESTIONS[department][question]} key={`${department}-${question}`} filler={getFiller()} />
						</motion.div>
					</AnimatePresence>
					{/* <button className="fixed top-[49vh] right-1 text-white">Next</button> */}
					<div className="w-full flex justify-between items-center max-w-xs md:max-w-lg px-4 space-x-4">
						<Button text="Previous" onClick={handlePrev} disabled={question === 0} />
						<Button text={question !== 4 ? "Next" : "Submit"} onClick={handleNext} />
					</div>
				</div>
			</div>

			{qa.length > 1 && (
				<div className="absolute inset-0 z-10 flex items-center justify-center flex-col bg-white">
					{qa.map(q => (
						<div key={q.question} className="w-full">
							<p>{q.question}</p>
							<p className={twMerge(q.isCorrect ? "line-through text-red-500" : "text-green-500")}>
								<span>{q.answer}</span>
								{!q.isCorrect && <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
									<path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#0F0F0F" />
								</svg>}
							</p>
						</div>
					))}
					{/* Check if has enough points to go to next department. */}
				</div>
			)}
		</div>
	);
}

export default Map;
