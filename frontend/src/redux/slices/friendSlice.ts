// src/features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialFriendState = {
  friendId: 2,
  friendName: "dummy",
};

const friendSlice = createSlice({
  name: "friend",
  initialState: initialFriendState,
  reducers: {
    setFriendId: (state, action) => {
      state.friendId = action.payload;
    },
    setFriendName: (state, action) => {
      state.friendName = action.payload;
    },
  },
});

export interface FriendState {
  friendId: number;
  friendName: string;
}

export const { setFriendId, setFriendName } = friendSlice.actions;
export default friendSlice.reducer;
