import "../chatbox.css";
function ChatBox({ handleChatToggle }) {
  return (
    <div className="chatbox">
      <button onClick={handleChatToggle}>Close</button>
    </div>
  );
}

export default ChatBox;
