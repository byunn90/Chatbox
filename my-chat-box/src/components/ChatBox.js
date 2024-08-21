import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import "../chatbox.css";
import ChatQuestions from "./question";

function ChatBox({ handleChatToggle, setChat, chat }) {
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState(""); // State to store the user's name
  const [isNameEntered, setIsNameEntered] = useState(false); // State to check if the name is entered
  const [currentQuestion, setCurrentQuestion] = useState("greeting"); // State to track the current question

  const questions = ChatQuestions(); // Get the questions from the function

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // function handleCloseOpenChatBox() {
  //   if(!handleChatToggle) {
  //     alert()
  //   }
  // }
  // START WORKING ON QUESTIONS
  // ASK HELP FROM HAMID
  // CSS NEEDS WORK
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbox">
      <div className="chatbox-header">
        <span>Chat Support 🤖</span>
        <button onClick={handleChatToggle}>&times;</button>
      </div>
      <ul className="chat-thread">
        {chat.map((message, index) => (
          <li key={index}>
            <div>{message.name}</div> {/* Displaying the sender's name */}
            <div className="chat-bubble">{message.text}</div>
          </li>
        ))}
        {!isNameEntered && (
          <li>
            <div className="chat-bubble">
              Please enter your first and last name to start chatting.
            </div>
          </li>
        )}
      </ul>
      <div className="chatbox-footer">
        <input
          type="text"
          className="chat-window-message"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={isNameEntered ? "Type a message" : "Enter your name"}
        />
        <div className="fontAwesome-Icons">
          <FontAwesomeIcon icon={faSmile} className="icon" />
          <FontAwesomeIcon icon={faPaperclip} className="icon" />
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
