// This function can be exported and used in your component
export default function HandleSendMessage({
  inputValue,
  setInputValue,
  setName,
  setChat,
  chat,
  name,
  isNameEntered,
  setIsNameEntered,
  setShowOptions,
  questions,
  currentQuestion,
  setCurrentQuestion,
}) {
  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      if (!isNameEntered) {
        setName(inputValue);
        setChat([
          ...chat,
          { text: `Name entered: ${inputValue}`, name: "System" },
        ]);
        setIsNameEntered(true);
        setInputValue(""); // Clear the input field

        // Start the conversation with the first question
        setChat((prevChat) => [
          ...prevChat,
          { text: questions.greeting, name: "Bot" },
        ]);
        setShowOptions(true); // Show options after greeting
      } else {
        try {
          const postData = {
            name: name, // Use the name entered by the user
            createdAt: new Date().toISOString().split("T")[0], // Automatically set today's date
            chatMessage: inputValue.trim(), // Use the message typed by the user
          };

          await fetch("http://localhost:5228/chatbox", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData), // Send the message and name to the server
          });

          setChat([...chat, { text: inputValue, name }]);
          setInputValue(""); // Clear the input field after sending

          // Determine the next question based on user input
          let nextQuestion = "";
          if (currentQuestion === "greeting") {
            if (inputValue.toLowerCase().includes("order")) {
              nextQuestion = questions.options.orderStatus.question;
              setCurrentQuestion("orderStatus");
            } else if (inputValue.toLowerCase().includes("product")) {
              nextQuestion = questions.options.productInfo.question;
              setCurrentQuestion("productInfo");
            } else if (inputValue.toLowerCase().includes("support")) {
              nextQuestion = questions.options.technicalSupport.question;
              setCurrentQuestion("technicalSupport");
            } else {
              nextQuestion = questions.closing;
              setCurrentQuestion("closing");
            }
          } else if (currentQuestion === "orderStatus") {
            nextQuestion = questions.options.orderStatus.followUp;
          } else if (currentQuestion === "productInfo") {
            nextQuestion = questions.options.productInfo.followUp;
          } else if (currentQuestion === "technicalSupport") {
            nextQuestion = questions.options.technicalSupport.followUp;
          }

          setChat((prevChat) => [
            ...prevChat,
            { text: nextQuestion, name: "Bot" },
          ]);
        } catch (error) {
          console.error("Send message error:", error);
        }
      }
    }
  };

  return { handleSendMessage };
}
