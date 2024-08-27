export default function HandleOptionSelect({
  setChat,
  setShowOptions,
  setCurrentQuestion,
  setInputMode,
  questions,
}) {
  const handleOptionSelect = (option) => {
    setChat((prevChat) => [...prevChat, { text: option, name: "User" }]);

    if (option.includes("status of your order")) {
      setChat((prevChat) => [
        ...prevChat,
        { text: questions.options.orderStatus.followUp, name: "Bot" },
      ]);
      setCurrentQuestion("orderStatus");
    } else if (option.includes("contact support")) {
      setChat((prevChat) => [
        ...prevChat,
        { text: questions.options.orderStatus.contactSupport, name: "Mira" },
      ]);
      setCurrentQuestion("contactSupport");
      setInputMode("contact"); // <-- Switch to contact mode here
      setShowOptions(false);
    } else if (option.includes("About us")) {
      setChat((prevChat) => [
        ...prevChat,
        { text: "We are a company dedicated to...", name: "Bot" },
      ]);
      setCurrentQuestion("aboutUs");
    }
  };

  return { handleOptionSelect };
}
