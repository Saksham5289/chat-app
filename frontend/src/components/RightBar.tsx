import { RightTop } from "./RightTop";
import { Divider } from "./Divider";
import { Features } from "./Features";
import { LeftBottom } from "./LeftBottom";
import { ProfilePicSec } from "./ProfilePicSec";
import { PeopleToChat } from "./PeopleToChat";
import { ChatSearch } from "./ChatSearch";
import { FontSans } from "./FontSans";
import { RightBottom } from "./RightBottom";

export const RightBar = () => {
  return (
    <div className="col-span-1 border p-2 h-full bg-slate-50">
      <div className="  h-full">
        <RightTop />

        <Divider />
        <div className="space-y-3">
          <FontSans
            title="Chat"
            fontSize="20px"
            fontWeight={800}
            color="black"
          />
          <ChatSearch />
          <PeopleToChat />
        </div>

        <Divider />
        <div className="space-y-2">
          <FontSans
            title="Groups"
            fontSize="20px"
            fontWeight={800}
            color="black"
          />
          <RightBottom />
        </div>
      </div>
    </div>
  );
};
