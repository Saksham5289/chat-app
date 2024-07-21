import { FriendState } from "./slices/friendSlice";
import { NotificationState } from "./slices/notificationSlice";
import { UserState } from "./slices/userSlice";

export interface RootState {
  friend: FriendState;
  user: UserState;
  notifications: NotificationState;
}
