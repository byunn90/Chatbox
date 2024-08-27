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
  setInputMode, // Consider removing if not used elsewhere
  availableQuestions,
  setAvailableQuestions,
}) {
  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      if (!isNameEntered) {
        // Handle the name input phase
        setName(inputValue);
        setChat([
          ...chat,
          { text: `Name entered: ${inputValue}`, name: "System" },
        ]);
        setIsNameEntered(true);
        setInputValue(""); // Clear input field
        setChat((prevChat) => [
          ...prevChat,
          { text: questions.greeting, name: "Bot" },
        ]);
        setShowOptions(true);
        setCurrentQuestion("greeting");
      } else {
        try {
          const postData = {
            name: name,
            createdAt: new Date().toISOString().split("T")[0],
            chatMessage: inputValue.trim(),
          };

          await fetch("http://localhost:5228/chatbox", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData),
          });

          setChat([...chat, { text: inputValue, name }]);
          setInputValue(""); // Clear input field

          let nextQuestion = "";

          switch (currentQuestion) {
            case "greeting":
              if (inputValue.toLowerCase().includes("order")) {
                nextQuestion = questions.options.orderStatus.followUp;
                setCurrentQuestion("orderStatus");
                setAvailableQuestions((prev) =>
                  prev.filter((q) => q !== "orderStatus")
                );
                setShowOptions(false);
              } else if (inputValue.toLowerCase().includes("product")) {
                nextQuestion = questions.options.productInfo.followUp;
                setCurrentQuestion("productInfo");
                setAvailableQuestions((prev) =>
                  prev.filter((q) => q !== "productInfo")
                );
                setShowOptions(false);
              } else if (inputValue.toLowerCase().includes("support")) {
                nextQuestion = questions.options.orderStatus.contactSupport;
                setCurrentQuestion("contactSupport");
                setAvailableQuestions((prev) =>
                  prev.filter((q) => q !== "technicalSupport")
                );
                setShowOptions(false);
                setInputMode("contact"); // Optional, depending on usage
              } else {
                nextQuestion = questions.closing;
                setCurrentQuestion("closing");
                setShowOptions(false);
              }
              break;

            case "contactSupport":
              nextQuestion =
                "Thank you for providing your details. Our team will contact you shortly.";
              setInputMode("normal"); // Optional
              setCurrentQuestion("closing");
              setShowOptions(false);
              break;

            default:
              setShowOptions(false);
              break;
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
