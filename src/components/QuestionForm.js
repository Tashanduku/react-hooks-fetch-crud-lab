import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newQuestion = { prompt, answers, correctIndex };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((data) => {
        onAddQuestion(data);  // Pass the new question up to the parent
      });

    setPrompt("");
    setAnswers(["", "", "", ""]);
    setCorrectIndex(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prompt:
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </label>
      <div>
        {answers.map((answer, index) => (
          <label key={index}>
            Answer {index + 1}:
            <input
              type="text"
              value={answer}
              onChange={(e) => {
                const updatedAnswers = [...answers];
                updatedAnswers[index] = e.target.value;
                setAnswers(updatedAnswers);
              }}
            />
          </label>
        ))}
      </div>
      <label>
        Correct Answer:
        <select
          value={correctIndex}
          onChange={(e) => setCorrectIndex(parseInt(e.target.value, 10))}
        >
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;
