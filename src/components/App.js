import React, { useState, useEffect } from "react";
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';
import AdminNavBar from './AdminNavBar';  // Assuming you have a navigation bar for changing pages

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Fetch questions from the server when the component mounts
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  // Handle adding a new question
  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  // Handle deleting a question
  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then(() => {
        setQuestions(questions.filter((question) => question.id !== id));
      });
  }

  // Handle updating a question
  function handleUpdateQuestion(updatedQuestion) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === updatedQuestion.id ? updatedQuestion : question
      )
    );
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;
