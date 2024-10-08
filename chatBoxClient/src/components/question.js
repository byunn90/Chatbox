function ChatQuestions() {
  return {
    greeting: `Hi there! How can I assist today?`,
    options: {
      orderStatus: {
        question: [
          "Do you want to check the status of your order?",
          "Would you like to contact support?",
          "About us?",
          "request a change?",
        ],
        followUp: "Can you please provide your order number?",
        contactSupport:
          "Please provide us with your contact details and a description of the issue.",
      },
      productInfo: {
        question: "Would you like to know more about a specific product?",
        followUp: "Which product are you interested in?",
      },
      infoIssue: {
        question: ["Damage Product", "Refund", "Track Order"],
        followUp:
          "Can you please provide a description of the issue so we know exactly how to assist you?",
      },
      technicalSupport: {
        question: "Do you need help with a product or service?",
        followUp: "Can you describe the issue you're facing?",
      },
    },
    closing: "Is there anything else you need help with?",
  };
}

export default ChatQuestions;
