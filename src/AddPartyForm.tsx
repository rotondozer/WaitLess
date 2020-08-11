import React, { useState } from "react";
import { Text, View, StyleSheet, Alert, ToastAndroid } from "react-native";
import { RouteProp } from "@react-navigation/native";

import * as Party from "../api/party";
import { WithUserContext, withUserContext } from "../state/user_context";
import { Input, Button } from "./common";
import { ActiveUser, ParseInt, WaitlistStackParamList } from "../types";
import { Fonts, Layouts } from "../styles";
import { StackNavigationProp } from "@react-navigation/stack";

type Navigation = StackNavigationProp<WaitlistStackParamList, "AddPartyForm">;

// -- VIEW

interface Props {
  navigation: Navigation;
  route: RouteProp<WaitlistStackParamList, "AddPartyForm">;
}

function AddPartyForm(props: WithUserContext<Props>): JSX.Element {
  const { user, navigation } = props;

  const [name, updateName] = useState("");
  const [partySize, updatePartySize] = useState("");
  const [estWait, updateEstWait] = useState("");
  const [notes, updateNotes] = useState("");

  return (
    <View style={[Layouts.container, { backgroundColor: "purple" }]}>
      <Text style={Fonts.title}>Get the party's info...</Text>
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
          onCreateParty(navigation, user, name, partySize, estWait, notes)
        }
        text="Add to Waitlist"
      />
    </View>
  );
}

// -- PRIVATE

function onCreateParty(
  navigation: Navigation,
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
  nameInput: { width: "75%" },
  guestCountInput: { width: "25%", marginLeft: 1 },
  notesInput: { textAlignVertical: "top" },
});

export default withUserContext(AddPartyForm);
