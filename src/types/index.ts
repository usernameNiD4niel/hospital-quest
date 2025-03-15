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
