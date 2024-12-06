import React, { useEffect, useState, useContext } from "react";
import { GameContext } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import QuestionCard from "./QuestionCard";

const TriviaGame = () => {

  const initialTime = 15;
  const { score, increaseScore, logout } = useContext(GameContext);
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(initialTime); 
  const navigate = useNavigate();

  const loadQuestion = async () => {
    setLoading(true);
    setTimer(initialTime); 
    try {
      const response = await fetch("https://the-trivia-api.com/api/questions?limit=1");
      const [data] = await response.json();
      setQuestionData({
        question: data.question,
        correctAnswer: data.correctAnswer,
        answers: [...data.incorrectAnswers, data.correctAnswer].sort(() => Math.random() - 0.5),
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching trivia question:", error);
    }
  };

  useEffect(() => {
    if (timer === 0) {
      alert(`Time's up! The correct answer is: ${questionData.correctAnswer}`);
      navigate("/game/results");
    }

    const countdown = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(countdown);
  }, [timer, questionData, navigate]);

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
      <h3>Time Left: {timer} seconds</h3>
      <button onClick={logout}>Logout</button>
      <QuestionCard
        question={questionData.question}
        answers={questionData.answers}
        handleAnswer={handleAnswer}
      />
    </div>
  );
};

export default TriviaGame;