import React, { useEffect, useState } from "react";
import axios from "axios";
import { Message } from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootState";
import { addNotification } from "../redux/slices/notificationSlice";

interface Message {
  id: number;
  content: string;
  createdAt: string;
  senderId: number;
  receiverId: number;
}

interface CenterCenterProps {
  friendId: number;
  userId: number; // User's ID in the app. It is required to fetch messages.
}

export const CenterCenter = ({ friendId, userId }: CenterCenterProps) => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const [messages, setMessages] = useState<Message[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Function to fetch messages
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/messages/${friendId}`,
          {
            headers: {
              userid: userId, // Pass userId as a header
            },
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [friendId, userId]);

  useEffect(() => {
    // Open WebSocket connection
    const socket = new WebSocket(`ws://localhost:3000`);

    socket.onopen = () => {
      console.log("WebSocket connection established");
      // Send a connect message when the WebSocket connection is established
      socket.send(JSON.stringify({ type: "connect", userId }));
    };

    socket.onmessage = (event) => {
      const newMessage: Message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      if (newMessage.senderId !== userId) {
        dispatch(addNotification(state.user.userId));
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setWs(socket);

    // Clean up WebSocket connection when component unmounts
    return () => {
      socket.close();
    };
  }, [userId]);

  const sendMessage = () => {
    if (ws && newMessage.trim() !== "") {
      const message = {
        type: "message",
        content: newMessage,
        senderId: userId,
        receiverId: friendId,
        createdAt: new Date().toISOString(),
      };
      ws.send(JSON.stringify(message));
      setNewMessage(""); // Clear the input box after sending
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow border overflow-y-auto h-0 p-4 bg-gray-200">
        {messages.map((msg, index) => (
          <Message
            key={index}
            text={msg.content}
            isSender={msg.senderId === userId}
          />
        ))}
      </div>
      <div className="p-4 bg-gray-100">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="border p-2 w-full"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 mt-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};
