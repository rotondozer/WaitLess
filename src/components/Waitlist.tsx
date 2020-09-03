import React, { ReactNode, useCallback, useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Maybe, Nothing } from "seidr";

import { UserContext } from "state/user_context";
import { Fonts, Layouts, Colors } from "styles";
import { WaitlistStackParamList, Party, ListPartiesQuery } from "types";
import { Button } from "common";
import AddPartyForm from "./AddPartyForm";

import { API, graphqlOperation } from "aws-amplify";
import { listParties } from "graphql/queries";
import { GraphQLResult } from "@aws-amplify/api";

type PartiesState = Maybe<Array<Party>>;

async function fetchParties(): Promise<PartiesState> {
  let parties: PartiesState = Nothing();

  try {
    const partiesResult = (await API.graphql(
      graphqlOperation(listParties),
    )) as GraphQLResult<ListPartiesQuery>;

    if (partiesResult.data) {
      if (partiesResult.data.listParties) {
        parties = Maybe.fromNullable(
          partiesResult.data.listParties.items,
        ) as PartiesState;

        console.log("the party's here?", parties.getOrElse([]));
        return Promise.resolve(parties);
      }
    }
  } catch (err) {
    return Promise.reject(err);
  }
  return Promise.reject(Nothing());
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
      fetchParties()
        .then(updateParties)
        .catch(e => console.log("fetchParties failed", JSON.stringify(e)));
    }, []),
  );

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

/**
 * TODO: Make entire cell touchable with just name and size, then push new screen onPress
 */
function PartyWaiting(party: Party): JSX.Element {
  const { id, name, guestCount } = party;
  return (
    <View style={styles.partyContainer} key={id}>
      <View style={styles.partyNameContainer}>
        <Text style={Fonts.condensedText}>{name}</Text>
      </View>
      <View style={styles.partySizeContainer}>
        <Text style={Fonts.condensedText}>
          {guestCount} {guestCount > 1 ? "people" : "person"}
        </Text>
      </View>
    </View>
  );
}

// -- STYLES

const styles = StyleSheet.create({
  partyContainer: {
    flexDirection: "row",
    height: 55,
    width: "100%",
    marginTop: 4,
    padding: 10,
    backgroundColor: Colors.tanOpaque,
    borderColor: Colors.red420,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  partyNameContainer: {
    flex: 0.7,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  partySizeContainer: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WaitList;
