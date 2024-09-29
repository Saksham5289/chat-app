import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import friendPic from "../assets/profilepic.png";
import { PersonToChat } from "./PersonToChat";
import { setFriendId, setFriendName } from "../redux/slices/friendSlice";
import { RootState } from "../redux/rootState";

interface User {
  id: number;
  username: string;
}

export const PeopleToChat = () => {
  const [users, setUsers] = useState<User[]>([]);
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (userId: number, username: string) => {
    dispatch(setFriendId(userId));
    dispatch(setFriendName(username));
  };

  return (
    <div className="max-h-80 overflow-y-auto space-y-5">
      {users.map((user) => (
        <PersonToChat
          key={user.id}
          fid={user.id}
          iconTitle={user.username}
          imageUrl={friendPic} // Replace with user's profile picture URL if available
          onClick={() => handleUserClick(user.id, user.username)}
        />
      ))}
    </div>
  );
};

//left first
//left second
//right branch
