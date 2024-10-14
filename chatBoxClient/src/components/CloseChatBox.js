function CloseChatBox({
  currentQuestion,
  setIsChatBoxVisible,
  addDelayedMessage,
}) {
  if (currentQuestion === "close") {
    setTimeout(() => {
      setIsChatBoxVisible(false);
    }, 2000);
  }
  return true;
}

export default CloseChatBox;
