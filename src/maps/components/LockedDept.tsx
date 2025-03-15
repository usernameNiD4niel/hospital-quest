import Lock from "../../../public/lock.svg";
import { DepartmentType } from "../../types";

interface Props {
	department: DepartmentType;
}

function LockedDept({ department }: Props) {
	return (
		<div className={`${department.className} flex flex-col items-center`}>
			<div className="absolute -top-12 w-[210px] h-[180px] rounded-full cursor-pointer z-10 bg-gradient-to-tl from-50% opacity-5 to-black" />
			<img
				src={Lock}
				alt="Lock image"
				width={100}
				height={100}
				className="w-[20px] md:w-[25px] h-auto"
			/>
			<p className="bg-zinc-500 text-white px-2 rounded-md hidden md:block">
				{department.name}
			</p>
		</div>
	);
}

export default LockedDept;
