export default function HandleKeyDown(handleSendMessage) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage(); // Trigger the send message function on Enter key press
    }
  };

  return { handleKeyDown };
}
