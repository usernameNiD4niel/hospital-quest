import { useState } from "react";

function Image({
	...props
}: React.DetailedHTMLProps<
	React.ImgHTMLAttributes<HTMLImageElement>,
	HTMLImageElement
>) {
	const [isZoom, setIsZoom] = useState(false);

	function onClick() {
		setIsZoom((prev) => !prev);
	}

	return (
		<div
			className={
				isZoom
					? "fixed top-0 bottom-0 left-0 right-0 z-10 transition-position duration-150 ease-linear flex items-center justify-center bg-black"
					: ""
			}
			onClick={onClick}>
			<img
				{...props}
				className={`w-44 h-auto md:w-[340px] ${props.className} ${
					isZoom ? "zoom-in rounded-md" : ""
				}`}
			/>
		</div>
	);
}

export default Image;
