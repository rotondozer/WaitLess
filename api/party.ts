import axios, { AxiosPromise } from "axios";
import baseUrl from "./base_url";

function getAll(userId: string, token: string): AxiosPromise {
  return axios({
    url: `${baseUrl}/users/${userId}/parties`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: "Token token=" + token,
    },
  });
}

// Enforce the `Party.getAll()` syntax
const Party = { getAll };

export default Party;
