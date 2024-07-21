import CircularIcon from "./CircularIcon";
import profilepic from "../assets/profilepic.png";
import { FontMono } from "./FontMono";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootState";

export const ProfilePicSec = () => {
  const state = useSelector((state: RootState) => state);
  return (
    <div className="p-2  mx-auto w-11/12  flex flex-col align-center items-center space-y-2">
      <CircularIcon dim="60px" url={profilepic} />
      <FontMono
        title={state.user.username}
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
