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
    // Logic to handle the next question
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

  // Ensure setShowOptions(true) is placed correctly to show options
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Serialize chat messages including handling files correctly
    const concatenatedMessages =
      chat
        .map((message) => {
          if (typeof message.text === "string") {
            return message.text;
          } else if (message.text.props) {
            // For file uploads, extracting the file name or representation
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
      chatMessage: concatenatedMessages, // Concatenated messages with file details
    };

    // Handle entering the email case
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
      setCurrentQuestion("infoIssue"); // Set the next question
      setShowOptions(true); // Show options after email is entered
      return; // Exit the function after handling email input
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
      setInputValue(""); // Clear the input field after sending

      // Handle the "damageProductConfirm" state
      if (currentQuestion === "damageProductConfirm") {
        const lowerCaseInput = inputValue.toLowerCase();
        if (lowerCaseInput.includes("yes")) {
          setChat((prevChat) => [
            ...prevChat,
            {
              text: "Please describe the issue with the product in detail and attach a photo if possible.",
              name: "Bot",
            },
          ]);
          setCurrentQuestion("damageProductDetails"); // Move to the next state
        } else if (lowerCaseInput.includes("no")) {
          setChat((prevChat) => [
            ...prevChat,
            {
              text: "No problem. If you need further assistance, please let us know.",
              name: "Bot",
            },
          ]);
          setCurrentQuestion("closing"); // Move to closing state
        } else {
          setChat((prevChat) => [
            ...prevChat,
            {
              text: "Please respond with 'Yes' if you'd like to provide more details, or 'No' if you'd like to proceed without more details.",
              name: "Bot",
            },
          ]);
        }
        return;
      }

      // Handle detailed description for damage product
      if (currentQuestion === "damageProductDetails") {
        const productDescription = inputValue.trim();
        setChat((prevChat) => [
          ...prevChat,
          { text: `Product damage description: ${productDescription}`, name },
          {
            text: "Thank you for providing the details. We'll review your issue and get back to you shortly.",
            name: "Bot",
          },
        ]);

        setCurrentQuestion("closing"); // Move to closing question or next step
        setInputValue(""); // Clear input
        return;
      }

      // Handle the "request a change" description
      if (currentQuestion === "requestChangeDescription") {
        const changeDescription = inputValue.trim();
        setChat((prevChat) => [
          ...prevChat,
          { text: `Change request description: ${changeDescription}`, name },
          {
            text: "Thank you for providing the details. We'll review your change request and get back to you shortly have a great day!.",
            name: "Bot",
          },
        ]);

        setCurrentQuestion("closing"); // Move to closing question or next step
        setInputValue(""); // Clear input
        return;
      }

      // Determine the next question based on user input
      if (currentQuestion === "infoIssue") {
        const lowerCaseInput = inputValue.toLowerCase().replace(/[?.,!]/g, ""); // Normalize input by converting to lowercase and removing punctuation

        if (lowerCaseInput.includes("refund")) {
          setCurrentQuestion("refundDescription");
          setChat((prevChat) => [
            ...prevChat,
            {
              text: "You selected Refund. Can you please give a detailed description on why you would like the refund?",
              name: "Bot",
            },
          ]);
        } else if (lowerCaseInput.includes("track order")) {
          setChat((prevChat) => [
            ...prevChat,
            {
              text: "You selected Track Order. Let's proceed with that.",
              name: "Bot",
            },
          ]);

          setCurrentQuestion("damageProductConfirm"); // Move to damage product confirmation state
        } else {
          // Default case if none of the options match
          setChat((prevChat) => [
            ...prevChat,
            {
              text: "Please Type a valid option from Damage Product, Refund, or Track Order.",
              name: "Bot",
            },
          ]);
        }
        return; // Exit after handling infoIssue
      }

      // Handling detailed description for refund
      if (currentQuestion === "refundDescription") {
        const refundDescription = inputValue.trim();
        setChat((prevChat) => [
          ...prevChat,
          { text: `Refund description: ${refundDescription}`, name },
          {
            text: "Thank you for the details! We'll process your refund request shortly. Have a Great day.",
            name: "Bot",
          },
        ]);

        setCurrentQuestion("closing"); // Move to closing question or next step
        setInputValue(""); // Clear input
        return;
      }

      // Handle other questions
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
      setChat((prevChat) => [
        ...prevChat,
        { text: "Oops! Something went wrong. Please try again.", name: "Bot" },
      ]);
      console.error("Send message error:", error);
    }
  };

  return { handleSendMessage };
}
