import { useEffect, useState } from "react";

function Modal() {
	const [open, setOpen] = useState(true);

	const onClose = () => {
		setOpen(false);
	};

	const onClick = () => {
		console.log("executed onClick!");
		// show other page of the question...
		setOpen(false);
	};

	return (
		<div
			className={`fixed z-10 top-0 right-0 left-0 bottom-0 flex items-center justify-center ${
				!open && "hidden"
			}`}>
			<div
				className={`w-full h-screen bg-black absolute opacity-40`}
				onClick={onClose}
			/>
			<dialog
				className="w-[400px] relative p-6 rounded flex flex-col space-y-2"
				open={open}>
				<h2 className="text-lg font-bold text-purple-600">Congratulations!</h2>
				<p>
					You've answered the question correctly. You gain +2 points, keep up
					the good work!
				</p>
				<TimerButton
					onClick={onClick}
					className="w-full py-2 rounded-md text-center text-white bg-purple-600 mt-4 hover:bg-purple-700 cursor-pointer"
				/>
			</dialog>
		</div>
	);
}

interface TimerButtonProps {
	className?: string;
	onClick: () => void;
}

function TimerButton({ onClick, className }: TimerButtonProps) {
	const [seconds, setSeconds] = useState(3);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			} else {
				onClick();
			}
		}, 1000);

		return () => clearTimeout(timer);
	}, [onClick, seconds]);

	return (
		<button className={className} onClick={onClick}>
			Timer {seconds}
		</button>
	);
}

export default Modal;
