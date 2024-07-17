import React, { useRef, useState } from "react";
import "../Container.css";
import { data } from "../Assets/data.js";

const QuizComponent = () => {
  let [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  const [results, setResults] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);
  let option_Arrar = [option1, option2, option3, option4];

  function checkAns(e, ans) {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore(++score);
      } else {
        e.target.classList.add("wrong");
        option_Arrar[question.ans - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  }

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResults(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_Arrar.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };
  const reset = () => {
    setScore(0);
    setIndex(0);
    setQuestion(data[index]);
    setResults(false);
    setLock(false);
  };
  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {results ? (
        <>
          <h2>
            your score is {score} out of {data.length}
          </h2>
          <button onClick={reset}>reset</button>
        </>
      ) : (
        <>
          {" "}
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </li>
            <li ref={option2} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </li>
            <li ref={option3} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </li>
            <li ref={option4} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={next}>next</button>
          <div className="index">{index + 1} of 5 questions</div>
        </>
      )}
    </div>
  );
};

export default QuizComponent;
