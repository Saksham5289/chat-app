import { Center } from "../components/Center";
import { LeftBar } from "../components/LeftBar";
import { RightBar } from "../components/RightBar";

export const Dashboard = () => {
  return (
    <div className=" h-screen">
      <div className="grid grid-cols-5  h-full">
        <LeftBar />
        <Center />
        <RightBar />
      </div>
    </div>
  );
};
