import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    children: ReactNode;
    className?: string;
}

function AlertModal({ open, setOpen, children, className }: Props) {

    if (!open) {
        return null;
    }

    function onClose() {
        setOpen(false);
    }

    return (
        <AnimatePresence>
            <div className={"w-full h-screen fixed overflow-hidden flex items-center justify-center inset-0 z-10"}>
                <motion.div
                    className="w-screen absolute h-screen bg-black opacity-30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                />
                <motion.div
                    className={twMerge("w-full max-w-xs sm:max-w-lg rounded-md h-fit max-h-[400px] bg-white z-10 flex flex-col p-4 relative", className)}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <div className="absolute top-2 right-4 hover:cursor-pointer" onClick={onClose}>X</div>
                    {children}
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

export default AlertModal