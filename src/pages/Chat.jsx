import React, { useState, useEffect } from "react";
import API from "../services/api";

function Chat() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChats([
        {
          role: "welcome",
          text: "Hello 👋\nHow can I help you today?",
        },
      ]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      text: message,
    };

    const newChats = [...chats, userMessage];
    setChats(newChats);

    try {
      const response = await API.post("/chat", {
        message,
        history: newChats,
      });

      const aiMessage = {
        role: "ai",
        text: response.data.reply || "No response",
      };

      setChats([...newChats, aiMessage]);
    } catch (error) {
      console.error(error);

      setChats([
        ...newChats,
        {
          role: "ai",
          text: "AI response error",
        },
      ]);
    }

    setMessage("");
  };

  return (
    <div className="chat-container">
      <div className="ai-header">
        <div className="ai-icon"></div>
        <h2>Chat AI</h2>
      </div>

      <div className="chat-box">
        {chats.map((chat, index) => (
          <div
            key={index}
            className={
              chat.role === "user"
                ? "user-chat"
                : chat.role === "welcome"
                ? "welcome-chat"
                : "ai-chat"
            }
          >
            {chat.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;