import { GetPartyQuery, GetTableQuery } from "./API";

/**
 * Massage the auto-generated API types into the shapes consumed by the client
 */

export type Table = Omit<
  Exclude<GetTableQuery["getTable"], null>,
  "__typename"
>;

export type Party = Omit<
  Exclude<GetPartyQuery["getParty"], null>,
  "__typename" | "table"
> & { table?: Table };
