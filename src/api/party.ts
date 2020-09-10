import "react-native-get-random-values"; // needs to be above uuid import
import { ToastAndroid, Alert } from "react-native";
import { v4 as uuid } from "uuid";
import { Maybe } from "seidr";
import {
  Party as Party_,
  Time,
  CreatePartyInput,
  ListPartiesQuery,
  CreatePartyMutation,
  DeletePartyMutation,
  UpdatePartyMutation,
  UpdatePartyInput,
} from "types";

import { API, graphqlOperation } from "aws-amplify";
import { listParties } from "graphql/queries";
import { GraphQLResult } from "@aws-amplify/api";
import { onCreateParty } from "graphql/subscriptions";
import Observable from "zen-observable-ts";
import { createParty, deleteParty, updateParty } from "graphql/mutations";

/**
 * This module is an API for the Amplify GrapQL client... API (lol)
 * It consolidates common types & function calls
 */

const maybeNull = Maybe.fromNullable;

export type Party = Party_;

// -- GETTERS

export async function fetchPartiesWaiting(): Promise<Maybe<Array<Party>>> {
  try {
    const partiesResult = (await API.graphql(
      graphqlOperation(listParties, { filter: { isWaiting: { eq: true } } }),
    )) as GraphQLResult<ListPartiesQuery>;

    const parties = maybeNull(partiesResult.data)
      .flatMap(d => maybeNull(d.listParties))
      .flatMap(lp => maybeNull(lp.items as Array<Party>));

    console.log("the party's here?", parties.getOrElse([]));
    return Promise.resolve(parties);
  } catch (err) {
    return Promise.reject(err);
  }
}

// -- SUBSCRIPTIONS

/**
 * Tracking down the types for the AppSync subscriptions has been difficult.
 * `any` will have to do for now, because `OnCreatePartySubscription` is nested
 * inside 2 objects returned from the sub, so I'd still need to make a custom type
 * to represent that if there isn't one out of the codegen box that I'm missing.
 */
export function partyCreationSub<T extends object = any>(): Observable<T> {
  console.log("Subscribing to `onCreateParty`");
  return API.graphql(graphqlOperation(onCreateParty)) as Observable<T>;
}

/**
 * Return a callback to be executed when the component unmounts
 * @param subscription the real type is in the zen-observable-ts package
 */
export function unsubscribeToPartyCreation(subscription: any): () => void {
  return () => {
    console.log("Unsubscribing to `onCreateParty`");
    subscription.unsubscribe();
  };
}

export async function create(
  name: string,
  guestCount: number,
  estWait: Time.Time,
): Promise<Party> {
  try {
    const createResult = (await API.graphql(
      graphqlOperation(createParty, {
        input: createInput(name, guestCount, estWait),
      }),
    )) as GraphQLResult<CreatePartyMutation>;

    return maybeNull(createResult.data)
      .flatMap(d => maybeNull(d.createParty))
      .caseOf({ Just: Promise.resolve, Nothing: () => Promise.reject("") });
  } catch (err) {
    console.log("Failed creating party", err);
    Promise.reject("");
  }

  return Promise.reject("");
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

// TODO: include table id when seating party
export async function seat(party: Party): Promise<Party> {
  try {
    const thing = (await API.graphql(
      graphqlOperation(updateParty, {
        input: { ...party, isWaiting: false },
      }),
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

// -- PRIVATE

function createInput(
  name: string,
  guestCount: number,
  estWait: Time.Time,
): CreatePartyInput {
  return {
    id: uuid(),
    name,
    guestCount,
    waitingSince: new Date().toISOString(),
    estWait: Time.format(estWait),
    isWaiting: true,
  };
}
