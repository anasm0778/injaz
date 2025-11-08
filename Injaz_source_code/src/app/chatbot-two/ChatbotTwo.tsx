"use client";
import React from "react";
import ChatBot from "react-simple-chatbot";
import "../chatbot-two/ChatboxTwo.css";

const steps = [
  {
    id: "1",
    message: "Greeting John Wrick!",
    trigger: "2",
  },
  {
    id: "2",
    message:
      "We are pleased to present your pyaslip for the month of march 2023. your hard work and dedication have paid off, and we hope this payslip brings a smile to your face.",
    trigger: "3",
  },
  {
    id: "3",
    message:
      "Hello i am mutilingual document assistant. i am here to assit you with any questions you may have regarding you uploaded document",
    trigger: "4",
  },
  {
      id: "4",
      user: true,
      trigger: (e: any) => {
        console.log(e, "tyytgyggvgv");
        return "5";
      },
    },
  {
    id: "5",
    message:
      "Response recorded. Our team will connect with you shortly.Have a ​​Good day/evening!",
    end: true,
  },
  
];

const ChatbotTwo = () => {
  return (
    <>
      <div className="chat-container">
        <ChatBot steps={steps} style={{ with: "100%" }} userDelay={500} />
      </div>
    
    </>
  );
};

export default ChatbotTwo;
