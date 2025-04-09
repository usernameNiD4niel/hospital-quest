import { useNavigate, useSearchParams } from "react-router-dom";
import AlertModal from "../../components/AlertModal";
import { Fragment, useRef, useState, useEffect } from "react";

import Button from "../../components/Button";
import GlowingTreasure from "./GlowingTreasure";
import { motion } from "framer-motion";
import { profiles } from "../../constants/svg";
import html2canvas from "html2canvas";
import { Departments, ProgressType } from "../../types";

function DisplaySurpriseModal() {
	const { "0": searchParams } = useSearchParams();

	const hasUnlockSurprise = searchParams.get("unlocked-surprised");

	if (!hasUnlockSurprise || hasUnlockSurprise.toLowerCase() !== "true") {
		return null;
	}

	return <Modal />;
}

const quotes = [
	"Excellence is not an act, but a habit—and today, you've proven that.",
	"Every life you touch is a ripple of hope. Today, you showed what mastery looks like.",
	"No errors. Just excellence. The same precision you bring to every patient, every day.",
	"You don't just heal with hands—you heal with heart. And this was perfection in motion.",
	"Calm in chaos. Focus in pressure. You've nailed it—like the true hero you are.",
	"When knowledge meets compassion, miracles happen. And you've just delivered one.",
	"Your success today is a reflection of the countless hours you've spent caring for others.",
	"Saving lives takes practice. Mastering them takes heart. You've shown both.",
	"You bring skill to every challenge, and soul to every solution. Bravo!",
	"Flawless finish. Just like the real lives you protect—every detail matters, and you nailed it."
];

