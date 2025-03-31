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
	"w-[60px] md:w-[410px] h-px bg-transparent border-t-4 border-t-green-500 absolute left-5 top-7 rotate-100 md:rotate-160 md:left-1 md:top-13";
export const DR_OB_LINE_COOR_CLASS =
	"w-full h-px bg-transparent border-t-4 border-t-green-500 absolute -rotate-145 left-17 top-9";
export const OPD_LINE_COOR_CLASS =
	"w-full h-px bg-transparent border-t-4 border-t-green-500 absolute -rotate-145 left-17 top-9";
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
			"The first step in the primary survey of trauma patients is assessing _______",
		answer: "C) Airway",
		options: [
			"A) Circulation",
			"B) Breathing",
			"C) Airway",
			"D) Disability",
		],
	},
	{
		question:
			"A patient with a minor cut should be prioritized over a patient with chest pain.",
		answer: "B) False",
		options: [
			"A) True",
			"B) False"
		],
	},
	{
		question:
			"Which of the following is the best way to assess shock in an emergency setting?",
		answer: "B) Urine output",
		options: ["A) Blood pressure", "B) Urine output", "C) Capillary refill", "D) Heart rate"],
	},
	{
		question:
			'A patient with a suspected stroke should have a _______ scan immediately.',
		answer: "C) CT",
		options: [
			"A) X-ray",
			"B) MRI",
			"C) CT",
			"D) Ultrasound",
		],
	},
	{
		question:
			"Needle decompression is performed in the second intercostal space for a tension pneumothorax.",
		answer: "A) True",
		options: [
			"A) True",
			"B) False",
		],
	},
];

export const OR_QUESTIONS: QuestionOptionsType[] = [
	{
		question: 'The nurse responsible for maintaining sterility in the OR is the _______.',
		answer: "A) True",
		options: [
			"A) True",
			"B) False"
		],
	},
	{
		question:
			"Surgical instruments must be sterilized before every procedure.",
		answer: "A) True",
		options: [
			"A) True",
			"B) False"
		],
	},
	{
		question:
			"What is the main purpose of a surgical time-out?",
		answer: "B) Confirm the correct patient, site, and procedure",
		options: [
			"A) Ensure sterility of instruments",
			"B) Confirm the correct patient, site, and procedure",
			"C) Allow the surgeon to review the case",
			"D) Prevent surgical site infections",
		],
	},
	{
		question:
			"The most common complication of general anesthesia is _______.",
		answer: "B) Nausea and vomiting",
		options: ["A) Hypertension", "B) Nausea and vomiting", "C) Hyperkalemia", "D) Hypoglycemia"],
	},
	{
		question:
			"A patient under spinal anesthesia can breathe independently.",
		answer: "A) True",
		options: [
			"A) True",
			"B) False"
		],
	},
];

export const DROB_QUESTIONS: QuestionOptionsType[] = [
	{
		question: "The normal fetal heart rate is _______ beats per minute.",
		answer: "C) 110-160",
		options: [
			"A) 60-100",
			"B) 80-120",
			"C) 110-160",
			"D) 140-180",
		],
	},
	{
		question:
			"The presence of meconium in amniotic fluid indicates potential fetal distress.",
		answer: "A) True",
		options: ["A) True", "B) False"],
	},
	{
		question:
			"What is the first priority in newborn care immediately after birth?",
		answer: "C) Ensure proper thermoregulation and airway clearance",
		options: [
			"A) Initiate breastfeeding",
			"B) Perform a full physical exam",
			"C) Ensure proper thermoregulation and airway clearance",
			"D) Measure weight and length",
		],
	},
	{
		question:
			"The hormone responsible for uterine contractions during labor is _______.",
		answer: "B) Oxytocin",
		options: [
			"A) Estrogen",
			"B) Oxytocin",
			"C) Progesterone",
			"D) Prolactin",
		],
	},
	{
		question:
			"Postpartum hemorrhage (PPH) is defined as blood loss exceeding ____ mL within 24 hours of delivery.",
		answer: "B) 500",
		options: [
			"A) 300",
			"B) 500",
			"C) 250",
			"D) 1000",
		],
	},
];

export const OPD_QUESTIONS: QuestionOptionsType[] = [
	{
		question: "The first step in assessing a patient in OPD is _______.",
		answer: "D) Interviewing the patient",
		options: [
			"A) Physical examination",
			"B) Vital signs assessment",
			"C) Reviewing laboratory tests",
			"D) Interviewing the patient",
		],
	},
	{
		question: "OPD patients are typically admitted for 24-hour monitoring.",
		answer: "B) False",
		options: [
			"A) True",
			"B) False"
		],
	},
	{
		question: "A patient presenting with mild hypertension in OPD should be advised to:",
		answer: "B) Modify diet and exercise before medication is considered",
		options: [
			"A) Immediately take antihypertensive drugs",
			"B) Modify diet and exercise before medication is considered",
			"C) Get admitted for IV therapy",
			"D) Undergo immediate surgery"
		],
	},
	{
		question: "A screening test for diabetes in OPD is the _______ test.",
		answer: "B) Fasting blood sugar",
		options: [
			"A) ECG",
			"B) Fasting blood sugar",
			"C) MRI",
			"D) X-ray"
		],
	},
	{
		question: "OPD visits usually involve short-term care and follow-up.",
		answer: "A) True",
		options: [
			"A) True",
			"B) False",
		],
	},
]

