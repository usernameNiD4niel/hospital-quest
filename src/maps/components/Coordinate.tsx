import { MAPS } from "../../constants/maps";
import { profiles } from "../../constants";
import ActiveDept from "./ActiveDept";
import ClearedDept from "./ClearedDept";
import LockedDept from "./LockedDept";
import { DepartmentType, ProgressType } from "../../types";

function Coordinate() {
	let currentIndex = localStorage.getItem("currentIndex");

	if (!currentIndex) {
		currentIndex = "0";
		localStorage.setItem("currentIndex", currentIndex);
	}

	const profile = profiles[Number(currentIndex)];

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
					MAPS[i].isActive = progress.currentDepartment === MAPS[i].name; // if true, then this department is the highest dept user can play as of now.
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
