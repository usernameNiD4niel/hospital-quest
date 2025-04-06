import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { profiles } from "../../constants";
import { ProgressType } from "../../types";

interface Props {
	name: string;
	currentIndex: string;
}

function Welcome({ currentIndex, name }: Props) {
	const navigate = useNavigate();
	const profile = profiles[Number(currentIndex)];
	const prog = localStorage.getItem("progress");

	function onContinue() {
		if (prog) {
			const progress = JSON.parse(prog) as ProgressType;

			if (progress.totalStars === 35) {
				navigate("/maps?unlocked-surprised=true");
				return;
			}
		}

		navigate("/maps");
	}

	return (
		<div className="w-full h-screen flex items-center flex-col space-y-4 pt-10 pb-8 px-6 justify-between md:max-w-xl">
			<div className="flex flex-col space-y-4">
				<img src={profile.url} alt={profile.alt} />
				<p>
					Welcome back Master{" "}
					<span className="text-[var(--primary-color)] font-bold">{name}</span>!
				</p>
			</div>
			<Button onClick={onContinue}>Continue</Button>
		</div>
	);
}

export default Welcome;
