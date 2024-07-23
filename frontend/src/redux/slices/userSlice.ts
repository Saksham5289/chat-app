// src/features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  userId: 2,
  username: "dummy",
};

const userSlice = createSlice({
  name: "friend",
  initialState: userInitialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    },
  },
});

export interface UserState {
  userId: number;
  username: string;
}

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
