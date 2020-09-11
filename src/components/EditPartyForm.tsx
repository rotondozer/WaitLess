import React, { useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Maybe } from "seidr";

import { Party } from "api";
import { WithUserContext, withUserContext } from "state/user_context";
import { Input, Button } from "common";
import { ParseInt, Time, WaitlistStackParamList } from "types";
import { Fonts, Layouts, Colors } from "styles";

// -- VIEW

type Props = StackScreenProps<WaitlistStackParamList, "EditPartyForm">;

function EditPartyForm(props: WithUserContext<Props>): JSX.Element {
  const { navigation } = props;
  const { party, onRemoveParty } = props.route.params;

  const [name, updateName] = useState(party.name);
  const [guestCount, updateGuestCount] = useState(party.guestCount);

  const [estWait, updateEstWait] = useState(
    Maybe.fromNullable(party.estWait)
      .map(Time.fromNumericalString)
      .getOrElse(Time.reset),
  );
  const [notes, updateNotes] = useState(
    Maybe.fromNullable(party.notes).getOrElse(""),
  );

  const partyUpdates = {
    ...party,
    name,
    guestCount,
    estWait: Time.format(estWait),
  };

  return (
    <View style={Layouts.container}>
      <Text style={styles.title}>Edit Party Details</Text>
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

      <View style={styles.buttonPairContainer}>
        <Button
          text="Remove"
          style={styles.removeButton}
          textStyle={styles.removeButtonText}
          onPress={() =>
            Party.removeFromWait(party)
              .then(onRemoveParty)
              .then(p => Party.toastSuccess(Party.Action.REMOVE, p))
              .catch(e => Party.alertFailure(Party.Action.REMOVE, e))
          }
        />
        <Button
          text="Update"
          style={styles.updateButton}
          textStyle={styles.updateButtonText}
          onPress={() =>
            Party.update(partyUpdates)
              .then(p => Party.toastSuccess(Party.Action.UPDATE, p))
              .then(navigation.goBack)
              .catch(e => Party.alertFailure(Party.Action.UPDATE, e))
          }
        />
      </View>
      <Button
        text="Cancel"
        style={styles.cancelButton}
        textStyle={styles.cancelButtonText}
        onPress={() => navigation.goBack()}
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
  buttonPairContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  removeButton: {
    backgroundColor: Colors.red420,
    elevation: 0,
    width: 180,
  },
  removeButtonText: {
    color: Colors.whitish,
    fontSize: 18,
  },
  updateButton: {
    width: 190,
    backgroundColor: Colors.whitish,
    borderColor: Colors.blueGray,
    borderWidth: 1,
  },
  updateButtonText: {
    color: Colors.blueGray,
    fontSize: 18,
  },
});

export default withUserContext(EditPartyForm);
