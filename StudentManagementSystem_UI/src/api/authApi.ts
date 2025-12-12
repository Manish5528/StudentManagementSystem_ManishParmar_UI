import axiosClient from "./axiosClient";

export const authApi = {
  login: (data: { username: string; password: string }) =>
    axiosClient.post("/auth/login", data),
};
