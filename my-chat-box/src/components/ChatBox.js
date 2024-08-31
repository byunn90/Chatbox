import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import "../chatbox.css";
import chatGirl from "./images/chatgirl.webp";
import HandleOptionSelect from "./HandleOptionSelect";
import HandleKeyDown from "./HandleKeyDown";
import HandleSendMessage from "./HandleSendMessage";
import ChatQuestions from "./question";
import handleFileChange from "./handleFileChange";
// NOTE line 91-92 the styles is not working. Get Help
// NOTE Fix the download icon looks horrible
function ChatBox({ handleChatToggle, setChat, chat }) {
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState(""); // State to store the user's name
  const [email, setEmail] = useState(""); // State to store the user's email
  const [isNameEntered, setIsNameEntered] = useState(false); // State to check if the name is entered
  const [isEmailEntered, setIsEmailEntered] = useState(false); // State to check if the email is entered
  const [currentQuestion, setCurrentQuestion] = useState("greeting"); // State to track the current question
  const [showOptions, setShowOptions] = useState(false); // State to handle showing options

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
            <div>{message.name}</div> {/* Displaying the sender's name */}
            <div className="chat-bubble">
              {message.text}
              {/* Render options as buttons inside the chat bubble */}
              {message.name === "Bot" && showOptions && (
                <div className="options">
                  {currentQuestion === "greeting" &&
                    questions.options.orderStatus.question.map(
                      (option, index) => (
                        <button
                          key={index}
                          className="option-button"
                          onClick={() => handleOptionSelect(option)}
                        >
                          {option}
                        </button>
                      )
                    )}
                  {currentQuestion === "infoIssue" &&
                    questions.options.infoIssue.question.map(
                      (option, index) => (
                        <button
                          key={index}
                          className="option-button"
                          onClick={() => handleOptionSelect(option)}
                        >
                          {option}
                        </button>
                      )
                    )}
                </div>
              )}
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
      </ul>
      <div className="chatbox-footer">
        <input
          type="text"
          className="chat-window-message"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
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
          style={{ display: "none" }} // Hides the file input element
          onChange={(e) => handleFileChange(e, name, chat, setChat)} // Correctly passing name, chat, and setChat
        />
        <div className="fontAwesome-Icons" onClick={handleFileClick}>
          <FontAwesomeIcon icon={faPaperclip} className="icon" />
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
