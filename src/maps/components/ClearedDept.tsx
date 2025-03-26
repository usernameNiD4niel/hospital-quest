import { useState } from "react";
import DisplayStar from "../../components/DisplayStar";
import UnlockIcon from "../../components/UnlockIcon";
import { DepartmentType } from "../../types";
import AlertModal from "../../components/AlertModal";
import PromptModal from "./PromptModal";

interface Props {
	department: DepartmentType;
}

function ClearedDept({ department }: Props) {
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
			<UnlockIcon fill="#00C950" width="20px" height="20px" />
			<DisplayStar department={department.name} />
			<p className="bg-green-500 text-white rounded-md px-2 hidden md:block">
				<span>{department.name}</span>
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

export default ClearedDept;
