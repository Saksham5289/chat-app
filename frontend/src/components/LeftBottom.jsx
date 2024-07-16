import { Trash } from "react-feather";
import { Archive } from "react-feather";

import { Feature } from "./Feature";

export const LeftBottom = () => {
  return (
    <div className="p-4 space-y-4  ">
      <Feature icon={Trash} iconTitle={"Trash"} />
      <Feature icon={Archive} iconTitle={"Archived "} notificationCount={2} />
    </div>
  );
};
