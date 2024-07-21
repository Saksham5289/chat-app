import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Center } from "../components/Center";
import { LeftBar } from "../components/LeftBar";
import { RightBar } from "../components/RightBar";
import { setUser } from "../redux/slices/userSlice"; // Ensure you have this action defined in your actions.js

export const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");

    if (userId && username) {
      dispatch(setUser({ userId, username }));
    }
  }, [dispatch]);

  return (
    <div className="h-screen">
      <div className="grid grid-cols-5 h-full">
        <LeftBar />
        <Center />
        <RightBar />
      </div>
    </div>
  );
};
