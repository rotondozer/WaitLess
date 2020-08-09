import React, { ReactNode, useCallback, useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Maybe, Nothing } from "seidr";

import { UserContext } from "../state/user_context";
import * as Party from "../api/party";
import { Button } from "./common";
import AddPartyForm from "./AddPartyForm";

enableScreens();
const Stack = createNativeStackNavigator();

type PartiesState = Maybe<Array<Party.Party>>;

function WaitList(): JSX.Element {
  const [parties, updateParties] = useState<PartiesState>(Nothing());

  const user = useContext(UserContext);

  useFocusEffect(
    useCallback(() => {
      Party.getAll(user).then(updateParties);
    }, [user]),
  );

  // Defining the component here lets me get the parties const and still use the
  // `component` prop on the Stack Screen
  const Parties = () => (
    <View style={styles.container}>
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
      <Stack.Screen name="Add Party Form" component={AddPartyForm} />
    </Stack.Navigator>
  );
}

// -- PRIVATE

function AddPartyButton(): JSX.Element {
  const navigation = useNavigation();

  return (
    <Button
      text="Add Party"
      onPress={() => navigation.navigate("Add Party Form")}
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
        <Text style={styles.text}>{name}</Text>
      </View>
      <View style={styles.partySizeContainer}>
        <Text style={styles.text}>{size}</Text>
      </View>
    </View>
  );
}

// -- STYLES

const styles = StyleSheet.create({
  // TODO: share common styles and/or metrics... make padding a shared screen option?
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "pink",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },

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
