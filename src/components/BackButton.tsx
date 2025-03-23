import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface Props
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	/**
	 * Decides what the color of the svg. Defaults to "#000000".
	 */
	svgFill?: string;
	/**
	 * Decides what the color of the svg lines. Defaults to empty.
	 */
	pathFill?: string;
	/**
	 * Width of the svg. Must end with UOM e.g. `400px`. Default is `20px`.
	 */
	width?: string;
	/**
	 * Height of the svg. Must end with UOM e.g. `400px`. Default is `20px`.
	 */
	height?: string;
	/**
	 * Where the user redirect when they click the button. Default is previous link visited.
	 * This should contains `/` at the beginning of the path.
	 */
	to?: string;
}

function BackButton({
	svgFill = "#000000",
	pathFill = "",
	width = "20px",
	height = "20px",
	to,
	...props
}: Props) {
	const navigate = useNavigate();

	function handleClick() {
		if (to) {
			navigate(to);
			return;
		}
		navigate(-1);
	}

	return (
		<button
			{...props}
			className={twMerge(
				"flex items-center text-sm space-x-1 cursor-pointer",
				props.className,
			)}
			onClick={handleClick}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={width}
				height={height}
				viewBox="0 0 1024 1024"
				fill={svgFill}
				className="icon"
				version="1.1">
				<path
					d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
					fill={pathFill}
				/>
			</svg>
			<span>{props.children}</span>
		</button>
	);
}

export default BackButton;
