import React from "react";
import { CenterBottom } from "./CenterBottom";
import { CenterCenter } from "./CenterCenter";
import { CenterTop } from "./CenterTop";

export const Center = () => {
  return (
    <div className="col-span-3 border h-full flex flex-col">
      <CenterTop />
      <CenterCenter friendId={4} userId={5} />
      <CenterBottom />
    </div>
  );
};