function Modal() {
	const [open, setOpen] = useState(true);
	const [showQRModal, setShowQRModal] = useState(false);
	const navigate = useNavigate();
	const modalRef = useRef<HTMLDivElement>(null);
	const [randomQuote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);
	
	const [showProgress, setShowProgress] = useState(false);

	const getProgress = (): ProgressType => {
		const savedProgress = localStorage.getItem('progress');
		return savedProgress ? JSON.parse(savedProgress) : { progress: [], totalStars: 0, currentDepartment: Departments["Emergency Room"] };
	}

	const progressData = getProgress();

	useEffect(() => {
		if (showQRModal) {
			setTimeout(() => setShowProgress(true), 500);
		}
	}, [showQRModal]);

	const currentIndex = parseInt(localStorage.getItem("currentIndex") || "0");
	const userName = localStorage.getItem("name") || "User";
	const currentProfile = profiles[currentIndex];

	function handlePerhaps() {
		navigate("/maps");
	}

	function handleUnlockSurprise() {
		localStorage.setItem("unlock-surprise", "true");
		setShowQRModal(true);
	}

	const handleDownload = async () => {
		// Create a temporary div for capturing
		const tempDiv = document.createElement('div');
		tempDiv.style.position = 'absolute';
		tempDiv.style.left = '-9999px';
		tempDiv.style.backgroundColor = 'white';
		tempDiv.style.padding = '2rem';
		tempDiv.style.borderRadius = '0.5rem';
		tempDiv.style.width = '600px';
		tempDiv.style.display = 'flex';
		tempDiv.style.flexDirection = 'column';
		tempDiv.style.alignItems = 'center';
		tempDiv.style.gap = '1.5rem';

		// Add profile image
		const imgContainer = document.createElement('div');
		imgContainer.style.width = '11rem';
		imgContainer.style.height = '11rem';
		imgContainer.style.borderRadius = '9999px';
		imgContainer.style.overflow = 'hidden';
		imgContainer.style.border = '4px solid #22c55e';

		const img = document.createElement('img');
		img.src = currentProfile.url;
		img.alt = currentProfile.alt;
		img.style.width = '100%';
		img.style.height = '100%';
		img.style.objectFit = 'cover';
		imgContainer.appendChild(img);
		tempDiv.appendChild(imgContainer);

		// Add text content
		const textDiv = document.createElement('div');
		textDiv.style.textAlign = 'center';

		const nameH3 = document.createElement('h3');
		nameH3.style.fontSize = '1.5rem';
		nameH3.style.fontWeight = '700';
		nameH3.style.color = '#1f2937';
		nameH3.textContent = userName;
		textDiv.appendChild(nameH3);

		const quoteP = document.createElement('p');
		quoteP.style.marginTop = '0.5rem';
		quoteP.style.marginBottom = '1rem';
		quoteP.style.fontStyle = 'italic';
		quoteP.style.color = '#4b5563';
		quoteP.textContent = `"${randomQuote}"`;
		textDiv.appendChild(quoteP);
		tempDiv.appendChild(textDiv);

		// Add progress data
		const progressDiv = document.createElement('div');
		progressDiv.style.width = '100%';
		progressDiv.style.padding = '1rem';
		progressDiv.style.backgroundColor = '#f9fafb';
		progressDiv.style.borderRadius = '0.5rem';
		progressDiv.innerHTML = `
			<div style="text-align: center;">
				<h4 style="font-size: 1.125rem; font-weight: 600; color: #374151; margin: 0;">Your Progress</h4>
				<div style="position: relative; width: 100%; height: 16px; margin-top: 8px; background-color: #e5e7eb; border-radius: 9999px; overflow: hidden;">
					<div style="position: absolute; top: 0; left: 0; height: 100%; background-color: #4ade80; width: ${((progressData.totalStars / 35) * 100)}%;"></div>
				</div>
				<p style="font-size: 0.875rem; color: #6b7280; margin-top: 4px;">${progressData.totalStars} out of 35 stars</p>
			</div>
			<ul style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem; padding: 0; list-style: none; width: 100%;">
				${progressData.progress.map(dept => `
					<li style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 1rem; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);">
						<span style="font-weight: 500; color: #374151;">${dept.department}</span>
						<span style="color: #16a34a; font-weight: 700;">${dept.stars} ⭐</span>
					</li>
				`).join('')}
			</ul>
		`;
		tempDiv.appendChild(progressDiv);

		// Add to document, capture, and remove
		document.body.appendChild(tempDiv);
		try {
			const canvas = await html2canvas(tempDiv);
			const dataUrl = canvas.toDataURL('image/png');
			const link = document.createElement('a');
			link.download = `${userName}-certificate.png`;
			link.href = dataUrl;
			link.click();
		} catch (error) {
			console.error('Error downloading image:', error);
		} finally {
			document.body.removeChild(tempDiv);
		}
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
				open={open && !showQRModal}
				setOpen={setOpen}
				closable={false}
				dismissable={false}
				className="p-7 pt-8 flex flex-col space-y-4">
				<div className="w-full flex items-center justify-center">
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

			<AlertModal
				open={showQRModal}
				setOpen={setShowQRModal}
				closable={true}
				dismissable={true}
				className="md:max-w-2xl shadow-lg max-w-sm">
				<motion.div
					ref={modalRef}
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.5 }}
					className="flex flex-col items-center space-y-6 bg-white rounded-lg"
					style={{ backgroundColor: 'white' }}
				>
					<div className="w-44 h-44 rounded-full overflow-hidden border-4" style={{ borderColor: '#22c55e' }}>
						<img src={currentProfile.url} alt={currentProfile.alt} className="w-full h-full object-cover" />
					</div>

					<div className="text-center">
						<h3 className="text-2xl font-bold" style={{ color: '#1f2937' }}>{userName}</h3>
						<p className="mt-2 italic mb-4" style={{ color: '#4b5563' }}>"{randomQuote}"</p>
					</div>

					{showProgress && (
						<div className="w-full space-y-4">
							<div className="text-center">
								<h4 className="text-lg font-semibold text-gray-700">Your Progress</h4>
								<div className="relative w-full h-4 mt-2 bg-gray-200 rounded-full overflow-hidden">
									<div
										className="absolute top-0 left-0 h-full bg-green-400 transition-all"
										style={{ width: `${(progressData.totalStars / 35) * 100}%` }}
									></div>
								</div>
								<p className="text-sm text-gray-500 mt-1">
									{progressData.totalStars} out of 35 stars
								</p>
							</div>

							<ul className="flex flex-col gap-2 w-full text-sm">
								{progressData.progress.map((dept, idx) => (
									<li
										key={idx}
										className="flex justify-between items-center px-4 py-2 rounded-md bg-green-50 border border-green-200 shadow-sm"
									>
										<span className="font-medium text-gray-700">{dept.department}</span>
										<span className="text-green-600 font-bold">{dept.stars} ⭐</span>
									</li>
								))}
							</ul>
						</div>
					)}


					<Button className="w-full md:w-fit" variant="success" onClick={handleDownload}>
						Download Certificate
					</Button>
				</motion.div>

			</AlertModal>
		</Fragment>
	);
}

export default DisplaySurpriseModal;
