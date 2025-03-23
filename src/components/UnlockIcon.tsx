interface Props {
	fill?: string;
	width?: string;
	height?: string;
}

function UnlockIcon({
	fill = "#000000",
	height = "30px",
	width = "30px",
}: Props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill={fill}
			width={width}
			height={height}
			viewBox="0 0 1920 1920">
			<path
				d="M564.824 903.53V508.234c0-217.976 177.317-395.294 395.294-395.294 217.976 0 395.294 177.318 395.294 395.294h112.94C1468.353 228.028 1240.326 0 960.119 0S451.882 228.028 451.882 508.235V903.53H226v790.589C226 1818.692 327.308 1920 451.882 1920h1016.47c124.575 0 225.883-101.308 225.883-225.882V903.529H564.824Zm338.823 677.646h112.941v-338.823h-112.94v338.823Z"
				fill-rule="evenodd"
			/>
		</svg>
	);
}

export default UnlockIcon;
