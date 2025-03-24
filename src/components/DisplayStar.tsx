import { JSX } from "react";
import { Departments, ProgressType } from "../types";
import FillStar from "./FillStar";
import Star from "./Star";

interface Props {
	department: Departments;
}

function DisplayStar({ department }: Props) {
	function getStars() {
		const prog = localStorage.getItem("progress");
		let progress: ProgressType | null = null;
		const activeStars: JSX.Element[] = [];
		const inactiveStars: JSX.Element[] = [];

		if (prog) {
			progress = JSON.parse(prog) as ProgressType;
			console.log(JSON.stringify(progress[department], null, 2));

			for (let i = 1; i <= 5; ++i) {
				if (progress[department][`q${i}`] === true) {
					activeStars.push(<FillStar pathFill="yellow" key={i} />);
				} else {
					inactiveStars.push(<Star pathFill="yellow" key={i} />);
				}
			}
		}

		console.log(activeStars, inactiveStars);

		return [...activeStars, ...inactiveStars];
	}

	return (
		<div className="w-full flex items-center justify-center">{getStars()}</div>
	);
}

export default DisplayStar;
