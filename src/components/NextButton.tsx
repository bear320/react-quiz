import { Dispatch } from "react";
import { type ActionType } from "../types";

export const NextButton = ({ answer, dispatch }: { answer: number; dispatch: Dispatch<ActionType> }) => {
  if (answer === null) return null;

  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "next" })}>
      Next
    </button>
  );
};
