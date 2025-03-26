import { DepartmentLevelType, Departments, ProgressType } from "../types";

export const PROGRESS: ProgressType = {
	progress: [
		{
			department: Departments["Emergency Room"],
			stars: 0,
		},
		{
			department: Departments["Delivery Room/Obgyne"],
			stars: 0,
		},
		{
			department: Departments["Operating Room"],
			stars: 0,
		},
		{
			department: Departments["Out-patient Department"],
			stars: 0,
		},
		{
			department: Departments["Surgical Wards"],
			stars: 0,
		},
		{
			department: Departments["Laboratory"],
			stars: 0,
		},
		{
			department: Departments["Medical Ward"],
			stars: 0,
		}
	],
	totalStars: 0,
	currentDepartment: Departments["Emergency Room"],
};

export const DEPARTMENT_LEVEL: DepartmentLevelType = {
	"Emergency Room": 4,
	"Operating Room": 8,
	"Delivery Room/Obgyne": 12,
	"Out-patient Department": 16,
	"Surgical Wards": 20,
	Laboratory: 24,
	"Medical Ward": 28,
};
