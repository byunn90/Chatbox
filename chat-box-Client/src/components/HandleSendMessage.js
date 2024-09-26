import useDelayChat from "./useDelayChat";

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
  const { addDelayedMessage } = useDelayChat({ setChat, chat });

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
          text: questions.options.contactSupport.question,
        };
      } else if (input.toLowerCase().includes("change")) {
        return {
          key: "requestChangeDescription",
          text: "You selected 'Request a Change'. Can you describe the reason why you want a change?",
        };
      }
      return {
        key: "closing",
        text: "Thank you for chatting with us. Have a great day!",
      };
    } else if (current === "orderStatus") {
      return {
        key: "closing",
        text: "Your order status will be updated shortly.",
      };
    } else if (current === "productInfo") {
      return {
        key: "closing",
        text: "You can find more product info on our website.",
      };
    } else if (current === "contactSupport") {
      return {
        key: "closing",
        text: "Our support team will reach out to you soon.",
      };
    }
    return {
      key: "closing",
      text: "Thank you for chatting with us. Have a great day!",
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const concatenatedMessages =
      chat
        .map((message) => {
          if (typeof message.text === "string") {
            return message.text;
          } else if (message.text.props) {
            return (
              "[File Uploaded: " +
              (message.text.props.children[1]?.props.children || "File") +
              "]"
            );
          } else {
            return "[File Uploaded]";
          }
        })
        .join(" ") +
      " " +
      inputValue.trim();

    const postData = {
      name: name,
      email: email,
      createdAt: new Date().toISOString().split("T")[0],
      chatMessage: concatenatedMessages,
    };

    if (
      isNameEntered &&
      !isEmailEntered &&
      currentQuestion === "contactSupport"
    ) {
      const enteredEmail = inputValue.trim();
      setEmail(enteredEmail);
      setIsEmailEntered(true);
      addDelayedMessage({ text: `Email entered: ${enteredEmail}`, name });
      addDelayedMessage({
        text: "Please Select from the options below",
        name: "Bot",
      });
      setInputValue("");
      setCurrentQuestion("infoIssue");
      setShowOptions(true);
      return;
    }

    try {
      await fetch("http://localhost:5228/chatbox", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      setChat([...chat, { text: inputValue, name }]);
      setInputValue("");

      if (currentQuestion === "damageProductConfirm") {
        const lowerCaseInput = inputValue.toLowerCase();
        if (lowerCaseInput.includes("yes")) {
          addDelayedMessage({
            text: "Please describe the issue with the product in detail and attach a photo if possible.",
            name: "Bot",
          });
          setCurrentQuestion("damageProductDetails");
        } else if (lowerCaseInput.includes("no")) {
          addDelayedMessage({
            text: "No problem. If you need further assistance, please let us know.",
            name: "Bot",
          });
          setCurrentQuestion("closing");
        } else {
          addDelayedMessage({
            text: "Please respond with 'Yes' if you'd like to provide more details, or 'No' if you'd like to proceed without more details.",
            name: "Bot",
          });
        }
        return;
      }

      if (currentQuestion === "damageProductDetails") {
        const productDescription = inputValue.trim();
        addDelayedMessage({
          text: `Product damage description: ${productDescription}`,
          name,
        });
        addDelayedMessage({
          text: "Thank you for providing the details. We'll review your issue and get back to you shortly.",
          name: "Bot",
        });
        setCurrentQuestion("closing");
        setInputValue("");
        return;
      }

      if (currentQuestion === "requestChangeDescription") {
        const changeDescription = inputValue.trim();
        addDelayedMessage({
          text: `Change request description: ${changeDescription}`,
          name,
        });
        addDelayedMessage({
          text: "Thank you for providing the details. We'll review your change request and get back to you shortly. Have a great day!",
          name: "Bot",
        });
        setCurrentQuestion("closing");
        setInputValue("");
        return;
      }

      let nextQuestion = determineNextQuestion(
        inputValue,
        currentQuestion,
        questions
      );
      setCurrentQuestion(nextQuestion.key);
      addDelayedMessage({ text: nextQuestion.text, name: "Bot" });
    } catch (error) {
      addDelayedMessage({
        text: "Oops! Something went wrong. Please try again.",
        name: "Bot",
      });
      console.error("Send message error:", error);
    }
  };

  return { handleSendMessage };
}
