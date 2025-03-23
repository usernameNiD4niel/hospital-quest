import { MAPS } from "../../constants/maps";
import { profiles } from "../../constants";
import ActiveDept from "./ActiveDept";
import ClearedDept from "./ClearedDept";
import LockedDept from "./LockedDept";
import { DepartmentType, ProgressType } from "../../types";
import { DEPARTMENT_LEVEL } from "../../constants/history";

function Coordinate() {
	let currentIndex = localStorage.getItem("currentIndex");

	if (!currentIndex) {
		currentIndex = "0";
		localStorage.setItem("currentIndex", currentIndex);
	}

	const profile = profiles[Number(currentIndex)];

	function isInRange(totalPoints: number, reqPoints: number): boolean {
		return totalPoints >= reqPoints - 8 && totalPoints <= reqPoints;
	}

	function updateMap(): DepartmentType[] {
		const prog = localStorage.getItem("progress");

		if (prog) {
			const progress = JSON.parse(prog) as ProgressType;

			for (let i = 0; i < MAPS.length; i++) {
				//
				const dept = progress[MAPS[i].name]; // get specific dept from progress.
				MAPS[i].isCleared = dept.isCleared; // modify the map arrays `isCleared`

				const totalPoints = progress.totalPoints;
				const reqPoints = DEPARTMENT_LEVEL[MAPS[i].name]; // get the required points.
				MAPS[i].isActive = isInRange(totalPoints, reqPoints); // if true, then this department is is highest dept user can play as of now.
			}
		}

		return MAPS;
	}

	return (
		<div className="grid grid-cols-3 gap-2">
			{updateMap().map((map) => {
				if (map.isActive) {
					return <ActiveDept department={map} key={map.id} profile={profile} />;
				}

				if (!map.isCleared) {
					return <LockedDept department={map} key={map.id} />;
				}

				return <ClearedDept department={map} key={map.id} />;
			})}
		</div>
	);
}

export default Coordinate;
