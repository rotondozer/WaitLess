import React, { ReactNode, useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
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

// Instad of 'time checked in' input, make it a new Date() to get the current time
function AddPartyForm(): JSX.Element {
  const [name, updateName] = useState("");
  const [partySize, updatePartySize] = useState(""); // numOfGuests instead?
  const [estWait, updateEstWait] = useState("");
  const [notes, updateNotes] = useState("");

  return (
    <View style={[styles.container, { backgroundColor: "purple" }]}>
      <Text style={styles.title}>Get the party's info...</Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={updateName}
          style={[styles.textInput, { width: "75%" }]}
        />
        <TextInput
          placeholder="# Guests"
          keyboardType="number-pad"
          value={partySize}
          onChangeText={updatePartySize}
          style={[styles.textInput, { width: "25%", marginLeft: 1 }]}
        />
      </View>

      <TextInput
        placeholder="How long will their wait be?"
        value={estWait}
        onChangeText={updateEstWait}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Notes"
        value={notes}
        onChangeText={updateNotes}
        style={[styles.textInput, { textAlignVertical: "top" }]}
        multiline
        editable
        maxLength={400}
        numberOfLines={4}
      />
      <Pressable
        onPress={() => {}}
        style={({ pressed }) =>
          pressed
            ? [styles.addPartyButton, styles.buttonPressed]
            : styles.addPartyButton
        }>
        <Text style={styles.buttonText}>Add to Waitlist</Text>
      </Pressable>
    </View>
  );
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
  // TODO: make padding a shared screen option?
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

  // TODO: share common styles and/or metrics
  textInput: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginTop: 8,
    borderRadius: 12,
    fontSize: 18,
    fontWeight: "400",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
});

export default WaitList;
