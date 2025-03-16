import { ChangeEvent, useEffect, useRef, useState } from "react";

function BackgroundAudio() {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [volume, setVolume] = useState(0.5); // Default volume at 50%

	// Handle volume change
	const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newVolume = parseFloat(e.target.value);
		setVolume(newVolume);
		if (audioRef.current) {
			audioRef.current.volume = newVolume;
		}
	};

	// Ensure audio element volume updates when state changes
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = volume;
		}
	}, [volume]);

	// Play audio on first user interaction (required by browsers for autoplay)
	useEffect(() => {
		const playAudio = () => {
			audioRef.current
				?.play()
				.catch((error) => console.error("Playback error:", error));
		};

		document.addEventListener("click", playAudio, { once: true });

		return () => {
			document.removeEventListener("click", playAudio);
		};
	}, []);

	return (
		<div className="fixed bottom-4 left-4 p-2 bg-white z-10 bg-opacity-80 rounded shadow-md ">
			<audio ref={audioRef} src="/Kalimutan Ka.mp3" loop />
			<label className="block mb-1 text-sm font-medium">
				Volume: {Math.round(volume * 100)}%
			</label>
			<input
				type="range"
				min="0"
				max="1"
				step="0.01"
				value={volume}
				onChange={handleVolumeChange}
				className="w-40"
			/>
		</div>
	);
}

export default BackgroundAudio;
