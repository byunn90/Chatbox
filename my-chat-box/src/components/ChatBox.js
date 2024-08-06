import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import "../chatbox.css";

function ChatBox({ handleChatToggle, setChat, chat }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setChat([...chat, inputValue]);
      setInputValue("");
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
            <div className="chat-bubble">{message}</div>
          </li>
        ))}
      </ul>
      <div className="chatbox-footer">
        <input
          type="text"
          className="chat-window-message"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
        />
        <div className="fontAswome-Icons">
          <FontAwesomeIcon icon="fa-solid fa-square-plus" />
          <FontAwesomeIcon icon={faSmile} className="icon" />
          <FontAwesomeIcon icon={faPaperclip} className="icon" />
        </div>
        {/* <button onClick={handleSendMessage}>Send</button> */}
      </div>
    </div>
  );
}

export default ChatBox;
