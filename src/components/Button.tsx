import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonClass: Record<ButtonVariant, string> = {
	"primary": "bg-primary",
	"secondary": "bg-secondary",
	"ghost": "bg-transparent hover:cursor-pointer text-black hover:bg-slate-200 transition-all duration-150 ease-linear"
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
			className={twMerge("w-full cursor-pointer bg-primary py-3 rounded-lg text-white text-sm", className, buttonClass[variant])}
		>
			{text}
		</button>
	);
}

export default Button;
