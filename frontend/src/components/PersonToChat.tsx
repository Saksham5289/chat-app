import React from "react";
import { CircularCount } from "./CircularCount";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootState";

interface PersonToChatProps {
  iconTitle: string;
  imageUrl: string;
  onClick: () => void;
  fid: number;
}

export const PersonToChat: React.FC<PersonToChatProps> = ({
  iconTitle,
  imageUrl,
  onClick,
  fid,
}) => {
  const notifications = useSelector((state: RootState) => state.notifications);
  console.log("hi", fid);
  console.log(iconTitle);
  console.log("hey,", notifications);
  return (
    <div
      className="flex items-center space-x-3 cursor-pointer"
      onClick={onClick}
    >
      <img src={imageUrl} alt={iconTitle} className="h-10 w-10 rounded-full" />
      <div>
        <p>{iconTitle}</p>
        {/* {notifications[fid] && (
          <CircularCount dim="10px" count={notifications[fid]} />
        )} */}
      </div>
    </div>
  );
};
