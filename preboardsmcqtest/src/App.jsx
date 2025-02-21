import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import styles from "./page.module.css";
import Question from "./question";
import GlobalState from "./context";
import { globalContext } from "./context";
import { motion, AnimatePresence } from "framer-motion";
function App() {
  const [localScore, setLocalScore] = useState(0);

  const [name, setName] = useState("User");
  const [shaking, setShaking] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);
  const context = useContext(globalContext);

  function continueClicked() {
    const newname = document.getElementById("name").value;
    setName(newname);
    if (newname != "") {
      setStartQuiz(true);
    } else {
      setShaking(true);

      setTimeout(() => {
        setShaking(false);
      }, 300);
    }
  }

  useEffect(() => {
    console.log("updated score: ", context.score);
  }, [context.score]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}> ICSE Computer Application MCQ</h2>
      {!startQuiz ? (
        <div className={styles.box}>
          <input
            id="name"
            className={
              shaking ? styles.enterYourNameShake : styles.enterYourName
            }
            type="text"
            placeholder="Enter Your Name"
          ></input>
          <button
            className={styles.continue}
            onClick={() => {
              continueClicked();
            }}
          >
            Continue ➤
          </button>
        </div>
      ) : context.index > 9 ? (
        <div>
          <h1 style={{ color: "dodgerblue" }}>Quiz ended</h1>
          <h2 style={{ color: "dodgerblue" }}>Final Score: {context.score}</h2>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h4 style={{ color: "dodgerblue", marginTop: "-5px" }}>
            User: {name}
          </h4>
          {/* Animated Question Transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={context.index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className={styles.questionContainer}
            >
              <Question
                question={context.questions[context.index]}
                qno={context.index + 1}
                option1={context.options[context.index].option1}
                option2={context.options[context.index].option2}
                option3={context.options[context.index].option3}
                option4={context.options[context.index].option4}
                answer={context.answers[context.index]}
                name={name}
              />
            </motion.div>
          </AnimatePresence>
          <button
            onClick={() => {
              if (context.selectedAnswer == context.answers[context.index]) {
                context.setScore(context.score + 1);

                context.setIndex(context.index + 1);

                console.log("correct, Score Increased");
              } else if (context.selectedAnswer == "") {
                alert("choose an option");
              } else {
                console.log("incorrect");
                context.setIndex(context.index + 1);
              }
              context.setSelectedAnswer("");
            }}
            className={styles.continue}
          >
            Next Question ➤
          </button>
        </div>
      )}

      <h6 style={{ color: "black" }}>Developed by Subhasis</h6>
    </div>
  );
}

export default App;
