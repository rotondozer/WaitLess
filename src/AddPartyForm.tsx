import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, Alert, ToastAndroid } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { Maybe, Just, Nothing } from "seidr";

import * as Party from "../api/party";
import UserContext from "../state/user_context";
import { Input, Button } from "./common";
import * as ActiveUser from "../types/active_user";
import { stringToNum, ParseError } from "../util/string_to_num";

// TODO: Navigation Types? Get rid of `any`!
function AddPartyForm(props: { navigation: NavigationProp<any> }): JSX.Element {
  const [name, updateName] = useState("");
  const [partySize, updatePartySize] = useState<Maybe<number>>(Nothing());
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
          value={partySize.map(String).getOrElse("")}
          onChangeText={v => onChangePartySize(v, updatePartySize)}
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

// TODO: Ditch Err enum, instead sumType for all 3 parse outcomes
function onChangePartySize(
  input: string,
  updateState: (num: Maybe<number>) => void,
): void {
  return stringToNum(input).caseOf({
    Err: err => {
      switch (err) {
        case ParseError.EMPTY_STRING:
          updateState(Nothing());
          break;
        case ParseError.NaN:
          Alert.alert("Needs to be a number!");
          break;
      }
    },
    Ok: num => updateState(Just(num)),
  });
}

function onCreateParty(
  navigation: NavigationProp<any>, // TODO get rid of `any`
  user: ActiveUser.ActiveUser,
  name: string,
  size: Maybe<number>,
  estWait: string,
  notes: string,
): Promise<void> {
  const alertFailedCreation = (message: string) =>
    Alert.alert(`Failed creating party!\n${message}`);

  return Party.create(user, name, size, estWait, notes)
    .then(res => {
      res.caseOf({
        Err: alertFailedCreation,
        Ok: name =>
          ToastAndroid.show(
            `${name} successfully added to the waitlist!`,
            ToastAndroid.SHORT,
          ),
      });
    })
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
