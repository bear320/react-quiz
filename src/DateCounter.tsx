import { useState, useReducer } from "react";

type ActionType = { type: "inc" } | { type: "dec" } | { type: "set"; payload: number };

const reducer = (state: number, action: ActionType) => {
  switch (action.type) {
    case "inc":
      return state++;

    case "dec":
      return state--;

    case "set":
      return action.payload;
  }
};

const DateCounter = () => {
  // const [count, setCount] = useState<number>(0);

  const [count, dispatch] = useReducer(reducer, 0);

  const [step, setStep] = useState<number>(1);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = () => {
    dispatch({ type: "dec" });
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = () => {
    dispatch({ type: "inc" });
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "set", payload: +e.target.value });
    // setCount(Number(e.target.value));
  };

  const defineStep = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStep(Number(e.target.value));
  };

  const reset = () => {
    // setCount(0);
    setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input type="range" min="0" max="10" value={step} onChange={defineStep} />
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
