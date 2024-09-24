import { useState, useEffect } from "react";

// Rename the function to follow hook naming convention
function useDelayChat({ setChat, chat }) {
  const [timerDelay, setTimerDelay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimerDelay(true);
      setChat((prevChat) => [
        ...prevChat,
        // { text: "Delayed message added to chat", name: "Bot" },
      ]);
    }, 10000);

    return () => clearTimeout(timer);
  }, [setChat, chat]);

  return timerDelay;
}

export default useDelayChat;
