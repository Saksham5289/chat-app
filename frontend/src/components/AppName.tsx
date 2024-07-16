import { CircularIcon } from "./CircularIcon";
import chatlogo from "../assets/chatlogo1.png";
import { FontMono } from "./FontMono";

export const AppName = () => {
  return (
    <div className="p-2   w-full h-14 flex align-center space-x-4">
      <CircularIcon url={chatlogo} dim="40px" />
      <FontMono
        title="Let's Chat"
        fontSize="24px"
        fontWeight={800}
        color={"white"}
      />
    </div>
  );
};
