import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

// const socket=io("http://localhost:5000");
const socket=io(`${process.env.REACT_APP_BACKEND_URL}`);

function ChatPage() {
    const { email } = useParams();
    const emailId = localStorage.getItem("emailId");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
            console.log("Socket connected.");
        }

        socket.emit("joinRoom", emailId);
        socket.emit("joinRoom", email);
        console.log("Joined rooms:", emailId, email);

        // ✅ Fetch message history
        fetch(`${process.env.REACT_APP_BACKEND_URL}/chat/${emailId}`)
          //  fetch(`http://localhost:5000/chat/${emailId}`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setMessages(data);
                }
            })
            .catch((error) => console.error("Error fetching chat history:", error));

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [email, emailId]);

    const handleNewMessage = useCallback((msg) => {
        console.log("Received new message:", msg);

        setMessages((prev) => {
            if (!prev.some(m => m.text === msg.text && m.from === msg.from && m.to === msg.to)) {
                return [...prev, msg];
            }
            return prev;
        });
    }, []);

    useEffect(() => {
        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [handleNewMessage]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const msg = { from: emailId, to: email, text: message };

        setMessages((prev) => [...prev, msg]); // Optimistic update

        socket.emit("sendMessage", msg);

        try {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/chat`, {
            // await fetch(`http://localhost:5000/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(msg),
            });
        } catch (error) {
            console.error("Error sending message:", error);
        }

        setMessage("");
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <div className="p-4 bg-blue-600 text-white text-center text-lg font-semibold">
                Chat with {email}
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`flex ${msg.from === emailId ? "justify-end" : "justify-start"}`}
                    >
                        <div className={`p-2 max-w-xs md:max-w-md rounded-lg text-sm ${msg.from === emailId ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef}></div>
            </div>

            {/* Input Box */}
            <div className="p-4 bg-white flex items-center">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded-md outline-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button 
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatPage;
