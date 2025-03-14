import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_URL);

function ChatPage() {
    const { email } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        socket.emit("joinRoom", email);

        fetch(`${process.env.REACT_APP_BACKEND_URL}/chat/${email}`)
            .then((res) => res.json())
            .then((data) => setMessages(data));

        socket.on("newMessage", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => socket.off();
    }, [email]);

    const sendMessage = async () => {
        if (message.trim() !== "") {
            const msg = { from: localStorage.getItem("emailId"), to: email, text: message };

            socket.emit("sendMessage", msg);
            setMessages((prev) => [...prev, msg]);

            await fetch(`${process.env.REACT_APP_BACKEND_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(msg),
            });

            setMessage("");
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="p-4 bg-blue-600 text-white text-center">Chat with {email}</div>
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`p-2 my-2 rounded-md ${msg.from === email ? "bg-gray-300" : "bg-blue-500 text-white"}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="p-4 bg-white flex">
                <input type="text" className="flex-1 p-2 border rounded-md" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default ChatPage;
