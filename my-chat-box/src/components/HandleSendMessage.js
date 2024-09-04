export default function HandleSendMessage({
  inputValue,
  setInputValue,
  setName,
  setEmail,
  setChat,
  chat,
  name,
  email,
  isNameEntered,
  isEmailEntered,
  setIsNameEntered,
  setIsEmailEntered,
  setShowOptions,
  questions,
  currentQuestion,
  setCurrentQuestion,
}) {
  const determineNextQuestion = (input, current, questions) => {
    if (current === "greeting") {
      if (input.toLowerCase().includes("order")) {
        return {
          key: "orderStatus",
          text: questions.options.orderStatus.question,
        };
      } else if (input.toLowerCase().includes("product")) {
        return {
          key: "productInfo",
          text: questions.options.productInfo.question,
        };
      } else if (input.toLowerCase().includes("support")) {
        return {
          key: "contactSupport",
          text: questions.options.orderStatus.contactSupport,
        };
      }
      return { key: "closing", text: questions.closing };
    } else if (current === "orderStatus") {
      return {
        key: "orderStatus",
        text: questions.options.orderStatus.followUp,
      };
    } else if (current === "productInfo") {
      return {
        key: "productInfo",
        text: questions.options.productInfo.followUp,
      };
    } else if (current === "contactSupport") {
      return {
        key: "infoIssue",
        text: questions.options.infoIssue.question.join(" "),
      };
    }
    return { key: "closing", text: questions.closing };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    if (!isNameEntered) {
      const enteredName = inputValue.trim();
      setName(enteredName);
      setChat([
        ...chat,
        { text: `Name entered: ${enteredName}`, name: enteredName },
      ]);
      setIsNameEntered(true);
      setInputValue(""); // Clear the input field
      setChat((prevChat) => [
        ...prevChat,
        { text: questions.greeting, name: "Bot" },
      ]);
      setShowOptions(true); // Show options after greeting
      return;
    }

    if (
      isNameEntered &&
      !isEmailEntered &&
      currentQuestion === "contactSupport"
    ) {
      const enteredEmail = inputValue.trim();
      setEmail(enteredEmail);
      setIsEmailEntered(true);
      setChat((prevChat) => [
        ...prevChat,
        { text: `Email entered: ${enteredEmail}`, name },
        { text: "Please Select from the options below", name: "Bot" },
      ]);

      setInputValue(""); // Clear the input field
      setShowOptions(true); // Hide options after email is entered

      // Set the next question to infoIssue after the email is entered
      setCurrentQuestion("infoIssue");
      setChat((prevChat) => [
        ...prevChat,
        { text: questions.options.infoIssue.question.join(" "), name: "Bot" },
      ]);

      return; // Exit the function after handling email input
    }

    // Continue with other input handling...
    try {
      const concatenatedMessages =
        chat.map((message) => message.text).join(" ") + " " + inputValue.trim();

      const postData = {
        name: name,
        email: email,
        createdAt: new Date().toISOString().split("T")[0],
        chatMessage: concatenatedMessages, // Concatenated messages
      };

      await fetch("http://localhost:5228/chatbox", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      setChat([...chat, { text: inputValue, name }]);
      setInputValue(""); // Clear the input field after sending

      // Determine the next question based on user input
      let nextQuestion = determineNextQuestion(
        inputValue,
        currentQuestion,
        questions
      );
      setCurrentQuestion(nextQuestion.key);
      setChat((prevChat) => [
        ...prevChat,
        { text: nextQuestion.text, name: "Bot" },
      ]);
    } catch (error) {
      console.error("Send message error:", error);
    }
  };

  return { handleSendMessage };
}
