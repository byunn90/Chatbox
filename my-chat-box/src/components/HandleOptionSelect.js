export default function HandleOptionSelect({
  setChat,
  setShowOptions,
  chat,
  questions,
  name,
  botName,
}) {
  const handleOptionSelect = (option) => {
    setChat([...chat, { text: option, name }]);

    // Handle different options here
    if (option === "Do you want to check the status of your order?") {
      setChat((prevChat) => [
        ...prevChat,
        { text: questions.options.orderStatus.followUp, name: { botName } },
      ]);
      setShowOptions(false); // Hide options after selection
    } else if (option === "Would you like to contact support?") {
      setChat((prevChat) => [
        ...prevChat,
        {
          text: "Please enter your email and customer reference number if you have one",
          name: "Bot",
        },
      ]);
      setShowOptions(false);
    } else if (option === "About us?") {
      setChat((prevChat) => [
        ...prevChat,
        { text: "We are a company dedicated to...", name: { botName } },
      ]);
      setShowOptions(false);
    }
  };

  return { handleOptionSelect };
}
