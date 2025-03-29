import { Departments, DepartmentType, QuestionOptionsType } from "../types";

export const ER_COOR_CLASS =
	"absolute top-[calc(100vh-(48vh+10px))] md:top-[calc(100vh-(25vh+60px))] right-[40vw] md:right-[35vw]"; // Emergency Room
export const OR_COOR_CLASS =
	"absolute top-[calc(100vh-41vh)] md:top-[calc(100vh-(50vh-60px))] right-[60vw] md:right-[25vw]"; // Operating Room
export const DR_OB_COOR_CLASS =
	"absolute bottom-[23vh] md:bottom-[21vh] right-[calc(63vw+30px)] md:right-[52vw]"; // Delivery Room/Obgyne
export const OPD_COOR_CLASS =
	"absolute bottom-[31vh] md:bottom-[32vh] left-[45vw] md:left-[calc(30vw+10px)]"; // Out-patient Department
export const SW_COOR_CLASS =
	"absolute top-[55vh] md:top-[51vh] right-[28vw] md:right-[53vw]"; // Surgical Wards
export const LAB_COOR_CLASS =
	"absolute top-[49vh] md:top-[38vh] right-[69vw] md:right-[62vw]"; // Laboratory
export const MW_COOR_CLASS =
	"absolute top-[33vh] md:top-[25vh] left-[58vw] md:left-[53vw]"; // Medical Ward

export const ER_LINE_COOR_CLASS =
	"w-[90px] md:w-45 h-px bg-transparent border-t-4 border-t-green-500 absolute rotate-145 top-7 left-5 md:left-20 md:top-3 md:-rotate-[30deg]";
export const OR_LINE_COOR_CLASS =
	"w-[410px] h-px bg-transparent border-t-4 border-t-green-500 absolute rotate-160 left-1 top-13";
export const DR_OB_LINE_COOR_CLASS =
	"w-full h-px bg-transparent border-t-4 border-t-green-500 absolute -rotate-145 left-17 top-9";
export const OPD_LINE_COOR_CLASS =
	"w-72 rounded-full h-60 bg-transparent border-t-4 border-dashed border-green-500 absolute -top-3 left-3";
export const SW_LINE_COOR_CLASS =
	"w-72 rounded-full h-60 bg-transparent border-t-4 border-dashed border-green-500 absolute -top-3 left-3";
export const LAB_LINE_COOR_CLASS =
	"w-72 rounded-full h-60 bg-transparent border-t-4 border-dashed border-green-500 absolute -top-3 left-3";
export const MW_LINE_COOR_CLASS =
	"w-72 rounded-full h-60 bg-transparent border-t-4 border-dashed border-green-500 absolute -top-3 left-3";

export const MAPS: DepartmentType[] = [
	{
		id: 1,
		name: Departments["Emergency Room"],
		isCleared: false,
		className: ER_COOR_CLASS,
		lineClass: ER_LINE_COOR_CLASS,
		isActive: true,
	},
	{
		id: 2,
		name: Departments["Operating Room"],
		isCleared: false,
		className: OR_COOR_CLASS,
		lineClass: OR_LINE_COOR_CLASS,
		isActive: false,
	},
	{
		id: 3,
		name: Departments["Delivery Room/Obgyne"],
		isCleared: false,
		className: DR_OB_COOR_CLASS,
		lineClass: DR_OB_LINE_COOR_CLASS,
		isActive: false,
	},
	{
		id: 4,
		name: Departments["Out-patient Department"],
		isCleared: false,
		className: OPD_COOR_CLASS,
		lineClass: OPD_LINE_COOR_CLASS,
		isActive: false,
	},
	{
		id: 5,
		name: Departments["Surgical Wards"],
		isCleared: false,
		className: SW_COOR_CLASS,
		lineClass: SW_LINE_COOR_CLASS,
		isActive: false,
	},
	{
		id: 6,
		name: Departments["Laboratory"],
		isCleared: false,
		className: LAB_COOR_CLASS,
		lineClass: LAB_LINE_COOR_CLASS,
		isActive: false,
	},
	{
		id: 7,
		name: Departments["Medical Ward"],
		isCleared: false,
		className: MW_COOR_CLASS,
		lineClass: MW_LINE_COOR_CLASS,
		isActive: false,
	},
];

