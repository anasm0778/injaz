"use client";
import React, { useState } from "react";
import NextChatbot from "./NextChatbot";
import CloseIcon from "@mui/icons-material/Close";
import "../next-chatbot/Chatbot.css"

const ChatbotPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <img
        onClick={togglePopup}
        className="next_chatbot"
        src="/emojipngwebp-1.webp"
        alt="My Icon"
        // style={{
        //   position: "fixed",
        //   bottom: "50px",
        //   right: "50px",
        //   cursor: "pointer",
        //   color: "#6e48aa",
        //   fontSize: "0px",
        //   width:"4%",
        //   boxShadow:"0 1.25em 2.18em rgba(0, 0, 0, 0.3)"
        // }}
      />
      {isOpen && (
        <div className="popup">
          <div className="popup-inner">
            <CloseIcon
              sx={{ color: "red", cursor: "pointer" }}
              onClick={togglePopup}
            />
            <NextChatbot />
          </div>
        </div>
      )}

      <style jsx>{`
        .chat-btn {
          position: fixed;
          bottom: 50px;
          right: 50px;
          cursor: pointer;
        }
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;

          align-items: center;
        }

        .popup-inner {
          position: fixed;
          bottom: 117px;
          right: 55px;
        }

        @media screen and (max-width: 600px) {
          .popup-inner {
          position: fixed;
          bottom: 117px;
          right: 28px;
        }
        }
      `}</style>
    </div>
  );
};

export default ChatbotPopup;
