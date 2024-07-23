import { MessageSquare } from "react-feather";
import { Lock } from "react-feather";
import { Settings } from "react-feather";
import { Globe } from "react-feather";

import { Feature } from "./Feature";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootState";

export const Features = () => {
  const state = useSelector((state: RootState) => state);
  console.log(state.notifications);
  return (
    <div className="p-4 space-y-4 h-1/2 ">
      <Feature
        icon={MessageSquare}
        iconTitle={"Messages"}
        notificationCount={5}
      />
      <Feature icon={Lock} iconTitle={"Privacy "} />
      <Feature icon={Settings} iconTitle={"Settings"} />
      <Feature icon={Globe} iconTitle={"Language"} />
    </div>
  );
};
