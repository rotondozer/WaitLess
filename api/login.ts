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

export default login;
