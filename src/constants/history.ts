import { Departments, ProgressType } from "../types";

export const PROGRESS: ProgressType = {
	totalPoints: 0,
	currentDepartment: Departments["Emergency Room"],
	"Emergency Room": {
		q1: false,
		q2: false,
		q3: false,
		q4: false,
		q5: false,
	},
	"Delivery Room/Obgyne": {
		q1: false,
		q2: false,
		q3: false,
		q4: false,
		q5: false,
	},
	"Operating Room": {
		q1: false,
		q2: false,
		q3: false,
		q4: false,
		q5: false,
	},
	"Out-patient Department": {
		q1: false,
		q2: false,
		q3: false,
		q4: false,
		q5: false,
	},
	"Surgical Wards": {
		q1: false,
		q2: false,
		q3: false,
		q4: false,
		q5: false,
	},
	Laboratory: {
		q1: false,
		q2: false,
		q3: false,
		q4: false,
		q5: false,
	},
	"Medical Ward": {
		q1: false,
		q2: false,
		q3: false,
		q4: false,
		q5: false,
	},
};
