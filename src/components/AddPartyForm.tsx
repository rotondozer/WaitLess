import React, { useState } from "react";
import { Text, View, StyleSheet, Alert, ToastAndroid } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { Party } from "api";
import { WithUserContext, withUserContext } from "../state/user_context";
import { Input, Button } from "../common";
import {
  ParseInt,
  Time,
  WaitlistStackParamList,
  CreatePartyMutation,
} from "types";
import { Fonts, Layouts } from "../styles";

import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { createParty } from "graphql/mutations";

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
        placeholder="Any special requests?"
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
  try {
    const createResult = (await API.graphql(
      graphqlOperation(createParty, {
        input: Party.createInput(name, guestCount, estWait),
      }),
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

// -- STYLES

const styles = StyleSheet.create({
  nameInput: { width: "75%" },
  guestCountInput: { width: "25%", marginLeft: 1 },
  notesInput: { textAlignVertical: "top" },
});

export default withUserContext(AddPartyForm);
