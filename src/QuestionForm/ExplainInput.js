import React from "react";
import ImageUpload from "./ImageUpload";
import LatexPreview from "./LatexPreview";

import styles from "./ExplainInput.module.css";

function ExplainInput({ explain, onChange }) {
  return (
    <div className={styles.explainInput}>
      <div className={styles.wrapper}>
        <textarea
          id="explain-input"
          value={explain}
          onChange={(e) => onChange(e.target.value)}
          className={styles.input}
        />
        <div className={styles.preview}>
          <LatexPreview text={explain} />
        </div>
      </div>
      <ImageUpload target="ques" />
    </div>
  );
}

export default ExplainInput;
