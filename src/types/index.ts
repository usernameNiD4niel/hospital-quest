export enum Departments {
	/**
	 * Level 1 department that contains 5 questions based on Emergency Room topic.
	 */
	"Emergency Room" = "Emergency Room",
	"Operating Room" = "Operating Room",
	"Delivery Room/Obgyne" = "Delivery Room/Obgyne",
	"Out-patient Department" = "Out-patient Department",
	"Surgical Wards" = "Surgical Wards",
	"Laboratory" = "Laboratory",
	"Medical Ward" = "Medical Ward",
}

export interface DepartmentType {
	/**
	 * This is a unique identifier for each department.
	 */
	id: number;
	/**
	 * Name of the department e.g. Emergency Room
	 */
	name: Departments;
	/**
	 * If true means the department has been cleared by the current user.
	 */
	isCleared: boolean;
	/**
	 * This will be use to locate the department correctly.
	 */
	className: string;
	/**
	 * If true, means the user is currently at this stage.
	 */
	isActive: boolean;
}

export interface ProfilesProps {
	/**
	 * URL is an absolute URL located under public directory.
	 */
	url: string;
	/**
	 * An alternative text to display.
	 */
	alt: string;
}

export interface QuestionImagesType {
	/**
	 * Current question. This will be use as an alternative text so that when the user can't load the user, they can still answer
	 */
	question: string;
	/**
	 * Current answer.
	 */
	answer: string;
	/**
	 * 4 pictures URL, images should be in a relative path.
	 */
	imageUrls: string[];
	/**
	 * A string that contains all of the characters that the user can choose from to complete the task.
	 */
	padLetters: string[];
}

export interface QuestionOptionsType {
	/**
	 * Current question.
	 */
	question: string;
	/**
	 * Current answer.
	 */
	answer: string;
	/**
	 * `options` - this will serve as the user to choose, this should contains the `answer`.
	 */
	options: string[];
}

export interface QATypes extends Omit<QuestionOptionsType, "options"> {
	isCorrect: boolean;
}

export interface QAResultType {
	/**
	 * Question and answer with 4 options.
	 */
	qa: QATypes[];
	/**
	 * Points gained to current department.
	 */
	gainedPoints: number;
	/**
	 * If true, the user can play the next department.
	 */
	canGoNext: boolean;
}

export interface ProgressType
	extends Record<
		Departments,
		{
			/**
			 * This will be use for storing the previous answer if they already answered the current question correctly.
			 * e.g. `q1` = `true`
			 */
			[key: string]: boolean;
			isCleared: boolean;
		}
	> {
	totalPoints: number;
	currentDepartment: Departments;
}

export interface DepartmentLevelType extends Record<Departments, number> {
	[key: string]: number;
}

export type FillerProp = "one" | "two" | "three" | "four" | "five";
