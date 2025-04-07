// components/GlowingTreasure.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function GlowingTreasure() {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => setShow(true), 100);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<div className="w-full flex justify-center items-center">
			<AnimatePresence>
				{show && (
					<motion.div
						initial={{ scale: 0.7, opacity: 0 }}
						animate={{ scale: 1.1, opacity: 1 }}
						exit={{ scale: 0.7, opacity: 0 }}
						transition={{ type: "spring", stiffness: 200, damping: 10 }}
						className="relative">
						{/* Glow behind */}
						<motion.div
							className="absolute inset-0 rounded-full bg-yellow-400 blur-2xl opacity-40 z-0"
							animate={{
								scale: [1, 1.2, 1],
								opacity: [0.4, 0.6, 0.4],
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
							}}
						/>

						{/* Treasure chest */}
						<motion.img
							src="/treasure-svgrepo-com.svg"
							alt="Open treasure chest glowing"
							className="w-[90px] h-auto relative z-10"
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.3 }}
						/>

						{/* Sparkles (coin pop effect) */}
						{Array.from({ length: 5 }).map((_, i) => (
							<motion.div
								key={i}
								className="absolute w-2 h-2 bg-yellow-300 rounded-full"
								initial={{ scale: 0, opacity: 0 }}
								animate={{
									scale: [0, 1.2, 1],
									opacity: [0, 1, 0],
									y: [0, -40],
									x: [0, (i - 2) * 20],
								}}
								transition={{
									duration: 1.2,
									delay: 0.5 + i * 0.15,
									repeat: Infinity,
								}}
								style={{ top: "20%", left: "45%" }}
							/>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
