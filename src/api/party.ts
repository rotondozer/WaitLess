import "react-native-get-random-values"; // needs to be above uuid import
import { ToastAndroid, Alert } from "react-native";
import { v4 as uuid } from "uuid";
import { Maybe } from "seidr";
import {
  Party as Party_,
  Time,
  CreatePartyInput,
  ListPartysQuery,
  CreatePartyMutation,
  DeletePartyMutation,
  UpdatePartyMutation,
  UpdatePartyInput,
} from "types";

import { API, graphqlOperation } from "aws-amplify";
import { listPartys } from "graphql/queries";
import { GraphQLResult } from "@aws-amplify/api";
import { onCreateParty } from "graphql/subscriptions";
import Observable from "zen-observable-ts";
import { createParty, deleteParty, updateParty } from "graphql/mutations";

/**
 * This module is an API for the Amplify GrapQL client... API (lol)
 * It consolidates common types & function calls
 */

/**
 * Waiting parties are associated with a "waiting table" that is not rendered, rather than
 * having tableId as null.
 * (leaving the tableId as optional also caused issues with generated the @connection)
 */
const WAITING_ID = "waiting-table-id";

const maybeNull = Maybe.fromNullable;

export type Party = Party_;

// -- GETTERS

export async function fetchPartiesWaiting(): Promise<Array<Party>> {
  console.log("Fetching Parties...");
  try {
    const partiesResult = (await API.graphql(
      graphqlOperation(listPartys, { filter: { tableId: { eq: WAITING_ID } } }),
    )) as GraphQLResult<ListPartysQuery>;

    const parties = maybeNull(partiesResult.data)
      .flatMap(d => maybeNull(d.listPartys))
      .flatMap(lp => maybeNull(lp.items as Array<Party>))
      .getOrElse([]);

    return Promise.resolve(parties);
  } catch (err) {
    return Promise.reject(err);
  }
}

// -- SUBSCRIPTIONS() => {

export function partySubEffect(onNewParty: (p: Party) => void): () => void {
  const subscription = partyCreationSub().subscribe({
    next: data => {
      console.log("New party received via subscription", data);

      maybeNull(data.value)
        .flatMap(v => maybeNull(v.data))
        .flatMap(d => maybeNull(d.onCreateParty))
        .map(onNewParty);
    },
  });

  return unsubscribeToPartyCreation(subscription);
}

/**
 * Tracking down the types for the AppSync subscriptions has been difficult.
 * `any` will have to do for now, because `OnCreatePartySubscription` is nested
 * inside 2 objects returned from the sub, so I'd still need to make a custom type
 * to represent that if there isn't one out of the codegen box that I'm missing.
 */
function partyCreationSub<T extends object = any>(): Observable<T> {
  console.log("Subscribing to `onCreateParty`");
  return API.graphql(graphqlOperation(onCreateParty)) as Observable<T>;
}

/**
 * Return a callback to be executed when the component unmounts
 * @param subscription the real type is in the zen-observable-ts package
 */
function unsubscribeToPartyCreation(subscription: any): () => void {
  return () => {
    console.log("Unsubscribing to `onCreateParty`");
    subscription.unsubscribe();
  };
}

// -- CREATE

/**
 * A party cannot be seated immediately and is added to the waitlist. This applies the default tableId
 * reserved for waiting parties. When they are seated at a table, update it to be the available
 * table's id using `Party.seatAt`
 */
export function addToWaitlist(
  name: string,
  guestCount: number,
  estWait: Time.Time,
): Promise<Party> {
  return create(name, guestCount, WAITING_ID, Time.format(estWait));
}

/**
 * There are available Tables to sit the party at when they enter the restaurant and do not need
 * to be added to the waitlist. I still create the Party instance to record their seating data,
 * and also because there needs to be a way for available tables to fill up before the Waitlist
 * is required!
 */
export function seatImmediately(
  tableId: string,
  guestCount: number,
  name?: string,
): Promise<Party> {
  return create(maybeNull(name).getOrElse("NONE"), guestCount, tableId);
}

