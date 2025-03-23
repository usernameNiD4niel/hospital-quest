interface Props {
	fill?: string;
	pathStroke?: string;
}
function CheckIcon({ fill = "none", pathStroke = "#00C950" }: Props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20px"
			height="20px"
			viewBox="0 0 24 24"
			fill={fill}>
			<path
				d="M4 12.6111L8.92308 17.5L20 6.5"
				stroke={pathStroke}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill={fill}
			/>
		</svg>
	);
}

export default CheckIcon;
