import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariant =
	| "primary"
	| "secondary"
	| "ghost"
	| "destructive"
	| "success";

const buttonClass: Record<ButtonVariant, string> = {
	primary: "bg-primary disabled:cursor-not-allowed",
	secondary:
		"bg-secondary disabled:bg-secondary/50 disabled:cursor-not-allowed",
	ghost:
		"bg-transparent hover:cursor-pointer text-black hover:bg-slate-200 transition-all duration-150 ease-linear disabled:cursor-not-allowed",
	destructive:
		"bg-transparent hover:cursor-pointer border rounded-md border-red-500 text-red-500 hover:bg-red-500/10 hover:text-red-700 transition-background duration-150 ease-linear",
	success:
		"bg-green-500 rounded-md hover:bg-green-700 text-white transition-background ease-in-out duration-250",
};

interface ButtonProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	/**
	 * By default this is set to primary.
	 * @type primary
	 * @type secondary
	 * @type ghost
	 */
	variant?: ButtonVariant;
}

function Button({ className, variant = "primary", ...props }: ButtonProps) {
	return (
		<button
			{...props}
			className={twMerge(
				"w-full cursor-pointer py-3 rounded-lg text-white text-sm px-2",
				className,
				buttonClass[variant],
				props.disabled && "bg-slate-500/30",
			)}>
			{props.children}
		</button>
	);
}

export default Button;
