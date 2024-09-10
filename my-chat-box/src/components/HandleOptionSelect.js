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

    // Handle specific options based on the user's choice
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
    } else if (option === "Refund") {
      setChat((prevChat) => [
        ...prevChat,
        {
          text: "You selected Refund. Can you please give a detailed description on why you would like the refund?",
          name: "Bot",
        },
      ]);
      setCurrentQuestion("refundDescription"); // Move to refund description state
    } else if (option === "Track Order") {
      setChat((prevChat) => [
        ...prevChat,
        {
          text: "You selected Track Order. Please provide your order number.",
          name: "Bot",
        },
      ]);
      setCurrentQuestion("trackOrder"); // Move to track order state
    } else if (option === "Damage Product") {
      setChat((prevChat) => [
        ...prevChat,
        {
          text: "You selected Damage Product. Can you describe the issue with the product?",
          name: "Bot",
        },
      ]);
      setCurrentQuestion("damageProduct"); // Move to damage product state
    }

    setShowOptions(false); // Hide options after selection
  };

  return { handleOptionSelect };
}
