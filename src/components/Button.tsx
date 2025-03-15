import React from "react";

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
}

function Button({ text = "Let's go!", ...props }: ButtonProps) {
	return (
		<button
			{...props}
			className="w-full cursor-pointer bg-primary py-3 rounded-lg text-white text-sm">
			{text}
		</button>
	);
}

export default Button;
