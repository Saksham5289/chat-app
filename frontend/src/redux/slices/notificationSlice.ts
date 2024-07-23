import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: {}, // This will store the count of new messages for each user
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const senderId = action.payload;
      console.log(action);
      console.log(state);
      if (state.notifications[senderId]) {
        state.notifications[senderId] += 1;
      } else {
        state.notifications[senderId] = 1;
      }
    },
    clearNotification: (state, action) => {
      const { userId } = action.payload;
      delete state.notifications[userId];
    },
  },
});

export interface NotificationState {
  notifications: Record<number, number>; // Mapping userId to notification count
}

export const {
  addNotification,
  clearNotification,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
