import React, { useState } from 'react';
import Latex from './Latex';

function App() {
  const [title, setTitle] = useState('');
  const [questions, setQuestion] = useState([]);
  const [ques, setQues] = useState('')
  const [options, setOptions] = useState({})
  const [answer, setAnswer] = useState({})
  const [questionType, setQuestionType] = useState('Part_1')
  const [explain, setExplain] = useState('')

  const handleTitle = (e) => {
    setTitle(e)
  }

  const handleChange = (value) => {
    setQues(value)
  };

  const handleExplain = (value) => {
    setExplain(value)
  }

  const handleAddQuestion = () => {
    const question = {
      type: questionType, question: ques, answer: answer, explain: explain
    }
    if (questionType === 'Part_1' || questionType === 'Part_2') question['options'] = options

    setQuestion([...questions, question])
    setOptions({})
    setAnswer({})
    setExplain('')
    setQues('')
  };

  const handleSaveQuestion = () => {
    console.log({ title, questions })
    console.log(answer)
  }

  const handleDelete = (index) => {
    const newC = questions.filter((question, idx) => {
      return idx !== index
    })
    setQuestion(newC)
  }

  const renderMixedText = (input) => {
    const parts = input.split(/(\$\$.*?\$\$)/g);
    return parts.map((part, index) => {
      const match = part.match(/\$\$(.*?)\$\$/);
      if (match) {
        return <Latex key={index} tex={match[1]} />;
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  const handleOptionChange = (label, input) => {
    setOptions(prev => ({ ...prev, [label]: input }))
  }

  const handleAnswer = (input, label = 'answer') => {
    setAnswer(prev => ({ ...prev, [label]: input }))
  }

  const handleDigitAnswer = (input) => {
    if (input.length > 4) return;
    const answerArr = input.split('').slice(0, 4);
    const obj = {};
    answerArr.forEach((char, idx) => {
      obj[idx] = char;
    });
    setAnswer(obj);
  };
  

  return (
    <div style={{ padding: '2rem' }}>
      <h3>Tạo đề toán</h3>
      <div style={{ marginBottom: '10px' }}>Tên đề: <input value={title} onChange={(e) => handleTitle(e.target.value)}></input></div>
      <div>
        <span style={{ marginRight: '10px' }}>Chọn phần: </span>
        <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
          <option value="Part_1">Phần 1</option>
          <option value="Part_2">Phần 2</option>
          <option value="Part_3">Phần 3</option>
        </select>
      </div>
      <div style={{ border: '1px solid #ddd', padding: '30px', margin: '30px', borderRadius: '12px', backgroundColor: '#fefefe', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', gap: '40px' }}>
          <div style={{ width: '50%' }}>
            <p style={{ fontWeight: '600', marginBottom: '8px' }}>Nhập câu hỏi</p>
            <input
              onChange={(e) => handleChange(e.target.value)}
              value={ques}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
              placeholder='Ex: Giải phương trình $$x^2 + 2x + 1 = 0$$'
            />
          </div>
          <div style={{ width: '50%' }}>
            <p style={{ fontWeight: '600', marginBottom: '8px' }}>Preview</p>
            <div
              style={{
                width: '100%',
                minHeight: '50px',
                padding: '12px 16px',
                fontSize: '18px',
                lineHeight: '1.5',
                backgroundColor: '#fafafa',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
              }}
            >
              {renderMixedText(ques)}
            </div>
          </div>
        </div>

        {(questionType === 'Part_2' || questionType === 'Part_1') && (
          <div style={{ marginTop: '30px' }}>
            <p style={{ fontWeight: '600' }}>Options</p>
            {['A', 'B', 'C', 'D'].map((label) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '10px',
                }}
              >
                <span style={{ width: '20px', fontWeight: 'bold' }}>{label}</span>
                <input
                  value={options[label] || ''}
                  onChange={(e) => handleOptionChange(label, e.target.value)}
                  style={{
                    flex: '1',
                    height: '36px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                  }}
                />
                <div
                  style={{
                    flex: '2',
                    padding: '8px 12px',
                    minHeight: '36px',
                    backgroundColor: '#f9f9f9',
                    fontSize: '16px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
                  }}
                >
                  {options[label] && renderMixedText(options[label])}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '30px' }}>
          <p style={{ fontWeight: '600' }}>Answer</p>
          {questionType === 'Part_2' &&
            ['A', 'B', 'C', 'D'].map((label) => (
              <div key={label} style={{ marginBottom: '10px' }}>
                <span style={{ marginRight: '20px' }}>{label}</span>
                <input
                  value={answer[label] || ''}
                  onChange={(e) => handleAnswer(e.target.value, label)}
                  style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
              </div>
            ))}
          {(questionType === 'Part_1' || questionType === 'Part_3') && (
            <input
              value={answer.answer || ''}
              onChange={(e) =>
                questionType === 'Part_3' ? handleDigitAnswer(e.target.value) : handleAnswer(e.target.value)
              }
              style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
          )}
        </div>

        <div style={{ marginTop: '30px' }}>
          <div style={{ display: 'flex', gap: '40px' }}>
            <div style={{ width: '50%' }}>
              <p style={{ fontWeight: '600' }}>Explain</p>
              <input
                onChange={(e) => handleExplain(e.target.value)}
                value={explain}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                }}
                placeholder='Write explanation for the answer'
              />
            </div>
            <div style={{ width: '50%' }}>
              <p style={{ fontWeight: '600' }}>Preview</p>
              <div
                style={{
                  width: '100%',
                  minHeight: '50px',
                  padding: '12px 16px',
                  fontSize: '18px',
                  lineHeight: '1.5',
                  backgroundColor: '#fafafa',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
                }}
              >
                {renderMixedText(explain)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => handleAddQuestion()} style={{ marginRight: '50px' }}>Add</button>
      <button onClick={() => handleSaveQuestion()}>Save</button>
      {questions.map((question, index) => (
        <div
          key={index}
          style={{
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '16px',
            margin: '20px 0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            backgroundColor: '#fff',
          }}
        >
          <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Câu {index + 1}:</p>

          <div style={{ marginBottom: '12px' }}>
            <span style={{ fontWeight: '500' }}>
              Câu hỏi: {renderMixedText(question.question)}
            </span>
          </div>

          {(question.type === 'Part_1' || question.type === 'Part_2') && (
            <div style={{ margin: '12px 0' }}>
              {['A', 'B', 'C', 'D'].map((label) => (
                <div
                  key={label}
                  style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}
                >
                  <p style={{ width: '24px', margin: 0, fontWeight: 'bold' }}>{label}.</p>
                  <p style={{ margin: 0 }}>{question.options[label]}</p>
                </div>
              ))}
            </div>
          )}

          <div style={{ fontWeight: 'bold', marginTop: '16px', marginBottom: '4px' }}>Đáp án:</div>
          {question.type === 'Part_1' && (
            <p style={{ marginLeft: '10px', marginBottom: '12px' }}>{question.answer.answer}</p>
          )}
          {question.type === 'Part_2' && (
            <div style={{ marginLeft: '10px', marginBottom: '12px' }}>
              {['A', 'B', 'C', 'D'].map((label) => (
                <div
                  key={label}
                  style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}
                >
                  <p style={{ width: '24px', margin: 0, fontWeight: 'bold' }}>{label}.</p>
                  <p style={{ margin: 0 }}>{question.answer[label]}</p>
                </div>
              ))}
            </div>
          )}
          {question.type === 'Part_3' && (
            <p style={{ marginLeft: '10px', marginBottom: '12px' }}>
              {Object.values(question.answer).join('')}
            </p>
          )}

          <div style={{ marginBottom: '12px' }}>
            <span style={{ fontStyle: 'italic' }}>
              Giải thích: {renderMixedText(question.explain)}
            </span>
          </div>

          <button
            onClick={() => handleDelete(index)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#f44336',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Xoá
          </button>
        </div>
      ))}

    </div>
  );
}

export default App;
