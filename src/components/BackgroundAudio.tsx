import { ChangeEvent, useEffect, useRef, useState } from "react";

function BackgroundAudio() {
	const audioRef = useRef<HTMLAudioElement>(null);
	
	// Play audio on first user interaction (required by browsers for autoplay)
	// useEffect(() => {
	// 	const playAudio = () => {
	// 		audioRef.current
	// 			?.play()
	// 			.catch((error) => console.error("Playback error:", error));
	// 	};

	// 	document.addEventListener("click", playAudio, { once: true });

	// 	return () => {
	// 		document.removeEventListener("click", playAudio);
	// 	};
	// }, []);

	return (
		<div className="fixed bottom-4 left-4 p-2 bg-white z-10 bg-opacity-80 rounded shadow-md ">
			<audio ref={audioRef} src="/Kalimutan Ka.mp3" loop />
		</div>
	);
}

export default BackgroundAudio;
