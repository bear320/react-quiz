import { Dispatch } from "react";
import { type ActionType } from "../types";

export const Result = ({
  points,
  maxPoints,
  highscore,
  dispatch,
}: {
  points: number;
  maxPoints: number;
  highscore: number;
  dispatch: Dispatch<ActionType>;
}) => {
  const percentage = Math.round((points / maxPoints) * 100);

  let emoji;
  if (percentage === 100) emoji = "🥇";
  else if (percentage >= 80 && percentage < 100) emoji = "🎉";
  else if (percentage >= 50 && percentage < 80) emoji = "🙃";
  else if (percentage >= 0 && percentage < 50) emoji = "🤨";
  else if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of <strong>{maxPoints}</strong> ({percentage}%).
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button className="btn btn-ui" onClick={() => dispatch({ type: "restart" })}>
        Restart
      </button>
    </>
  );
};
