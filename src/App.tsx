import { useEffect } from "react";
import "./App.css";
import Loading from "./components/Loading";
import { useNavigate } from "react-router-dom";
import { PROGRESS } from "./constants";
import { ProgressType } from "./types";

const App = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const progress = localStorage.getItem("progress");

		if (!progress) {
			// This is important since on the QA UI we assume that progress is present.
			localStorage.setItem("progress", JSON.stringify(PROGRESS));
		} else {
			const prog = JSON.parse(progress) as ProgressType;

			if (!prog.totalStars) {
				localStorage.setItem("progress", JSON.stringify(PROGRESS)); // Since the user might played this game before the progress has been mutate.
			}
		}

		const timeout = setTimeout(() => {
			navigate("/on-boarding");
		}, 2000);

		return () => clearTimeout(timeout);
	}, [navigate]);

	return <Loading />;
};

export default App;
