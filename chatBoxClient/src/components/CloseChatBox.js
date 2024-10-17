function CloseChatBox({
  currentQuestion,
  setIsChatBoxVisible,
  setCurrentQuestion,
}) {
  if (currentQuestion === "close") {
    setTimeout(() => {
      setIsChatBoxVisible(true);
    }, 2000);
  }

  return true;
}

export default CloseChatBox;
