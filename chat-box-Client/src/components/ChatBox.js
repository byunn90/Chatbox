import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import "../chatbox.css";
import HandleOptionSelect from "./HandleOptionSelect";
import HandleSendMessage from "./HandleSendMessage";
import ChatQuestions from "./question";
import ConditionalOptions from "./ConditionalOption";
import getCurrentTime from "./timeUtils";
import handleFileChange from "./handleFileChange";
import useDelayChat from "./useDelayChat"; // Import the delay function as a hook

function ChatBox({ handleChatToggle, setChat, chat }) {
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("greeting");
  const [showOptions, setShowOptions] = useState(false);
  const [forceRender, setForceRender] = useState(0);
  const [isTyping, setIsTyping] = useState(false); // State to show typing indicator
  // Typing indicator not working propely need to be fixed
  // Finish all the rest of the questions
  const questions = ChatQuestions();

  // Use the custom hook to add delay functionality
  const timerDelay = useDelayChat({
    chat,
    setChat,
    setIsTyping, // Pass the typing state setter to the hook
  });

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
    getCurrentTime,
  });

  const { handleOptionSelect } = HandleOptionSelect({
    setChat,
    setShowOptions,
    chat,
    questions,
    name,
    setCurrentQuestion,
  });

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFileClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleNameSubmit = () => {
    if (inputValue.trim().length > 3) {
      setName(inputValue.trim());
      setIsNameEntered(true);
      setShowOptions(true);
      setForceRender(forceRender + 1);
      setInputValue("");
      setChat((prevChat) => [
        ...prevChat,
        {
          name: inputValue.trim(),
          text: `Hello, ${inputValue.trim()}! How can I assist you today?`,
          time: getCurrentTime(),
        },
      ]);
    } else {
      setChat((prevChat) => [
        ...prevChat,
        {
          text: `Please Provide name length greater than three characters ❌`,
          time: getCurrentTime(),
        },
      ]);
    }
  };

  return (
    <div className="chatbox">
      <div className="chatbox-header">
        <button onClick={handleChatToggle}>&times;</button>
      </div>
      <ul className="chat-thread">
        {chat.map((message, index) => (
          <li key={index}>
            <div>{message.name}</div>
            <div className="chat-bubble">
              {message.text}
              <span className="chat-time">{message.time}</span>
            </div>
          </li>
        ))}

        {!isNameEntered && (
          <li>
            <div className="chat-bubble">
              Please enter your first and last name to start chatting.
            </div>
          </li>
        )}

        {isNameEntered &&
          showOptions &&
          isTyping && ( // Show typing indicator if typing is true
            <li>
              <div className="chat-bubble typing-indicator">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
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
