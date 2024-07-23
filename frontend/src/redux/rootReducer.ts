import { combineReducers } from "@reduxjs/toolkit";
import notificationsReducer from "./slices/notificationSlice";
import friendReducer from "./slices/friendSlice";
import userReducer from "./slices/userSlice";

const rootReducer = combineReducers({
  notifications: notificationsReducer,
  friend: friendReducer,
  user: userReducer,
  // other reducers
});

export default rootReducer;
