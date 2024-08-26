// questions.js
function ChatQuestions() {
  return {
    greeting: "Hi there! How can I assist you today?",
    options: {
      orderStatus: {
        question: [
          "Do you want to check the status of your order?",
          "Would you like to contact support?",
          "About us?",
        ],
        followUp: "Can you please provide your order number?",
      },
      productInfo: {
        question: "Would you like to know more about a specific product?",
        followUp: "Which product are you interested in?",
      },
      technicalSupport: {
        question: "Do you need help with a product or service?",
        followUp: "Can you describe the issue you're facing?",
      },
    },
    closing: "Is there anything else you need help with?",
  };
}
// Need more questions and responses

export default ChatQuestions;
