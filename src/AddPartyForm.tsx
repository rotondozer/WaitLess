import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, Alert, ToastAndroid } from "react-native";
import { NavigationProp } from "@react-navigation/native";

import * as Party from "../api/party";
import UserContext from "../state/user_context";
import { Input, Button } from "./common";
import { ActiveUser, ParseInt } from "../types";

// TODO: Navigation Types? Get rid of `any`!
function AddPartyForm(props: { navigation: NavigationProp<any> }): JSX.Element {
  const [name, updateName] = useState("");
  const [partySize, updatePartySize] = useState("");
  const [estWait, updateEstWait] = useState("");
  const [notes, updateNotes] = useState("");

  const user = useContext(UserContext); // TODO: HOC for UserContext

  return (
    <View style={[styles.container, { backgroundColor: "purple" }]}>
      <Text style={styles.title}>Get the party's info...</Text>
      <View style={{ flexDirection: "row" }}>
        <Input
          placeholder="Name"
          value={name}
          onChangeText={updateName}
          style={styles.nameInput}
        />
        <Input
          placeholder="# Guests"
          keyboardType="number-pad"
          value={partySize}
          onChangeText={v =>
            ParseInt.parse(v).caseOf({
              EmptyString: () => updatePartySize(""),
              NaN: () => Alert.alert("Needs to be a number!"),
              Parsed: num => updatePartySize(num.toString()),
            })
          }
          style={styles.guestCountInput}
        />
      </View>

      <Input
        placeholder="How long will their wait be?"
        value={estWait}
        onChangeText={updateEstWait}
      />
      <Input
        placeholder="Notes"
        value={notes}
        onChangeText={updateNotes}
        style={styles.notesInput}
        multiline
        editable
        maxLength={400}
        numberOfLines={4}
      />
      <Button
        onPress={() =>
          onCreateParty(props.navigation, user, name, partySize, estWait, notes)
        }
        text="Add to Waitlist"
      />
    </View>
  );
}

// -- PRIVATE

function onCreateParty(
  navigation: NavigationProp<any>, // TODO get rid of `any`
  user: ActiveUser.ActiveUser,
  name: string,
  size: string,
  estWait: string,
  notes: string,
): Promise<void> {
  const alertFailedCreation = (message: string) =>
    Alert.alert(`Failed creating party!\n${message}`);

  const toastSuccess = (name: string) =>
    ToastAndroid.show(
      `${name} successfully added to the waitlist!`,
      ToastAndroid.SHORT,
    );

  return Party.create(user, name, size, estWait, notes)
    .then(res =>
      res.caseOf({
        Err: alertFailedCreation,
        Ok: toastSuccess,
      }),
    )
    .then(_ => navigation.goBack())
    .catch(alertFailedCreation);
}

// -- STYLES

const styles = StyleSheet.create({
  // TODO: share common styles and/or metrics... make padding a shared screen option?
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "pink",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },

  nameInput: { width: "75%" },
  guestCountInput: { width: "25%", marginLeft: 1 },
  notesInput: { textAlignVertical: "top" },
});

export default AddPartyForm;
