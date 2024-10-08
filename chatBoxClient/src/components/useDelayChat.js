import { useState, useEffect } from "react";
// Need to fix it
function useDelayChat({ setChat, chat, delay = 3000 }) {
  const [isTyping, setIsTyping] = useState(false);

  const addDelayedMessage = (message) => {
    setIsTyping(true);
    setTimeout(() => {
      setChat((prevChat) => [...prevChat, message]);
      setIsTyping(true);
    }, 2500);
  };

  return { isTyping, addDelayedMessage };
}

export default useDelayChat;