export const SW_QUESTIONS: QuestionOptionsType[] = [
	{
		question: "The primary concern for post-operative patients is _______.",
		answer: "D) All of the above",
		options: [
			"A) Pain management",
			"B) Infection prevention",
			"C) Early ambulation",
			"D) All of the above",
		],
	},
	{
		question: "A patient who has undergone surgery should remain in bed for at least a week.",
		answer: "B) False",
		options: [
			"A) True",
			"B) False"
		],
	},
	{
		question: "Which of the following is a sign of post-operative infection?",
		answer: "B) Redness with pus discharge",
		options: [
			"A) Mild swelling",
			"B) Redness with pus discharge",
			"C) Low-grade fever for 24 hours",
			"D) Slight pain at the incision site"
		],
	},
	{
		question: "To prevent deep vein thrombosis (DVT) in post-op patients, nurses should encourage _______.",
		answer: "C) Early ambulation and leg exercises",
		options: [
			"A) Complete bed rest",
			"B) Leg elevation without movement",
			"C) Early ambulation and leg exercises",
			"D) Ice pack application"
		],
	},
	{
		question: "A Jackson-Pratt drain is used to remove fluids from a surgical site.",
		answer: "A) True",
		options: [
			"A) True",
			"B) False",
		],
	},
]

export const LR_QUESTIONS: QuestionOptionsType[] = [
	{
		question: "The most common site for venipuncture is the _______ vein.",
		answer: "D) Median cubital",
		options: [
			"A) Radial",
			"B) Cephalic",
			"C) Basilic",
			"D) Median cubital",
		],
	},
	{
		question: "A tourniquet should be left on the arm for more than 5 minutes to ensure proper blood collection.",
		answer: "B) False",
		options: [
			"A) True",
			"B) False"
		],
	},
	{
		question: "You are preparing to perform a venipuncture. Which of the following is the MOST important step to ensure patient safety and accurate results?",
		answer: "C) Properly identifying the patient and verifying the test order.",
		options: [
			"A) Using a large-gauge needle to speed up the process.",
			"B) Ignoring the patient's report of previous difficult draws.",
			"C) Properly identifying the patient and verifying the test order.",
			"D) Wearing gloves only after the needle is inserted."
		],
	},
	{
		question: "A test used to check for kidney function is the _______ test.",
		answer: "B) Creatinine and BUN",
		options: [
			"A) Lipid profile",
			"B) Creatinine and BUN",
			"C) ECG",
			"D) Liver function test"
		],
	},
	{
		question: "A complete blood count (CBC) is used to assess overall health and detect a variety of disorders.",
		answer: "A) True",
		options: [
			"A) True",
			"B) False",
		],
	},
]

export const MW_QUESTIONS: QuestionOptionsType[] = [
	{
		question: "The primary goal in managing pneumonia in the medical ward is _______.",
		answer: "B) Oxygenation and infection treatment",
		options: [
			"A) Pain control",
			"B) Oxygenation and infection treatment",
			"C) Isolation precautions",
			"D) Physical therapy",
		],
	},
	{
		question: "Patients with hypertension should be encouraged to eat high-sodium foods.",
		answer: "B) False",
		options: [
			"A) True",
			"B) False"
		],
	},
	{
		question: "The best position for a patient with difficulty breathing is__________.:",
		answer: "C) Fowler’s",
		options: [
			"A) Supine",
			"B) Prone",
			"C) Fowler’s",
			"D) Trendelenburg"
		],
	},
	{
		question: "The first-line treatment for a mild allergic reaction is?",
		answer: "B) Antihistamines",
		options: [
			"A) Epinephrine",
			"B) Antihistamines",
			"C) Oxygen therapy",
			"D) Steroids"
		],
	},
	{
		question: "Diabetes management includes diet, exercise, and medication adherence.",
		answer: "A) True",
		options: [
			"A) True",
			"B) False",
		],
	},
]

export const QUESTIONS: Record<Departments, QuestionOptionsType[]> = {
	"Emergency Room": ER_QUESTIONS,
	"Operating Room": OR_QUESTIONS,
	"Delivery Room/Obgyne": DROB_QUESTIONS,
	"Medical Ward": MW_QUESTIONS,
	"Out-patient Department": OPD_QUESTIONS,
	"Surgical Wards": SW_QUESTIONS,
	Laboratory: LR_QUESTIONS,
};
