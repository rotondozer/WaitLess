import React, { ReactNode, useCallback, useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Maybe, Nothing } from "seidr";

import { UserContext } from "../state/user_context";
import * as Party from "api/party";
import { Fonts, Layouts } from "../styles";
import { WaitlistStackParamList } from "../types";
import { Button } from "../common";
import AddPartyForm from "./AddPartyForm";

// -- NAVIGATOR

enableScreens();
const Stack = createNativeStackNavigator<WaitlistStackParamList>();

// -- VIEW

type PartiesState = Maybe<Array<Party.Party>>;

function WaitList(): JSX.Element {
  const [parties, updateParties] = useState<PartiesState>(Nothing());

  const { user } = useContext(UserContext);

  useFocusEffect(
    useCallback(() => {
      Party.getAll(user).map(updateParties);
    }, [user]),
  );

  // Defining the component here lets me get the parties const and still use the
  // `component` prop on the Stack Screen
  const Parties: () => JSX.Element = () => (
    <View style={[Layouts.container, { backgroundColor: "pink" }]}>
      <AddPartyButton />
      <ScrollView alwaysBounceVertical>
        {parties.caseOf<ReactNode>({
          Nothing: () => <Text>No Parties on the Waitlist!</Text>,
          Just: ps => ps.map(PartyWaiting),
        })}
      </ScrollView>
    </View>
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
function PartyWaiting(party: Party.Party): JSX.Element {
  const { id, name, size } = party;
  return (
    <View style={styles.partyContainer} key={id}>
      <View style={styles.partyNameContainer}>
        <Text style={Fonts.text}>{name}</Text>
      </View>
      <View style={styles.partySizeContainer}>
        <Text style={Fonts.text}>{size}</Text>
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
    marginTop: 2,
    padding: 3,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
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
