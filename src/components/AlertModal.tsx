import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import CloseIcon from "./CloseIcon";

interface Props {
	open?: boolean;
	setOpen?: (open: boolean) => void;
	children: ReactNode;
	className?: string;
	/**
	 * Optional but if this is true, the user can click the `close` button, the default value is true.
	 */
	closable?: boolean;
	/**
	 * Optional but the default value is `true`. When set to `true`, the component will automatically close the component when the user clicks outside of the component.
	 */
	dismissable?: boolean;
}

function AlertModal({
	open = true,
	setOpen,
	dismissable = true,
	children,
	closable = true,
	className,
}: Props) {
	const [o, setO] = useState(false);

	useEffect(() => {
		setO(open);
	}, [open]);

	if (!o) {
		return null;
	}

	function onClose() {
		if (dismissable) {
			if (setOpen) {
				setOpen(false);
			}
			setO(false);
		}
	}

	return (
		<AnimatePresence>
			<div
				className={
					"w-full h-screen fixed overflow-hidden flex items-center justify-center inset-0 z-10"
				}>
				<motion.div
					className="w-screen absolute h-screen bg-black opacity-30"
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.3 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					onClick={onClose}
				/>
				<motion.div
					className={twMerge(
						"w-full max-w-xs sm:max-w-lg rounded-md h-fit max-h-[600px] bg-white z-10 flex flex-col p-4 relative",
						className,
					)}
					initial={{ opacity: 0, scale: 0.7 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.7 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}>
					{closable && (
						<div className="absolute top-4 right-4 hover:cursor-pointer">
							<CloseIcon onClick={onClose} fill="#000" />
						</div>
					)}
					{children}
				</motion.div>
			</div>
		</AnimatePresence>
	);
}

export default AlertModal;
