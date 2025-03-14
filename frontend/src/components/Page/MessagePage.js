import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_URL);

const MessagePage = () => {
  const emailId = localStorage.getItem("emailId");
  const [chats, setChats] = useState([]); // ✅ Stores latest messages per user
  const [messages, setMessages] = useState([]); // ✅ Stores full chat history
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!emailId) return;

    fetch(`${process.env.REACT_APP_BACKEND_URL}/chat/${emailId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;
        
        // ✅ Extract latest message per chat
        const latestMessages = {};
        data.forEach((msg) => {
          const otherPerson = msg.from === emailId ? msg.to : msg.from;
          latestMessages[otherPerson] = msg;
        });

        setChats(Object.values(latestMessages)); // ✅ Show only latest messages
      })
      .catch((error) => console.error("Error fetching messages:", error));
  }, [emailId]);

  const loadChatHistory = (otherPerson) => {
    setSelectedUser(otherPerson);

    // ✅ Filter messages for the selected user
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

    // ✅ Real-time update
    socket.emit("sendMessage", msg);

    // ✅ Optimistic UI update
    setMessages((prev) => [...prev, msg]);

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
      {/* Sidebar with Latest Messages */}
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

      {/* Chat Window */}
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
