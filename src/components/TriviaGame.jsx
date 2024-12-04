import React, { useEffect, useState, useContext } from "react";
import { GameContext } from "../context/GameContext";
import QuestionCard from "./QuestionCard";

const TriviaGame = () => {
  const { score, increaseScore, logout } = useContext(GameContext);
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadQuestion = async () => {
    setLoading(true);
    try {
        const response = await fetch("https://the-trivia-api.com/api/questions?limit=1");
        const [data] = await response.json();
        setQuestionData({
            question: data.question,
            correctAnswer: data.correctAnswer,
            answers: [...data.incorrectAnswers, data.correctAnswer].sort(() => Math.random() - 0.5)
          });
          setLoading(false);    
      } catch (error) {
        console.error("Error fetching trivia question:", error);
        throw error;
      }
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  const handleAnswer = (answer) => {
    if (answer === questionData.correctAnswer) {
      alert("Correct!");
      increaseScore();
    } else {
      alert(`Wrong! The correct answer is: ${questionData.correctAnswer}`);
    }
    loadQuestion();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Trivia Game</h1>
      <h2>Score: {score}</h2>
      <button style={{backgroundColor:"yellow"}} onClick={logout}>Logout</button>
      <QuestionCard
        question={questionData.question}
        answers={questionData.answers}
        handleAnswer={handleAnswer}
      />
    </div>
  );
};

export default TriviaGame;
