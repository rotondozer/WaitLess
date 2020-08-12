import axios, { AxiosPromise } from "axios";
import baseUrl from "./base_url";

interface UserPayload {
  id: string;
  email: string;
  token: string;
}

interface LoginResponse {
  user: UserPayload;
}

function login(email: string, password: string): AxiosPromise<LoginResponse> {
  return axios({
    url: baseUrl + "/sign-in",
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    data: {
      credentials: {
        email: email,
        password: password,
      },
    },
  });
}

function logout(userId: string, token: string): AxiosPromise {
  return axios({
    url: `${baseUrl}/sign-out/${userId}`,
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: "Token token=" + token,
    },
  });
}

export { login, logout };
