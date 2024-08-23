export default function HandleKeyDown(handleSendMessage) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage(); // Call the handleSendMessage function when Enter is pressed
    }
  };

  return { handleKeyDown };
}
