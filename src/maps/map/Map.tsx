import FarmMapWeb from "../../assets/farm-map-web.webp";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
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
import { DEPARTMENT_LEVEL } from "../../constants/history";
import BackButton from "../../components/BackButton";

function Map() {
	const [counter, setCounter] = useState<undefined | number>(undefined);
	const [direction, setDirection] = useState(1);
	const [question, setQuestion] = useState(0);
	const location = useLocation();
	const [result, setResult] = useState<QAResultType>();
	const [isSubmit, setIsSubmit] = useState(false);
	const navigate = useNavigate();

	const splittedPath = location.pathname.split("/");
	const department = decodeURIComponent(
		splittedPath[splittedPath.length - 1],
	) as Departments;

	useEffect(() => {
		if (counter === undefined || counter <= 0) {
			return;
		}
		const t = setInterval(() => {
			setCounter((prev) => prev && prev - 1);
		}, 1000);

		return () => {
			clearInterval(t);
		};
	}, [counter]);

	useEffect(() => {
		if (question === 3) {
			setCounter(30);
		}
	}, [question]);

	useEffect(() => {
		const name = localStorage.getItem("name");
		const currentIndex = localStorage.getItem("currentIndex");

		if (!name || !currentIndex) {
			navigate(`/on-boarding?to=/maps/${encodeURIComponent(department)}`);
		}
	}, [navigate, department]);

	function reset() {
		setCounter(30);
		localStorage.removeItem("__questions__");
		setQuestion(0);
		setIsSubmit(false);
		setResult(undefined);
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
				let noOfCorrect = 0;
				const prog = localStorage.getItem("progress");
				let progress: null | ProgressType = null;

				if (prog) {
					progress = JSON.parse(prog) as ProgressType;
				} else {
					progress = PROGRESS;
				}
				for (let i = 0; i < theTruth.length; ++i) {
					const truth = theTruth[i];
					const isCorrect = answers[i] === truth.answer;

					if (isCorrect) {
						++noOfCorrect;
					}

					qa.push({
						answer: answers[i],
						isCorrect,
						question: truth.question,
					});
				}
				
				const deptIndex = progress.progress.findIndex(prog => prog.department === department); // if the current question answered the question correctly before.
				console.log('dept index', JSON.stringify(deptIndex, null, 2));
				
				if(deptIndex !== -1) {
					const finalProgress = progress.progress[deptIndex];
					const prevStars = finalProgress.stars > noOfCorrect ? finalProgress.stars : noOfCorrect;
					progress.progress[deptIndex].stars = prevStars;
					console.log('no of correct', noOfCorrect, 'no of prev stars', finalProgress.stars);
					const ts = (progress.totalStars - finalProgress.stars);
					console.log('total stars', progress.totalStars, 'final progress', finalProgress.stars);
					progress.totalStars = (ts > 0 ? ts : 0) + prevStars;

				} else {
					// First time playing this department
					progress.progress.push({
						department,
						stars: noOfCorrect
					});
					progress.totalStars += noOfCorrect;
				}

				const level = DEPARTMENT_LEVEL[progress.currentDepartment];
				const currDept = progress.currentDepartment;

				/**
				 * We do this even though the user already unlocked the department that they are playing, we don't know if they've perfectly answered the question.
				 * If not then they can gain at least 2 points to that department resulting of points increase.
				 */
				if (progress.totalStars >= level) {
					// Means user unlock new department.
					const deptKeys = Object.keys(DEPARTMENT_LEVEL) as Departments[];
					const index = deptKeys.indexOf(currDept);
					progress.currentDepartment = deptKeys[index + 1];
				}

				localStorage.setItem("progress", JSON.stringify(progress));

				setResult({
					canGoNext: noOfCorrect >= 4,
					qa: qa,
					gainedPoints: noOfCorrect,
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
						You've successfully cleared{" "}
						<span className="font-semibold">{department}</span> department. You
						gained +<span className="font-semibold">{gp}</span>
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

	function getTitleNoResult() {
		return (
			<div>
				<h3 className="text-lg font-bold">Times up⌚!</h3>
				<p>
					You don't gained any points, try again I know you can clear this
					department master😉.
				</p>
			</div>
		);
	}

	function handlePlayNext(res: QAResultType) {
		if (res.canGoNext) {
			const deptVals = Object.values(Departments);
			const index = deptVals.indexOf(department);
			const d = deptVals[index + 1]; // access the next department that the user currently playing.
			const url = `/maps/${d}`;
			reset();
			navigate(url);
		} else {
			reset();
		}
	}

	return (
		<div className="overflow-y-hidden relative">
			<img
				src={FarmMapWeb}
				alt="Farm map image"
				width={2500}
				height={2500}
				className="w-screen h-screen hidden md:block"
				loading="eager"
			/>
			<img
				src="/farm-map.webp"
				alt="Game map"
				width={2200}
				height={2200}
				className="h-screen w-screen md:hidden"
				loading="eager"
			/>

			<DisplayDepartment department={department} />

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

			{isSubmit && result && (
				<AlertModal
					open={isSubmit}
					dismissable={false}
					closable={false}
					setOpen={setIsSubmit}
					className="p-10 py-7 overflow-y-auto flex flex-col space-y-4">
					{getTitle(result)}
					{result.qa.map((q, index) => (
						<SubmitModal q={q} key={q.question} num={index + 1} />
					))}
					<div className="w-full flex justify-end items-center gap-2 mt-2 flex-col md:flex-row">
						<Button
							text={result.canGoNext ? "Play next" : "Try again"}
							onClick={() => handlePlayNext(result)}
						/>
						<LinkButton to="/maps" variant="ghost">
							Go back
						</LinkButton>
					</div>
				</AlertModal>
			)}
			{counter === 0 && !isSubmit && (
				<AlertModal
					dismissable={false}
					closable={false}
					className="p-10 py-7 overflow-y-auto flex flex-col space-y-4">
					{getTitleNoResult()}
					<div className="w-full flex justify-end items-center gap-2 mt-2 flex-col md:flex-row">
						<Button text={"Try again"} onClick={() => reset()} />
						{/* <Button variant="ghost" text="Go back" /> */}
						<LinkButton to="/maps" variant="ghost">
							Go back
						</LinkButton>
					</div>
				</AlertModal>
			)}
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

interface DisplayDepartmentProps {
	department: Departments;
}

function DisplayDepartment({ department }: DisplayDepartmentProps) {
	return (
		<div className="w-full fixed top-0 px-4 left-0 right-0 py-4 flex items-center bg-gradient-to-br from-black z-20 justify-between">
			<BackButton svgFill="#ffffff" className="text-white">
				Back
			</BackButton>
			<h2 className="text-white text-xl font-bold">{department}</h2>
			<div />
		</div>
	);
}

export default Map;
