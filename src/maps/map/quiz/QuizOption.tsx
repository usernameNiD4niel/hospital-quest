import { useEffect, useState } from "react";
import { FillerProp, QuestionOptionsType } from "../../../types"
import { twMerge } from "tailwind-merge";

interface Props {
    quiz: QuestionOptionsType;
    filler: FillerProp;
}
function QuizOption({ quiz, filler }: Props) {
    const [answer, setAnswer] = useState('');
    const questions = JSON.parse(localStorage.getItem("__questions__") || "{}") as undefined | Record<FillerProp, string>;

    function onClick(ans: string) {
        if (questions) {
            const fill: Record<FillerProp, string> = {
                ...questions,
                [filler]: ans
            };
            localStorage.setItem("__questions__", JSON.stringify(fill));
        } else {
            localStorage.setItem("__questions__", JSON.stringify({ [filler]: ans }));
        }
        setAnswer(ans);
    }

    useEffect(() => {
        if (questions) {
            setAnswer(questions[filler]);
        }
    }, [filler, questions]);

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-xs flex flex-col space-y-2 px-4 md:max-w-lg">
                <p className="text-white">{quiz.question}</p>
                {quiz.options.map(option => (
                    <Option key={option} onClick={onClick} text={option} answer={answer} />
                ))}
            </div>
        </div>
    )
}

interface OptionProps {
    text: string;
    answer: string;
    onClick: (answer: string) => void;
}

function Option({ onClick, answer, text }: OptionProps) {
    return (
        <button className={twMerge(answer === text ? "bg-green-600 text-white" : "bg-slate-500/30 text-white", "rounded-md text-start p-3")} onClick={() => onClick(text)}>{text}</button>
    )
}

export default QuizOption