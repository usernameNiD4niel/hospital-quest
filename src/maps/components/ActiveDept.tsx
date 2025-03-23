import { useState } from "react";
import { DepartmentType, ProfilesProps } from "../../types";
import AlertModal from "../../components/AlertModal";
import PromptModal from "./PromptModal";
interface Props {
	department: DepartmentType;
	profile: ProfilesProps;
}

function ActiveDept({ department, profile }: Props) {
	const [showModal, setShowModal] = useState(false);

	function onClick() {
		setShowModal(true);
	}

	function onClose() {
		setShowModal(false);
	}

	return (
		<div
			className={`${department.className} flex flex-col items-center md:space-y-1`}>
			<div
				className="bg-transparent z-10 w-full h-full absolute cursor-pointer"
				onClick={onClick}
			/>
			{/* Glowing Downward Arrow */}
			<div className="animate-bounce md:text-3xl font-bold bg-gradient-to-b from-green-300 to-green-700 text-transparent bg-clip-text drop-shadow-lg rotate-180 absolute -top-7 md:-top-12">
				▲
			</div>

			{/* Profile Image with Pulse Effect */}
			<div className="relative drop-shadow-2xl">
				{/* Profile Image */}
				<img
					src={profile.url}
					alt={profile.alt}
					width={40}
					height={40}
					className="w-8 h-auto rounded-full shadow-lg border-2 border-green-600"
				/>

				{/* Expanding Pulse Effect */}
				<div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-green-300 to-green-700 opacity-40 animate-ping"></div>

				{/* Second Wider Pulse for Dramatic Effect */}
				<div className="absolute inset-0 w-[50%] h-[50%] md:w-[140%] md:h-[140%] rounded-full bg-gradient-to-r from-green-400 to-green-600 opacity-30 animate-ping delay-100"></div>

				{/* Third Extra-Wide Pulse */}
				<div className="absolute inset-0 w-[50%] h-[50%] md:w-[180%] md:h-[180%] rounded-full bg-gradient-to-r from-green-200 to-green-900 opacity-20 animate-ping delay-200"></div>
			</div>
			<p className="bg-green-500 text-white px-2 rounded-md hidden md:block">
				{department.name}
			</p>

			{showModal && (
				<AlertModal
					open={showModal}
					setOpen={setShowModal}
					className="flex flex-col space-y-2 p-5">
					<PromptModal department={department} onClose={onClose} />
				</AlertModal>
			)}
		</div>
	);
}

export default ActiveDept;
