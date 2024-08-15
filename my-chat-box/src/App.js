import { useEffect, useState } from "react";
import ChatBox from "./components/ChatBox";
import OpenChatBox from "./components/OpenChatBox";

function App() {
  const [chat, setChat] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Fetch messages when the chatbox is opened
  useEffect(() => {
    if (isChatOpen) {
      console.log("Open");
      fetch("http://localhost:5000/api/message")
        .then((response) => response.json())
        .then((data) => setChat(data))
        .catch((error) => console.error("hi:", error));
    } else {
      console.log("Closed");
    }
  }, [isChatOpen]); // Dependency array ensures this runs when isChatOpen changes

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="App">
      {isChatOpen ? (
        <ChatBox
          handleChatToggle={handleChatToggle}
          setChat={setChat}
          chat={chat}
        />
      ) : (
        <div onClick={handleChatToggle}>
          <OpenChatBox />
        </div>
      )}
    </div>
  );
}

export default App;
