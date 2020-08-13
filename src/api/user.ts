import axios, { AxiosPromise } from "axios";
import { AsyncResult } from "seidr";
import baseUrl, { toNetworkRequest, toAxiosPromise } from "./network_request";
import { ActiveUser, NetworkRequestError } from "../types";

interface UserPayload {
  user: {
    id: string;
    email: string;
    token: string;
  };
}

function login(
  email: string,
  password: string,
): AsyncResult<NetworkRequestError.NetworkRequestError, ActiveUser.ActiveUser> {
  return toNetworkRequest(
    toAxiosPromise<UserPayload>("/sign-in", "POST", undefined, {
      credentials: {
        email: email,
        password: password,
      },
    }),
  )
    .map(res => res.data.user)
    .map(({ id, token, email }) => ActiveUser.User(id, token, email));
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
