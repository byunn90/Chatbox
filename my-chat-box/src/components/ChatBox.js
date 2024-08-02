import { useState } from "react";
import "../chatbox.css";

function ChatBox({ handleChatToggle, setChat, chat }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    setChat(inputValue);
    setInputValue("");
  };

  return (
    <div className="chatbox">
      <div className="chatbox-header">
        <span>Chat</span>
        <button onClick={handleChatToggle}>&times;</button>
      </div>
      <ul className="chat-thread">
        <li>{chat}</li>
      </ul>
      <div className="chatbox-footer">
        <input
          type="text"
          className="chat-window-message"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
