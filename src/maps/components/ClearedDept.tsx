import { DepartmentType } from "../../types";

interface Props {
	department: DepartmentType;
}

function ClearedDept({ department }: Props) {
	return (
		<div
			className={`bg-green-500 rounded-full w-6 h-6 ${department.className}`}>
			<p>{department.name}</p>
			<p>
				This is a cleared department. This should display a green unlock with
				check.
			</p>
		</div>
	);
}

export default ClearedDept;
