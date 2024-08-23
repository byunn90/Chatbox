import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import "../chatbox.css";
import ChatQuestions from "./question"; // Import your questions
import HandleSendMessage from "./HandleSendMessage";

function ChatBox({ handleChatToggle, setChat, chat }) {
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState(""); // State to store the user's name
  const [isNameEntered, setIsNameEntered] = useState(false); // State to check if the name is entered
  const [currentQuestion, setCurrentQuestion] = useState("greeting"); // State to track the current question
  const [showOptions, setShowOptions] = useState(false); // State to handle showing options

  const questions = ChatQuestions(); // Get the questions from the function
  const { handleSendMessage } = HandleSendMessage({
    inputValue,
    setInputValue,
    setName,
    setChat,
    chat,
    name,
    setIsNameEntered,
    setShowOptions,
    questions,
    currentQuestion,
    setCurrentQuestion,
  });

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOptionSelect = (option) => {
    setChat([...chat, { text: option, name }]);

    // Handle different options here
    if (option === "Do you want to check the status of your order?") {
      setChat((prevChat) => [
        ...prevChat,
        { text: questions.options.orderStatus.followUp, name: "Bot" },
      ]);
      setShowOptions(false); // Hide options after selection
    } else if (option === "Would you like to contact support?") {
      setChat((prevChat) => [
        ...prevChat,
        { text: "Connecting you to support...", name: "Bot" },
      ]);
      setShowOptions(false);
    } else if (option === "About us?") {
      setChat((prevChat) => [
        ...prevChat,
        { text: "We are a company dedicated to...", name: "Bot" },
      ]);
      setShowOptions(false);
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
        {showOptions ? (
          <div className="options">
            {questions.options.orderStatus.question.map((option, index) => (
              <button key={index} onClick={() => handleOptionSelect(option)}>
                {option}
              </button>
            ))}
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export default ChatBox;
