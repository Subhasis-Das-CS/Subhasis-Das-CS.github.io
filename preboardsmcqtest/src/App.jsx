import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import styles from "./page.module.css";
import Question from "./question";
import GlobalState from "./context";
import { globalContext } from "./context";
import { motion, AnimatePresence } from "framer-motion";
import app from "./firebaseConfig";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [localScore, setLocalScore] = useState(0);

  const [name, setName] = useState("User");
  const [shaking, setShaking] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);
  const context = useContext(globalContext);
  const [dataUploaded, setDataUploaded] = useState(false);
  const db = getFirestore(app);

  function showAnswer(k, index) {
    switch (k) {
      case "A":
        return <span>{context.options[index].option1}</span>;
      case "B":
        return <span>{context.options[index].option2}</span>;
      case "C":
        return <span>{context.options[index].option3}</span>;
      case "D":
        return <span>{context.options[index].option4}</span>;
    }
  }

  async function upload(name, score) {
    const document = {
      name,
      score,
    };

    await addDoc(collection(db, "scores"), document);
  }

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

    if (context.index == 10 && !dataUploaded) {
      upload(name, context.score);
      setDataUploaded(true); // set to true to prevent multiple uploads
      console.log(`Uploaded, Name: ${name} Score: ${context.score}`);
      context.correctIndices.forEach((i) => {
        console.log(i);
      });
    }
  }, [context.score, context.index]);

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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h1 style={{ color: " #efefef" }}>Name: {name}</h1>

          <h2 style={{ color: " #efefef" }}>Final Score: {context.score}</h2>

          {context.correctIndices.map((i) => (
            <div
              className={i.correctNess ? styles.resultBox : styles.resultBoxRed}
              key={i.index}
            >
              <h5>
                Question {i.index + 1}: {context.questions[i.index]} <br></br>{" "}
                Status: {i.correctNess ? "correct" : "incorrect"} <br></br>
                Correct Answer: {context.answers[i.index]}. &nbsp;
                {showAnswer(context.answers[i.index], i.index)}
              </h5>
            </div>
          ))}
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
          <h4 style={{ color: " #efefef", marginTop: "-5px" }}>
            User: <font color="#32e638">{name}</font>
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
                context.setCorrectIndices([
                  ...context.correctIndices,
                  { index: context.index, correctNess: true },
                ]);
                console.log("index " + context.index + " added in list");

                console.log("correct, Score Increased");

                context.setIndex(context.index + 1);
              } else if (context.selectedAnswer == "") {
                alert("choose an option");
              } else {
                console.log("incorrect");
                context.setCorrectIndices([
                  ...context.correctIndices,
                  { index: context.index, correctNess: false },
                ]);
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

      <h6>
        <a className={styles.link} href="https://instagram.com/Subhasisdas__">
          🚀 Developed by Subhasis
        </a>
      </h6>
    </div>
  );
}

export default App;
