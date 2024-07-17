import { useEffect, Dispatch } from "react";
import { ActionType } from "../types";

export const Timer = ({ time, dispatch }: { time: number; dispatch: Dispatch<ActionType> }) => {
  const formattedTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  return <div className="timer">{formattedTime}</div>;
};
