"use client";
import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import "../next-chatbot/Chatbot.css";
import axios from "axios";

interface Step {
  message: string;
}

const NextChatbot = () => {
  const handleInput = (id: any, value: any) => {
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
        "Thanks for connecting with us! Can you please share your phone number ?",
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
        "Can you tell me a little bit about your business and what you're looking for in terms of products/services?",
      trigger: "8",
    },
    {
      id: "8",
      user: true,
      trigger: (e: any) => {
        return handleInput("9", e);
      },
    },
    {
      id: "9",
      message:
        "Response recorded. Our team will connect with you shortly.Have a ​​Good day/evening!",
      end: true,
    },
  ]);
  return (
    <>
      <div className="chat-container">
        <ChatBot style={{ height: "379px" }} steps={steps} userDelay={500} />
      </div>
      <style jsx>{`
        .chat-container {
          font-family: Arial, sans-serif;
          background-color: #d5ddde;
          height: 379px;
          overflow-y: auto;
        }

        .fBGGBn {
          overflow-y: scroll !important;
          margin-top: 2px !important;
          padding-top: 6px !important;
          height: 269px !important;
        }

        .user-message {
          text-align: right;
          margin-bottom: 10px;
        }

        .bot-message {
          text-align: left;
          margin-bottom: 10px;
        }

        .user-input {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: none;
          border-top: 1px solid #ccc;
          box-sizing: border-box;
        }

        .dPdbIW {
          height: 379px !important;
        }

        .send-button {
          background-color: #4caf50;
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
        }

        .send-button:hover {
          background-color: #45a049;
        }
      `}</style>
    </>
  );
};

export default NextChatbot;
