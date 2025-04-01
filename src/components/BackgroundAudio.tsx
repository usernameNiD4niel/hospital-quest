import { ChangeEvent, useEffect, useRef, useState } from "react";
import AlertModal from "./AlertModal";
import { profiles } from "../constants";
import { ProgressType } from "../types";
import Button from "./Button";
import DisplaySettings from "./DisplaySettings";

function BackgroundAudio() {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [open, setOpen] = useState(false);

	// Play audio on first user interaction (required by browsers for autoplay)
	useEffect(() => {
		const playAudio = () => {
			const { current } = audioRef;

			if (current) {
				current
					.play()
					.catch((error) => console.error("Playback error:", error));
				current.volume = 0.2;
			}
		};

		document.addEventListener("click", playAudio, { once: true });

		return () => {
			document.removeEventListener("click", playAudio);
		};
	}, []);

	const handleClick = () => {
		setOpen(true);
	};

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const volume = parseFloat(e.target.value);

		const { current } = audioRef;
		if (current) {
			current.volume = volume;
		}
	};

	return (
		<div className="fixed top-4 right-4 p-2 bg-white z-10 bg-opacity-80 rounded shadow-md">
			<button
				onClick={handleClick}
				className="flex items-center space-x-1 cursor-pointer text-sm justify-center">
				<DisplaySettings />
				<span className="hidden md:block">Settings</span>
			</button>
			<audio ref={audioRef} src="/thankyou.mp3" loop hidden />

			<AlertModal open={open} setOpen={setOpen}>
				<DisplaySettingsDialog
					handleOnChange={handleOnChange}
					setOpen={setOpen}
				/>
			</AlertModal>
		</div>
	);
}

interface DisplaySettingsDialogProps {
	handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
	setOpen: (value: boolean) => void;
}

function DisplaySettingsDialog({
	handleOnChange,
	setOpen,
}: DisplaySettingsDialogProps) {
	const getName = () => {
		const name = localStorage.getItem("name") || "Anonymous User";
		return name;
	};

	const getAvatar = () => {
		const avatar = Number(localStorage.getItem("currentIndex")) || 0;
		const profile = profiles[avatar];

		return (
			<img
				src={`${profile.url}`}
				className="w-40 h-40 rounded-full object-cover"
				alt={profile.alt}
			/>
		);
	};

	const getGameStats = () => {
		const progress = localStorage.getItem("progress");

		if (progress) {
			const stats = JSON.parse(progress) as ProgressType;
			const curDept = stats.currentDepartment;
			const deptIndex = stats.progress.findIndex(
				(prog) => prog.department === curDept,
			);

			if (deptIndex === -1) {
				return null;
			}

			return (
				<div className="w-full px-2">
					<p>
						Gained Stars: <span className="underline">{stats.totalStars}</span>
					</p>
					<p>
						Current Department: <span className="underline">{curDept}</span>
					</p>
					<p>
						Stars Gained to {curDept}:{" "}
						<span className="underline">{stats.progress[deptIndex].stars}</span>
					</p>
				</div>
			);
		}

		return null;
	};

	const handleResetAccount = () => {
		localStorage.clear();
		window.location.reload();
	};

	const handleCancel = () => {
		setOpen(false);
	};

	return (
		<div className="flex w-full items-center space-y-8 flex-col py-4 px-2 z-50">
			<div className="w-full flex items-center justify-center space-x-1 flex-col">
				{getAvatar()}
				<p className="capitalize font-semibold text-xl">{getName()}</p>
			</div>
			<div className="w-full space-y-1">
				<DisplayHeader text="Game Stats" />
				{getGameStats()}
			</div>

			<div className="w-full space-y-1">
				<DisplayHeader text="Game Audio" />
				<p className="px-2 flex items-center space-y-2">
					<span>Volume:</span>
					<input
						type="range"
						min={0}
						step={"0.01"}
						defaultValue={"0.3"}
						max={1}
						onChange={handleOnChange}
					/>
				</p>
			</div>

			<div className="w-full flex justify-end items-center flex-col md:flex-row gap-2">
				<Button
					variant="destructive"
					className="w-full md:w-fit px-4"
					text="ResetAccount"
					onClick={handleResetAccount}
				/>
				<Button
					variant="ghost"
					text="Cancel"
					className="w-full md:w-fit px-4"
					onClick={handleCancel}
				/>
			</div>
		</div>
	);
}

interface DisplayHeaderProps {
	text: string;
}

function DisplayHeader({ text }: DisplayHeaderProps) {
	return (
		<p className="bg-zinc-500 px-2 py-1 text-white font-medium text-lg">
			{text}
		</p>
	);
}

export default BackgroundAudio;
