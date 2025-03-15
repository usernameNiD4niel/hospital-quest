import { MAPS } from "../../constants/maps";
import { profiles } from "../../constants";
import ActiveDept from "./ActiveDept";
import ClearedDept from "./ClearedDept";
import LockedDept from "./LockedDept";

function Coordinate() {
	const playerMap_ = localStorage.getItem("playerMap");
	let currentIndex = localStorage.getItem("currentIndex");
	let playerMap = MAPS;

	if (!currentIndex) {
		currentIndex = "0";
		localStorage.setItem("currentIndex", currentIndex);
	}

	if (playerMap_) {
		playerMap = JSON.parse(playerMap_.toString());
	}

	const profile = profiles[Number(currentIndex)];

	return (
		<div className="grid grid-cols-3 gap-2">
			{playerMap.map((map) => {
				if (!map.isCleared && !map.isLocked) {
					return <ActiveDept department={map} key={map.id} profile={profile} />;
				}

				if (map.isLocked && !map.isCleared) {
					return <LockedDept department={map} key={map.id} />;
				}

				return <ClearedDept department={map} key={map.id} />;
			})}
		</div>
	);
}

export default Coordinate;
