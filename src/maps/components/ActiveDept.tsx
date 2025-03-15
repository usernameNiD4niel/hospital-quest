import { DepartmentType, ProfilesProps } from "../../types";

interface Props {
	department: DepartmentType;
	profile: ProfilesProps;
}

function ActiveDept({ department, profile }: Props) {
	return (
		<div
			className={`${department.className} flex flex-col items-center md:space-y-1`}>
			<div className="bg-transparent absolute -top-12 w-[210px] h-[180px] rounded-full cursor-pointer z-10 hidden md:block" />
			{/* Glowing Downward Arrow */}
			<div className="animate-bounce md:text-5xl font-bold bg-gradient-to-b from-green-300 to-green-700 text-transparent bg-clip-text drop-shadow-lg rotate-180 md:absolute md:-top-12 md:right-12">
				▲
			</div>

			{/* Profile Image with Pulse Effect */}
			<div className="relative mt-3 drop-shadow-2xl">
				{/* Profile Image */}
				<img
					src={profile.url}
					alt={profile.alt}
					width={40}
					height={40}
					className="w-8 md:w-16 h-auto rounded-full shadow-lg border-2 border-green-600"
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
		</div>
	);
}

export default ActiveDept;
