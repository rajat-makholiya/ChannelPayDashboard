import { StateCreator } from "zustand";
import { AxiosHttpClient } from "../../infra/http/axios-http-client";
import { LocalJsonStorage } from "../../infra/http/local-json-storage";
import { AUTH_API_URL, AUTH_HEADER, AUTH_TOKEN_KEY } from "../../base";
import Endpoints from "../../domain/endpoints";
import { RemoteUserLogin } from "../../data/usecases/auth/remote-user-login";

export interface UserLoginSliceInterface {
  loginUser: Function;
  userID: string;
  
}

const initialState = {
  userID: "",
};

const axiosHttpClient = AxiosHttpClient.getInstance();
const storage = LocalJsonStorage.getInstance();

export const useUserLoginSlice: StateCreator<UserLoginSliceInterface> = (
  set
) => ({
  ...initialState,
  loginUser: async (data: any) => {
    const token = storage.get(AUTH_TOKEN_KEY);

    axiosHttpClient.setAuthHeaders({
      [AUTH_HEADER]: atob(token),
    });

    const remoteUserLogin = new RemoteUserLogin(
      `${AUTH_API_URL}${Endpoints.USER_LOGIN}`,
      axiosHttpClient
    );

    let result = await remoteUserLogin.login(data);

    // set(() => ({ userID: result }));
    console.log(result);
  },
});
