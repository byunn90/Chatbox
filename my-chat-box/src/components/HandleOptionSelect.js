export default function HandleOptionSelect({
  setChat,
  setShowOptions,
  chat,
  questions,
  name,
  setCurrentQuestion,
}) {
  const handleOptionSelect = (option) => {
    console.log("Option selected:", option); // Debug log

    // Handle specific options based on the user's choice
    if (option === "Would you like to contact support?") {
      setChat((prevChat) => [
        ...prevChat,
        { text: "Please enter your email address:", name: "Bot" },
      ]);
      setCurrentQuestion("contactSupport");
    } else if (option === "About us?") {
      setChat((prevChat) => [
        ...prevChat,
        {
          text: "Our company specializes in providing top-notch customer support solutions.",
          name: "Bot",
        },
      ]);
    } else if (option === "Damage Product") {
      // Directly ask for confirmation without repeating "Damage Product?"
      setChat((prevChat) => [
        ...prevChat,
        {
          text: "Would you like to provide more details or proceed without details? (Yes/No)",
          name: "Bot",
        },
      ]);
      setCurrentQuestion("damageProductConfirm");
    } else if (option === "Refund") {
      setChat((prevChat) => [
        ...prevChat,
        {
          text: "You selected Refund. Can you please give a detailed description of why you would like the refund?",
          name: "Bot",
        },
      ]);
      setCurrentQuestion("refundDescription");
    } else if (option === "Track Order") {
      setChat((prevChat) => [
        ...prevChat,
        {
          text: "You selected Track Order. Please provide your order number.",
          name: "Bot",
        },
      ]);
      setCurrentQuestion("trackOrder");
    } else if (option.toLowerCase().includes("request a change")) {
      setChat((prevChat) => [
        ...prevChat,
        {
          text: "You selected 'Request a Change'. Can you describe the reason why you want a change?",
          name: "Bot",
        },
      ]);
      setCurrentQuestion("requestChangeDescription");
    }

    // Hide options after selection
    setShowOptions(false);
  };

  return { handleOptionSelect };
}
