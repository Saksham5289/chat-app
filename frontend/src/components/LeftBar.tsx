import { AppName } from "./AppName";
import { Divider } from "./Divider";
import { Features } from "./Features";
import { LeftBottom } from "./LeftBottom";
import { ProfilePicSec } from "./ProfilePicSec";

export const LeftBar = () => {
  return (
    <div className="col-span-1 border p-4 h-full bg-slate-950">
      <div className="  h-full">
        <AppName />
        <ProfilePicSec />
        <Divider />
        <Features />
        <Divider />
        <LeftBottom />
      </div>
    </div>
  );
};
