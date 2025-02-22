import styles from "./page.module.css";
import { useContext, useState } from "react";
import { globalContext } from "./context";

function Question({
  qno,
  question,
  option1,
  option2,
  option3,
  option4,
  answer,
}) {
  const [b1Selected, setB1Selected] = useState(false);
  const [b2Selected, setB2Selected] = useState(false);
  const [b3Selected, setB3Selected] = useState(false);
  const [b4Selected, setB4Selected] = useState(false);

  const context = useContext(globalContext);

  const handleClick = (k) => {
    context.setSelectedAnswer(k);

    switch (k) {
      case "A":
        setB1Selected(true);
        setB2Selected(false);
        setB3Selected(false);
        setB4Selected(false);
        break;
      case "B":
        setB2Selected(true);
        setB1Selected(false);
        setB3Selected(false);
        setB4Selected(false);
        break;
      case "C":
        setB3Selected(true);
        setB1Selected(false);
        setB2Selected(false);
        setB4Selected(false);
        break;
      case "D":
        setB4Selected(true);
        setB1Selected(false);
        setB2Selected(false);
        setB3Selected(false);
        break;
    }
    console.log("clicked " + k);
  };

  return (
    <div className={styles.questionBox}>
      Score: {context.score}
      <div className={styles.questionArea}>
        <h4>
          Question {qno}/10:{" "}
          <img src="./thinking.gif" width="30" alt="question" />
        </h4>
        <h4>{question}</h4>
      </div>
      <div className={styles.options}>
        <p className={b1Selected ? styles.pSelectedOption : styles.pOption}>
          {" "}
          A. {option1}{" "}
        </p>
        <p className={b2Selected ? styles.pSelectedOption : styles.pOption}>
          {" "}
          B. {option2}{" "}
        </p>
        <p className={b3Selected ? styles.pSelectedOption : styles.pOption}>
          {" "}
          C. {option3}{" "}
        </p>
        <p className={b4Selected ? styles.pSelectedOption : styles.pOption}>
          {" "}
          D. {option4}{" "}
        </p>
      </div>
      <div className={styles.buttonGroup}>
        <button
          className={
            b1Selected ? styles.optionButtonSelected : styles.optionButton
          }
          onClick={() => handleClick("A")}
        >
          {" "}
          A{" "}
        </button>
        <button
          className={
            b2Selected ? styles.optionButtonSelected : styles.optionButton
          }
          onClick={() => handleClick("B")}
        >
          {" "}
          B{" "}
        </button>
        <button
          className={
            b3Selected ? styles.optionButtonSelected : styles.optionButton
          }
          onClick={() => handleClick("C")}
        >
          {" "}
          C{" "}
        </button>
        <button
          className={
            b4Selected ? styles.optionButtonSelected : styles.optionButton
          }
          onClick={() => handleClick("D")}
        >
          {" "}
          D{" "}
        </button>
      </div>
    </div>
  );
}

export default Question;
