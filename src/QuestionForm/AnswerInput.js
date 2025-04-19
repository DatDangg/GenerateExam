import React from "react";

import styles from './AnswerInput.module.css'

function AnswerInput({ type, answer, onDigitChange }) {
  const inputValue =
    type === "Part_3" ? Object.values(answer).join("") : answer.answer || "";

  if (type !== "Part_3") return null;

  return (
    <div className={styles.part3}>
      <input
        value={inputValue}
        onChange={(e) => onDigitChange(e.target.value)}
        className={styles.input}
        placeholder="Ví dụ: 1,25 hoặc -1,2"
      />
    </div>
  );
}

export default AnswerInput;
