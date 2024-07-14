import { useReducer, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { Loader } from "./components/Loader";
import { ErrorMsg } from "./components/ErrorMsg";
import { Start } from "./components/Start";

type Question = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
  id: string;
};

enum Status {
  Loading = "loading",
  Error = "error",
  Ready = "ready",
  Active = "active",
  Finished = "finished",
}

type StateType = {
  questions: Question[];
  status: Status;
};

type ActionType =
  | {
      type: "dataFetched";
      payload: Question[];
    }
  | {
      type: "dataFailed";
    };

const initialState: StateType = {
  questions: [],
  status: Status.Loading,
};

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "dataFetched":
      return { ...state, questions: action.payload, status: Status.Ready };

    case "dataFailed":
      return { ...state, status: Status.Error };

    default:
      throw new Error("Unknown action");
  }
};

const App = () => {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  const questionQty = questions.length;

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataFetched", payload: data }))
      .catch((err) => {
        console.error(err);
        dispatch({ type: "dataFailed" });
      });
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === Status.Loading && <Loader />}
        {status === Status.Error && <ErrorMsg />}
        {status === Status.Ready && <Start qty={questionQty} />}
      </Main>
    </div>
  );
};

export default App;
