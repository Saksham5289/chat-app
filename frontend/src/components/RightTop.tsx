import CircularIcon from "./CircularIcon";
import { FontMono } from "./FontMono";
import { FontSans } from "./FontSans";
import friend from "../assets/profilepic.png";

export const RightTop = () => {
  return (
    <div className="h-20  space-y-2">
      <FontMono
        title="Recently contacted"
        fontSize="15px"
        fontWeight={800}
        color="black"
      />
      <div className="flex space-x-2">
        <CircularIcon dim="40px" url={friend} />
        <CircularIcon dim="40px" url={friend} />
        <CircularIcon dim="40px" url={friend} />
        <CircularIcon dim="40px" url={friend} />
        <CircularIcon dim="40px" url={friend} />
      </div>
    </div>
  );
};
