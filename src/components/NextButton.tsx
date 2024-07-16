import { Dispatch } from "react";
import { type ActionType } from "../types";

export const NextButton = ({
  index,
  qty,
  answer,
  dispatch,
}: {
  index: number;
  qty: number;
  answer: number;
  dispatch: Dispatch<ActionType>;
}) => {
  if (answer === null) return null;
  else if (index < qty - 1)
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: "next" })}>
        Next
      </button>
    );
  else if (index === qty - 1)
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: "finish" })}>
        Finish
      </button>
    );
};
