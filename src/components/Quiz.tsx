import { Dispatch } from "react";
import { type Question, type ActionType } from "../types";

export const Quiz = ({
  question,
  answer,
  dispatch,
}: {
  question: Question;
  answer: number;
  dispatch: Dispatch<ActionType>;
}) => {
  const hasAnswered = answer !== null;

  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswered ? (index === question.correctOption ? "correct" : "wrong") : ""
            }`}
            key={option}
            disabled={hasAnswered}
            onClick={() => {
              dispatch({ type: "answer", payload: index });
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
