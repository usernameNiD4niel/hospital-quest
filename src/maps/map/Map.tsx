import Quiz4Pics1Word from "../../components/Quiz4Pics1Word";
import QuizPad from "../../components/QuizPad";

function Map() {
	return <div className="w-full flex flex-col items-center justify-center py-12">
		<Quiz4Pics1Word />
		<QuizPad />
	</div>;
}

export default Map;
