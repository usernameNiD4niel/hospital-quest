import { QuestionOptionsType } from "../../../types"

interface Props {
    quiz: QuestionOptionsType;
}
function QuizOption({ quiz }: Props) {
    return (
        <div>
            <p>{quiz.question}</p>
            <p>{quiz.answer}</p>
            {quiz.options.map(option => (
                <p key={option}>{option}</p>
            ))}
        </div>
    )
}

export default QuizOption