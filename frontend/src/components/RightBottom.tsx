import CircularIcon from "./CircularIcon";
import groupPic from "../assets/group.jpg";
import { FontSans } from "./FontSans";
import { FontMono } from "./FontMono";
import { CircularCount } from "./CircularCount";
import { PersonToChat } from "./PersonToChat";

export const RightBottom = () => {
  return (
    <div className="space-y-4">
      <PersonToChat
        iconTitle="Bong Boys"
        imageUrl={groupPic}
        notificationCount={6}
      />
      <PersonToChat
        iconTitle="Bikza gang"
        imageUrl={groupPic}
        statusTitle="Catch you later"
      />
      <PersonToChat
        iconTitle="Loki Halves"
        imageUrl={groupPic}
        statusTitle="Catch you later"
      />
      <PersonToChat
        iconTitle="Loki Halves"
        imageUrl={groupPic}
        statusTitle="Catch you later"
      />
    </div>
  );
};
