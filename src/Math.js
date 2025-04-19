// 📁 Math.jsx
import React, { useState } from "react";
// import TitleInput from "./QuestionForm/TitleInput";
import QuestionInput from "./QuestionForm/QuestionInput";
import ExplainInput from "./QuestionForm/ExplainInput";
import LatexPreview from "./QuestionForm/LatexPreview";
import OptionInputList from "./QuestionForm/OptionInputList";
import AnswerInput from "./QuestionForm/AnswerInput";
import QuestionPreviewCard from "./QuestionForm/QuestionPreviewCard";

function Math() {
  const [title, setTitle] = useState("");
  const [questions, setQuestion] = useState([]);
  const [ques, setQues] = useState("");
  const [options, setOptions] = useState({});
  const [answer, setAnswer] = useState({});
  const [explanations, setExplanations] = useState({});
  const [questionType, setQuestionType] = useState("Part_1");
  const [explain, setExplain] = useState("");

  const handleAddQuestion = () => {
    let newQuestion = {
      type: questionType,
      question: ques,
      explain: explain,
    };

    if (questionType === "Part_1" || questionType === "Part_2") {
      const labels = ["A", "B", "C", "D"];
      newQuestion.choices = labels.map((label) => ({
        label,
        text: options[label] || "",
        correct:
          questionType === "Part_1"
            ? answer.answer === label
            : answer[label] === "true",
        explain: questionType === "Part_2" ? explanations[label] || "" : "",
      }));
    }

    if (questionType === "Part_3") {
      newQuestion.answer = Object.values(answer).join("");
    }

    setQuestion([...questions, newQuestion]);
    setOptions({});
    setAnswer({});
    setExplanations({});
    setExplain("");
    setQues("");
  };

  const handleSaveQuestion = () => {
    console.log({ title, questions });
  };

  const handleOptionChange = (label, value) => {
    setOptions((prev) => ({ ...prev, [label]: value }));
  };

  const handleAnswer = (value, label = "answer") => {
    setAnswer((prev) => ({ ...prev, [label]: value }));
  };

  const handleExplainChange = (label, value) => {
    setExplanations((prev) => ({ ...prev, [label]: value }));
  };

  const handleDigitAnswer = (input) => {
    if (input.length > 4) return;
    const answerArr = input.split("").slice(0, 4);
    const obj = {};
    answerArr.forEach((char, idx) => {
      obj[idx] = char;
    });
    setAnswer(obj);
  };

  const handleDelete = (index) => {
    const filtered = questions.filter((_, idx) => idx !== index);
    setQuestion(filtered);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h3>Tạo đề toán</h3>
      {/* <TitleInput title={title} onChange={setTitle} /> */}

      <div>
        <span style={{ marginRight: "10px" }}>Chọn phần: </span>
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
        >
          <option value="Part_1">Phần 1</option>
          <option value="Part_2">Phần 2</option>
          <option value="Part_3">Phần 3</option>
        </select>
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "30px",
          margin: "30px",
          borderRadius: "12px",
          backgroundColor: "#fefefe",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ display: "flex", gap: "40px" }}>
          <QuestionInput ques={ques} onChange={setQues} />
          <div style={{ width: "50%" }}>
            <p style={{ fontWeight: "600", marginBottom: "8px" }}>Preview</p>
            <div
              style={{
                width: "100%",
                minHeight: "50px",
                padding: "12px 16px",
                fontSize: "18px",
                lineHeight: "1.5",
                backgroundColor: "#fafafa",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              <LatexPreview text={ques} />
            </div>
          </div>
        </div>

        {(questionType === "Part_1" || questionType === "Part_2") && (
          <OptionInputList
            type={questionType}
            options={options}
            answer={answer}
            onOptionChange={handleOptionChange}
            onAnswerChange={handleAnswer}
            explanations={explanations}
            onExplainChange={handleExplainChange}
          />
        )}

        {questionType === "Part_3" && (
          <AnswerInput
            type={questionType}
            answer={answer}
            onDigitChange={handleDigitAnswer}
          />
        )}

        
      </div>

      <button
        onClick={handleAddQuestion}
        style={{ marginRight: "50px" }}
      >
        Add
      </button>
      <button onClick={handleSaveQuestion}>Save</button>

      {questions.map((q, index) => (
        <QuestionPreviewCard
          key={index}
          // index={index}
          question={q}
          onDelete={() => handleDelete(index)}
        />
      ))}
    </div>
  );
}

export default Math;
