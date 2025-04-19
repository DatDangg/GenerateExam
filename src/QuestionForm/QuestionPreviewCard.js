import React from "react";
import LatexPreview from "./LatexPreview";

import styles from './QuestionPreviewCard.module.css'

function QuestionPreviewCard({ question, onDelete }) {
  return (
    <div className={styles.preview}>
      <div className={styles.question}>
          Câu hỏi: <LatexPreview text={question.question} />
      </div>
      {question.choices && (
        <div className={styles.questionChoice}>
          {question.choices.map((choice) => (
            <div key={choice.label} className={styles.questionChoiceItem}>
              <div className={choice.correct ? `${styles.answer} ${styles.correct}` : `${styles.answer}`}>
                <p className={styles.label}>{choice.label}.</p>
                <p className={styles.text}>{choice.text}</p>
                <p className={styles.choice}>{choice.correct ? "✓" : ""}</p>
              </div>
              {choice.explain && (
                <p className={styles.explainOption}>
                {choice.explain}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* PART 3 */}
      {question.type === "Part_3" && question.answer && (
        <div className={styles.answerPart3}>
          <strong>Đáp án:</strong> {question.answer}
        </div>
      )}

      {question.explain && (
        <div className={styles.explain}>
            Giải thích: <LatexPreview text={question.explain} />
        </div>
      )}

      <button
        onClick={onDelete}
        className={styles.delete}
      >
        Xoá
      </button>
    </div>
  );
}

export default QuestionPreviewCard;
