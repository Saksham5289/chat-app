import React from "react";
import { CenterBottom } from "./CenterBottom";
import { CenterCenter } from "./CenterCenter";
import { CenterTop } from "./CenterTop";

export const Center = () => {
  const userId = Number(localStorage.getItem("userId"));

  // Determine friendId based on userId
  let friendId;
  if (userId === 4) {
    friendId = 5;
  } else if (userId === 5) {
    friendId = 4;
  } else {
    // Handle cases where userId is not 4 or 5
    friendId = 6; // Or some default value or logic
  }

  return (
    <div className="col-span-3 border h-full flex flex-col">
      <CenterTop />
      {friendId && <CenterCenter friendId={friendId} userId={userId} />}
      <CenterBottom />
    </div>
  );
};
