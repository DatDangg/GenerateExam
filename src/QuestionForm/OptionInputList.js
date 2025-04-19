import React from "react";
import LatexPreview from "./LatexPreview";

import styles from './OptionInputList.module.css'

function OptionInputList({ type, options, answer, explanations, onOptionChange, onAnswerChange, onExplainChange }) {
  const labels = ["A", "B", "C", "D"];

  return (
    <div className={styles.options}>
      {labels.map((label) => (
        <div key={label} className={styles.label}>
          <div className={styles.answerChoice}>
            {type === "Part_1" && (
              <input
                type="radio"
                name="single-answer"
                checked={answer.answer === label}
                onChange={() => onAnswerChange(label, "answer")}
              />
            )}
            {type === "Part_2" && (
              <select
                value={answer[label] || ""}
                onChange={(e) => onAnswerChange(e.target.value, label)}
                className={styles.select}
              >
                <option value="">---</option>
                <option value="true">Đúng</option>
                <option value="false">Sai</option>
              </select>
            )}

            <span className={styles.labelName}>{label}</span>
            <input
              value={options[label] || ""}
              onChange={(e) => onOptionChange(label, e.target.value)}
              className={styles.input}
            />
            <div className={styles.preview}>
              {options[label] && <LatexPreview text={options[label]} />}
            </div>
          </div>

          {type === "Part_2" && (
            <input
              placeholder="Giải thích cho lựa chọn này"
              value={explanations[label] || ""}
              onChange={(e) => onExplainChange(label, e.target.value)}
              className={styles.part2}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default OptionInputList;
