export type DepartmentType = {
	/**
	 * This is a unique identifier for each department.
	 */
	id: number;
	/**
	 * Name of the department e.g. Emergency Room
	 */
	name: string;
	/**
	 * If true means the department has been cleared by the current user.
	 */
	isCleared: boolean;
	/**
	 * If true means the department has not been played yet.
	 * If false and `isCleared` = false, then we are sure that the current department is where the user should play (current department user is playing.)
	 */
	isLocked: boolean;
	/**
	 * This will be use to locate the department correctly.
	 */
	className: string;
};

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

export type QATypes = Omit<QuestionOptionsType, "options"> & { isCorrect: boolean };

export type FillerProp = "one" | "two" | "three" | "four" | "five";
