import { StateCreator } from "zustand";
import { DashboardLinks } from "../../domain/models/dashboardLinks";

export interface UserDataSliceInterface {
  userData: string;
  setUserData: Function;
  dashboardLinks: DashboardLinks[];
  setDashboardLinks: Function;
  fetchDashboardLinks: Function;
}

const initialState = {
  userData: "",
  dashboardLinks: [],
};

export const useUserDataSlice: StateCreator<UserDataSliceInterface> = (
  set
) => ({
  ...initialState,
  setUserData: (data: string) => {
    set(() => ({ userData: data }));
    console.log("USERDATA", data);
  },
  setDashboardLinks: (links: any) => {
    set(() => ({ dashboardLinks: links }));
  },
  fetchDashboardLinks: async () => {},
});
