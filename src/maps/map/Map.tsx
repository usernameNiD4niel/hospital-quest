import FarmMapWeb from "../../assets/farm-map-web.webp";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../../components/Button";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { QUESTIONS } from "../../constants/maps";
import QuizOption from "./quiz/QuizOption";
import {
	Departments,
	FillerProp,
	ProgressType,
	QAResultType,
	QATypes,
} from "../../types";
import CheckIcon from "../../components/CheckIcon";
import CloseIcon from "../../components/CloseIcon";
import AlertModal from "../../components/AlertModal";
import { PROGRESS } from "../../constants";
import LinkButton from "../../components/LinkButton";

function Map() {
	const [counter, setCounter] = useState<undefined | number>(30);
	const [direction, setDirection] = useState(1);
	const [question, setQuestion] = useState(0);
	const location = useLocation();
	const [result, setResult] = useState<QAResultType>();
	const [isSubmit, setIsSubmit] = useState(false);

	useEffect(() => {
		if (counter && counter <= 0) {
			return;
		}
		const t = setInterval(() => {
			setCounter((prev) => prev && prev - 1);
		}, 1000);

		return () => {
			clearInterval(t);
			// localStorage.removeItem("__questions__");
		};
	}, [counter]);

	function handlePlayAgain() {
		setCounter(30);
		localStorage.removeItem("__questions__");
		setQuestion(0);
		setResult(undefined);
	}

	if (counter === 0 && !result) {
		return (
			<div className="flex items-center py-[20vh] h-screen w-screen absolute bg-amber-900 px-4 flex-col justify-between">
				<p className="text-5xl text-white font-bold">Game Over!</p>
				<div className="w-full flex flex-col md:flex-row gap-2 justify-end items-center max-w-lg">
					<Button text="Try again" onClick={handlePlayAgain} />
					<LinkButton
						to={"/maps?gained-points=2&department=Current Dept Name"}
						variant="ghost"
						className="text-white hover:text-amber-900">
						Go back
					</LinkButton>
				</div>
			</div>
		);
	}

	const variants = {
		enter: (dir: number) => ({
			x: dir > 0 ? "100%" : "-100%",
			opacity: 0,
		}),
		center: { x: "0%", opacity: 1 },
		exit: (dir: number) => ({
			x: dir > 0 ? "-100%" : "100%",
			opacity: 0,
		}),
	};

	const splittedPath = location.pathname.split("/");
	const department = decodeURIComponent(
		splittedPath[splittedPath.length - 1],
	) as Departments;

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
				let canGoNext = true;
				let gainedPoints = 0;
				const prog = localStorage.getItem("progress");
				let progress: null | ProgressType = null;

				if (prog) {
					progress = JSON.parse(prog) as ProgressType;
				} else {
					progress = PROGRESS;
				}

				const progDept = progress[department];

				for (let i = 0; i < theTruth.length; ++i) {
					const truth = theTruth[i];
					const isCorrect = answers[i] === truth.answer;

					if (!isCorrect) {
						canGoNext = false;
					} else {
						const isPrevCorrect = progDept[`q${i + 1}`];

						if (!isPrevCorrect) {
							gainedPoints += 2;
							progDept[`q${i + 1}`] = true;
						}
					}

					qa.push({
						answer: truth.answer,
						isCorrect,
						question: truth.question,
					});
				}

				progress.totalPoints = progress.totalPoints + gainedPoints;

				localStorage.setItem("progress", JSON.stringify(progress));

				setResult({
					canGoNext,
					qa: qa,
					gainedPoints,
				});
				setIsSubmit(true);
				setCounter(undefined);
				localStorage.removeItem("__questions__");
			}
		} else {
			setDirection(1);
			setQuestion((prev) => prev + 1);
		}
	}

	function handlePrev() {
		if (question <= 0) {
			return;
		}
		setDirection(0);
		setQuestion((prev) => prev - 1);
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

	function getTitle(res: QAResultType) {
		const gp = res.gainedPoints;

		if (res.canGoNext) {
			return (
				<div>
					<h3 className="text-lg font-bold">Congrats!!!</h3>
					<p>
						You've successfully cleared {department} department. You gained +
						{gp}
					</p>
				</div>
			);
		}
		return (
			<div>
				<h3 className="text-lg font-bold">QA Finished</h3>
				<p>
					{gp >= 2
						? `You've gained +${gp} points, but unfortunately your current points is insufficient to unlock new department.`
						: "You don't gained any points, try again I know you can clear this department😉."}
				</p>
			</div>
		);
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
				{counter && (
					<div className="pb-12">
						<p
							className={twMerge(
								"text-3xl font-bold drop-shadow-2xl",
								counter <= 10 ? "text-red-500" : "text-white",
							)}>
							{counter}
						</p>
					</div>
				)}
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
							className="w-full h-full">
							<QuizOption
								quiz={QUESTIONS[department][question]}
								key={`${department}-${question}`}
								filler={getFiller()}
							/>
						</motion.div>
					</AnimatePresence>
					{/* <button className="fixed top-[49vh] right-1 text-white">Next</button> */}
					<div className="w-full flex justify-between items-center max-w-xs md:max-w-lg px-4 space-x-4">
						<Button
							text="Previous"
							onClick={handlePrev}
							disabled={question === 0}
						/>
						<Button
							text={question !== 4 ? "Next" : "Submit"}
							onClick={handleNext}
						/>
					</div>
				</div>
			</div>

			{/* <div className="absolute inset-0 z-10 flex items-center justify-center flex-col bg-white overflow-y-auto"> */}
			{isSubmit && result && (
				<AlertModal
					open={isSubmit}
					dismissable={false}
					setOpen={setIsSubmit}
					className="p-10 py-7 overflow-y-auto flex flex-col space-y-4">
					{getTitle(result)}
					{result.qa.map((q, index) => (
						<SubmitModal q={q} key={q.question} num={index + 1} />
					))}
					<div className="w-full flex justify-end items-center gap-2 mt-2 flex-col md:flex-row">
						<Button text={result.canGoNext ? "Play next" : "Try again"} />
						{/* <Button variant="ghost" text="Go back" /> */}
						<LinkButton to="/maps" variant="ghost">
							Go back
						</LinkButton>
					</div>
				</AlertModal>
			)}
			{/* </div> */}
		</div>
	);
}

interface SubmitModalProps {
	q: QATypes;
	num: number;
}

function SubmitModal({ q, num }: SubmitModalProps) {
	return (
		<div className="w-full h-full text-sm">
			<p>
				{num}.&#41; {q.question}
			</p>
			<p
				className={twMerge(
					!q.isCorrect ? "line-through text-red-500" : "text-green-500",
					"flex items-center space-x-2",
				)}>
				<span>{q.answer}</span>
				{q.isCorrect ? <CheckIcon /> : <CloseIcon />}
			</p>
		</div>
	);
}

export default Map;
