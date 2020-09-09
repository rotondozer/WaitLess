import React, {
  ReactNode,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Maybe, Nothing } from "seidr";

import { UserContext } from "state/user_context";
import { Fonts, Layouts, Colors } from "styles";
import {
  WaitlistStackParamList,
  Party,
  ListPartiesQuery,
  OnCreatePartySubscription,
} from "types";
import { Button } from "common";
import AddPartyForm from "./AddPartyForm";

import { API, graphqlOperation } from "aws-amplify";
import { listParties } from "graphql/queries";
import { GraphQLResult } from "@aws-amplify/api";
import { onCreateParty } from "graphql/subscriptions";
import Observable from "zen-observable-ts";
import PartyWaiting from "./WaitingParty";

const maybeNull = Maybe.fromNullable;

type PartiesState = Maybe<Array<Party>>;

async function fetchParties(): Promise<PartiesState> {
  try {
    const partiesResult = (await API.graphql(
      graphqlOperation(listParties),
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

// -- NAVIGATOR

enableScreens();
const Stack = createNativeStackNavigator<WaitlistStackParamList>();

// -- VIEW

function WaitList(): JSX.Element {
  const [parties, updateParties] = useState<PartiesState>(Nothing());

  const { user } = useContext(UserContext);

  useFocusEffect(
    useCallback(() => {
      console.log("Fetching Parties...");
      fetchParties()
        .then(updateParties)
        .catch(e => console.log("fetchParties failed", JSON.stringify(e)));
    }, []),
  );

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

  // Defining the component here lets me get the parties const and still use the
  // `component` prop on the Stack Screen
  const Parties: () => JSX.Element = () => (
    <ScrollView alwaysBounceVertical style={Layouts.container}>
      {parties.caseOf<ReactNode>({
        Nothing: () => <Text>No Parties on the Waitlist!</Text>,
        Just: ps => ps.map(PartyWaiting),
      })}
      <AddPartyButton />
    </ScrollView>
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Waitlist" component={Parties} />
      <Stack.Screen name="AddPartyForm" component={AddPartyForm} />
    </Stack.Navigator>
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

export default WaitList;
