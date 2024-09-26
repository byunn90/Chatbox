import React from "react";

function ConditionalOptions({
  currentQuestion,
  questions,
  handleOptionSelect,
  showOptions,
}) {
  if (!showOptions) {
    console.log("Options are hidden."); // Debug log
    return null;
  }

  console.log("Current Question:", currentQuestion);
  console.log("Rendering Options for:", questions.options.infoIssue.question);

  const renderOptions = (options) => {
    return options.map((option, index) => (
      <button
        key={index}
        className="option-button"
        onClick={() => {
          console.log("Option clicked:", option); // Debug log
          handleOptionSelect(option); // Pass the selected option back to the parent component
        }}
      >
        {option}
      </button>
    ));
  };

  return (
    <div className="options">
      {currentQuestion === "infoIssue" &&
        renderOptions(questions.options.infoIssue.question)}
      {currentQuestion === "greeting" &&
        renderOptions(questions.options.orderStatus.question)}
      {currentQuestion === "productInfo" &&
        renderOptions(questions.options.productInfo.question)}
      {currentQuestion === "technicalSupport" &&
        renderOptions(questions.options.technicalSupport.question)}
    </div>
  );
}

export default ConditionalOptions;
