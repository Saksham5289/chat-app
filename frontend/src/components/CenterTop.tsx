import { ChatSearch } from "./ChatSearch";
import { Divider } from "./Divider";
import { FontSans } from "./FontSans";
import { PeopleToChat } from "./PeopleToChat";
import { PersonToChat } from "./PersonToChat";
import profilepic from "../assets/profilepic.png";
import { PhoneCall, Search, Settings, Video } from "react-feather";

export const CenterTop = () => {
  return (
    <div className="border  p-2 bg-green-50">
      <div className="flex justify-between items-center">
        <FontSans
          title="Messages"
          fontSize="20px"
          fontWeight={800}
          color="black"
        />
        <ChatSearch />
      </div>

      <div className="flex justify-between items-center">
        <PersonToChat
          iconTitle="Jacky"
          imageUrl={profilepic}
          statusTitle="online"
        />
        <div className="flex space-x-4 items-center">
          <Search />
          <PhoneCall />
          <Video />
          <Settings />
        </div>
      </div>
    </div>
  );
};
