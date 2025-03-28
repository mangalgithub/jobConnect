import { useEffect, useState, useRef, useCallback } from "react";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_URL, { autoConnect: false });

const MessagePage = () => {
    const emailId = localStorage.getItem("emailId");
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState("");
    const isMountedRef = useRef(false); // Prevent multiple listeners

    const handleNewMessage = useCallback((msg) => {
        console.log("Received new message in frontend:", msg);
        const otherPerson = msg.from === emailId ? msg.to : msg.from;

        setChats((prevChats) => {
            const updatedChats = prevChats.filter((chat) => {
                const chatPerson = chat.from === emailId ? chat.to : chat.from;
                return chatPerson !== otherPerson;
            });

            return [{ ...msg }, ...updatedChats];
        });

        if (selectedUser === otherPerson) {
            setMessages((prev) => {
                // Prevent duplicate messages
                if (!prev.some(m => m.text === msg.text && m.from === msg.from && m.to === msg.to)) {
                    return [...prev, msg];
                }
                return prev;
            });
        }
    }, [emailId, selectedUser]);

    useEffect(() => {
        if (!emailId) return;

        if (!socket.connected) {
            socket.connect();
            console.log("Socket connected.");
        }

        socket.emit("joinRoom", emailId);
        console.log("Joined room for:", emailId);

        fetch(`${process.env.REACT_APP_BACKEND_URL}/chat/${emailId}`)
            .then((res) => res.json())
            .then((data) => {
                if (!Array.isArray(data)) return;

                const latestMessages = {};
                data.forEach((msg) => {
                    const otherPerson = msg.from === emailId ? msg.to : msg.from;
                    latestMessages[otherPerson] = msg;
                });

                setChats(Object.values(latestMessages));
            })
            .catch((error) => console.error("Error fetching messages:", error));

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [emailId, handleNewMessage]);

    const loadChatHistory = (otherPerson) => {
        setSelectedUser(otherPerson);

        fetch(`${process.env.REACT_APP_BACKEND_URL}/chat/${emailId}`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setMessages(data.filter((msg) => msg.from === otherPerson || msg.to === otherPerson));
                }
            })
            .catch((error) => console.error("Error loading chat history:", error));
    };

    const sendMessage = async () => {
        if (!message.trim()) return;

        const msg = { from: emailId, to: selectedUser, text: message };

        socket.emit("sendMessage", msg);
        
        setMessages((prev) => [...prev, msg]); // Optimistic update

        try {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/chat`, {
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
        <div className="flex h-screen">
            <div className="w-1/3 border-r p-4">
                <h1 className="text-xl font-bold mb-4">Chats</h1>
                {chats.length > 0 ? (
                    chats.map((chat) => {
                        const otherPerson = chat.from === emailId ? chat.to : chat.from;
                        return (
                            <div
                                key={otherPerson}
                                className="p-3 border-b cursor-pointer hover:bg-gray-100"
                                onClick={() => loadChatHistory(otherPerson)}
                            >
                                <p className="font-semibold">{otherPerson}</p>
                                <p className="text-sm text-gray-600 truncate">{chat.text}</p>
                            </div>
                        );
                    })
                ) : (
                    <p>No recent chats</p>
                )}
            </div>

            <div className="w-2/3 p-4 flex flex-col">
                {selectedUser ? (
                    <>
                        <h2 className="text-xl font-bold mb-4">{selectedUser}</h2>
                        <div className="flex-1 overflow-y-auto border p-2 rounded">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`p-2 my-1 rounded ${msg.from === emailId ? "bg-blue-100 text-right" : "bg-gray-100 text-left"}`}>
                                    <p>{msg.text}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="border p-2 rounded w-full"
                            />
                            <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-500">Select a chat to view messages</p>
                )}
            </div>
        </div>
    );
};

export default MessagePage;
