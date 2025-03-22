import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonClass: Record<ButtonVariant, string> = {
	primary: "bg-primary disabled:cursor-not-allowed",
	secondary:
		"bg-secondary disabled:bg-secondary/50 disabled:cursor-not-allowed",
	ghost:
		"bg-transparent hover:cursor-pointer text-black hover:bg-slate-200 transition-all duration-150 ease-linear disabled:cursor-not-allowed",
};

interface Props
	extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
	/**
	 * Redirect URL when the user clicks the link.
	 */
	to: string;
	/**
	 * By default this is set to primary.
	 * @type primary
	 * @type secondary
	 * @type ghost
	 */
	variant?: ButtonVariant;
}

function LinkButton({ to, className, variant = "primary", ...props }: Props) {
	return (
		<Link
			to={to}
			{...props}
			className={twMerge(
				"w-full cursor-pointer py-3 rounded-lg text-white text-sm text-center",
				buttonClass[variant],
				className,
			)}>
			{props.children}
		</Link>
	);
}

export default LinkButton;
