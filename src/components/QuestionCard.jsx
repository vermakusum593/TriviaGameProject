import React from "react";

const QuestionCard = ({ question, answers, handleAnswer }) => {
  return (
    <div>
      <h3>{question}</h3>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
      {answers.map((answer, index) => (
        <button key={index} onClick={() => handleAnswer(answer)}>
          {answer}
        </button>
      ))}
      </div>
    </div>
  );
};

export default QuestionCard;
