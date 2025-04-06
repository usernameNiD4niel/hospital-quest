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
			const isMuted = localStorage.getItem("is-muted");

			if (current) {
				if (isMuted && isMuted === "true") {
					return; // do not allow user to play the audio.
				}
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
					audioRef={audioRef}
				/>
			</AlertModal>
		</div>
	);
}

interface DisplaySettingsDialogProps {
	handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
	setOpen: (value: boolean) => void;
	audioRef: React.RefObject<HTMLAudioElement | null>;
}

function DisplaySettingsDialog({
	handleOnChange,
	setOpen,
	audioRef,
}: DisplaySettingsDialogProps) {
	const [isMuted, setIsMuted] = useState(false);

	useEffect(() => {
		const isMuted_ = localStorage.getItem("is-muted");
		setIsMuted(isMuted_ !== null && isMuted_ === "true");
	}, []);

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

	const handleMute = () => {
		if (audioRef && audioRef.current) {
			if (isMuted) {
				localStorage.setItem("is-muted", "false");
				audioRef.current.play();
				setIsMuted(false);
			} else {
				localStorage.setItem("is-muted", "true");
				audioRef.current.pause();
				setIsMuted(true);
			}
		}
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
				<div className="w-full flex space-x-1 items-center px-2">
					<p>Mute:</p>
					<button className="hover:cursor-pointer" onClick={handleMute}>
						{isMuted ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="#fb2c36"
								width="40px"
								height="40px"
								viewBox="0 0 1024 1024">
								<path d="M542.86 294.4L362.3 430a10.72 10.72 0 0 0-2.71 3.25H255.53v153.2h104.06a10.58 10.58 0 0 0 2.71 3.25l180.56 135.52a10.83 10.83 0 0 0 17.34-8.66v-413.5a10.83 10.83 0 0 0-17.34-8.66zM742.6 599.41L765 577l-67.2-67.2 67.2-67.2-22.4-22.4-67.2 67.2-67.2-67.2-22.4 22.4 67.2 67.2-67.2 67.2 22.4 22.4 67.2-67.2 67.2 67.2z" />
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="#000000"
								width="20px"
								height="20px"
								viewBox="0 0 24 24">
								<path
									fill-rule="evenodd"
									d="M11.553 3.064A.75.75 0 0112 3.75v16.5a.75.75 0 01-1.255.555L5.46 16H2.75A1.75 1.75 0 011 14.25v-4.5C1 8.784 1.784 8 2.75 8h2.71l5.285-4.805a.75.75 0 01.808-.13zM10.5 5.445l-4.245 3.86a.75.75 0 01-.505.195h-3a.25.25 0 00-.25.25v4.5c0 .138.112.25.25.25h3a.75.75 0 01.505.195l4.245 3.86V5.445z"
								/>
								<path d="M18.718 4.222a.75.75 0 011.06 0c4.296 4.296 4.296 11.26 0 15.556a.75.75 0 01-1.06-1.06 9.5 9.5 0 000-13.436.75.75 0 010-1.06z" />
								<path d="M16.243 7.757a.75.75 0 10-1.061 1.061 4.5 4.5 0 010 6.364.75.75 0 001.06 1.06 6 6 0 000-8.485z" />
							</svg>
						)}
					</button>
				</div>
			</div>

			<div className="w-full flex justify-end items-center flex-col md:flex-row gap-2">
				<Button
					variant="destructive"
					className="w-full md:w-fit px-4"
					onClick={handleResetAccount}>
					ResetAccount
				</Button>
				<Button
					variant="ghost"
					className="w-full md:w-fit px-4"
					onClick={handleCancel}>
					Cancel
				</Button>
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
