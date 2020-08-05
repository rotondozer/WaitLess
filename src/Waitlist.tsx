import React, { ReactNode, useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Maybe, Nothing } from "seidr";

import UserContext from "../state/user_context";
import * as Party from "../api/party";

enableScreens();
const Stack = createNativeStackNavigator();

type PartiesState = Maybe<Array<Party.Party>>;

function WaitList(): JSX.Element {
  const [parties, updateParties] = useState<PartiesState>(Nothing());

  const user = useContext(UserContext);

  useEffect(() => {
    Party.getAll(user).then(updateParties);
  }, [user]);

  // Defining the component here lets me get the parties const and still use the
  // `component` prop on the Stack Screen
  const Parties = () => (
    <View style={styles.container}>
      <AddPartyButton />
      <ScrollView>
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

function AddPartyForm(): JSX.Element {
  return <View style={{ flex: 1, backgroundColor: "purple" }} />;
}

function AddPartyButton(): JSX.Element {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate("Add Party Form")}
      style={({ pressed }) =>
        pressed
          ? [styles.addPartyButton, styles.buttonPressed]
          : styles.addPartyButton
      }>
      <Text style={styles.buttonText}>Add Party</Text>
    </Pressable>
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
  container: { flex: 1, padding: 5, backgroundColor: "pink" },

  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  addPartyButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    width: "50%",
    marginVertical: 10,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 12,
    borderWidth: 3,
  },
  buttonPressed: {
    backgroundColor: "rgba(120, 120, 120, 0.1)",
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
