import React from "react";
import { CenterBottom } from "./CenterBottom";
import { CenterCenter } from "./CenterCenter";
import { CenterTop } from "./CenterTop";
import { useSelector } from "react-redux";

interface FriendState {
  friend: { friendId: number };
}

export const Center = () => {
  const userId = Number(localStorage.getItem("userId"));
  const state = useSelector((state: FriendState) => state);

  console.log(state);
  console.log(state.friend.friendId);
  // Determine friendId based on userId
  const friendId = state.friend.friendId;

  return (
    <div className="col-span-3 border h-full flex flex-col">
      <CenterTop />
      {friendId && <CenterCenter friendId={friendId} userId={userId} />}
      {/* <CenterBottom /> */}
    </div>
  );
};
