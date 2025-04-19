import styles from "./App.module.css";
import multiple from "./img/multiple.webp";
import boolean from "./img/boolean.webp";
import text from "./img/text.svg";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import React, { useState } from "react";
import QuestionInput from "./QuestionForm/QuestionInput";
import ExplainInput from "./QuestionForm/ExplainInput";
import OptionInputList from "./QuestionForm/OptionInputList";
import AnswerInput from "./QuestionForm/AnswerInput";
import QuestionPreviewCard from "./QuestionForm/QuestionPreviewCard";

function App() {
  const [title, setTitle] = useState("");
  const [questions, setQuestion] = useState([]);
  const [ques, setQues] = useState("");
  const [options, setOptions] = useState({});
  const [answer, setAnswer] = useState({});
  const [explanations, setExplanations] = useState({});
  const [questionType, setQuestionType] = useState("Part_1");
  const [explain, setExplain] = useState("");

  const handleAddQuestion = () => {
    if (ques.trim() === "") {
      toast.error("Câu hỏi không được để trống", {
        pauseOnHover: false,
      });
      return;
    }
    
    if (questionType !== "Part_3" && Object.keys(options).length < 4 && Object.keys(explanations).length <4) {
      toast.error("Bạn cần nhập các lựa chọn", {
        pauseOnHover: false,
      });
      return;
    }

    if (questionType === "Part_2" && Object.keys(explanations).length < 4) {
      toast.error("Bạn cần nhập giải thích cho từng phần", {
        pauseOnHover: false,
      });
      return;
    }

    if (questionType === "Part_2" && Object.keys(answer).length < 4) {
      toast.error("Bạn cần chọn đáp án cho từng phần", {
        pauseOnHover: false,
      });
      return;
    }

    if (questionType === "Part_3" && Object.keys(answer).length ===0) {
      toast.error("Bạn nhập chọn đáp án đúng", {
        pauseOnHover: false,
      });
      return;
    }

    if (questionType === "Part_1" && Object.keys(answer).length === 0) {
      toast.error("Bạn cần chọn đáp án đúng", {
        pauseOnHover: false,
      });
      return;
    }
    
    if (questionType !== "Part_2" && explain.trim() === "") {
      toast.error("Bạn cần nhập giải thích", {
        pauseOnHover: false,
      });
      return;
    }
    
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
    toast("Đã thêm câu hỏi", {
      autoClose: 2000,
      className: styles.customToast,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
    
  };

  const handleSaveQuestion = () => {
    toast("Đã lưu câu hỏi", {
      autoClose: 2000,
      className: styles.customToast,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
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
    if (input.length > 4 || /^[A-Za-z]$/.test(input)) return;
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

  const handleType = (value) => {
    setQuestionType(value);
  };

  return (
    <div className={styles.app}>
      <ToastContainer />
      <div className={styles.header}>
        <button onClick={handleAddQuestion} className={styles.add}>Thêm câu hỏi</button>
        <button onClick={handleSaveQuestion} className={styles.save}>Lưu</button>
      </div>
      <div className="container">
        <div className={styles.title}>Đề có: <span>{questions.length} câu hỏi</span> </div>
        <div className={styles.wrapper}>
          <div className="row">
            <div className="col-md-1 d-flex justify-content-end">
              <div className={styles.titleCount}>1</div>
            </div>
            <div className="col-md-11 mb-3">
              <div>
                <div className={styles.titleName}>Lựa chọn loại đề</div>
                <div className={styles.titleDesc}>Chọn loại đề tương ứng với phần bạn làm</div>
              </div>
              <div className={styles.partContent}>
                <div className={styles.choice}>
                  <div
                    className={
                      questionType === "Part_1"
                        ? `${styles.active} ${styles.choiceItem}`
                        : `${styles.choiceItem}`
                    }
                    onClick={() => handleType("Part_1")}
                  >
                    <img src={multiple} className={styles.choiceImg}></img>
                    <span className={styles.choiceName}>Chọn đáp án</span>
                  </div>
                  <div
                    className={
                      questionType === "Part_2"
                        ? `${styles.active} ${styles.choiceItem}`
                        : `${styles.choiceItem}`
                    }
                    onClick={() => handleType("Part_2")}
                  >
                    <img src={boolean} className={styles.choiceImg}></img>
                    <span className={styles.choiceName}>Đúng sai</span>
                  </div>
                  <div
                    className={
                      questionType === "Part_3"
                        ? `${styles.active} ${styles.choiceItem}`
                        : `${styles.choiceItem}`
                    }
                    onClick={() => handleType("Part_3")}
                  >
                    <img src={text}></img>
                    <span className={styles.choiceName}>Nhập câu trả lời</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-1 d-flex justify-content-end">
              <div className={styles.titleCount}>2</div>
            </div>
            <div className="col-md-11 mb-3">
              <div>
                <div className={styles.titleName}>Nhập câu hỏi</div>
                <div className={styles.titleDesc}>
                  Chỉ viết câu hỏi ở đây, không viết câu trả lời
                </div>
              </div>
              <div className={styles.partContent}>
                <div className={styles.questionInput}>
                  <QuestionInput ques={ques} onChange={setQues} />
                </div>
              </div>
            </div>
          </div>
          {(questionType === "Part_1" || questionType === "Part_2") && (
            <div className="row">
              <div className="col-md-1 d-flex justify-content-end">
                <div className={styles.titleCount}>3</div>
              </div>
              <div className="col-md-11 mb-3">
                <div>
                  <div className={styles.titleName}>Nhập lựa chọn</div>
                  <div className={styles.titleDesc}>
                    Nhập các lựa chọn tương ứng cho câu hỏi
                  </div>
                </div>
                <div className={styles.partContent}>
                  <OptionInputList
                    type={questionType}
                    options={options}
                    answer={answer}
                    onOptionChange={handleOptionChange}
                    onAnswerChange={handleAnswer}
                    explanations={explanations}
                    onExplainChange={handleExplainChange}
                  />
                </div>
              </div>
            </div>
          )}
          {questionType === "Part_3" && (
            <div className="row">
              <div className="col-md-1 d-flex justify-content-end">
                <div className={styles.titleCount}>3</div>
              </div>
              <div className="col-md-11 mb-3">
                <div>
                  <div className={styles.titleName}>Nhập đáp án</div>
                  <div className={styles.titleDesc}>
                    Đáp án chỉ có 4 ký tự gồm số 0-9 | dấu , | dấu -
                  </div>
                </div>
                <div className={styles.partContent}>
                  <AnswerInput
                    type={questionType}
                    answer={answer}
                    onDigitChange={handleDigitAnswer}
                  />
                </div>
              </div>
            </div>
          )}
          {(questionType === "Part_1" || questionType === "Part_3") && (
            <div className="row">
              <div className="col-md-1 d-flex justify-content-end">
                <div className={styles.titleCount}>4</div>
              </div>
              <div className="col-md-11 mb-3">
                <div>
                  <div className={styles.titleName}>Nhập giải thích</div>
                  <div className={styles.titleDesc}>
                    Viết giải thích cho đáp án trên
                  </div>
                </div>
                <div className={styles.partContent}>
                  <div className={styles.explain}>
                    <ExplainInput explain={explain} onChange={setExplain} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-md-1 d-flex justify-content-end">
              <div className={styles.titleCount}>4</div>
            </div>
            <div className="col-md-11 mb-3">
              <div>
                <div className={styles.titleName}>Xem lại câu hỏi</div>
                <div className={styles.titleDesc}>
                  Xem lại câu hỏi bạn vừa mới nhập
                </div>
              </div>
              <div className={styles.partContent}>

                {questions.length > 0 && (
                  <QuestionPreviewCard
                    key={questions.length - 1}
                    index={questions.length - 1}
                    question={questions[questions.length - 1]}
                    onDelete={() => handleDelete(questions.length - 1)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
