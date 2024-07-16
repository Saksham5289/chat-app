import React from "react";
import { Message } from "./Message";

export const CenterCenter = () => {
  return (
    <div className="flex-grow border overflow-y-auto h-0 p-4 bg-gray-200">
      <Message text="Hi! Just a quick update:" isSender={false} />
      <Message
        text="Hey, I've scheduled a brief team meeting at 11 AM to go over the latest project updates. Please make sure you're available. Thanks!"
        isSender={true}
      />
      <Message
        text="Morning! I've attached the agenda for tomorrow's workshop. Take a look and let me know if you have any items to add."
        isSender={false}
      />
      <Message
        text="Hey, can you double-check the pricing details in the proposal draft? We aim to finalize it by the end of today."
        isSender={true}
      />
      <Message
        text="Hi! Just a quick update: The event venue has been confirmed for next Friday. Please RSVP by Wednesday. Also, could you review the budget proposal I sent earlier? Let me know your thoughts. Thanks"
        isSender={false}
      />
      <Message
        text="Hey, I've scheduled a brief team meeting at 11 AM to go over the latest project updates. Please make sure you're available. Thanks!"
        isSender={true}
      />
      <Message
        text="Morning! I've attached the agenda for tomorrow's workshop. Take a look and let me know if you have any items to add."
        isSender={false}
      />
      <Message
        text="Hey, can you double-check the pricing details in the proposal draft? We aim to finalize it by the end of today."
        isSender={true}
      />

      {/* Add more Message components as needed */}
    </div>
  );
};
