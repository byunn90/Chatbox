import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import "../chatbox.css";
import HandleOptionSelect from "./HandleOptionSelect";
import HandleKeyDown from "./HandleKeyDown";
import HandleSendMessage from "./HandleSendMessage";
import ChatQuestions from "./question";

function ChatBox({ handleChatToggle, setChat, chat }) {
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState(""); // State to store the user's name
  const [isNameEntered, setIsNameEntered] = useState(false); // State to check if the name is entered
  const [currentQuestion, setCurrentQuestion] = useState("greeting"); // State to track the current question
  const [showOptions, setShowOptions] = useState(false); // State to handle showing options

  const questions = ChatQuestions(); // Get the questions from the function
  // Destructured HandleSendMessage function
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
  // Destructured HandleOptionSelect function
  const { handleOptionSelect } = HandleOptionSelect({
    setChat,
    setShowOptions,
    chat,
    questions,
    name,
  });

  const { handleKeyDown } = HandleKeyDown(handleSendMessage);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
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
