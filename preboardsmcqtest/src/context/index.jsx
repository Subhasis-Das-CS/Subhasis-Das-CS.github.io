import { Children, createContext, useEffect, useState } from "react";

export const globalContext = createContext(null);

function GlobalState({ children }) {
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [correctIndices, setCorrectIndices] = useState([]);

  function initialize() {
    setAnswers(["A", "B", "C", "D", "A", "B", "C", "D", "A", "B"]);

    setQuestions([
      "Question 1",
      "Question 2",
      "Question 3",
      "Question 4",
      "Question 5",
      "Question 6",
      "Question 7",
      "Question 8",
      "Question 9",
      "Question 10",
    ]);
    setOptions([
      {
        option1: "option1",
        option2: "option2",
        option3: "option3",
        option4: "option4",
      },
      {
        option1: "option1",
        option2: "option2",
        option3: "option3",
        option4: "option4",
      },
      {
        option1: "option1",
        option2: "option2",
        option3: "option3",
        option4: "option4",
      },
      {
        option1: "option1",
        option2: "option2",
        option3: "option3",
        option4: "option4",
      },
      {
        option1: "option1",
        option2: "option2",
        option3: "option3",
        option4: "option4",
      },
      {
        option1: "option1",
        option2: "option2",
        option3: "option3",
        option4: "option4",
      },
      {
        option1: "option1",
        option2: "option2",
        option3: "option3",
        option4: "option4",
      },
      {
        option1: "option1",
        option2: "option2",
        option3: "option3",
        option4: "option4",
      },
      {
        option1: "option1",
        option2: "option2",
        option3: "option3",
        option4: "option4",
      },
      {
        option1: "option1",
        option2: "option2",
        option3: "option3",
        option4: "option4",
      },
    ]);
  }

  useEffect(() => {
    initialize();
  }, []);
  return (
    <globalContext.Provider
      value={{
        questions,
        setQuestions,
        options,
        setOptions,
        answers,
        setAnswers,
        score,
        setScore,
        index,
        setIndex,
        selectedAnswer,
        setSelectedAnswer,
        correctIndices,
        setCorrectIndices,
      }}
    >
      {children}
    </globalContext.Provider>
  );
}

export default GlobalState;
