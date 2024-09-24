import { useEffect } from "react";

function delayChat() {
  const [timerDelay, setTimerDelay] = usestate("false");

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimerDelay(true);
    });
  });
}

export default delayChat;
