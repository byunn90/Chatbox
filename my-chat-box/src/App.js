import { useEffect, useState } from "react";
import ChatBox from "./components/ChatBox";
import OpenChatBox from "./components/OpenChatBox";

function App() {
  const [chat, setChat] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  ////// Needs work done
  // Fetch messages when the chatbox is opened

  useEffect(() => {
    async function fetchText() {
      try {
        const response = await fetch("http://localhost:5228/chatbox");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Fetched data:", result); // This should log your chatBox array
      } catch (error) {
        console.error("Fetch error:", error); // Log any errors
      }
    }

    fetchText();
  }, []);
  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };
  // Needs work done
  return (
    <div className="App">
      {isChatOpen ? (
        <ChatBox
          handleChatToggle={handleChatToggle}
          setChat={setChat}
          chat={chat}
          setIsChatOpen={setIsChatOpen}
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
