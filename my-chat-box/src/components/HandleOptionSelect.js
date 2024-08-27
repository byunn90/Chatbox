export default function HandleOptionSelect({
  setChat,
  setShowOptions,
  chat,
  questions,
  name,
}) {
  const handleOptionSelect = (option) => {
    setChat([...chat, { text: option, name }]);

    // Handle different options here
    if (option === "Do you want to check the status of your order?") {
      setChat((prevChat) => [
        ...prevChat,
        { text: questions.options.orderStatus.followUp, name: "Bot" },
      ]);
      setShowOptions(false); // Hide options after selection
    } else if (option === "Would you like to contact support?") {
      setChat((prevChat) => [
        ...prevChat,
        {
          text: "Please Leave your contact details below and we will contact you back",
          name: "Bot",
        },
      ]);
      setShowOptions(false);
    } else if (option === "About us?") {
      setChat((prevChat) => [
        ...prevChat,
        {
          text: "2Bytes exists to solve complex business IT problems. Our mission is to deliver content-rich solutions that save our customers time and money.",
          name: "Bot",
        },
      ]);
      setShowOptions(false);
    }
  };

  return { handleOptionSelect };
}
