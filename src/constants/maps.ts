import { DepartmentType } from "../types";

export const ER_COOR_CLASS =
	"absolute top-[calc(100vh-(48vh+45px))] md:top-[calc(100vh-(25vh+60px))] right-[39vw] md:right-[35vw]"; // Emergency Room
export const OR_COOR_CLASS =
	"absolute top-[calc(100vh-(42vh-10px))] md:top-[calc(100vh-(50vh-60px))] right-[60vw] md:right-[25vw]"; // Operating Room
export const DR_OB_COOR_CLASS =
	"absolute bottom-[23vh] md:bottom-[21vh] right-[calc(63vw+30px)] md:right-[52vw]"; // Delivery Room/Obgyne
export const OPD_COOR_CLASS =
	"absolute bottom-[31vh] md:bottom-[32vh] left-[45vw] md:left-[calc(30vw+10px)]"; // Out-patient Department
export const SW_COOR_CLASS = "absolute top-[55vh] md:top-[51vh] right-[28vw] md:right-[53vw]"; // Surgical Wards
export const LAB_COOR_CLASS = "absolute top-[49vh] md:top-[38vh] right-[69vw] md:right-[62vw]"; // Laboratory
export const MW_COOR_CLASS = "absolute top-[33vh] md:top-[25vh] left-[58vw] md:left-[53vw]"; // Medical Ward

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
