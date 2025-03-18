import { Fragment, useState } from "react";
import Modal from "./Modal";
import { twMerge } from "tailwind-merge";

function QuizPad() {
	const [selectedTexts, setSelectedTexts] = useState<string[]>([]);

	const answer = ["B", "O", "T"];

	const isCorrect = () => {
		const al = answer.length;
		const sl = selectedTexts.length;
		if (al !== sl) {
			return undefined;
		}
		return selectedTexts.every(
			(selectedText, index) => selectedText === answer[index],
		);
	};

	return (
		<div className="w-full flex flex-col items-center justify-center">
			<div className="flex items-center gap-x-2 mt-6 justify-center w-full relative">
				<div className={`flex items-center gap-x-2`}>
					{answer.map((i, index) => (
						<Fragment key={`${i}-${index}`}>
							<Input
								selectedText={selectedTexts[index]}
								index={index}
								selectedTexts={selectedTexts}
								setSelectedTexts={setSelectedTexts}
							/>
						</Fragment>
					))}
				</div>
				<Reset setSelectedTexts={setSelectedTexts} />
			</div>
			<div className={twMerge("w-full mt-4 flex gap-2 flex-wrap justify-center", "md:max-w-[350px]")}>
				<Button
					letter="A"
					selectedTexts={selectedTexts}
					setSelectedTexts={setSelectedTexts}
					length={answer.length}
				/>
				<Button
					letter="B"
					selectedTexts={selectedTexts}
					setSelectedTexts={setSelectedTexts}
					length={answer.length}
				/>
				<Button
					letter="C"
					selectedTexts={selectedTexts}
					setSelectedTexts={setSelectedTexts}
					length={answer.length}
				/>
				<Button
					letter="J"
					selectedTexts={selectedTexts}
					setSelectedTexts={setSelectedTexts}
					length={answer.length}
				/>

				<Button
					letter="T"
					selectedTexts={selectedTexts}
					setSelectedTexts={setSelectedTexts}
					length={answer.length}
				/>
				<Button
					letter="B"
					selectedTexts={selectedTexts}
					setSelectedTexts={setSelectedTexts}
					length={answer.length}
				/>
				<Button
					letter="C"
					selectedTexts={selectedTexts}
					setSelectedTexts={setSelectedTexts}
					length={answer.length}
				/>
				<Button
					letter="J"
					selectedTexts={selectedTexts}
					setSelectedTexts={setSelectedTexts}
					length={answer.length}
				/>

				<Button
					letter="T"
					selectedTexts={selectedTexts}
					setSelectedTexts={setSelectedTexts}
					length={answer.length}
				/>
				<Button
					letter="U"
					selectedTexts={selectedTexts}
					setSelectedTexts={setSelectedTexts}
					length={answer.length}
				/>
				<Button
					letter="V"
					selectedTexts={selectedTexts}
					setSelectedTexts={setSelectedTexts}
					length={answer.length}
				/>
				<Button
					letter="W"
					selectedTexts={selectedTexts}
					setSelectedTexts={setSelectedTexts}
					length={answer.length}
				/>
				<Button
					letter="X"
					selectedTexts={selectedTexts}
					setSelectedTexts={setSelectedTexts}
					length={answer.length}
				/>
				<Button
					letter="Y"
					selectedTexts={selectedTexts}
					setSelectedTexts={setSelectedTexts}
					length={answer.length}
				/>
				<Button
					letter="Z"
					selectedTexts={selectedTexts}
					setSelectedTexts={setSelectedTexts}
					length={answer.length}
				/>
			</div>

			{isCorrect() && <Modal />}
		</div>
	);
}

interface ResetProps {
	setSelectedTexts: (selectedTexts: string[]) => void;
}

function Reset({ setSelectedTexts }: ResetProps) {
	function handleReset() {
		setSelectedTexts([]);
	}
	return (
		<button onClick={handleReset}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="800px"
				height="800px"
				viewBox="0 0 24 24"
				className="w-6 h-6 hover:cursor-pointer">
				<path
					d="M22.719 12A10.719 10.719 0 0 1 1.28 12h.838a9.916 9.916 0 1 0 1.373-5H8v1H2V2h1v4.2A10.71 10.71 0 0 1 22.719 12z"
					stroke="#fb2c36"
				/>
				<path fill="none" d="M0 0h24v24H0z" />
			</svg>
		</button>
	);
}

interface InputProps {
	selectedText: string;
	index: number;
	selectedTexts: string[];
	setSelectedTexts: (selectedTexts: string[]) => void;
}

function Input({
	selectedText,
	index,
	setSelectedTexts,
	selectedTexts,
}: InputProps) {
	function onRemove() {
		const updatedTexts = [...selectedTexts];
		updatedTexts[index] = "";
		setSelectedTexts(updatedTexts);
	}

	return (
		<button
			className={`text-[var(--primary-color)] w-16 h-16 rounded-md text-sm font-bold md:text-xl hover:cursor-pointer ${selectedText
				? "bg-[var(--primary-color)] text-white border-0"
				: "bg-[#4fb7ff]/70 border-2 border-[#4fb7ff]"
				}`}
			onClick={onRemove}>
			{selectedText}
		</button>
	);
}

interface ButtonProps {
	letter: string;
	setSelectedTexts: (selectedTexts: string[]) => void;
	selectedTexts: string[];
	length: number;
}

function Button({
	letter,
	setSelectedTexts,
	selectedTexts,
	length,
}: ButtonProps) {
	function onClick() {
		console.log(selectedTexts.toString());
		for (let i = 0; i < length; ++i) {
			if (selectedTexts[i] === "") {
				const updatedTexts = [...selectedTexts];
				updatedTexts[i] = letter;
				setSelectedTexts(updatedTexts);
				return;
			}
		}

		if (selectedTexts.length >= length) {
			return;
		}

		setSelectedTexts([...selectedTexts, letter]);
	}

	return (
		<button
			className="bg-[var(--primary-color)] w-14 h-14 md:w-16 md:h-16 rounded-md text-white text-sm md:text-xl hover:cursor-pointer"
			onClick={onClick}>
			{letter}
		</button>
	);
}

export default QuizPad;
