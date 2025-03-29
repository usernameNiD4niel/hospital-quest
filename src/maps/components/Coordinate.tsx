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
		/**
		 * ER: total stars = 4
		 * 	   required stars = 8
		 * 	   sub = 8 - 4
		 * We've placed this inside the loop so that the department required star will move the pointer.
		 */
		const req = reqPoints - totalPoints;
		return req >= 1 && req <= 4;
	}

	function updateMap(): DepartmentType[] {
		const prog = localStorage.getItem("progress");

		if (prog) {
			const progress = JSON.parse(prog) as ProgressType;

			for (let i = 0; i < MAPS.length; i++) {
				const deptIndex = progress.progress.findIndex(
					(prog) => prog.department === MAPS[i].name,
				);
				if (deptIndex !== -1) {
					const dept = progress.progress[deptIndex];
					const totalStars = progress.totalStars;
					const reqStars = DEPARTMENT_LEVEL[MAPS[i].name]; // get the required stars.
					MAPS[i].isActive = isInRange(totalStars, reqStars); // if true, then this department is is highest dept user can play as of now.
					MAPS[i].isCleared = dept.stars >= 4;
				}
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
