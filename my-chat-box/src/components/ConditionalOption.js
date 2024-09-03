// Is currently not working properly

// import React from "react";

// function ConditionalOptions({
//   currentQuestion,
//   questions,
//   handleOptionSelect,
//   showOptions,
// }) {
//   if (!showOptions) {
//     return null;
//   }

//   console.log("Current Question:", currentQuestion); // Debugging

//   const renderOptions = (options) => {
//     return options.map((option, index) => (
//       <button
//         key={index}
//         className="option-button"
//         onClick={() => handleOptionSelect(option)}
//       >
//         {option}
//       </button>
//     ));
//   };

//   return (
//     <div className="options">
//       {currentQuestion === "greeting" &&
//         renderOptions(questions.options.orderStatus.question)}
//       {currentQuestion === "infoIssue" &&
//         renderOptions(questions.options.infoIssue.question)}
//       {/* Add more conditions here as you extend the logic */}
//     </div>
//   );
// }

// export default ConditionalOptions;
