import { CircularCount } from "./CircularCount";
import CircularIcon from "./CircularIcon";
import { FontMono } from "./FontMono";
import { FontSans } from "./FontSans";
import friendPic from "../assets/profilepic.png";

interface PersonToChat {
  iconTitle: string;
  imageUrl: string; // This will be the image of the person.
  notificationCount?: number; // This will be the number of notifications for that feature.
  statusTitle: string;
}
export const PersonToChat = ({
  iconTitle,
  notificationCount,
  imageUrl,
  statusTitle,
}: PersonToChat) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <CircularIcon dim="40px" url={imageUrl} />
        <div>
          <FontSans
            title={iconTitle}
            fontSize="16px"
            fontWeight={500}
            color="black"
          />
          <FontMono
            title={statusTitle}
            fontSize="10px"
            fontWeight={300}
            color="grey"
          />
        </div>
      </div>
      {notificationCount !== undefined && (
        <div className="ml-4">
          <CircularCount dim="25px" count={notificationCount} />
        </div>
      )}
    </div>
  );
};
