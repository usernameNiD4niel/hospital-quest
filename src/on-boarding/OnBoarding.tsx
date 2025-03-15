import Welcome from "./components/Welcome";
import Form from "./components/Form";

function OnBoarding() {
    const name = localStorage.getItem("name");
    const currentIndex = localStorage.getItem("currentIndex");

    if (name && currentIndex) {
        return <div className="w-full flex justify-center bg-secondary">
            <Welcome name={name} currentIndex={currentIndex} />
        </div>;
    }

    return (
        <div className="w-full bg-secondary flex items-center justify-center">
            <Form />
        </div>
    )
}


export default OnBoarding;