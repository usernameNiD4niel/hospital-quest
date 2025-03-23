import { DepartmentLevelType, Departments, ProgressType } from "../types";

export const PROGRESS: ProgressType = {
	totalPoints: 0,
	currentDepartment: Departments["Emergency Room"],
	"Emergency Room": {
		q1: false,
		q2: false,
		q3: false,
		q4: false,
		q5: false,
		isCleared: false,
	},
	"Delivery Room/Obgyne": {
		q1: false,
		q2: false,
		q3: false,
		q4: false,
		q5: false,
		isCleared: false,
	},
	"Operating Room": {
		q1: false,
		q2: false,
		q3: false,
		q4: false,
		q5: false,
		isCleared: false,
	},
	"Out-patient Department": {
		q1: false,
		q2: false,
		q3: false,
		q4: false,
		q5: false,
		isCleared: false,
	},
	"Surgical Wards": {
		q1: false,
		q2: false,
		q3: false,
		q4: false,
		q5: false,
		isCleared: false,
	},
	Laboratory: {
		q1: false,
		q2: false,
		q3: false,
		q4: false,
		q5: false,
		isCleared: false,
	},
	"Medical Ward": {
		q1: false,
		q2: false,
		q3: false,
		q4: false,
		q5: false,
		isCleared: false,
	},
};

export const DEPARTMENT_LEVEL: DepartmentLevelType = {
	"Emergency Room": 8,
	"Operating Room": 16,
	"Delivery Room/Obgyne": 24,
	"Out-patient Department": 32,
	"Surgical Wards": 40,
	Laboratory: 48,
	"Medical Ward": 56,
};
