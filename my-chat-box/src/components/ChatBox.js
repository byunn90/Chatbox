import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import "../chatbox.css";
import chatGirl from "./images/chatgirl.webp";
import HandleOptionSelect from "./HandleOptionSelect";
import HandleKeyDown from "./HandleKeyDown";
import HandleSendMessage from "./HandleSendMessage";
import ChatQuestions from "./question";
function ChatBox({ handleChatToggle, setChat, chat }) {
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("greeting");
  const [showOptions, setShowOptions] = useState(false);
  const [inputMode, setInputMode] = useState("normal");

  const questions = ChatQuestions();

  const { handleSendMessage } = HandleSendMessage({
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
  });

  const { handleKeyDown } = HandleKeyDown(handleSendMessage);

  const { handleOptionSelect } = HandleOptionSelect({
    setChat,
    setShowOptions,
    setCurrentQuestion,
    setInputMode,
    questions,
    chat,
  });

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="chatbox">
      <div className="chatbox-header">
        <span>
          Mira
          <img src={chatGirl} alt="Chat Assistant" />
        </span>
        <button onClick={handleChatToggle}>&times;</button>
      </div>
      <ul className="chat-thread">
        {chat.map((message, index) => (
          <li key={index}>
            <div>{message.name}</div>
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
              placeholder={
                currentQuestion === "contactSupport"
                  ? "Enter your contact details"
                  : isNameEntered
                  ? "Type a message"
                  : "Enter your name"
              }
            />
            <div className="fontAwesome-Icons">
              <button onClick={() => setInputValue(inputValue + "😊")}>
                <FontAwesomeIcon icon={faSmile} className="icon" />
              </button>
              <FontAwesomeIcon icon={faPaperclip} className="icon" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ChatBox;
