import React from "react";

const QuestionCard = ({ question, answers, handleAnswer }) => {
  return (
    <div className="question">
      <h3 className="h3-ques"  >{question}</h3>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
      {answers.map((answer, index) => (
        <button className="ans-btn" key={index} onClick={() => handleAnswer(answer)}>
          {answer}
        </button>
      ))}
      </div>
    </div>
  );
};

export default QuestionCard;
