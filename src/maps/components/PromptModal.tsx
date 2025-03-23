import { Fragment } from "react/jsx-runtime";
import Button from "../../components/Button";
import LinkButton from "../../components/LinkButton";
import { Departments, DepartmentType, ProgressType } from "../../types";
import { PROGRESS } from "../../constants";
import { DEPARTMENT_LEVEL } from "../../constants/history";

interface Props {
	department: DepartmentType;
	onClose: () => void;
}
function PromptModal({ department, onClose }: Props) {
	const prog = localStorage.getItem("progress");
	let progress: ProgressType = PROGRESS;

	if (prog) {
		progress = JSON.parse(prog) as ProgressType;
	}

	function getNextDept() {
		const values = Object.values(Departments);
		const index = values.indexOf(department.name);
		const d = values[index + 1]; // access the next department that the user currently playing.
		return Departments[d];
	}

	function getDeptPoint() {
		const deptStat = progress[department.name];
		let noOfCorrectAns = 0;
		for (let i = 1; i <= 5; ++i) {
			if (deptStat[`q${i}`] === true) {
				noOfCorrectAns += 1;
			}
		}

		/**
		 * Since each department has 10 points, we can get the difference of 10 to the correct answer that the user has made.
		 */
		return 10 - noOfCorrectAns;
	}

	function getPointsNeeds() {
		const tp = progress.totalPoints;
		const reqPoints = DEPARTMENT_LEVEL[department.name];

		return reqPoints - tp;
	}

	return (
		<Fragment>
			<h2 className="font-bold md:text-2xl">Department: {department.name}</h2>
			<ul className="list-disc list-inside text-sm md:text-base">
				<li>
					Department points:{" "}
					<span className="font-semibold text-[var(--primary-color)]">
						{getDeptPoint()}
					</span>
				</li>
				<li>
					Next department is{" "}
					<span className="font-semibold text-[var(--primary-color)]">
						{getNextDept()}
					</span>
					.
				</li>
				<li>
					Points needs to unlock next department:{" "}
					<span className="font-semibold text-[var(--primary-color)]">
						{getPointsNeeds()}
					</span>
				</li>
			</ul>
			<div className="w-full flex justify-end items-center gap-2 mt-4 flex-col md:flex-row">
				{/* <Button text="Play" className="md:w-fit px-5" variant="primary" /> */}
				<LinkButton
					to={`/maps/${encodeURIComponent(department.name)}`}
					className="w-full text-center md:w-fit px-5 cursor-pointer bg-primary py-3 rounded-lg text-white text-sm">
					Play
				</LinkButton>
				<Button
					text="Cancel"
					onClick={onClose}
					className="md:w-fit px-5"
					variant="ghost"
				/>
			</div>
		</Fragment>
	);
}

export default PromptModal;
