import UnlockIcon from "../../components/UnlockIcon";
import { DepartmentType } from "../../types";

interface Props {
	department: DepartmentType;
}

function ClearedDept({ department }: Props) {
	return (
		<div
			className={`${department.className} flex flex-col items-center md:space-y-1`}>
			<UnlockIcon fill="#00C950" width="20px" height="20px" />
			<p className="bg-green-500 text-white rounded-md px-2 hidden md:block">
				<span>{department.name}</span>
			</p>
		</div>
	);
}

export default ClearedDept;
