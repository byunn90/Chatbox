import { useState } from "react";
import "../chatbox.css";

function ChatBox({ handleChatToggle, setChat }) {
  const [inputValue, setInputValue] = useState("");

  const handleChatSubmit = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    setChat("");
    inputValue("");
  };

  return (
    <div className="chatbox">
      <div className="chatbox-header">
        <span>Chat</span>
        <button onClick={handleChatToggle}>&times;</button>
      </div>
      <div className="chatbox-content">{handleSendMessage}</div>
      <div className="chatbox-footer">
        <input
          type="text"
          value={inputValue}
          onChange={handleChatSubmit}
          placeholder="Type a message"
        ></input>
        <button onClick={handleSendMessage}>send</button>
      </div>
    </div>
  );
}

export default ChatBox;
