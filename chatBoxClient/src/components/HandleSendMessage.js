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

  // Function to determine the next question or state based on user input
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

  // Function to handle sending a message
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

    // Handling the email prompt specifically when contacting support
    if (
      isNameEntered &&
      !isEmailEntered &&
      currentQuestion === "contactSupport"
    ) {
      const enteredEmail = inputValue.trim();
      setEmail(enteredEmail);
      setIsEmailEntered(true);

      // Delayed messages
      addDelayedMessage({ text: `Email entered: ${enteredEmail}`, name });
      await addDelayedMessage({
        text: "Please select from the options below",
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
      // Work on tommorrow
      if (currentQuestion === "damageProductConfirm") {
        const lowerCaseInput = inputValue.toLowerCase();
        if (lowerCaseInput.includes("yes")) {
          await addDelayedMessage({
            text: "Please describe the issue with the product in detail and attach a photo if possible.",
            name: "Bot",
          });
          setCurrentQuestion("damageProductDetails");
        } else if (lowerCaseInput.includes("no")) {
          await addDelayedMessage({
            text: "No problem. If you need further assistance, please let us know.",
            name: "Bot",
          });
          setCurrentQuestion("closing");
        } else {
          await addDelayedMessage({
            text: "Please respond with 'Yes' if you'd like to provide more details, or 'No' if you'd like to proceed without more details.",
            name: "Bot",
          });
        }
        return;
      }

      if (currentQuestion === "requestChangeDescription") {
        const changeDescription = inputValue.trim();
        if (
          isNameEntered &&
          !isEmailEntered &&
          currentQuestion === "request change?"
        )
          // Send a POST request to save the change request in the database
          try {
            const changeRequestData = {
              name,
              email: email,
              changeDescription,
              createdAt: new Date().toISOString(),
            };
            const enteredEmail = inputValue.trim();
            setEmail(enteredEmail);
            setIsEmailEntered(true);

            await fetch("http://localhost:5228/api/request-change", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(changeRequestData),
            });

            // Show success messages after saving the data

            // Delayed messages
            addDelayedMessage({ text: `Email entered: ${enteredEmail}`, name });
            await addDelayedMessage({
              text: `Change request description: ${changeDescription}`,
              name,
            });
            await addDelayedMessage({
              text: "Thank you for providing the details. We'll review your change request and get back to you shortly. Have a great day!",
              name: "Bot",
            });

            // Delay before sending closing message
            await addDelayedMessage({
              text: "Thank you for chatting with us. Have a great day!",
              name: "Bot",
            });

            setCurrentQuestion("closing");
            setInputValue("");
          } catch (error) {
            await addDelayedMessage({
              text: "Oops! Something went wrong while submitting your change request. Please try again.",
              name: "Bot",
            });
            console.error("Error submitting change request:", error);
          }

        return;
      }

      let nextQuestion = determineNextQuestion(
        inputValue,
        currentQuestion,
        questions
      );
      setCurrentQuestion(nextQuestion.key);

      // Delay for the next question
      await addDelayedMessage({ text: nextQuestion.text, name: "Bot" });
    } catch (error) {
      await addDelayedMessage({
        text: "Oops! Something went wrong. Please try again.",
        name: "Bot",
      });
      console.error("Send message error:", error);
    }
  };

  return { handleSendMessage };
}
