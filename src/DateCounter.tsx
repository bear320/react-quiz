import { useReducer } from "react";

type ActionType =
  | {
      type: "inc" | "dec" | "setCount" | "setStep";
      payload: number;
    }
  | {
      type: "reset";
    };

const initialState = {
  count: 0,
  step: 1,
};

const reducer = (state: typeof initialState, action: ActionType) => {
  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + state.step };

    case "dec":
      return { ...state, count: state.count - state.step };

    case "setCount":
      return { ...state, count: action.payload };

    case "setStep":
      return { ...state, step: action.payload };

    case "reset":
      return initialState;

    default:
      throw new Error("Unknown action");
  }
};

const DateCounter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = () => {
    dispatch({ type: "dec", payload: step });
  };

  const inc = () => {
    dispatch({ type: "inc", payload: step });
  };

  const defineCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "setCount", payload: +e.target.value });
  };

  const defineStep = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "setStep", payload: +e.target.value });
  };

  const reset = () => {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input type="range" min="1" max="10" value={step} onChange={defineStep} />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default DateCounter;
