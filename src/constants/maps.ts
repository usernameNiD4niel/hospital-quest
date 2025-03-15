import { DepartmentType } from "../types";

export const ER_COOR_CLASS =
	"absolute z-10 top-[calc(100vh-(50vh+60px))] md:top-[calc(100vh-(50vh+90px))] right-[15vw] md:right-[16vw]"; // Emergency Room
export const OR_COOR_CLASS =
	"absolute z-10 top-[calc(100vh-(50vh-10px))] md:top-[calc(100vh-(50vh-50px))] right-[27vw] md:right-[25vw]"; // Operating Room
export const DR_OB_COOR_CLASS =
	"absolute z-10 bottom-[39vh] landscape:bottom-[16vh] md:bottom-[16vh] right-[calc(53vw+10px)] md:right-[calc(53vw+10px)]"; // Delivery Room/Obgyne
export const OPD_COOR_CLASS =
	"absolute z-10 bottom-[43vh] left-[calc(20vw+10px)]"; // Out-patient Department
export const SW_COOR_CLASS = "absolute z-10 top-[19vh] right-[27vw]"; // Surgical Wards
export const LAB_COOR_CLASS = "absolute z-10 top-[5vh] right-[48vw]"; // Laboratory
export const MW_COOR_CLASS = "absolute z-10 top-[19vh] left-[32vw]"; // Medical Ward

export const MAPS: DepartmentType[] = [
	{
		id: 1,
		name: "Emergency Room",
		isCleared: false,
		isLocked: false,
		className: ER_COOR_CLASS,
	},
	{
		id: 2,
		name: "Operating Room",
		isCleared: false,
		isLocked: true,
		className: OR_COOR_CLASS,
	},
	{
		id: 3,
		name: "Delivery Room/Obgyne",
		isCleared: false,
		isLocked: true,
		className: DR_OB_COOR_CLASS,
	},
	{
		id: 4,
		name: "Out-patient Department",
		isCleared: false,
		isLocked: true,
		className: OPD_COOR_CLASS,
	},
	{
		id: 5,
		name: "Surgical Wards",
		isCleared: false,
		isLocked: true,
		className: SW_COOR_CLASS,
	},
	{
		id: 6,
		name: "Laboratory",
		isCleared: false,
		isLocked: true,
		className: LAB_COOR_CLASS,
	},
	{
		id: 7,
		name: "Medical Ward",
		isCleared: false,
		isLocked: true,
		className: MW_COOR_CLASS,
	},
];
