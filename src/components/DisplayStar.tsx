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
		const stars: JSX.Element[] = [];

		if (prog) {
			progress = JSON.parse(prog) as ProgressType;

			for (let i = 1; i <= 5; ++i) {
				if (progress[department][`q${i}`] === true) {
					stars.push(<FillStar pathFill="yellow" key={i} />);
				} else {
					stars.push(<Star pathFill="yellow" key={i} />);
				}
			}
		}

		return stars;
	}

	return <div className="w-full flex items-center">{getStars()}</div>;
}

export default DisplayStar;
