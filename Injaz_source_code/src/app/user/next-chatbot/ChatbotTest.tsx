"use client";
import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import axios from "axios";
import "../next-chatbot/Chatbot.css";

interface Step {
    message: string;
  }

const ChatbotTest = () => {

  const handleInput = (id:any, value:any) => {
    const stepArry: Step[] = Object.values(value.steps);
    const payload = { msg: "", reply: "" };
    payload.msg = stepArry[stepArry.length - 2]?.message;
    payload.reply = stepArry[stepArry.length - 1]?.message;

    axios.post("http://localhost:9001/api/cars", {
      ...payload,
    });

    return id;
  };
  const [steps, setSteps] = useState([
    {
      id: "1",
      message: "Hi, how can I assist you today?",
      trigger: "2",
    },
    {
      id: "2",
      user: true,
      trigger: (e: any) => {
        return handleInput("3", e);
      },
    },
    {
      id: "3",
      message:
        "Thanks for connecting with us! Can you please share your name, email and phone number to assist better?",
      trigger: "4",
    },
    {
      id: "4",
      user: true,
      trigger: (e: any) => {
        return handleInput("5", e);
      },
    },
    {
      id: "5",
      message:
        "Can you tell me a little bit about your business and what you're looking for in terms of products/services?",
      trigger: "6",
    },
    {
      id: "6",
      user: true,
      trigger: (e: any) => {
        return handleInput("7", e);
      },
    },
    {
      id: "7",
      message:
        "Response recorded. Our team will connect with you shortly.Have a ​​Good day/evening!",
      end: true,
    },
  ]);

  return (
    <div className="chat-container">
      <ChatBot
        style={{ height: "379px" }}
        steps={steps}
        userDelay={500}
      />
    </div>
  );
};

export default ChatbotTest;
