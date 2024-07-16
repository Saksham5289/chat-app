import React from "react";
import CircularIcon from "./CircularIcon";
import { FontSans } from "./FontSans";
import { CircularCount } from "./CircularCount";

import { FontMono } from "./FontMono";
import { PersonToChat } from "./PersonToChat";
import friendPic from "../assets/profilepic.png";

export const PeopleToChat = () => {
  return (
    <div className="space-y-5">
      <PersonToChat
        iconTitle="Ginzo Gui"
        imageUrl={friendPic}
        notificationCount={3}
        statusTitle="Catch you later"
      />
      <PersonToChat
        iconTitle="shinch sep"
        imageUrl={friendPic}
        statusTitle="Catch you later"
      />
      <PersonToChat
        iconTitle="miso lara"
        imageUrl={friendPic}
        statusTitle="Catch you later"
      />
      <PersonToChat
        iconTitle="michoo kikoo"
        imageUrl={friendPic}
        notificationCount={1}
        statusTitle="Catch you later"
      />
      <PersonToChat
        iconTitle="sawra Lee"
        imageUrl={friendPic}
        notificationCount={2}
        statusTitle="Catch you later"
      />
    </div>
  );
};
