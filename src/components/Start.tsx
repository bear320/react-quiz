import { Dispatch } from "react";
import { type ActionType } from "../types";

export const Start = ({ qty, dispatch }: { qty: number; dispatch: Dispatch<ActionType> }) => {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{qty} questions to test your react mastery</h3>
      <button className="btn btn-ui" onClick={() => dispatch({ type: "start" })}>
        Let's start
      </button>
    </div>
  );
};
