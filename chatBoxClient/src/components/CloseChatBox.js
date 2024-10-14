function CloseChatBox({
  currentQuestion,
  setIsChatBoxVisible,
  setCurrentQuestion,
}) {
  if (currentQuestion === "Thank you for chatting with us. Have a great day!") {
    setTimeout(() => {
      setIsChatBoxVisible(false);
      setCurrentQuestion("close");
    }, 2000);
  }

  return true;
}

export default CloseChatBox;
