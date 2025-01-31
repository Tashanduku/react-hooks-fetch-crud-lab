import React, { useState, useEffect } from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex: initialCorrectIndex } = question;
  const [correctIndex, setCorrectIndex] = useState(initialCorrectIndex);

  useEffect(() => {
    setCorrectIndex(initialCorrectIndex); // Sync the state with the props when the component mounts or updates
  }, [initialCorrectIndex]);

  function handleDelete() {
    onDeleteQuestion(id);
  }

  function handleUpdate(event) {
    const updatedCorrectIndex = parseInt(event.target.value, 10); // Get the selected value (index of correct answer)
    setCorrectIndex(updatedCorrectIndex); // Update the local state immediately

    // Update the backend
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: updatedCorrectIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        onUpdateQuestion(updatedQuestion); // Propagate the updated question to the parent component
      })
      .catch((error) => {
        console.error("Error updating question:", error);
        // Optionally reset the state if there was an error
      });
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleUpdate}>
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
