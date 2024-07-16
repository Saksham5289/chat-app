import CircularIcon from "./CircularIcon";
import profilepic from "../assets/profilepic.png";
import { FontMono } from "./FontMono";

export const ProfilePicSec = () => {
  return (
    <div className="p-2  mx-auto w-11/12  flex flex-col align-center items-center space-y-2">
      <CircularIcon dim="60px" url={profilepic} />
      <FontMono
        title="Saksham Gupta"
        fontSize="12px"
        fontWeight={800}
        color={"white"}
      />
      <FontMono
        title="Persistency is the key"
        fontSize="12px"
        fontWeight={400}
        color={"grey"}
      />
    </div>
  );
};
