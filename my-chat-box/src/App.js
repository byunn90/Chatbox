import { useState } from "react";
import ChatBox from "./components/ChatBox";
import OpenChatBox from "./components/OpenChatBox";
function App() {
  const [chat, setChat] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="App">
      {isChatOpen ? (
        <ChatBox handleChatToggle={handleChatToggle} setChat={setChat} />
      ) : (
        <div onClick={handleChatToggle}>
          <OpenChatBox />
        </div>
      )}
    </div>
  );
}

export default App;
