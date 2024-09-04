export default function HandleOptionSelect({
  setChat,
  setShowOptions,
  chat,
  questions,
  name,
  setCurrentQuestion,
}) {
  const handleOptionSelect = (option) => {
    setChat([...chat, { text: option, name }]);

    if (option === "Would you like to contact support?") {
      setChat((prevChat) => [
        ...prevChat,
        { text: "Please enter your email address:", name: "Bot" },
      ]);
      setCurrentQuestion("contactSupport"); // Expect email next
    } else if (option === "About us?") {
      setChat((prevChat) => [
        ...prevChat,
        { text: "We are a company dedicated to...", name: "Bot" },
      ]);
    } else {
      // Handle other options or set a default behavior if needed
    }

    setShowOptions(false); // Hide options after any selection
  };

  return { handleOptionSelect };
}
