import React, { useState, useEffect, useRef } from "react";
import { ACTIONS } from "../Actions";
import "../styles/chatWindow.css";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChatWindow({ socketRef, roomId, username, toggleChat }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem(`messages_${roomId}`);
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleMessageReceive = ({ message, username: senderUsername }) => {
      const newMessages = [...messages, { message, username: senderUsername }];
      setMessages(newMessages);
      localStorage.setItem(`messages_${roomId}`, JSON.stringify(newMessages));

      // Display a toast notification only if the sender is not the current user
      if (senderUsername !== username) {
        toast.info(`${senderUsername} sent a message: ${message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    if (socketRef.current) {
      socketRef.current.on(ACTIONS.RECEIVE_MESSAGE, handleMessageReceive);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off(ACTIONS.RECEIVE_MESSAGE, handleMessageReceive);
      }
    };
  }, [socketRef, messages, roomId, username]);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socketRef.current.emit(ACTIONS.SEND_MESSAGE, {
        roomId,
        message,
        username,
      });
      setMessage("");
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        Chat
        <button className="close-chat-btn" onClick={toggleChat}>
          <FiX size={20} />
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.username === username ? "sent" : "received"
            }`}
          >
            {msg.username !== username && <strong>{msg.username}:</strong>}{" "}
            {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatWindow;
