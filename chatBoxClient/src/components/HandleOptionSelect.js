import useDelayChat from "./useDelayChat";

export default function HandleOptionSelect({
  setChat,
  setShowOptions,
  chat,
  questions,
  name,
  setCurrentQuestion,
}) {
  const { addDelayedMessage } = useDelayChat({ setChat, chat }); // Use the hook here

  const handleOptionSelect = (option) => {
    console.log("Option selected:", option); // Debug log

    if (option === "Would you like to contact support?") {
      addDelayedMessage({
        text: "Please enter your email address:",
        name: "Bot",
      });
      setCurrentQuestion("contactSupport");
    } else if (option === "About us?") {
      // Send the initial response
      addDelayedMessage({
        text: "Our company specializes in providing top-notch customer support solutions.",
        name: "Bot",
      });
      setCurrentQuestion("closing");
      setTimeout(() => {
        addDelayedMessage({
          text: "Thanks for visiting our website and getting to know us! Have a great day! 🌞",
          name: "Bot",
        });
      }, 5000);
    } else if (option === "Damage Product") {
      addDelayedMessage({
        text: "Would you like to provide more details or proceed without details? (Yes/No)",
        name: "Bot",
      });
      setCurrentQuestion("damageProductConfirm");
    } else if (option === "Refund") {
      addDelayedMessage({
        text: "You selected Refund. Can you please give a detailed description of why you would like the refund?",
        name: "Bot",
      });
      setCurrentQuestion("refundDescription");
    } else if (option === "Track Order") {
      addDelayedMessage({
        text: "You selected Track Order. Please provide your order number.",
        name: "Bot",
      });
      setCurrentQuestion("trackOrder");
    } else if (option.toLowerCase().includes("request a change")) {
      addDelayedMessage({
        text: "You selected 'Request a Change'. Can you describe the reason why you want a change?",
        name: "Bot",
      });
      setCurrentQuestion("requestChangeDescription");
    }

    setShowOptions(false);
  };

  return { handleOptionSelect };
}
