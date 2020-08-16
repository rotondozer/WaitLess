/* eslint-disable @typescript-eslint/camelcase */
import { Maybe, Just } from "seidr";
import { ActiveUser, ParseInt } from "types";
import { toNetworkRequest, NetworkRequest } from "./network_request";

export interface Party {
  id: string;
  name: string;
  size: number;
  estimatedWait: string; // what type should this be?
  notes: string;
  checkedInAt: Maybe<string>; // this one too
}

type Parties = { parties: Array<PartySchema> };

// TODO: does this need to return a Maybe? We render different content for the no parties waiting, but
// that could be captured by the `[]` state.
function getAll(
  activeUser: ActiveUser.ActiveUser,
): NetworkRequest<Maybe<Array<Party>>> {
  return toNetworkRequest<Parties>("GET", "/parties", activeUser).map(res =>
    Maybe.fromNullable(res.data.parties).map(ps => ps.map(serialize)),
  );
}

function create(
  activeUser: ActiveUser.ActiveUser,
  name: string,
  size: string,
  estWait: string,
  notes: string,
): NetworkRequest<unknown> {
  return toNetworkRequest("POST", "/parties", activeUser, {
    party: {
      name,
      size,
      checked_in: Just(Date.now().toString()),
      est_wait: estWait,
      notes,
      user_id: activeUser.caseOf({
        None: () => undefined,
        User: (id, _, __) => id,
      }),
    },
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
