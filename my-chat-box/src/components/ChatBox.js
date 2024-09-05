import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import "../chatbox.css";
import chatGirl from "./images/chatgirl.webp";
import HandleOptionSelect from "./HandleOptionSelect";
import HandleKeyDown from "./HandleKeyDown";
import HandleSendMessage from "./HandleSendMessage";
import ChatQuestions from "./question";
import handleFileChange from "./handleFileChange";
import ConditionalOptions from "./ConditionalOption";
// Email i think not working back-end
function ChatBox({ handleChatToggle, setChat, chat }) {
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("greeting");
  const [showOptions, setShowOptions] = useState(false);

  const questions = ChatQuestions();

  const { handleSendMessage } = HandleSendMessage({
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
  });

  const { handleOptionSelect } = HandleOptionSelect({
    setChat,
    setShowOptions,
    chat,
    questions,
    name,
    setCurrentQuestion,
  });

  const { handleKeyDown } = HandleKeyDown(handleSendMessage);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFileClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleNameSubmit = () => {
    if (inputValue.trim()) {
      setName(inputValue.trim());
      setIsNameEntered(true);
      setShowOptions(true); // Show options after the name is entered
      setInputValue(""); // Clear the input field
      setChat((prevChat) => [
        ...prevChat,
        {
          name: inputValue.trim(),
          text: `Hello, ${inputValue.trim()}! How can I assist you today?`,
        },
      ]);
    }
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
        {isNameEntered && (
          <li>
            <ConditionalOptions
              currentQuestion={currentQuestion}
              questions={questions}
              handleOptionSelect={handleOptionSelect}
              showOptions={showOptions}
            />
          </li>
        )}

        {/* Render the ConditionalOptions component if options should be shown */}
      </ul>
      <div className="chatbox-footer">
        <input
          type="text"
          className="chat-window-message"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              isNameEntered ? handleSendMessage() : handleNameSubmit();
            }
          }}
          placeholder={
            isNameEntered && !isEmailEntered
              ? "Enter your email address"
              : isNameEntered
              ? "Type a message"
              : "Enter your name"
          }
        />
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => handleFileChange(e, name, chat, setChat)}
        />
        <div className="fontAwesome-Icons" onClick={handleFileClick}>
          <FontAwesomeIcon icon={faPaperclip} className="icon" />
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
