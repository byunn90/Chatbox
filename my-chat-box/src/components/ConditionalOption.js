import React from "react";

function ConditionalOptions({
  currentQuestion,
  questions,
  handleOptionSelect,
  showOptions,
}) {
  if (!showOptions) {
    return null;
  }

  console.log("Current Question:", currentQuestion);
  console.log("Available Options:", questions.options.infoIssue.question);

  const renderOptions = (options) => {
    return options.map((option, index) => (
      <button
        key={index}
        className="option-button"
        onClick={() => {
          handleOptionSelect(option); // Pass the selected option back to the parent component
        }}
      >
        {option}
      </button>
    ));
  };

  return (
    <div className="options">
      {currentQuestion === "greeting" &&
        renderOptions(questions.options.orderStatus.question)}
      {currentQuestion === "infoIssue" &&
        renderOptions(questions.options.infoIssue.question)}
      {currentQuestion === "productInfo" &&
        renderOptions(questions.options.question)}
      {currentQuestion === "technicalSupport" &&
        renderOptions(questions.options.question)}
    </div>
  );
}

export default ConditionalOptions;
