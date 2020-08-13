/* eslint-disable @typescript-eslint/camelcase */
import axios from "axios";
import { Maybe, Result, Ok, Err, Just } from "seidr";
import baseUrl from "./network_request";
import { ActiveUser, ParseInt } from "../types";

export interface Party {
  id: string;
  name: string;
  size: number;
  estimatedWait: string; // what type should this be?
  notes: string;
  checkedInAt: Maybe<string>; // this one too
}

function getAll(
  activeUser: ActiveUser.ActiveUser,
): Promise<Maybe<Array<Party>>> {
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
      }).then(res =>
        Maybe.fromNullable(res.data.parties).map(ps => ps.map(serialize)),
      ),
  });
}

/**
 * @variation Ok -> name; Server responded with a 201 (created)
 * @variation Err -> statusText; TODO: more specific error types generated from status code!
 */
function create(
  activeUser: ActiveUser.ActiveUser,
  name: string,
  size: string,
  estWait: string,
  notes: string,
): Promise<Result<string, string>> {
  return activeUser.caseOf({
    None: () => Promise.reject("User Required"),
    User: (id, token, _) =>
      axios({
        url: `${baseUrl}/users/${id}/parties`,
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: "Token token=" + token,
        },
        data: {
          party: {
            name,
            size,
            checked_in: Just(Date.now().toString()),
            est_wait: estWait,
            notes,
            user_id: id,
          },
        },
      }).then(res => (res.status === 201 ? Ok(name) : Err(res.statusText))),
  });
}

// -- PRIVATE

interface PartySchema {
  id: string;
  name: string;
  size: string;
  est_wait: string;
  notes: string;
  checked_in?: string;
  user_id: string;
}
function serialize(party: PartySchema): Party {
  const { id, name, size, est_wait, notes, checked_in } = party;

  console.log("id: ", id);
  console.log("name: ", name);

  return {
    id,
    name,
    size: ParseInt.parse(size).orElse(0),
    estimatedWait: est_wait,
    notes,
    checkedInAt: Maybe.fromNullable(checked_in),
  };
}

export { getAll, create };
