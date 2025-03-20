import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonClass: Record<ButtonVariant, string> = {
	"primary": "bg-primary disabled:cursor-not-allowed",
	"secondary": "bg-secondary disabled:bg-secondary/50 disabled:cursor-not-allowed",
	"ghost": "bg-transparent hover:cursor-pointer text-black hover:bg-slate-200 transition-all duration-150 ease-linear disabled:cursor-not-allowed"
}

interface ButtonProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	/**
	 * Default value to "Let's go!"
	 *
	 */
	text?: string;
	/**
	 * By default this is set to primary.
	 * @type primary
	 * @type secondary
	 * @type ghost
	 */
	variant?: ButtonVariant;
}

function Button({ text = "Let's go!", className, variant = "primary", ...props }: ButtonProps) {
	return (
		<button
			{...props}
			className={twMerge("w-full cursor-pointer py-3 rounded-lg text-white text-sm", className, buttonClass[variant], props.disabled && "bg-slate-500/30")}
		>
			{text}
		</button>
	);
}

export default Button;
