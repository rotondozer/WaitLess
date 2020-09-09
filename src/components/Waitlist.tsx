import React, {
  ReactNode,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Maybe, Nothing } from "seidr";

import { UserContext } from "state/user_context";
import { Layouts, Colors } from "styles";
import { WaitlistStackParamList, Party, ListPartiesQuery } from "types";
import { Button } from "common";
import PartyWaiting from "./WaitingParty";

import { API, graphqlOperation } from "aws-amplify";
import { listParties } from "graphql/queries";
import { GraphQLResult } from "@aws-amplify/api";
import { onCreateParty } from "graphql/subscriptions";
import Observable from "zen-observable-ts";

const maybeNull = Maybe.fromNullable;

type PartiesState = Maybe<Array<Party>>;

async function fetchPartiesWaiting(): Promise<PartiesState> {
  try {
    const partiesResult = (await API.graphql(
      graphqlOperation(listParties, { filter: { isWaiting: { eq: true } } }),
    )) as GraphQLResult<ListPartiesQuery>;

    const parties = maybeNull(partiesResult.data)
      .flatMap(d => maybeNull(d.listParties))
      .flatMap(lp => maybeNull(lp.items) as PartiesState);

    console.log("the party's here?", parties.getOrElse([]));
    return Promise.resolve(parties);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Tracking down the types for the AppSync subscriptions has been difficult.
 * `any` will have to do for now, because `OnCreatePartySubscription` is nested
 * inside 2 objects returned from the sub, so I'd still need to make a custom type
 * to represent that if there isn't one out of the codegen box that I'm missing
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

// -- VIEW

function WaitList(): JSX.Element {
  const [parties, updateParties] = useState<PartiesState>(Nothing());

  const { user } = useContext(UserContext);

  useFocusEffect(
    useCallback(() => {
      console.log("Fetching Parties...");
      fetchPartiesWaiting()
        .then(updateParties)
        .catch(e => console.log("fetchParties failed", JSON.stringify(e)));
    }, []),
  );

  // TODO: callback isntead of sub?
  useEffect(() => {
    function partyUpdater(prevState: PartiesState, party: Party): PartiesState {
      console.log(`Adding party '${party.name}' to state`);
      return prevState.map(ps => ps.concat(party));
    }

    const subscription = partyCreationSub().subscribe({
      next: data => {
        console.log("New party received via subscription", data);

        maybeNull(data.value)
          .flatMap(v => maybeNull(v.data))
          .flatMap(d => maybeNull(d.onCreateParty))
          .map(p =>
            updateParties(prevState => partyUpdater(prevState, p as Party)),
          );
      },
    });

    return unsubscribeToPartyCreation(subscription);
  }, []); // Passing an empty deps array tells React to only run this on mount

  function onSeatParty(party: Party): Party {
    updateParties(prevState =>
      prevState.map(ps => ps.filter(p => p.id !== party.id)),
    );
    return party;
  }

  return (
    <View style={Layouts.container}>
      <ScrollView alwaysBounceVertical style={styles.listContainer}>
        {parties.caseOf<ReactNode>({
          Nothing: () => <Text>No Parties on the Waitlist!</Text>,
          Just: ps =>
            ps.map(party => ({ party, onSeatParty })).map(PartyWaiting),
        })}
      </ScrollView>
      <AddPartyButton />
    </View>
  );
}

// -- PRIVATE

function AddPartyButton(): JSX.Element {
  const navigation = useNavigation<
    StackNavigationProp<WaitlistStackParamList, "Waitlist">
  >();

  return (
    <Button
      text="Add Party"
      onPress={() => navigation.navigate("AddPartyForm")}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderBottomColor: Colors.blue,
    borderBottomWidth: 2,
  },
});

export default WaitList;
