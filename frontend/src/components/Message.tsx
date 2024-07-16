import React from "react";

interface MessageProps {
  text: string;
  isSender: boolean;
}

export const Message = ({ text, isSender }: MessageProps) => {
  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-2 max-w-xs rounded-lg ${
          isSender ? "bg-green-500 text-white" : "bg-white text-black"
        }`}
      >
        {text}
      </div>
    </div>
  );
};
