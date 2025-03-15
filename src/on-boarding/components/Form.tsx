import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { FormEvent } from "react";
import Button from "../../components/Button";

function Form() {
    const navigate = useNavigate();

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const currentIndex = form.get("currentIndex")?.toString();
        const name = form.get("name")?.toString();

        if (!name || !currentIndex) {
            return;
        }

        localStorage.setItem("name", name);
        localStorage.setItem("currentIndex", currentIndex);
        navigate("/maps");
    }

    // w-full h-screen flex items-center flex-col space-y-4 pt-10 pb-8 px-6 justify-between md:max-w-xl
    return (
        <form onSubmit={onSubmit} className="w-full flex flex-col space-y-3 h-screen p-6 md:max-w-xl md:space-y-6">
            <Profile />
            <input placeholder="What should we call you?" name="name" className="w-full border rounded-lg outline-0 p-3 border-[var(--primary-color)] focus:bg-[var(--primary-color)]/20 focus:border-[var(--primary-color)] text-sm" />
            <Button type="submit" />
        </form>
    )
}

export default Form