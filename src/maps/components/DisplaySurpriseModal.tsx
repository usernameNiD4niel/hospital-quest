import { useNavigate, useSearchParams } from "react-router-dom";
import AlertModal from "../../components/AlertModal";
import { Fragment, useState } from "react";
import Button from "../../components/Button";
import GlowingTreasure from "./GlowingTreasure";

function DisplaySurpriseModal() {
	const { "0": searchParams } = useSearchParams();

	const hasUnlockSurprise = searchParams.get("unlocked-surprised");

	if (!hasUnlockSurprise || hasUnlockSurprise.toLowerCase() !== "true") {
		return null;
	}

	return <Modal />;
}

function Modal() {
	const [open, setOpen] = useState(true);
	const navigate = useNavigate();
	// const [unlock, setUnlock] = useState(false);

	function handlePerhaps() {
		navigate("/maps");
	}

	function handleUnlockSurprise() {
		localStorage.setItem("unlock-surprise", "true");
		// unlock the surprise here
		// setUnlock(true);
	}

	/**
     * "Excellence is not an act, but a habit—and today, you’ve proven that."

"Every life you touch is a ripple of hope. Today, you showed what mastery looks like."

"No errors. Just excellence. The same precision you bring to every patient, every day."

"You don’t just heal with hands—you heal with heart. And this was perfection in motion."

"Calm in chaos. Focus in pressure. You've nailed it—like the true hero you are."

"When knowledge meets compassion, miracles happen. And you’ve just delivered one."

"Your success today is a reflection of the countless hours you've spent caring for others."

"Saving lives takes practice. Mastering them takes heart. You've shown both."

"You bring skill to every challenge, and soul to every solution. Bravo!"

"Flawless finish. Just like the real lives you protect—every detail matters, and you nailed it."
     */

	return (
		<Fragment>
			<AlertModal
				open={open}
				setOpen={setOpen}
				closable={false}
				dismissable={false}
				className="p-7 pt-8 flex flex-col space-y-4">
				<div className="w-full flex items-center justify-center">
					{/* <img
						src="/treasure-svgrepo-com.svg"
						alt="Treasure svg"
						width={150}
						height={150}
						className="w-[100px] h-auto"
					/> */}
					<GlowingTreasure />
				</div>
				<div className="w-full space-y-1">
					<h2 className="text-lg text-green-500 font-bold">CONGRATS!!!🎉🎁</h2>
					<p className="">
						Congratulations on finishing the departments! Are you prepared for
						the next challenge?
					</p>
				</div>
				<div className="w-full flex justify-end items-center gap-2 flex-col md:flex-row">
					<Button
						className="w-full md:w-fit"
						variant="success"
						onClick={handleUnlockSurprise}>
						Absolutely!
					</Button>
					<Button
						className="w-full md:w-fit"
						variant="ghost"
						onClick={handlePerhaps}>
						Perhaps later?
					</Button>
				</div>
			</AlertModal>
			{/* {unlock && <GlowingTreasure />} */}
		</Fragment>
	);
}

export default DisplaySurpriseModal;
