import { useState, useEffect } from "react";

// Ensure the name starts with an uppercase letter
function DelayChat({ setChat, chat }) {
  const [timerDelay, setTimerDelay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimerDelay(true);
      setChat((prevChat) => [
        ...prevChat,
        { text: "Delayed message added to chat", name: "Bot" },
      ]);
    }, 3000);

    // Cleanup function to clear timeout when component unmounts
    return () => clearTimeout(timer);
  }, [setChat, chat]);

  return timerDelay;
}

export default DelayChat;
