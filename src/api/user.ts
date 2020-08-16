import axios, { AxiosPromise } from "axios";
import { toNetworkRequest, NetworkRequest, BASE_URL } from "./network_request";
import { ActiveUser } from "types";

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
): NetworkRequest<ActiveUser.ActiveUser> {
  return toNetworkRequest<UserPayload>("POST", "/sign-in", ActiveUser.None(), {
    credentials: { email, password },
  })
    .map(res => res.data.user)
    .map(({ id, token, email }) => ActiveUser.User(id, token, email));
}

function logout(userId: string, token: string): AxiosPromise {
  return axios({
    url: `${BASE_URL}/sign-out/${userId}`,
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: "Token token=" + token,
    },
  });
}

export { login, logout };
