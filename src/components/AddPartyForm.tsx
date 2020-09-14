import React, { useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";

import { Party } from "api";
import { WithUserContext, withUserContext } from "state/user_context";
import { Input, Button } from "common";
import { ParseInt, Time, RootStackParamList } from "types";
import { Fonts, Layouts, Colors } from "../styles";

type Navigation = StackNavigationProp<RootStackParamList, "AddPartyForm">;

// -- VIEW

type Props = StackScreenProps<RootStackParamList, "AddPartyForm">;

function AddPartyForm(props: WithUserContext<Props>): JSX.Element {
  const { user, navigation } = props;

  const [name, updateName] = useState("New Party");
  const [guestCount, updateGuestCount] = useState(1);
  const [estWait, updateEstWait] = useState(Time.reset());
  const [notes, updateNotes] = useState("");

  return (
    <View style={Layouts.container}>
      <Text style={styles.title}>Enter Party Details</Text>
      <View style={styles.partyFormContainer}>
        <Input
          withLabel="Name"
          value={name}
          selectTextOnFocus
          onChangeText={updateName}
        />
        <View style={styles.guestsAndWaitContainer}>
          <View style={styles.inputWithSuffixContainer}>
            <Input
              withLabel="# Guests"
              keyboardType="number-pad"
              selectTextOnFocus
              value={guestCount.toString()}
              onChangeText={v =>
                ParseInt.parse(v).caseOf({
                  EmptyString: () => updateGuestCount(1),
                  NaN: () => Alert.alert("Needs to be a number!"),
                  Parsed: updateGuestCount,
                })
              }
              style={styles.guestCountInput}
            />
            <Text style={styles.suffix}>
              {guestCount === 1 ? "person" : "people"}
            </Text>
          </View>

          <View style={styles.inputWithSuffixContainer}>
            <Input
              withLabel="Estimated Wait"
              keyboardType="number-pad"
              value={Time.format(estWait)}
              onChangeText={t => updateEstWait(Time.fromNumericalString(t))}
              style={styles.estWaitInput}
            />
            <Text style={styles.suffix}>
              {estWait[0] > 0 || estWait[1] > 0 ? "hrs" : "min"}
            </Text>
          </View>
        </View>

        <Input placeholder="Phone" value="" />

        <Input
          placeholder="Any special requests?"
          value={notes}
          onChangeText={updateNotes}
          style={styles.notesInput}
          multiline
          editable
          maxLength={400}
          numberOfLines={4}
        />
      </View>

      <Button
        onPress={() =>
          Party.addToWaitlist(name, guestCount, estWait)
            .then(p => Party.toastSuccess(Party.Action.CREATE, p))
            .then(navigation.goBack)
            .catch(e => Party.alertFailure(Party.Action.CREATE, e))
        }
        text="Add to Waitlist"
      />
      <Button
        text="Cancel"
        onPress={() => navigation.goBack()}
        textStyle={{ color: Colors.darkRed, fontSize: 18 }}
        style={{ backgroundColor: undefined, elevation: 0 }}
      />
    </View>
  );
}

// -- STYLES

const styles = StyleSheet.create({
  title: {
    ...Fonts.title,
    marginLeft: 10,
  },
  partyFormContainer: {
    backgroundColor: Colors.tan,
    padding: 6,
    margin: 10,
    borderColor: Colors.red420,
    borderWidth: 1,
    borderRadius: 3,
  },
  guestsAndWaitContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputWithSuffixContainer: {
    flexDirection: "row",
  },
  estWaitInput: {
    textAlign: "center",
  },
  guestCountInput: {
    textAlign: "center",
  },
  notesInput: {
    textAlignVertical: "top",
  },
  suffix: {
    alignSelf: "flex-end",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  cancelButtonText: {
    color: Colors.darkRed,
    fontSize: 18,
  },
  cancelButton: {
    backgroundColor: undefined,
    elevation: 0,
  },
});

export default withUserContext(AddPartyForm);
