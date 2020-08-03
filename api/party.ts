import axios, { AxiosPromise } from "axios";
import baseUrl from "./base_url";
import * as ActiveUser from "../types/active_user";

export interface Party {
  name: string;
  size: string;
  // TODO...
}
interface GetResponse {
  parties: Array<Party>;
}

function getAll(activeUser: ActiveUser.ActiveUser): AxiosPromise<GetResponse> {
  return activeUser.caseOf({
    None: () => Promise.reject("User Required"),
    User: (id, token, _) =>
      axios({
        url: `${baseUrl}/users/${id}/parties`,
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Token token=" + token,
        },
      }),
  });
}

// TODO: namespace to enforce the `Party.getAll()` syntax?

export { getAll };
