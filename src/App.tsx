import { useEffect } from "react";
import "./App.css";
import Loading from "./components/Loading";
import { useNavigate } from "react-router-dom";

const App = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const timeout = setTimeout(() => {
			navigate("/on-boarding");
		}, 2000);

		return () => clearTimeout(timeout);
	}, [navigate]);

	return <Loading />;
};

export default App;
