import React from "react";
import Latex from "../Latex";

import styles from './LatexPreview.module.css'

function LatexPreview({ text }) {
  const parts = text?.split(/(\$\$.*?\$\$|!\[.*?\]\(.*?\))/g) || [];

  return (
    <>
      {parts.map((part, index) => {
        const latex = part.match(/\$\$(.*?)\$\$/);
        const img = part.match(/!\[(.*?)\]\((.*?)\)/);
        if (latex) return <Latex key={index} tex={latex[1]} />;
        if (img)
          return (
            <img
              key={index}
              src={img[2]}
              alt={img[1]}
              className={styles.img}
            />
          );
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

export default LatexPreview;
