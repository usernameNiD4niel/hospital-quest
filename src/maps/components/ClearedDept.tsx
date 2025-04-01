import { useState } from "react";
import DisplayStar from "../../components/DisplayStar";
import { Departments, DepartmentType } from "../../types";
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
				className="bg-transparent w-full h-full absolute cursor-pointer"
				onClick={onClick}
			/>

			<div className="text-white font-bold text-center text-sm w-6 h-6 bg-green-500 rounded-full border-white border-2">
				{Object.keys(Departments).findIndex(
					(dept) => dept === department.name,
				) + 1}
			</div>
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
