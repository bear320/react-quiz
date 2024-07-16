import { useReducer, useEffect } from "react";
import { Status, type StateType, type ActionType } from "./types";
import Header from "./components/Header";
import Main from "./components/Main";
import { Loader } from "./components/Loader";
import { ErrorMsg } from "./components/ErrorMsg";
import { Start } from "./components/Start";
import { Quiz } from "./components/Quiz";
import { NextButton } from "./components/NextButton";
import { Progress } from "./components/Progress";
import { Result } from "./components/Result";

const initialState: StateType = {
  index: 0,
  questions: [],
  answer: null,
  points: 0,
  highscore: 0,
  status: Status.Loading,
};

const reducer = (state: StateType, action: ActionType): StateType => {
  const q = state.questions[state.index];

  switch (action.type) {
    case "dataFetched":
      return { ...state, questions: action.payload, status: Status.Ready };

    case "dataFailed":
      return { ...state, status: Status.Error };

    case "start":
      return { ...state, status: Status.Active };

    case "answer":
      return {
        ...state,
        answer: action.payload,
        points: action.payload === q.correctOption ? state.points + q.points : state.points,
      };

    case "next":
      return { ...state, index: state.index++, answer: null };

    case "finish":
      return {
        ...state,
        status: Status.Finished,
        highscore: state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return { ...initialState, questions: state.questions, highscore: state.highscore, status: Status.Ready };

    default:
      throw new Error("Unknown action");
  }
};

const App = () => {
  const [{ index, questions, answer, points, highscore, status }, dispatch] = useReducer(reducer, initialState);

  const questionQty = questions.length;
  const maxPoints = questions.reduce((acc, q) => acc + q.points, 0);

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
        {status === Status.Ready && <Start qty={questionQty} dispatch={dispatch} />}
        {status === Status.Active && (
          <>
            <Progress index={index} qty={questionQty} points={points} maxPoints={maxPoints} answer={answer!} />
            <Quiz question={questions[index]} answer={answer!} dispatch={dispatch} />
            <NextButton index={index} qty={questionQty} answer={answer!} dispatch={dispatch} />
          </>
        )}
        {status === Status.Finished && (
          <Result points={points} maxPoints={maxPoints} highscore={highscore} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
};

export default App;