export const ER_QUESTIONS: QuestionOptionsType[] = [
	{
		question:
			"What is the most common initial assessment tool used to determine the severity of a patient's condition in the ER?",
		answer: "B) Triage Scale",
		options: [
			"A) Glasgow Coma Scale",
			"B) Triage Scale",
			"C) Morse Fall Scale",
			"D) APGAR Score",
		],
	},
	{
		question:
			"Which of the following conditions would be classified as a Level 1 priority in the ER?",
		answer: "B) Chest pain with shortness of breath",
		options: [
			"A) Broken arm with mild pain",
			"B) Chest pain with shortness of breath",
			"C) Mild headache",
			"D) Minor laceration",
		],
	},
	{
		question:
			"When administering CPR, what is the recommended compression-to-ventilation ratio for an adult patient with no advanced airway?",
		answer: "B) 30:2",
		options: ["A) 15:2", "B) 30:2", "C) 20:5", "D) 40:2"],
	},
	{
		question:
			'What does the acronym "FAST" stand for when assessing a potential stroke patient?',
		answer: "A) Face, Arms, Speech, Time",
		options: [
			"A) Face, Arms, Speech, Time",
			"B) First Aid, Shock, Trauma",
			"C) Fingers, Arms, Stability, Triage",
			"D) Fluid, Airway, Stabilization, Temperature",
		],
	},
	{
		question:
			"What is the first-line medication used to treat anaphylaxis in the ER?",
		answer: "C) Epinephrine",
		options: [
			"A) Diphenhydramine",
			"B) Albuterol",
			"C) Epinephrine",
			"D) Prednisone",
		],
	},
];

export const OR_QUESTIONS: QuestionOptionsType[] = [
	{
		question: 'What is the purpose of the "time-out" procedure in the OR?',
		answer: "B) To confirm the patient’s identity, procedure, and site",
		options: [
			"A) To allow the surgical team to rest",
			"B) To confirm the patient’s identity, procedure, and site",
			"C) To review post-operative care",
			"D) To document the surgery duration",
		],
	},
	{
		question:
			"During surgery, what is the correct order for donning sterile gloves?",
		answer: "A) Dominant hand first, then non-dominant hand",
		options: [
			"A) Dominant hand first, then non-dominant hand",
			"B) Non-dominant hand first, then dominant hand",
			"C) Both hands at the same time",
			"D) It doesn't matter which hand is gloved first",
		],
	},
	{
		question:
			"Which instrument is commonly used for clamping blood vessels during surgery?",
		answer: "C) Hemostat",
		options: ["A) Scalpel", "B) Forceps", "C) Hemostat", "D) Retractor"],
	},
	{
		question:
			"What is the most common cause of post-operative infection in the OR?",
		answer: "A) Poor hand hygiene",
		options: [
			"A) Poor hand hygiene",
			"B) Incorrect suture technique",
			"C) Inadequate sterilization of instruments",
			"D) Cross-contamination from surgical team",
		],
	},
	{
		question:
			"Which anesthesia type renders the patient unconscious during surgery?",
		answer: "C) General anesthesia",
		options: [
			"A) Local anesthesia",
			"B) Regional anesthesia",
			"C) General anesthesia",
			"D) Epidural anesthesia",
		],
	},
];

export const DROB_QUESTIONS: QuestionOptionsType[] = [
	{
		question: "What is the normal fetal heart rate range during labor?",
		answer: "B) 110-160 bpm",
		options: [
			"A) 60-100 bpm",
			"B) 110-160 bpm",
			"C) 90-120 bpm",
			"D) 140-200 bpm",
		],
	},
	{
		question:
			"What is the term used to describe the thinning and shortening of the cervix during labor?",
		answer: "B) Effacement",
		options: ["A) Dilation", "B) Effacement", "C) Crowning", "D) Station"],
	},
	{
		question:
			"Which of the following is a common complication of labor that may require an emergency C-section?",
		answer: "A) Pre-eclampsia",
		options: [
			"A) Pre-eclampsia",
			"B) Braxton Hicks contractions",
			"C) Mild back pain",
			"D) Morning sickness",
		],
	},
	{
		question:
			"During delivery, what is the recommended intervention for shoulder dystocia?",
		answer: "A) McRoberts maneuver",
		options: [
			"A) McRoberts maneuver",
			"B) Valsalva maneuver",
			"C) Trendelenburg position",
			"D) Heimlich maneuver",
		],
	},
	{
		question:
			"What medication is commonly given to promote uterine contractions after delivery?",
		answer: "A) Oxytocin",
		options: [
			"A) Oxytocin",
			"B) Magnesium sulfate",
			"C) Heparin",
			"D) Naloxone",
		],
	},
];

export const QUESTIONS: Record<Departments, QuestionOptionsType[]> = {
	"Emergency Room": ER_QUESTIONS,
	"Operating Room": OR_QUESTIONS,
	"Delivery Room/Obgyne": DROB_QUESTIONS,
	"Medical Ward": [],
	"Out-patient Department": [],
	"Surgical Wards": [],
	Laboratory: [],
};
