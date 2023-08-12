import { create } from "zustand";
import { useUserLoginSlice } from "../slices/userLoginSlice";
import { useUserDataSlice } from "../slices/userDataSlice";

interface UserLoginInterface
  extends ReturnType<typeof useUserLoginSlice>,
    ReturnType<typeof useUserDataSlice> {}

export const UserLoginStore = create<UserLoginInterface>((...a) => ({
  ...useUserLoginSlice(...a),
  ...useUserDataSlice(...a),
}));