async function create(
  name: string,
  guestCount: number,
  tableId: string,
  estWait?: string,
): Promise<Party> {
  try {
    const createResult = (await API.graphql(
      graphqlOperation(createParty, {
        input: createInput(name, guestCount, tableId, estWait),
      }),
    )) as GraphQLResult<CreatePartyMutation>;

    return maybeNull(createResult.data)
      .flatMap(d => maybeNull(d.createParty))
      .caseOf({ Just: Promise.resolve, Nothing: () => Promise.reject("") });
  } catch (err) {
    console.log("Failed creating party", err);
    return Promise.reject("");
  }
}

function createInput(
  name: string,
  guestCount: number,
  tableId: string,
  estWait?: string,
): CreatePartyInput {
  return {
    id: uuid(),
    name: maybeNull(name).getOrElse("NONE"),
    guestCount,
    [estWait ? "waitingSince" : "seatedAt"]: new Date().toISOString(),
    estWait,
    tableId,
  };
}

// -- UPDATES

export async function update(party: UpdatePartyInput): Promise<Party> {
  try {
    const updateResult = (await API.graphql(
      graphqlOperation(updateParty, { input: party }),
    )) as GraphQLResult<UpdatePartyMutation>;

    return maybeNull(updateResult.data)
      .flatMap(d => maybeNull(d.updateParty))
      .map(Promise.resolve)
      .getOrElse(Promise.reject("")) as Promise<Party>;
  } catch (err) {
    console.log("Failed creating party", err);
    return Promise.reject("");
  }
}

export async function seatAt(tableId: string, party: Party): Promise<Party> {
  try {
    const input: UpdatePartyInput = { ...party, tableId };
    const thing = (await API.graphql(
      graphqlOperation(updateParty, { input }),
    )) as GraphQLResult<UpdatePartyMutation>;

    return Promise.resolve(thing.data?.updateParty as Party);
  } catch (error) {
    const err = JSON.stringify(error);
    console.log(`seating party ${party.name} failed`, err);
    return Promise.reject(err);
  }
}

/**
 * Removing a party from the waitlist is a simple delete for now.
 * Potentially, a `removal` could archive the party so the record is not lost,
 * and this aggregated data could be useful for users to understand the whens/whys
 * parties were removed without being seated (e.g. the wait was too long).
 */
export async function removeFromWait(party: Party): Promise<Party> {
  const { id, waitingSince } = party;
  try {
    const removal = (await API.graphql(
      graphqlOperation(deleteParty, { input: { id, waitingSince } }),
    )) as GraphQLResult<DeletePartyMutation>;

    return Maybe.fromNullable(removal.data)
      .flatMap(d => Maybe.fromNullable(d.deleteParty))
      .map(Promise.resolve)
      .getOrElse(Promise.reject("")) as Promise<Party>;
  } catch (error) {
    const err = JSON.stringify(error);
    console.log(`deleting party ${party.name} failed`, err);
    return Promise.reject(err);
  }
}

// -- NOTIFICATIONS

export enum Action {
  CREATE,
  UPDATE,
  SEAT,
  REMOVE,
}

export function alertFailure(action: Action, e: string): void {
  const verbing = () => {
    switch (action) {
      case Action.CREATE:
        return "creating";
      case Action.SEAT:
        return "seating";
      case Action.UPDATE:
        return "updating";
      case Action.REMOVE:
        return "removing";
    }
  };
  Alert.alert(`Failed ${verbing()} party!\n${e}`);
}

export function toastSuccess(action: Action, p: Party): void {
  const verbed = () => {
    switch (action) {
      case Action.CREATE:
        return "added to the waitlist!";
      case Action.SEAT:
        return "seated!";
      case Action.UPDATE:
        return "successfully updated.";
      case Action.REMOVE:
        return "removed from the waitlist.";
    }
  };
  ToastAndroid.show(`${p.name} has been ${verbed()}`, ToastAndroid.SHORT);
}

// -- HELPERS

export function isWaiting(party: Party): boolean {
  return party.tableId === WAITING_ID;
}
