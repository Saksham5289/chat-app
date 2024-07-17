import React, { useEffect, useState } from "react";
import axios from "axios";
import { Message } from "./Message";

interface Message {
  id: number;
  content: string;
  createdAt: string;
  senderId: number;
  receiverId: number;
}

interface centercenterProps {
  friendId: number;
  userId: number; // User's ID in the app. It is required to fetch messages.
}

export const CenterCenter = ({ friendId, userId }: centercenterProps) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Function to fetch messages
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/messages/${friendId}`,
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

  return (
    <div className="flex-grow border overflow-y-auto h-0 p-4 bg-gray-200">
      {messages.map((msg, index) => (
        <Message
          key={index}
          text={msg.content}
          isSender={msg.senderId === userId}
        />
      ))}
    </div>
  );
};
