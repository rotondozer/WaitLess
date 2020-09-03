import "react-native-get-random-values"; // needs to be above uuid import
import React, { useState } from "react";
import { Text, View, StyleSheet, Alert, ToastAndroid } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { v4 as uuid } from "uuid";

import * as Party from "../api/party";
import { WithUserContext, withUserContext } from "../state/user_context";
import { Input, Button } from "../common";
import { ActiveUser, ParseInt, WaitlistStackParamList } from "../types";
import { Fonts, Layouts } from "../styles";

import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { CreatePartyInput, CreatePartyMutation } from "types/API";
import { createParty } from "graphql/mutations";
import * as Time from "types/time";

type Navigation = StackNavigationProp<WaitlistStackParamList, "AddPartyForm">;

// -- VIEW

interface Props {
  navigation: Navigation;
  route: RouteProp<WaitlistStackParamList, "AddPartyForm">;
}

function AddPartyForm(props: WithUserContext<Props>): JSX.Element {
  const { user, navigation } = props;

  const [name, updateName] = useState("");
  const [guestCount, updateGuestCount] = useState(1);
  const [estWait, updateEstWait] = useState(Time.reset());
  const [notes, updateNotes] = useState("");

  return (
    <View style={Layouts.container}>
      <Text style={Fonts.title}>Enter Party Details</Text>
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
      </View>

      <Input
        placeholder="How long will their wait be?"
        keyboardType="number-pad"
        value={Time.format(estWait)}
        onChangeText={t => updateEstWait(Time.fromNumericalString(t))}
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
          onCreateParty(name, guestCount, estWait)
            .then(p => {
              toastSuccess(p.name);
              navigation.goBack();
            })
            .catch(alertFailedCreation)
        }
        text="Add to Waitlist"
      />
    </View>
  );
}

// -- PRIVATE

function alertFailedCreation(e: string): void {
  Alert.alert(`Failed creating party!\n${e}`);
}

function toastSuccess(n: string): void {
  ToastAndroid.show(
    `${n} successfully added to the waitlist!`,
    ToastAndroid.SHORT,
  );
}

async function onCreateParty(
  name: string,
  guestCount: number,
  estWait: Time.Time,
): Promise<Party.Party> {
  const partyDetails: CreatePartyInput = {
    id: uuid(),
    name,
    guestCount,
    waitingSince: Time.format(estWait),
    isWaiting: true,
  };

  try {
    const createResult = (await API.graphql(
      graphqlOperation(createParty, { input: partyDetails }),
    )) as GraphQLResult<CreatePartyMutation>;

    if (createResult.data) {
      if (createResult.data.createParty) {
        return Promise.resolve(createResult.data.createParty as Party.Party);
      }
    }
  } catch (err) {
    console.log("Failed creating party", err);
    Promise.reject("");
  }

  return Promise.reject("");
}

/**
 *
 * @deprecated
 */
function _onCreateParty(
  navigation: Navigation,
  user: ActiveUser.ActiveUser,
  name: string,
  size: string,
  estWait: string,
  notes: string,
): void {
  Party.create(user, name, size, estWait, notes).caseOf({
    Err: err =>
      err.caseOf({
        BadRequest: () => alertFailedCreation("Check the info and try again."),
        _: () => alertFailedCreation(""),
      }),
    Ok: n => {
      toastSuccess(n);
      navigation.goBack();
    },
  });
}

// -- STYLES

const styles = StyleSheet.create({
  nameInput: { width: "75%" },
  guestCountInput: { width: "25%", marginLeft: 1 },
  notesInput: { textAlignVertical: "top" },
});

export default withUserContext(AddPartyForm);
