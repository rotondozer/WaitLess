import axios, { AxiosPromise } from "axios";
import { toNetworkRequest, NetworkRequest, BASE_URL } from "./network_request";
import { ActiveUser } from "types";
import { Auth } from "aws-amplify";

/**
 * @returns the current user's username
 * TODO: this could return the whole `CognitoUser` object if I have use for it.
 * But without proper types built in, I'll keep with what I know and need for now.
 */
export function getCurrentUser(
  onSuccess: (username: string) => any,
): Promise<string> {
  return Auth.currentAuthenticatedUser()
    .then(user => {
      console.log("Retrieved current authenticated user", user);
      return user.username;
    })
    .then(onSuccess)
    .catch(err => {
      const error = JSON.stringify(err);
      console.log("Failed getting current user", error);
      return error;
    });
}

export function signOut(): Promise<string> {
  return Auth.signOut()
    .then(user => {
      console.log(`${user.username} signed out.`);
      return user.username;
    })
    .catch(err => {
      const error = JSON.stringify(err);
      console.log("Failed signing out current user", error);
      return error;
    });
}

// ---- DEPRECATED ------

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
